import type { EVM, XyzwSession } from ".";
import { gameLogger } from "@/utils/logger";
import { useTokenStore } from "../tokenStore";

// 从角色信息中提取挂机状态
const extractHangUpStatus = (role: any) => {
  if (!role?.hangUp) return null;
  const hangUp = role.hangUp;
  const now = Math.floor(Date.now() / 1000);
  const endTime = hangUp.endTime || 0;
  const remainingTime = Math.max(0, endTime - now);
  const totalTime = hangUp.totalTime || 3600;
  const elapsedTime = totalTime - remainingTime;

  return {
    isActive: remainingTime > 0,
    remainingTime,
    elapsedTime: Math.max(0, elapsedTime),
    endTime: endTime > 0 ? new Date(endTime * 1000).toISOString() : null,
  };
};

// 从角色信息中提取盐罐状态
const extractSaltJarStatus = (role: any) => {
  if (!role?.saltJar) return null;
  const jar = role.saltJar;
  return {
    isRunning: jar.isRunning || false,
    remainingTime: jar.remainingTime || 0,
    stopTime: jar.stopTime || 0,
  };
};

// 从角色信息中提取日常任务状态
const extractDailyTaskStatus = (role: any) => {
  if (!role?.dailyTasks) return null;
  const tasks = role.dailyTasks;
  const complete = Object.entries(tasks)
    .filter(([_, v]) => (v as any).completed)
    .map(([k]) => k);

  return {
    progress: complete.length,
    complete,
  };
};

// 从角色信息中提取月度任务状态
const extractMonthlyTaskStatus = (role: any) => {
  if (!role?.monthlyTasks) return null;
  const tasks = role.monthlyTasks;
  const fish = tasks.fish?.count || 0;
  const arena = tasks.arena?.count || 0;
  const fishTarget = tasks.fish?.target || 320;
  const arenaTarget = tasks.arena?.target || 240;
  const totalProgress = Math.min(100, Math.round(
    ((fish / fishTarget) + (arena / arenaTarget)) / 2 * 100
  ));

  return {
    fish,
    arena,
    fishTarget,
    arenaTarget,
    totalProgress,
  };
};

// 从角色信息中提取塔数据
const extractTowerData = (role: any) => {
  if (!role?.tower) return null;
  const tower = role.tower;
  return {
    floor: `${tower.id || 0}-${tower.layer || 0}`,
    maxFloor: `${tower.maxId || 0}-${tower.maxLayer || 0}`,
    energy: tower.energy || 0,
    maxEnergy: tower.maxEnergy || 20,
    isExpanded: false,
    isRefreshing: false,
  };
};

// 从角色信息中提取答题状态
const extractStudyStatus = (role: any) => {
  if (!role?.study) return null;
  const study = role.study;
  return {
    isAnswering: study.isAnswering || false,
    questionCount: study.questionCount || 0,
    answeredCount: study.answeredCount || 0,
    status: study.status || "",
    isCompleted: study.isCompleted || false,
    maxCorrectNum: study.maxCorrectNum || 0,
    thisWeek: study.thisWeek || false,
  };
};

// 处理加钟/时钟相关事件，触发获取角色信息以更新状态
export const RolePlugin = ({
  onSome,
  $emit
}: EVM) => {

  onSome(["role_getroleinforesp", "role_getroleinfo"], (data: XyzwSession) => {
    gameLogger.verbose(`收到角色信息事件: ${data.tokenId}`, data);
    const { body, tokenId } = data;
    data.gameData.value.roleInfo = body;
    data.gameData.value.lastUpdated = new Date().toISOString();
    if (body.role?.study?.maxCorrectNum !== undefined) {
      $emit.emit("I-study", data);
    }

    // 从角色信息中提取游戏名称和服务器信息，并更新到token列表
    const tokenStore = useTokenStore();
    const token = tokenStore.gameTokens.find((t) => t.id === tokenId);
    if (token) {
      // 优先使用serverName字段获取服务器信息
      const server =
        body?.role?.serverName ||
        body?.serverName ||
        body?.role?.server ||
        body?.server;

      // 只有当服务器信息实际发生变化时才更新，避免循环触发
      if (server && server !== token.server) {
        // 更新token信息
        tokenStore.updateToken(tokenId, {
          server: server,
        });

        gameLogger.verbose(`已更新Token ${tokenId} 的服务器信息`, { server });
      }
    }

    // =====================
    // 提取并更新 TokenCard 游戏数据
    // =====================
    const role = body?.role;
    if (role) {
      const tokenGameData: any = {
        roleInfo: body,
        lastUpdated: new Date().toISOString(),
      };

      // 挂机状态
      const hangUpStatus = extractHangUpStatus(role);
      if (hangUpStatus) {
        tokenGameData.hangUpStatus = hangUpStatus;
      }

      // 盐罐状态
      const saltJarStatus = extractSaltJarStatus(role);
      if (saltJarStatus) {
        tokenGameData.saltJarStatus = saltJarStatus;
      }

      // 日常任务
      const dailyTaskStatus = extractDailyTaskStatus(role);
      if (dailyTaskStatus) {
        tokenGameData.dailyTaskStatus = dailyTaskStatus;
      }

      // 月度任务
      const monthlyTaskStatus = extractMonthlyTaskStatus(role);
      if (monthlyTaskStatus) {
        tokenGameData.monthlyTaskStatus = monthlyTaskStatus;
      }

      // 塔数据
      const towerData = extractTowerData(role);
      if (towerData) {
        tokenGameData.towerData = towerData;
      }

      // 答题状态
      const studyStatus = extractStudyStatus(role);
      if (studyStatus) {
        tokenGameData.studyStatus = studyStatus;
      }

      // 竞技场排名
      if (role.arena?.rank !== undefined) {
        tokenGameData.arenaRank = role.arena.rank;
      }

      // 更新到token游戏数据缓存
      tokenStore.setTokenGameData(tokenId, tokenGameData);
      gameLogger.verbose(`已更新Token ${tokenId} 的游戏数据缓存`);
    }
  });
}

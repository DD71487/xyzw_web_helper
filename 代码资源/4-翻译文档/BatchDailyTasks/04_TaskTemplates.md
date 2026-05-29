# 任务模板系统 (Task Templates / Preset Teams)

## 功能说明

任务模板系统（预设阵容系统）用于管理和切换游戏角色的战斗阵容。主要功能包括：
- **获取预设阵容信息**: 查询角色当前使用的阵容和预设阵容列表
- **切换阵容**: 在执行特定任务前自动切换到指定阵容
- **恢复阵容**: 任务完成后恢复原始阵容
- **阵容类型**: 支持不同类型的预设阵容（如竞技场阵容、爬塔阵容、BOSS阵容等）

---

## 原始代码 - 预设阵容获取与切换

```javascript
// 获取预设阵容信息
const presetTeamInfo = await sendMessageWithPromise(tokenId, "presetteam_getinfo", {}, { retries: 2 });
const originalTeamId = presetTeamInfo?.presetTeamInfo?.useTeamId;

// 切换阵容
if (originalTeamId !== targetFormation) {
  await sendMessageWithPromise(tokenId, "presetteam_saveteam", { teamId: targetFormation });
}

// 恢复阵容
await sendMessageWithPromise(tokenId, "presetteam_saveteam", { teamId: originalTeamId });
```

---

## 翻译后代码 - 预设阵容获取与切换

```javascript
/**
 * 获取角色当前使用的预设阵容ID
 * @param {string} tokenId - 角色Token ID
 * @returns {Promise<number|null>} 当前阵容ID
 */
async function getCurrentTeamId(tokenId) {
  try {
    const response = await sendMessageWithPromise(tokenId, "presetteam_getinfo", {}, { retries: 2 });
    const teamId = response?.presetTeamInfo?.useTeamId;
    return teamId ?? null;
  } catch (error) {
    console.error(`获取阵容信息失败: ${tokenId}`, error);
    return null;
  }
}

/**
 * 切换预设阵容
 * @param {string} tokenId - 角色Token ID
 * @param {number} teamId - 目标阵容ID
 * @returns {Promise<boolean>} 是否成功
 */
async function switchTeam(tokenId, teamId) {
  try {
    await sendMessageWithPromise(tokenId, "presetteam_saveteam", { teamId }, 5000);
    return true;
  } catch (error) {
    console.error(`切换阵容失败: ${tokenId} -> ${teamId}`, error);
    return false;
  }
}

/**
 * 恢复原始阵容（任务完成后调用）
 * @param {string} tokenId - 角色Token ID
 * @param {number} originalTeamId - 原始阵容ID
 */
async function restoreOriginalTeam(tokenId, originalTeamId) {
  try {
    await sendMessageWithPromise(tokenId, "presetteam_saveteam", { teamId: originalTeamId }, 5000);
    console.log(`已恢复原始阵容: ${originalTeamId}`);
  } catch (error) {
    console.error(`恢复阵容失败: ${tokenId}`, error);
  }
}
```

---

## 原始代码 - 十殿星级挑战中的预设阵容使用

```javascript
// 星级挑战 - 获取特定关卡的预设阵容
const Me = 100 + Ve,  // Ve 为关卡ID，阵容类型ID = 100 + 关卡ID
  lt = await de
    .sendMessageWithPromise(se, "presetteam_typegetinfo", { types: [Me] }, 5e3)
    .catch(() => null);
await new Promise((Ae) => setTimeout(Ae, 300));
let ct = {},
  it = 0;
if (lt) {
  const Ae = lt.presetTeamMap || lt.body?.presetTeamMap || lt,
    Ke = Ae[String(Me)] || Ae[Me];
  if (Ke?.weapon?.weaponId !== void 0 && (it = Ke.weapon.weaponId),
    Ke != null && Ke.teamInfo) {
    const dt = Ke.teamInfo;
    ct = {};
    for (const [et, ot] of Object.entries(dt))
      ot &&
        ot.heroId &&
        (ct[et] = {
          heroId: ot.heroId,
          level: ot.level || 1,
          star: ot.star || 1,
          skill: ot.skill || 0,
          equip: ot.equip || {},
          pet: ot.pet || null,
          holyBeast: ot.holyBeast || null,
          artifact: ot.artifact || null,
        });
  }
}
if (Object.keys(ct).length === 0) {
  F({ message: `第${Ve}关挑战失败,请游戏内检查阵容后重试。`, type: "error" });
  break;
}
// 计算战力
await de
  .sendMessageWithPromise(se, "hero_calcpowerbyteam", { battleTeam: ct, lordWeaponId: it }, 5e3)
  .catch(() => {});
await new Promise((Ae) => setTimeout(Ae, 300));
// 发起挑战（双发确保成功）
const ye = await Promise.all([
  de.sendMessageWithPromise(se, "nmext_startboss", { bossId: Ve, battleTeam: ct, lordWeaponId: it, presetTeamType: 0 }, 8e3).catch((Ae) => ({ __error: !0, message: Ae.message })),
  de.sendMessageWithPromise(se, "nmext_startboss", { bossId: Ve, battleTeam: ct, lordWeaponId: it, presetTeamType: 0 }, 8e3).catch((Ae) => ({ __error: !0, message: Ae.message })),
]);
```

---

## 翻译后代码 - 十殿星级挑战中的预设阵容使用

```javascript
/**
 * 获取关卡预设阵容
 * @param {string} tokenId - 角色Token ID
 * @param {number} levelId - 关卡ID
 * @returns {Promise<{battleTeam: Object, lordWeaponId: number}|null>}
 */
async function getLevelPresetTeam(tokenId, levelId) {
  const presetTypeId = 100 + levelId; // 阵容类型ID规则: 100 + 关卡ID

  // 获取该类型的预设阵容信息
  const response = await sendMessageWithPromise(
    tokenId,
    "presetteam_typegetinfo",
    { types: [presetTypeId] },
    5000
  ).catch(() => null);

  await new Promise((r) => setTimeout(r, 300));

  if (!response) return null;

  // 解析预设阵容数据
  const presetTeamMap = response.presetTeamMap || response.body?.presetTeamMap || response;
  const teamData = presetTeamMap[String(presetTypeId)] || presetTeamMap[presetTypeId];

  if (!teamData) return null;

  // 提取主公武器ID
  let lordWeaponId = 0;
  if (teamData.weapon?.weaponId !== undefined) {
    lordWeaponId = teamData.weapon.weaponId;
  }

  // 构建战斗阵容对象
  const battleTeam = {};
  if (teamData.teamInfo) {
    for (const [position, heroData] of Object.entries(teamData.teamInfo)) {
      if (heroData && heroData.heroId) {
        battleTeam[position] = {
          heroId: heroData.heroId,         // 英雄ID
          level: heroData.level || 1,      // 英雄等级
          star: heroData.star || 1,        // 英雄星级
          skill: heroData.skill || 0,      // 技能等级
          equip: heroData.equip || {},     // 装备信息
          pet: heroData.pet || null,       // 宠物信息
          holyBeast: heroData.holyBeast || null,     // 神兽信息
          artifact: heroData.artifact || null,       // 神器信息
        };
      }
    }
  }

  if (Object.keys(battleTeam).length === 0) {
    return null;
  }

  return { battleTeam, lordWeaponId };
}

/**
 * 使用预设阵容挑战十殿关卡
 * @param {string} tokenId - 角色Token ID
 * @param {number} levelId - 关卡ID
 */
async function challengeWithPresetTeam(tokenId, levelId) {
  // 1. 获取预设阵容
  const preset = await getLevelPresetTeam(tokenId, levelId);
  if (!preset) {
    addLog({ message: `第${levelId}关挑战失败，请游戏内检查阵容后重试`, type: "error" });
    return false;
  }

  // 2. 计算战力
  await sendMessageWithPromise(
    tokenId,
    "hero_calcpowerbyteam",
    { battleTeam: preset.battleTeam, lordWeaponId: preset.lordWeaponId },
    5000
  ).catch(() => {});
  await new Promise((r) => setTimeout(r, 300));

  // 3. 发起挑战（双发确保成功，取第一个成功结果）
  const results = await Promise.all([
    sendMessageWithPromise(
      tokenId,
      "nmext_startboss",
      {
        bossId: levelId,
        battleTeam: preset.battleTeam,
        lordWeaponId: preset.lordWeaponId,
        presetTeamType: 0,
      },
      8000
    ).catch((err) => ({ __error: true, message: err.message })),
    sendMessageWithPromise(
      tokenId,
      "nmext_startboss",
      {
        bossId: levelId,
        battleTeam: preset.battleTeam,
        lordWeaponId: preset.lordWeaponId,
        presetTeamType: 0,
      },
      8000
    ).catch((err) => ({ __error: true, message: err.message })),
  ]);

  await new Promise((r) => setTimeout(r, 300));

  // 取第一个成功的结果
  const successResult = results.find((r) => r && !r.__error) || null;
  if (!successResult) {
    addLog({ message: `关卡 ${levelId} 无法挑战，请先通过十殿8之后再运行`, type: "warning" });
    return false;
  }

  // 检查是否获胜
  const resultData = successResult.body || successResult || {};
  const isWin = resultData.result?.isWin ?? resultData.result?.iswin ?? resultData.result?.win;
  if (!isWin) {
    addLog({ message: `第${levelId}关挑战失败，请游戏内检查阵容后重试`, type: "error" });
    return false;
  }

  // 计算获得星数
  const starMap = resultData.result?.starBossCompleteMap || resultData.starBossCompleteMap;
  const levelStars = starMap ? starMap[String(levelId)] || starMap[levelId] : null;
  const starCount = levelStars
    ? Object.entries(levelStars)
        .filter(([, completed]) => completed === true)
        .map(([starIdx]) => parseInt(starIdx, 10))
        .filter((idx) => !isNaN(idx))
        .reduce((max, idx) => Math.max(max, idx + 1), 0)
    : 0;

  if (starCount >= 1) {
    addLog({ message: `关卡 ${levelId} 挑战成功，获得 ${starCount} 星`, type: "success" });
    return { success: true, stars: starCount };
  }

  addLog({ message: `第${levelId}关挑战失败`, type: "error" });
  return false;
}
```

---

## 原始代码 - 爬塔任务中的阵容切换

```javascript
const C = await G(p, "presetteam_getinfo", {}, { retries: 2 });
((_ = (y = C == null ? void 0 : C.presetTeamInfo) == null ? void 0 : y.useTeamId),
  t({ time: new Date().toLocaleTimeString(), message: `${w.name} 原始阵容: ${_}`, type: "info" }),
  _ !== n.towerFormation &&
    (await G(p, "presetteam_saveteam", { teamId: n.towerFormation }),
    (b = !0),
    t({
      time: new Date().toLocaleTimeString(),
      message: `成功切换到阵容${n.towerFormation}`,
      type: "info",
    })));
// ... 执行爬塔 ...
// 最后恢复阵容
try {
  await c.sendMessageWithPromise(O, "presetteam_saveteam", { teamId: w }, 5e3);
  t({ time: new Date().toLocaleTimeString(), message: `${p} 已恢复原阵容${w}`, type: "success" });
} catch (n) {}
```

---

## 翻译后代码 - 爬塔任务中的阵容切换

```javascript
/**
 * 爬塔任务 - 带阵容切换
 * @param {string} tokenId - 角色Token ID
 * @param {Object} settings - 任务设置
 * @param {number} settings.towerFormation - 爬塔专用阵容ID
 */
async function climbTowerWithFormation(tokenId, settings) {
  const tokenInfo = getTokenById(tokenId);
  let originalTeamId = null;
  let formationSwitched = false;

  try {
    // 1. 获取当前阵容
    const presetResponse = await sendGameMessage(tokenId, "presetteam_getinfo", {}, { retries: 2 });
    originalTeamId = presetResponse?.presetTeamInfo?.useTeamId;
    addLog({
      time: new Date().toLocaleTimeString(),
      message: `${tokenInfo.name} 原始阵容: ${originalTeamId}`,
      type: "info",
    });

    // 2. 切换到爬塔阵容
    if (originalTeamId !== settings.towerFormation) {
      await sendGameMessage(tokenId, "presetteam_saveteam", { teamId: settings.towerFormation });
      formationSwitched = true;
      addLog({
        time: new Date().toLocaleTimeString(),
        message: `成功切换到爬塔阵容 ${settings.towerFormation}`,
        type: "info",
      });
    }

    // 3. 执行爬塔逻辑
    // ... (爬塔战斗循环)

  } catch (error) {
    console.error("爬塔任务失败:", error);
  } finally {
    // 4. 恢复原始阵容
    if (formationSwitched && originalTeamId != null) {
      try {
        await sendMessageWithPromise(tokenId, "presetteam_saveteam", { teamId: originalTeamId }, 5000);
        addLog({
          time: new Date().toLocaleTimeString(),
          message: `${tokenInfo.name} 已恢复原阵容 ${originalTeamId}`,
          type: "success",
        });
      } catch (err) {
        console.error("恢复阵容失败:", err);
      }
    }
  }
}
```

---

## 关键参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| `teamId` | number | 阵容ID，用于标识不同的预设阵容 |
| `presetTeamType` | number | 预设阵容类型，如 0=默认, 100+levelId=关卡特定 |
| `battleTeam` | Object | 战斗阵容，键为位置，值为英雄信息 |
| `heroId` | number | 英雄唯一ID |
| `level` | number | 英雄等级 |
| `star` | number | 英雄星级 |
| `skill` | number | 技能等级 |
| `equip` | Object | 装备信息 |
| `pet` | Object | 宠物信息 |
| `holyBeast` | Object | 神兽信息 |
| `artifact` | Object | 神器信息 |
| `lordWeaponId` | number | 主公武器ID |
| `weaponId` | number | 武器ID |

---

## 协议命令说明

| 命令 | 参数 | 说明 |
|------|------|------|
| `presetteam_getinfo` | `{}` | 获取当前预设阵容信息 |
| `presetteam_typegetinfo` | `{ types: [typeId] }` | 获取指定类型的预设阵容 |
| `presetteam_saveteam` | `{ teamId }` | 切换/保存阵容 |
| `hero_calcpowerbyteam` | `{ battleTeam, lordWeaponId }` | 计算阵容战力 |
| `nmext_startboss` | `{ bossId, battleTeam, lordWeaponId, presetTeamType }` | 开始BOSS挑战 |

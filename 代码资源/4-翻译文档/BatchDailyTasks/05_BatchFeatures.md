# 批量功能模块

## 功能说明

批量功能模块是 BatchDailyTasks 的核心，支持对多个游戏账号同时执行各类自动化任务。每个功能都遵循统一模式：
1. 遍历选中的账号列表
2. 为每个账号建立 WebSocket 连接
3. 发送游戏协议命令执行任务
4. 记录执行日志
5. 关闭连接

---

## 1. 日常任务 (Daily Tasks)

### 原始代码

```javascript
// 使用 DailyTaskRunner 类执行日常任务
const de = new DailyTaskRunner(we, { commandDelay: 500, taskDelay: 500 }).loadSettings(fe) || {
  arenaFormation: 1,
  bossFormation: 1,
  bossTimes: 2,
  claimBottle: !0,
  payRecruit: !0,
  openBox: !0,
  arenaEnable: !0,
  claimHangUp: !0,
  claimEmail: !0,
  blackMarketPurchase: !0,
  blackMarketStandalonePurchase: !1,
};
await new DailyTaskRunner(we, {
  commandDelay: de.commandDelay || 500,
  taskDelay: de.taskDelay || 500,
}).run(o.token.id, { onLog: (Te) => F(Te), onProgress: (Te) => {} }, de);
```

### 翻译后代码

```javascript
/**
 * 执行日常任务
 * @param {string} tokenId - 角色Token ID
 * @param {Object} settings - 任务配置
 */
async function runDailyTasks(tokenId, settings) {
  // 加载任务配置（或使用默认值）
  const config = settings || {
    arenaFormation: 1,           // 竞技场阵容ID
    bossFormation: 1,            // BOSS阵容ID
    bossTimes: 2,                // BOSS挑战次数
    claimBottle: true,           // 领取罐子
    payRecruit: true,            // 付费招募
    openBox: true,               // 开启宝箱
    arenaEnable: true,           // 启用竞技场
    claimHangUp: true,           // 领取挂机奖励
    claimEmail: true,            // 领取邮件
    blackMarketPurchase: true,   // 黑市购买
    blackMarketStandalonePurchase: false,
    commandDelay: 500,           // 命令间隔(ms)
    taskDelay: 500,              // 任务间隔(ms)
  };

  const runner = new DailyTaskRunner(tokenStore, {
    commandDelay: config.commandDelay,
    taskDelay: config.taskDelay,
  });

  await runner.run(tokenId, {
    onLog: (log) => addLog(log),
    onProgress: (percent) => addLog({ message: `任务进度: ${percent}%`, type: "info" }),
  }, config);
}
```

---

## 2. 副本挑战 - 咸王梦境 (Dungeon / Dream Challenge)

### 原始代码

```javascript
batchmengjing: async () => {
  if (e.value.length === 0) return;
  e.value.forEach((Q) => { a.value[Q] = "waiting"; });
  const G = e.value.map(async (Q) => {
    if (i.value) return;
    a.value[Q] = "running";
    const R = o.value.find((K) => K.id === Q);
    try {
      await d(Q);
      const K = await c.sendMessageWithPromise(Q, "role_getroleinfo", {}, 1e4);
      const ce = K?.role?.levelId || 0;
      const Y = K?.role?.dungeon || {};
      const O = Y.status;
      if (ce < 200) {
        a.value[Q] = "completed";
        return;
      }
      if (O === 2 || O === "completed") {
        a.value[Q] = "completed";
        return;
      }
      const p = new Date().getDay();
      if (!(p === 0 || p === 1 || p === 3 || p === 4)) {
        a.value[Q] = "completed";
        return;
      }
      const n = { 0: 107 };
      await c.sendMessageWithPromise(Q, "dungeon_selecthero", { battleTeam: n }, 1e4);
      await new Promise((_) => setTimeout(_, delayConfig.action || 1500));
      a.value[Q] = "completed";
    } catch (K) {
      a.value[Q] = "failed";
    }
  });
  await Promise.all(G);
}
```

### 翻译后代码

```javascript
/**
 * 批量咸王梦境挑战
 * 开放时间: 周日/周一/周三/周四
 * 要求: 角色关卡数 >= 200
 */
async function batchDreamChallenge() {
  if (selectedTokens.value.length === 0) return;

  selectedTokens.value.forEach((tokenId) => {
    taskStatus.value[tokenId] = "waiting";
  });

  const tasks = selectedTokens.value.map(async (tokenId) => {
    if (shouldStop.value) return;
    taskStatus.value[tokenId] = "running";
    const tokenInfo = tokens.value.find((t) => t.id === tokenId);

    try {
      await ensureConnection(tokenId);

      // 获取角色信息
      const roleInfo = await sendMessageWithPromise(tokenId, "role_getroleinfo", {}, 10000);
      const levelId = roleInfo?.role?.levelId || 0;
      const dungeon = roleInfo?.role?.dungeon || {};
      const status = dungeon.status;

      // 检查关卡要求
      if (levelId < 200) {
        addLog({ message: `${tokenInfo.name} 关卡不足(${levelId} < 200)，跳过`, type: "warning" });
        taskStatus.value[tokenId] = "completed";
        return;
      }

      // 检查是否已完成
      if (status === 2 || status === "completed") {
        addLog({ message: `${tokenInfo.name} 梦境已完成`, type: "info" });
        taskStatus.value[tokenId] = "completed";
        return;
      }

      // 检查开放时间
      const dayOfWeek = new Date().getDay();
      const openDays = [0, 1, 3, 4]; // 周日/周一/周三/周四
      if (!openDays.includes(dayOfWeek)) {
        addLog({ message: `${tokenInfo.name} 当前不在开放时间`, type: "warning" });
        taskStatus.value[tokenId] = "completed";
        return;
      }

      // 选择英雄进行挑战
      const battleTeam = { 0: 107 }; // 默认阵容
      await sendMessageWithPromise(tokenId, "dungeon_selecthero", { battleTeam }, 10000);
      await new Promise((r) => setTimeout(r, 1500));

      addLog({ message: `${tokenInfo.name} 咸王梦境已完成`, type: "success" });
      taskStatus.value[tokenId] = "completed";
    } catch (error) {
      const msg = error.message || "";
      if (msg.includes("2600040") || msg.includes("已完成梦境挑战")) {
        addLog({ message: `${tokenInfo.name} 已完成梦境挑战`, type: "info" });
        taskStatus.value[tokenId] = "completed";
      } else {
        console.error(error);
        addLog({ message: `${tokenInfo.name} 梦境失败: ${msg}`, type: "error" });
        taskStatus.value[tokenId] = "failed";
      }
    } finally {
      closeWebSocketConnection(tokenId);
    }
  });

  await Promise.all(tasks);
  isRunning.value = false;
}
```

---

## 3. 宝库挑战 (Treasure Vault)

### 原始代码

```javascript
batchbaoku13: async () => {
  // 宝库1-3层
  e.value.forEach((Q) => { a.value[Q] = "waiting"; });
  const G = e.value.map(async (Q) => {
    a.value[Q] = "running";
    const R = o.value.find((ae) => ae.id === Q);
    try {
      await d(Q);
      const Z = (await c.sendMessageWithPromise(Q, "bosstower_getinfo", {})).bossTower.towerId;
      if (Z >= 1 && Z <= 3) {
        for (let j = 0; j < 2 && !i.value; j++)
          (await c.sendMessageWithPromise(Q, "bosstower_startboss", {}),
            await new Promise((K) => setTimeout(K, 500)));
        for (let j = 0; j < 9 && !i.value; j++)
          (await c.sendMessageWithPromise(Q, "bosstower_startbox", {}),
            await new Promise((K) => setTimeout(K, 500)));
      }
      a.value[Q] = "completed";
    } catch (ae) {
      a.value[Q] = "failed";
    }
  });
  await Promise.all(G);
},
batchbaoku45: async () => {
  // 宝库4-5层
  e.value.forEach((Q) => { a.value[Q] = "waiting"; });
  const G = e.value.map(async (Q) => {
    a.value[Q] = "running";
    try {
      await d(Q);
      const Z = (await c.sendMessageWithPromise(Q, "bosstower_getinfo", {})).bossTower.towerId;
      if (Z >= 4 && Z <= 5)
        for (let j = 0; j < 2 && !i.value; j++)
          (await c.sendMessageWithPromise(Q, "bosstower_startboss", {}),
            await new Promise((K) => setTimeout(K, 500)));
      a.value[Q] = "completed";
    } catch (ae) {
      a.value[Q] = "failed";
    }
  });
  await Promise.all(G);
}
```

### 翻译后代码

```javascript
/**
 * 批量宝库挑战 - 前3层
 * 流程: 2次BOSS战斗 + 9次宝箱开启
 */
async function batchVault13() {
  if (selectedTokens.value.length === 0) return;

  const tasks = selectedTokens.value.map(async (tokenId) => {
    taskStatus.value[tokenId] = "running";
    const tokenInfo = tokens.value.find((t) => t.id === tokenId);

    try {
      await ensureConnection(tokenId);

      // 获取当前宝库层数
      const vaultInfo = await sendMessageWithPromise(tokenId, "bosstower_getinfo", {});
      const towerId = vaultInfo.bossTower?.towerId;

      if (towerId >= 1 && towerId <= 3) {
        // 2次BOSS战斗
        for (let i = 0; i < 2 && !shouldStop.value; i++) {
          await sendMessageWithPromise(tokenId, "bosstower_startboss", {});
          await new Promise((r) => setTimeout(r, 500));
        }
        // 9次宝箱开启
        for (let i = 0; i < 9 && !shouldStop.value; i++) {
          await sendMessageWithPromise(tokenId, "bosstower_startbox", {});
          await new Promise((r) => setTimeout(r, 500));
        }
      }

      addLog({ message: `${tokenInfo.name} 宝库战斗已完成，请上线手动领取奖励`, type: "success" });
      taskStatus.value[tokenId] = "completed";
    } catch (error) {
      console.error(error);
      addLog({ message: `${tokenInfo.name} 宝库失败: ${error.message}`, type: "error" });
      taskStatus.value[tokenId] = "failed";
    } finally {
      closeWebSocketConnection(tokenId);
    }
  });

  await Promise.all(tasks);
}

/**
 * 批量宝库挑战 - 4-5层
 * 流程: 2次BOSS战斗
 */
async function batchVault45() {
  if (selectedTokens.value.length === 0) return;

  const tasks = selectedTokens.value.map(async (tokenId) => {
    taskStatus.value[tokenId] = "running";
    const tokenInfo = tokens.value.find((t) => t.id === tokenId);

    try {
      await ensureConnection(tokenId);

      const vaultInfo = await sendMessageWithPromise(tokenId, "bosstower_getinfo", {});
      const towerId = vaultInfo.bossTower?.towerId;

      if (towerId >= 4 && towerId <= 5) {
        for (let i = 0; i < 2 && !shouldStop.value; i++) {
          await sendMessageWithPromise(tokenId, "bosstower_startboss", {});
          await new Promise((r) => setTimeout(r, 500));
        }
      }

      addLog({ message: `${tokenInfo.name} 宝库战斗已完成`, type: "success" });
      taskStatus.value[tokenId] = "completed";
    } catch (error) {
      console.error(error);
      addLog({ message: `${tokenInfo.name} 宝库失败: ${error.message}`, type: "error" });
      taskStatus.value[tokenId] = "failed";
    } finally {
      closeWebSocketConnection(tokenId);
    }
  });

  await Promise.all(tasks);
}
```

---

## 4. 爬塔挑战 (Tower Climb)

### 原始代码

```javascript
climbTower: async () => {
  e.value.forEach((p) => { a.value[p] = "waiting"; });
  const O = e.value.map(async (p) => {
    a.value[p] = "running";
    const w = o.value.find((g) => g.id === p);
    let _ = null, b = !1, $ = null;
    try {
      await d(p);
      await G(p, "tower_getinfo", {}).catch(() => {});
      $ = await G(p, "role_getroleinfo", {});
      let g = $?.role?.tower?.energy || 0;
      if (g <= 0) { a.value[p] = "completed"; return; }
      // 切换阵容
      const C = await G(p, "presetteam_getinfo", {}, { retries: 2 });
      _ = C?.presetTeamInfo?.useTeamId;
      if (_ !== n.towerFormation) {
        await G(p, "presetteam_saveteam", { teamId: n.towerFormation });
        b = !0;
      }
      // 领取宝箱奖励
      try { await G(p, "tower_claimreward", {}, { retries: 1 }); } catch (ve) {}
      let v = 0, T = 0, E = 0, U = 0, ie = 0;
      const F = n.maxClimbCount || te.maxClimbCount;
      for (; g > 0 && v < F && !i.value; ) {
        try {
          const ve = await G(p, "fight_starttower", {}, { retries: 2 });
          const re = ve?.battleData;
          let me = !1, ue = 0;
          if (re) {
            ue = re.result?.sponsor?.ext?.curHP || 0;
            me = ue > 0;
          }
          v++;
          me ? (T++, U = 0) : (E++, U++);
          await q(f.commandDelay || te.commandDelay);
          v % 5 === 0 ? (g = $?.role?.tower?.energy || 0) : g = Math.max(0, g - 1);
        } catch (ve) {
          const re = ve.message || "";
          if (re.includes("1500010")) { break; } // 全部通关
          if (re.includes("200020")) { break; } // Bin文件错误
          if (re.includes("200400")) { await q(3e3); continue; }
          if (re.includes("1500040")) { /* 领取上座塔奖励 */ continue; }
          if (re.includes("400340")) { /* 服务器错误 */ }
          if (re.includes("1500020")) { break; } // 能量不足
          if (U >= 3) { break; } // 连续失败3次
        }
      }
      a.value[p] = "completed";
    } catch (g) {
      a.value[p] = "failed";
    } finally {
      b && _ && await restoreTeam(p, w.name, _);
    }
  });
  await Promise.all(O);
}
```

### 翻译后代码

```javascript
/**
 * 批量爬塔
 * 流程: 切换阵容 -> 领取宝箱 -> 循环战斗直到体力耗尽或达到上限
 */
async function batchClimbTower() {
  if (selectedTokens.value.length === 0) return;

  const tasks = selectedTokens.value.map(async (tokenId) => {
    taskStatus.value[tokenId] = "running";
    const tokenInfo = tokens.value.find((t) => t.id === tokenId);
    const settings = getTokenSettings(tokenId);

    let originalTeamId = null;
    let teamSwitched = false;

    try {
      await ensureConnection(tokenId);
      await sendGameMessage(tokenId, "tower_getinfo", {}).catch(() => {});

      // 获取角色信息和体力
      const roleInfo = await sendGameMessage(tokenId, "role_getroleinfo", {});
      let energy = roleInfo?.role?.tower?.energy || 0;

      if (energy <= 0) {
        addLog({ message: `${tokenInfo.name} 无体力，跳过`, type: "warning" });
        taskStatus.value[tokenId] = "completed";
        return;
      }

      // 获取并切换阵容
      const presetInfo = await sendGameMessage(tokenId, "presetteam_getinfo", {}, { retries: 2 });
      originalTeamId = presetInfo?.presetTeamInfo?.useTeamId;
      addLog({ message: `${tokenInfo.name} 原始阵容: ${originalTeamId}`, type: "info" });

      if (originalTeamId !== settings.towerFormation) {
        await sendGameMessage(tokenId, "presetteam_saveteam", { teamId: settings.towerFormation });
        teamSwitched = true;
        addLog({ message: `切换到爬塔阵容 ${settings.towerFormation}`, type: "info" });
      }

      // 尝试领取宝箱奖励
      try {
        await sendGameMessage(tokenId, "tower_claimreward", {}, { retries: 1 });
        addLog({ message: `${tokenInfo.name} 领取宝箱奖励成功`, type: "success" });
      } catch (error) {
        // 忽略领取失败
      }

      // 爬塔循环
      let totalBattles = 0;
      let wins = 0;
      let losses = 0;
      let consecutiveFailures = 0;
      let serverErrorCount = 0;
      const maxClimbs = settings.maxClimbCount || 999;

      while (energy > 0 && totalBattles < maxClimbs && !shouldStop.value) {
        try {
          const result = await sendGameMessage(tokenId, "fight_starttower", {}, { retries: 2 });
          const battleData = result?.battleData;

          // 判断胜负
          let isWin = false;
          let currentHP = 0;
          if (battleData) {
            currentHP = battleData.result?.sponsor?.ext?.curHP || 0;
            isWin = currentHP > 0;
          }

          totalBattles++;
          if (isWin) {
            wins++;
            consecutiveFailures = 0;
            addLog({ message: `爬塔第 ${totalBattles} 次 - 胜利`, type: "success" });
          } else {
            losses++;
            consecutiveFailures++;
            addLog({ message: `爬塔第 ${totalBattles} 次 - 失败`, type: "warning" });
          }

          // 等待间隔
          await delay(settings.commandDelay || 500);

          // 每5次刷新体力
          if (totalBattles % 5 === 0) {
            const refreshed = await sendGameMessage(tokenId, "role_getroleinfo", {}, { retries: 1 });
            energy = refreshed?.role?.tower?.energy || 0;
          } else {
            energy = Math.max(0, energy - 1);
          }

          // 连续失败3次停止
          if (consecutiveFailures >= 3) {
            addLog({ message: `${tokenInfo.name} 连续失败3次，停止爬塔`, type: "error" });
            break;
          }

        } catch (error) {
          const msg = error.message || "";

          if (msg.includes("1500010")) {
            addLog({ message: `${tokenInfo.name} 已全部通关`, type: "info" });
            break;
          }
          if (msg.includes("200020")) {
            addLog({ message: `${tokenInfo.name} Bin文件错误`, type: "error" });
            break;
          }
          if (msg.includes("200400")) {
            await delay(3000);
            continue;
          }
          if (msg.includes("1500040")) {
            // 上座塔奖励未领取
            addLog({ message: `检测到上座塔奖励未领取，尝试领取...`, type: "warning" });
            await delay(3000);
            continue;
          }
          if (msg.includes("400340")) {
            serverErrorCount++;
            if (serverErrorCount >= 3) {
              addLog({ message: `服务器错误超过3次，停止爬塔`, type: "error" });
              break;
            }
            addLog({ message: `服务器错误，等待60秒... (${serverErrorCount}/3)`, type: "warning" });
            await delay(60000);
            continue;
          }
          if (msg.includes("1500020")) {
            addLog({ message: `能量不足`, type: "info" });
            break;
          }

          losses++;
          consecutiveFailures++;
          if (consecutiveFailures >= 3) {
            addLog({ message: `连续失败3次，停止爬塔`, type: "error" });
            break;
          }
          await delay(2000);
        }
      }

      addLog({
        message: `${tokenInfo.name} 爬塔完成：${totalBattles}次 (胜:${wins}/败:${losses})`,
        type: "info",
      });
      taskStatus.value[tokenId] = "completed";

    } catch (error) {
      console.error(error);
      addLog({ message: `${tokenInfo.name} 爬塔失败: ${error.message}`, type: "error" });
      taskStatus.value[tokenId] = "failed";
    } finally {
      // 恢复原始阵容
      if (teamSwitched && originalTeamId != null) {
        await restoreTeam(tokenId, tokenInfo.name, originalTeamId);
      }
      closeWebSocketConnection(tokenId);
    }
  });

  await Promise.all(tasks);
  isRunning.value = false;
}
```

---

## 5. 怪塔挑战 (Weird Tower)

### 原始代码

```javascript
climbWeirdTower: async () => {
  e.value.forEach((p) => { a.value[p] = "waiting"; });
  const O = e.value.map(async (p) => {
    a.value[p] = "running";
    const w = o.value.find((I) => I.id === p);
    let _ = null, b = !1, $ = 0;
    const N = 3;
    const x = async () => {
      await d(p);
      const T = await G(p, "presetteam_getinfo", {});
      _ = T?.presetTeamInfo?.useTeamId;
      if (_ !== n.towerFormation) {
        await G(p, "presetteam_saveteam", { teamId: n.towerFormation });
        b = !0;
      }
      const E = await G(p, "evotower_getinfo", {});
      let I = E?.evoTower?.energy || 0;
      try {
        await G(p, "evotower_claimreward", {}, { retries: 1 });
      } catch (re) {}
      let U = 0, ie = 0, F = 0;
      const ve = n.maxClimbCount || te.maxClimbCount;
      for (; I > 0 && U < ve && !i.value; ) {
        try { await G(p, "evotower_claimreward", {}, { retries: 1 }); } catch {}
        try {
          await G(p, "evotower_readyfight", {}, { timeout: 1e4, retries: 1 });
        } catch (xe) {
          if (xe.message?.includes("1500010")) { break; }
          if (xe.message?.includes("200020")) { break; }
        }
        try {
          const xe = await G(p, "fight_startevotower", {}, { retries: 2 });
          // ... 胜负判断
        } catch {}
      }
    };
    // 重试N次
    for (let y = 0; y < N; y++) { try { await x(); break; } catch {} }
  });
}
```

### 翻译后代码

```javascript
/**
 * 批量爬怪异塔
 * 与爬塔类似，但使用 evotower 协议
 */
async function batchClimbWeirdTower() {
  if (selectedTokens.value.length === 0) return;

  const tasks = selectedTokens.value.map(async (tokenId) => {
    taskStatus.value[tokenId] = "running";
    const tokenInfo = tokens.value.find((t) => t.id === tokenId);
    const settings = getTokenSettings(tokenId);

    let originalTeamId = null;
    let teamSwitched = false;
    const maxRetries = 3;

    async function doClimb() {
      await ensureConnection(tokenId);

      // 切换阵容
      const presetInfo = await sendGameMessage(tokenId, "presetteam_getinfo", {});
      originalTeamId = presetInfo?.presetTeamInfo?.useTeamId;
      if (originalTeamId !== settings.towerFormation) {
        await sendGameMessage(tokenId, "presetteam_saveteam", { teamId: settings.towerFormation });
        teamSwitched = true;
      }

      // 获取能量
      const towerInfo = await sendGameMessage(tokenId, "evotower_getinfo", {});
      let energy = towerInfo?.evoTower?.energy || 0;
      addLog({ message: `${tokenInfo.name} 初始能量: ${energy}`, type: "info" });

      // 领取宝箱
      try {
        await sendGameMessage(tokenId, "evotower_claimreward", {}, { retries: 1 });
      } catch {}

      // 爬塔循环
      let totalBattles = 0;
      const maxClimbs = settings.maxClimbCount || 999;

      while (energy > 0 && totalBattles < maxClimbs && !shouldStop.value) {
        try {
          await sendGameMessage(tokenId, "evotower_claimreward", {}, { retries: 1 });
        } catch {}

        try {
          await sendGameMessage(tokenId, "evotower_readyfight", {}, { timeout: 10000, retries: 1 });
        } catch (error) {
          const msg = error.message || "";
          if (msg.includes("1500010")) {
            addLog({ message: `${tokenInfo.name} 怪异塔已全部通关`, type: "info" });
            break;
          }
          if (msg.includes("200020")) break;
        }

        try {
          const result = await sendGameMessage(tokenId, "fight_startevotower", {}, { retries: 2 });
          totalBattles++;
          // ... 胜负判断
          await delay(settings.commandDelay || 500);
        } catch (error) {
          // ... 错误处理
        }
      }
    }

    // 重试机制
    for (let retry = 0; retry < maxRetries; retry++) {
      try {
        await doClimb();
        taskStatus.value[tokenId] = "completed";
        break;
      } catch (error) {
        if (retry === maxRetries - 1) {
          taskStatus.value[tokenId] = "failed";
        }
      }
    }

    // 恢复阵容
    if (teamSwitched && originalTeamId != null) {
      await restoreTeam(tokenId, tokenInfo.name, originalTeamId);
    }
  });

  await Promise.all(tasks);
}
```

---

## 6. 资源收集 (Resource Collection)

### 原始代码 - 挂机奖励领取

```javascript
// 领取挂机奖励
await r.sendGameMessage(o.token.id, "system_mysharecallback", {}, { usePromise: !0, timeout: 5e3 });
await new Promise((se) => setTimeout(se, 200));
await r.sendGameMessage(o.token.id, "system_claimhangupreward", {}, { usePromise: !0, timeout: 1e4 });

// 加钟（延长挂机时间）
for (let de = 1; de <= 4; de++) {
  await r.sendGameMessage(
    o.token.id,
    "system_mysharecallback",
    { isSkipShareCard: !0, type: 2 },
    { usePromise: !0, timeout: 4e4 },
  );
}
```

### 翻译后代码 - 挂机奖励领取

```javascript
/**
 * 领取挂机奖励
 * 流程: 分享回调 -> 领取奖励 -> 如果需要则加钟
 */
async function claimHangUpRewards(tokenId) {
  const tokenInfo = getTokenById(tokenId);

  try {
    // 1. 分享回调（前置条件）
    await sendGameMessage(tokenId, "system_mysharecallback", {}, { usePromise: true, timeout: 5000 });
    await delay(200);

    // 2. 领取挂机奖励
    await sendGameMessage(tokenId, "system_claimhangupreward", {}, { usePromise: true, timeout: 10000 });
    await delay(200);

    addLog({ message: `${tokenInfo.name} 挂机奖励领取成功`, type: "success" });

    // 3. 检查是否需要加钟
    const hangUpStatus = getHangUpStatus(tokenId);
    const maxHangUpTime = 36000; // 10小时 = 36000秒
    const minRemainingTime = 3600; // 1小时

    if (hangUpStatus.hangUpTime < maxHangUpTime || hangUpStatus.remainingTime < minRemainingTime) {
      addLog({ message: `${tokenInfo.name} 开始加钟...`, type: "info" });

      for (let i = 1; i <= 4; i++) {
        addLog({ message: `正在进行第 ${i} 次加钟...`, type: "info" });
        await sendGameMessage(
          tokenId,
          "system_mysharecallback",
          { isSkipShareCard: true, type: 2 }, // type: 2 表示加钟
          { usePromise: true, timeout: 40000 }
        );
        addLog({ message: `第 ${i} 次加钟成功`, type: "success" });
        if (i < 4) await delay(1000);
      }

      addLog({ message: "4次加钟全部完成", type: "success" });
      await delay(1500);

      // 刷新角色信息
      sendGetRoleInfo(tokenId);
      await delay(1000);
    } else {
      addLog({ message: `挂机时间充足，无需加钟`, type: "info" });
    }
  } catch (error) {
    console.error("领取挂机奖励失败:", error);
    addLog({ message: `领取挂机奖励失败: ${error.message}`, type: "error" });
  }
}
```

---

## 7. 功法升级 (Legacy / Skill Upgrade)

### 原始代码

```javascript
Be = async () => {
  if (!P.value && !X.value) { i.warning("请先连接Token"); return; }
  try {
    F({ time: new Date().toLocaleTimeString(), message: "开始领取功法残卷...", type: "info" });
    const D = await r.sendMessageWithPromise(o.token.id, "legacy_claimhangup", {}, 1e4);
    if (D.reward && D.reward.length > 0) {
      const S = D.reward[0].value;
      w.value.quantity += S;
      w.value.lastClaimTime = new Date().toLocaleTimeString();
      w.value.isAvailable = !1;
      F({ message: `成功领取功法残卷${S}，当前共有${w.value.quantity}个`, type: "success" });
    }
    r.refreshGameData(o.token.id);
  } catch (D) {
    const S = D.message || "";
    S.includes("12400160") || S.includes("200020")
      ? F({ message: "未达到关卡无法领取", type: "info" })
      : S.includes("12400000") || S.includes("800040")
        ? F({ message: "残卷为0无法领取", type: "info" })
        : F({ message: `领取功法残卷失败: ${S}`, type: "error" });
  }
}
```

### 翻译后代码

```javascript
/**
 * 领取功法残卷
 * 错误码说明:
 * - 12400160: 未达到关卡要求
 * - 200020: 未达到关卡要求
 * - 12400000: 挂机奖励领取过于频繁
 * - 800040: 残卷为0
 */
async function claimLegacyScrolls(tokenId) {
  const tokenInfo = getTokenById(tokenId);

  try {
    addLog({ message: "开始领取功法残卷...", type: "info" });

    const result = await sendMessageWithPromise(tokenId, "legacy_claimhangup", {}, 10000);

    if (result.reward && result.reward.length > 0) {
      const amount = result.reward[0].value;
      legacyStatus.value.quantity += amount;
      legacyStatus.value.lastClaimTime = new Date().toLocaleTimeString();
      legacyStatus.value.isAvailable = false;

      addLog({
        message: `成功领取功法残卷 ${amount} 个，当前共有 ${legacyStatus.value.quantity} 个`,
        type: "success",
      });
    }

    // 刷新游戏数据
    refreshGameData(tokenId);
    setTimeout(() => refreshStatus(), 3000);

  } catch (error) {
    const msg = error.message || "";

    if (msg.includes("12400160") || msg.includes("200020")) {
      addLog({ message: "未达到关卡要求，无法领取", type: "info" });
    } else if (msg.includes("12400000") || msg.includes("挂机奖励领取过于频繁") || msg.includes("800040")) {
      addLog({ message: "残卷为0或领取过于频繁，无法领取", type: "info" });
    } else {
      addLog({ message: `领取功法残卷失败: ${msg}`, type: "error" });
    }
  }
}
```

---

## 8. 月度任务 (Monthly Tasks)

### 原始代码 - 钓鱼补齐

```javascript
batchTopUpFish: async () => {
  e.value.forEach((w) => { a.value[w] = "waiting"; });
  const p = e.value.map(async (w) => {
    a.value[w] = "running";
    const n = o.value.find((B) => B.id === w);
    try {
      await d(w);
      const B = await c.sendMessageWithPromise(w, "activity_get", {}, 1e4);
      const m = B?.activity || B?.body?.activity || B;
      const u = m.myMonthInfo || {};
      const l = Number(u?.["2"]?.num || 0); // 当前钓鱼次数
      const g = getDaysRemaining();
      const C = new Date();
      const v = new Date(C.getFullYear(), C.getMonth() + 1, 0).getDate(); // 当月总天数
      const T = C.getDate(); // 当前日期
      const U = Math.max(0, v - T) === 0 ? FISH_TARGET : Math.min(FISH_TARGET, Math.ceil(g * FISH_TARGET));
      const ie = Math.max(0, U - l); // 还需补齐次数

      if (ie <= 0) { a.value[w] = "completed"; return; }

      // 先使用免费次数
      const re = Number(F?.statisticsTime?.["artifact:normal:lottery:time"] || 0);
      if (hasFreeFishing(re)) {
        for (let be = 0; be < 3 && ie > ve; be++) {
          await c.sendMessageWithPromise(w, "artifact_lottery", { lotteryNumber: 1, newFree: !0, type: 1 }, 8e3);
          ve++;
        }
      }

      // 付费补齐
      const Le = F?.items?.[1011]?.quantity || 0; // 普通鱼竿数量
      for (; he > 0 && !i.value; ) {
        const ye = Math.min(he, 10);
        await c.sendMessageWithPromise(w, "artifact_lottery", { lotteryNumber: ye, type: 1 }, 8e3);
        he -= ye;
      }
      a.value[w] = "completed";
    } catch {}
  });
}
```

### 翻译后代码 - 钓鱼补齐

```javascript
const FISH_TARGET = 320; // 月度钓鱼目标次数

/**
 * 批量钓鱼补齐（月度任务）
 * 策略: 先使用免费次数 -> 再用普通鱼竿付费补齐
 */
async function batchTopUpFish() {
  if (selectedTokens.value.length === 0) return;

  const tasks = selectedTokens.value.map(async (tokenId) => {
    taskStatus.value[tokenId] = "running";
    const tokenInfo = tokens.value.find((t) => t.id === tokenId);

    try {
      await ensureConnection(tokenId);

      // 获取月度任务进度
      const activityData = await sendMessageWithPromise(tokenId, "activity_get", {}, 10000);
      const activity = activityData?.activity || activityData?.body?.activity || activityData;
      const monthInfo = activity?.myMonthInfo || {};
      const currentFishCount = Number(monthInfo?.["2"]?.num || 0);

      // 计算目标次数
      const now = new Date();
      const totalDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      const currentDay = now.getDate();
      const daysRemaining = Math.max(0, totalDays - currentDay);

      // 如果最后一天，目标就是320；否则按天数比例计算
      const targetCount = daysRemaining === 0
        ? FISH_TARGET
        : Math.min(FISH_TARGET, Math.ceil((currentDay / totalDays) * FISH_TARGET));

      const needToFish = Math.max(0, targetCount - currentFishCount);

      addLog({
        message: `${tokenInfo.name} 钓鱼进度: ${currentFishCount}/${FISH_TARGET}，需要补齐: ${needToFish}次`,
        type: "info",
      });

      if (needToFish <= 0) {
        addLog({ message: "当前进度已达标，无需补齐", type: "success" });
        taskStatus.value[tokenId] = "completed";
        return;
      }

      // 1. 先使用免费钓鱼次数
      const roleInfo = await sendGetRoleInfo(tokenId);
      const freeFishingTime = Number(roleInfo?.role?.statisticsTime?.["artifact:normal:lottery:time"] || 0);
      let fishCount = 0;

      if (isToday(freeFishingTime)) {
        addLog({ message: `${tokenInfo.name} 检测到今日免费钓鱼次数，开始消耗 3 次`, type: "info" });
        for (let i = 0; i < 3 && needToFish > fishCount && !shouldStop.value; i++) {
          try {
            await sendMessageWithPromise(tokenId, "artifact_lottery", {
              lotteryNumber: 1,
              newFree: true,
              type: 1,
            }, 8000);
            fishCount++;
            await delay(actionDelay);
          } catch (error) {
            addLog({ message: `免费钓鱼失败: ${error.message}`, type: "error" });
            break;
          }
        }
      }

      // 2. 使用普通鱼竿付费补齐
      const updatedRoleInfo = await sendGetRoleInfo(tokenId);
      const rodCount = updatedRoleInfo?.role?.items?.[1011]?.quantity || 0;
      let remaining = Math.max(0, needToFish - fishCount);

      addLog({ message: `${tokenInfo.name} 当前普通鱼竿: ${rodCount}`, type: "info" });

      if (rodCount < remaining) {
        addLog({ message: `鱼竿不足 (${rodCount} < ${remaining})，将仅使用现有鱼竿`, type: "warning" });
        remaining = rodCount;
      }

      while (remaining > 0 && !shouldStop.value) {
        const batchSize = Math.min(remaining, 10); // 每次最多10次
        await sendMessageWithPromise(tokenId, "artifact_lottery", {
          lotteryNumber: batchSize,
          type: 1,
        }, 8000);
        remaining -= batchSize;
        await delay(actionDelay);
      }

      addLog({ message: `${tokenInfo.name} 钓鱼补齐完成`, type: "success" });
      taskStatus.value[tokenId] = "completed";

    } catch (error) {
      console.error(error);
      taskStatus.value[tokenId] = "failed";
    }
  });

  await Promise.all(tasks);
}
```

---

## 9. 福利领取 (Welfare)

### 原始代码

```javascript
// 福利相关任务在 taskGroupDefinitions 中定义:
{
  name: "welfare",
  label: "福利",
  tasks: [
    "charge_claimaddup_rewards",      // 积分好礼领取
    "collection_claimfreereward",     // 免费领取珍宝阁
    "gacha_drawreward",               // 免费扭蛋
    "claim_recruit_welfare",          // 免费礼包领取
    "pkroom_appoint",                 // 预约直播
  ],
}
```

### 翻译后代码

```javascript
/**
 * 福利任务组
 * 包含各类免费福利领取功能
 */
const welfareTasks = [
  {
    name: "charge_claimaddup_rewards",
    label: "积分好礼领取",
    async execute(tokenId) {
      await sendGameMessage(tokenId, "charge_claimaddup_rewards", {});
    },
  },
  {
    name: "collection_claimfreereward",
    label: "免费领取珍宝阁",
    async execute(tokenId) {
      await sendGameMessage(tokenId, "collection_claimfreereward", {});
    },
  },
  {
    name: "gacha_drawreward",
    label: "免费扭蛋",
    async execute(tokenId) {
      await sendGameMessage(tokenId, "gacha_drawreward", {});
    },
  },
  {
    name: "claim_recruit_welfare",
    label: "免费礼包领取",
    async execute(tokenId) {
      await sendGameMessage(tokenId, "claim_recruit_welfare", {});
    },
  },
  {
    name: "pkroom_appoint",
    label: "预约直播",
    async execute(tokenId) {
      await sendGameMessage(tokenId, "pkroom_appoint", {});
    },
  },
];

/**
 * 批量领取福利
 */
async function batchClaimWelfare() {
  for (const task of welfareTasks) {
    addLog({ message: `执行福利任务: ${task.label}`, type: "info" });
    for (const tokenId of selectedTokens.value) {
      try {
        await task.execute(tokenId);
        addLog({ message: `${getTokenName(tokenId)} ${task.label} 成功`, type: "success" });
      } catch (error) {
        addLog({ message: `${getTokenName(tokenId)} ${task.label} 失败`, type: "error" });
      }
    }
  }
}
```

---

## 10. 图鉴升星 (Illustration Upgrade)

### 原始代码

```javascript
batchBookUpgrade: async () => {
  if (e.value.length === 0) return;
  e.value.forEach((b) => { a.value[b] = "waiting"; });
  const _ = e.value.map(async (b) => {
    a.value[b] = "running";
    const $ = o.value.find((N) => N.id === b);
    try {
      await d(b);
      for (const N of G) { // G 为英雄ID列表
        if (i.value) break;
        for (let x = 1; x <= 10 && !i.value; x++) {
          try {
            const y = await c.sendMessageWithPromise(b, "book_upgrade", { heroId: N }, 5e3);
            if (y && (y.code === 0 || y.success === !0 || y.result === 0))
              t({ message: `${$.name} 英雄ID:${N} 图鉴升星成功 (第${x}次)`, type: "success" });
            else throw new Error("图鉴升星失败");
          } catch { break; }
          await new Promise((y) => setTimeout(y, X.action));
        }
      }
      a.value[b] = "completed";
    } catch (N) {
      a.value[b] = "failed";
    } finally {
      c.closeWebSocketConnection(b);
    }
  });
  await Promise.all(_);
}
```

### 翻译后代码

```javascript
// 英雄ID列表（用于图鉴升星）
const HERO_ID_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

/**
 * 批量图鉴升星
 * 对每个英雄尝试最多10次升星，直到材料不足
 */
async function batchBookUpgrade() {
  if (selectedTokens.value.length === 0) return;

  const tasks = selectedTokens.value.map(async (tokenId) => {
    taskStatus.value[tokenId] = "running";
    const tokenInfo = tokens.value.find((t) => t.id === tokenId);

    try {
      await ensureConnection(tokenId);

      for (const heroId of HERO_ID_LIST) {
        if (shouldStop.value) break;

        for (let attempt = 1; attempt <= 10 && !shouldStop.value; attempt++) {
          try {
            const result = await sendMessageWithPromise(tokenId, "book_upgrade", { heroId }, 5000);

            const isSuccess = result && (result.code === 0 || result.success === true || result.result === 0);
            if (isSuccess) {
              addLog({
                message: `${tokenInfo.name} 英雄ID:${heroId} 图鉴升星成功 (第${attempt}次)`,
                type: "success",
              });
            } else {
              throw new Error("图鉴升星失败");
            }
          } catch (error) {
            // 材料不足或达到上限，跳出内层循环换下一个英雄
            break;
          }

          await delay(actionDelay);
        }
      }

      addLog({ message: `${tokenInfo.name} 图鉴升星完成`, type: "success" });
      taskStatus.value[tokenId] = "completed";

    } catch (error) {
      console.error(error);
      addLog({ message: `图鉴升星失败: ${error.message}`, type: "error" });
      taskStatus.value[tokenId] = "failed";
    } finally {
      closeWebSocketConnection(tokenId);
    }
  });

  await Promise.all(tasks);
}
```

---

## 11. 十殿星级 (Star Challenge)

### 原始代码

```javascript
// 十殿星级挑战 - 已在 04_TaskTemplates.md 中详细翻译
// 核心流程:
// 1. 获取 nmextInfo 和角色信息
// 2. 遍历关卡 1-8
// 3. 检查次数和星级
// 4. 获取预设阵容
// 5. 计算战力并挑战
// 6. 记录获得星数
```

### 翻译后代码

```javascript
/**
 * 十殿星级挑战
 * 挑战关卡 1-8，每个关卡最多5次，目标获得3星
 */
async function batchStarChallenge() {
  if (!isConnected.value) {
    message.warning("请先连接账号");
    return;
  }
  if (isChallenging.value) {
    message.warning("星级挑战进行中，请稍候...");
    return;
  }

  try {
    isChallenging.value = true;
    const tokenId = currentToken.id;
    const tokenStore = useTokenStore();

    addLog({ message: "开始十殿星级挑战，一键挑战", type: "info" });

    // 获取角色信息和扩展数据
    const roleInfo = tokenStore.gameData.roleInfo;
    const roleId = roleInfo?.role?.roleId;

    const requests = [tokenStore.sendMessageWithPromise(tokenId, "nmext_getinfo", {}, 5000).catch(() => {})];
    if (roleId) {
      requests.push(
        tokenStore.sendMessageWithPromise(tokenId, "nightmare_getroleinfo", { roleId }, 5000).catch(() => {}),
        tokenStore.sendMessageWithPromise(tokenId, "matchteam_getroleteaminfo", { roleID: roleId }, 5000).catch(() => {})
      );
    }
    await Promise.all(requests);
    await delay(500);

    // 获取挑战数据
    const nmextInfo = tokenStore.gameData.nmextInfo || {};
    const starBossCompleteMap = nmextInfo.starBossCompleteMap || {};
    const starFightCntMap = nmextInfo.starFightCntMap || {};

    // 计算每个关卡当前星数
    const currentStars = {};
    for (const [levelId, stars] of Object.entries(starBossCompleteMap)) {
      currentStars[levelId] = Object.values(stars).filter(Boolean).length;
    }

    // 遍历关卡 1-8
    for (let levelId = 1; levelId <= 8; levelId++) {
      if (!isConnected.value) {
        addLog({ message: "连接已断开，挑战终止", type: "error" });
        break;
      }

      // 检查次数限制
      const fightCount = starFightCntMap[String(levelId)] || starFightCntMap[levelId] || 0;
      if (fightCount >= 5) {
        addLog({ message: `关卡 ${levelId} 次数已满，跳过`, type: "info" });
        continue;
      }

      // 检查是否已达3星
      if ((currentStars[levelId] || 0) >= 3) {
        addLog({ message: `关卡 ${levelId} 已达3星，跳过`, type: "info" });
        continue;
      }

      addLog({ message: `== 关卡 ${levelId} 挑战开始（预设阵容）==`, type: "info" });

      // 使用预设阵容挑战
      const result = await challengeWithPresetTeam(tokenId, levelId);
      if (!result.success) break;

      currentStars[levelId] = result.stars;

      if (levelId === 8) {
        addLog({ message: "星级挑战，一键挑战完成", type: "success" });
      }

      await delay(500);
    }

    // 刷新星级数据
    await refreshStarChallengeData();

  } catch (error) {
    console.error("星级挑战失败:", error);
    addLog({ message: `星级挑战异常: ${error.message}`, type: "error" });
  } finally {
    isChallenging.value = false;
  }
}
```

---

## 关键参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| `tokenId` | string | 角色Token唯一标识 |
| `commandDelay` | number | 命令发送间隔（毫秒） |
| `taskDelay` | number | 任务执行间隔（毫秒） |
| `maxClimbCount` | number | 最大爬塔次数 |
| `towerFormation` | number | 爬塔专用阵容ID |
| `arenaFormation` | number | 竞技场专用阵容ID |
| `bossFormation` | number | BOSS挑战专用阵容ID |
| `bossTimes` | number | BOSS挑战次数 |
| `FISH_TARGET` | number | 月度钓鱼目标次数（320） |
| `maxActive` | number | 每批同时执行的最大账号数 |

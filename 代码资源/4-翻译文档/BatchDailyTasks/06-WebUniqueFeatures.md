# 网页版独有功能补充翻译

## 概述

本文档补充翻译网页版（BatchDailyTasks-XgqKel1u.js）独有的 39 个功能字符串，这些功能在 APK529 版本中不存在或未被使用。

---

## 1. 防休眠状态管理

### 1.1 保存防休眠状态

**原始代码位置**: L16926

```javascript
console.error("保存防休眠状态失败:", e);
```

**翻译后代码**:
```javascript
console.error("[WakeLock] 保存防休眠状态失败:", error);
```

**功能说明**:
- 在批量任务执行前，尝试保存当前的防休眠状态
- 如果保存失败，记录错误日志但不中断任务执行
- 用于任务完成后恢复原始防休眠状态

### 1.2 加载防休眠状态

**原始代码位置**: L16919

```javascript
return (console.error("加载防休眠状态失败:", s), !1);
```

**翻译后代码**:
```javascript
console.error("[WakeLock] 加载防休眠状态失败:", error);
return false;
```

**功能说明**:
- 任务完成后，尝试恢复之前保存的防休眠状态
- 如果加载失败，返回 false，表示无法自动恢复

### 1.3 防休眠自动激活

**原始代码位置**: L16938-L16941

```javascript
message.error("防休眠开启失败,请检查环境支持"),
addLog({
  time: new Date().toLocaleTimeString(),
  message: "防休眠开启失败",
  type: "error"
})
```

**翻译后代码**:
```javascript
// 防休眠自动激活失败时的处理
message.error("防休眠开启失败,请检查环境支持");
addLog({
  time: new Date().toLocaleTimeString(),
  message: "防休眠开启失败",
  type: "error"
});
```

**功能说明**:
- 批量任务开始时自动激活防休眠
- 如果激活失败，显示错误消息并记录日志

### 1.4 防休眠自动恢复

| 字符串 | 代码位置 | 功能 |
|--------|---------|------|
| `防休眠已自动恢复` | L16930 | 任务完成后自动恢复防休眠状态 |
| `防休眠自动激活失败` | L16938 | 自动激活防休眠失败 |
| `防休眠自动激活异常` | L16935 | 防休眠激活过程中出现异常 |
| `防休眠自动激活成功` | L16932 | 防休眠成功自动激活 |
| `检测到防休眠之前已开启` | L16915 | 检测到防休眠已经在运行中 |

---

## 2. 竞技场补齐功能

### 2.1 批量竞技场补齐

**原始代码位置**: L9854

```javascript
message: `=== 开始批量竞技场补齐，共 ${e.value.length} 个账号（串行执行） ===`,
```

**翻译后代码**:
```javascript
// 开始批量竞技场补齐任务
message: `=== 开始批量竞技场补齐，共 ${accounts.length} 个账号（串行执行） ===`,
```

**功能说明**:
- 对多个账号依次执行竞技场补齐操作
- **串行执行**：一个账号完成后才执行下一个，避免并发冲突
- 与批量日常任务的并行执行不同

### 2.2 竞技场状态异常

**原始代码位置**: L9854附近

```javascript
// 竞技场状态异常时的处理逻辑
```

**功能说明**:
- 检测竞技场状态是否异常
- 异常时进行状态刷新后重试

---

## 3. 怪异塔（换皮闯关）功能

### 3.1 换皮闯关状态管理

| 字符串 | 代码位置 | 功能 |
|--------|---------|------|
| `准备开启换皮闯关` | L5157 | BOSS战前准备开启换皮闯关模式 |
| `换皮闯关已开启` | L4454, L5181 | 换皮闯关已成功开启 |
| `换皮闯关未开启或不在开放时间` | L5172 | 换皮闯关未开启或不在开放时间段 |
| `换皮闯关未开启或状态异常` | L5175 | 换皮闯关状态异常 |

### 3.2 换皮闯关战斗流程

**原始代码位置**: L5157-L5188

```javascript
// 准备开启换皮闯关
message: `${account.name} BOSS ${bossId} 准备开启换皮闯关...`,

// 开启成功
message: `${account.name} BOSS ${bossId} 开启成功`,

// 开启失败
message: `${account.name} BOSS ${bossId} 开启失败: ${errorMsg.substring(0, 80)}`,

// 已开启，继续战斗
message: `${account.name} BOSS ${bossId} 换皮闯关已开启，继续战斗 (200330)`,

// 未开启或不在开放时间
message: `${account.name} BOSS ${bossId} 换皮闯关未开启或不在开放时间 (200020)`,
```

**翻译后代码**:
```javascript
// 换皮闯关战斗流程
async function startSkinChallenge(account, bossId) {
  try {
    // 1. 准备开启
    log.info(`${account.name} BOSS ${bossId} 准备开启换皮闯关...`);
    
    // 2. 尝试开启
    const result = await gameApi.startTowerChallenge(account.token, bossId);
    
    if (result.success) {
      log.success(`${account.name} BOSS ${bossId} 开启成功`);
    } else if (result.code === 200330) {
      // 已开启，直接战斗
      log.info(`${account.name} BOSS ${bossId} 换皮闯关已开启，继续战斗`);
    } else if (result.code === 200020) {
      // 未开启或不在开放时间
      log.warn(`${account.name} BOSS ${bossId} 换皮闯关未开启或不在开放时间`);
      return;
    }
    
    // 3. 执行战斗
    await executeBattle(account, bossId);
    
  } catch (error) {
    log.error(`${account.name} BOSS ${bossId} 开启失败: ${error.message}`);
  }
}
```

### 3.3 怪异塔错误处理

| 字符串 | 代码位置 | 错误码 | 处理方式 |
|--------|---------|--------|---------|
| `怪异塔状态异常` | L4810 | 200020 | 刷新后继续 |
| `准备战斗失败` | L4822, L4834 | 7800008 | 刷新状态后重试 |
| `刷新状态失败` | L4902, L4923 | - | 记录错误，跳过 |
| `战斗错误` | L4911 | 7800008 | 刷新状态后继续 |
| `无效ID错误` | L4892 | 200330 | 刷新状态后继续 |

**原始代码位置**: L4810-L4923

```javascript
// 怪异塔错误处理流程
switch (errorCode) {
  case 200020: // 怪异塔状态异常
    log.warn(`${account.name} 怪异塔状态异常 (200020)，刷新后继续`);
    await refreshTowerStatus(account);
    break;
    
  case 7800008: // 准备战斗失败
    log.warn(`${account.name} 准备战斗失败 (7800008)，刷新状态后重试`);
    await refreshAccountStatus(account);
    retryCount++;
    break;
    
  case 200330: // 无效ID
    log.warn(`${account.name} 无效ID错误 (200330)，刷新状态后继续`);
    await refreshAccountStatus(account);
    break;
    
  default:
    log.error(`${account.name} 战斗错误: ${error.message}`);
}
```

### 3.4 怪异塔每日宝箱

**原始代码位置**: L4860

```javascript
message: `${account.name} 成功领取怪异塔每日宝箱 ${reward} 奖励`,
```

**翻译后代码**:
```javascript
// 领取怪异塔每日宝箱
async function claimWeirdTowerDailyReward(account) {
  try {
    const result = await gameApi.claimDailyReward(account.token);
    if (result.success) {
      log.success(`${account.name} 成功领取怪异塔每日宝箱 ${result.reward} 奖励`);
    }
  } catch (error) {
    log.error(`${account.name} 领取宝箱失败: ${error.message}`);
  }
}
```

---

## 4. 任务执行流程

### 4.1 串行执行模式

**原始代码位置**: L9854

```javascript
message: `=== 开始批量竞技场补齐，共 ${e.value.length} 个账号（串行执行） ===`,
```

**功能说明**:
- **串行执行**：账号依次执行，一个完成后再执行下一个
- 与批量日常任务的**并行执行**不同
- 适用于需要避免并发冲突的操作（如竞技场）

### 4.2 执行间隔控制

| 字符串 | 代码位置 | 功能 |
|--------|---------|------|
| `秒后执行下一个账号` | L9868 | 设置账号间执行间隔 |
| `立即执行下一个账号` | L9870 | 无间隔立即执行 |

**原始代码位置**: L9868-L9870

```javascript
// 设置执行间隔
if (delay > 0) {
  log.info(`${delay}秒后执行下一个账号...`);
  await sleep(delay * 1000);
} else {
  log.info("立即执行下一个账号");
}
```

### 4.3 用户取消处理

**原始代码位置**: L9862

```javascript
message: `用户取消操作，已处理 ${processed}/${total} 个账号`,
```

**翻译后代码**:
```javascript
// 用户取消批量操作
if (isCancelled) {
  log.warn(`用户取消操作，已处理 ${processedCount}/${totalCount} 个账号`);
  return { cancelled: true, processed: processedCount };
}
```

---

## 5. 任务奖励处理

### 5.1 奖励领取状态

| 字符串 | 代码位置 | 功能 |
|--------|---------|------|
| `任务奖励已领取或不存在` | L4465 | 12200040 错误码处理 |
| `领取任务` | L4470 | 领取任务奖励 |
| `奖励` | L452, L1676, L1974 | 奖励相关操作 |
| `已处理` | L9862 | 已处理的账号数 |
| `无需重复` | L4454 | 无需重复执行 |
| `无效` | L4892 | 无效ID错误 |

### 5.2 奖励领取错误处理

**原始代码位置**: L4465

```javascript
throw new Error("任务奖励已领取或不存在 (12200040)");
```

**翻译后代码**:
```javascript
// 任务奖励领取错误处理
try {
  const result = await gameApi.claimTaskReward(token, taskId);
  if (result.code === 12200040) {
    // 奖励已领取或不存在，不算错误
    log.info("任务奖励已领取或不存在，跳过");
    return { success: true, alreadyClaimed: true };
  }
} catch (error) {
  log.error(`领取任务奖励失败: ${error.message}`);
}
```

---

## 6. 进度管理

### 6.1 进度达标检测

**原始代码位置**: L9854附近

```javascript
// 进度已达标
log.info("进度已达标，跳过当前任务");
```

**功能说明**:
- 检测任务进度是否已达到目标
- 已达标则跳过，避免重复执行

### 6.2 页面刷新处理

| 字符串 | 代码位置 | 功能 |
|--------|---------|------|
| `页面刷新后` | L16925 | 页面刷新后恢复状态 |
| `刷新后继续` | L4810 | 刷新状态后继续执行 |
| `刷新状态后继续` | L4892, L4911 | 刷新账号状态后继续 |
| `刷新状态后重试` | L4822 | 刷新状态后重试操作 |
| `刷新状态失败` | L4902, L4923 | 状态刷新失败处理 |

---

## 7. 状态异常处理

### 7.1 通用状态异常

| 字符串 | 代码位置 | 功能 |
|--------|---------|------|
| `状态异常` | L5175 | 通用状态异常 |
| `竞技场状态异常` | L9854附近 | 竞技场状态异常 |
| `开启失败` | L5188 | 功能开启失败 |
| `开启成功` | L5164 | 功能开启成功 |

### 7.2 自动恢复机制

```javascript
// 自动重新激活防休眠
if (!wakeLockManager.isActive) {
  log.warn("防休眠已释放，自动重新激活...");
  const result = await wakeLockManager.request();
  if (result) {
    log.success("防休眠已自动恢复");
  } else {
    log.error("防休眠自动激活失败");
  }
}
```

---

## 8. 功能汇总

### 8.1 网页版独有功能分类

| 分类 | 功能数 | 说明 |
|------|--------|------|
| 防休眠状态管理 | 8 | 保存/加载/自动恢复防休眠状态 |
| 竞技场补齐 | 3 | 串行执行竞技场补齐 |
| 怪异塔/换皮闯关 | 10 | BOSS战、每日宝箱、错误处理 |
| 任务执行流程 | 4 | 串行/并行、间隔控制、取消处理 |
| 奖励处理 | 6 | 奖励领取、错误码处理 |
| 进度管理 | 5 | 达标检测、刷新处理 |
| 状态异常 | 3 | 通用异常处理 |

### 8.2 与APK529的差异说明

网页版比APK529多的功能主要集中在：
1. **防休眠状态持久化** - 保存和恢复防休眠状态
2. **竞技场串行补齐** - 专门的竞技场补齐流程
3. **怪异塔错误处理** - 更完善的错误码处理
4. **自动恢复机制** - 防休眠自动恢复功能

这些功能在网页版中是为了适应浏览器环境（页面刷新、后台运行等）而增加的。

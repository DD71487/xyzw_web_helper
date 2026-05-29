# 定时任务系统 (Scheduled Tasks)

## 功能说明

定时任务系统允许用户配置自动化批量任务的执行计划。支持两种运行模式：
- **每日固定时间**: 每天指定时间自动执行
- **Cron表达式**: 使用标准5字段Cron表达式定义复杂调度规则

系统还包含"不上线时段"功能，在特定时间段（如周五5:00-7:00、周六19:50-21:10、周日19:50-20:40）自动跳过任务执行。

---

## 原始代码 - Cron解析与计算

```javascript
parseCronField = (s, e, o) => {
  if (s === "*" || s === "?") return Array.from({ length: o - e + 1 }, (a, r) => r + e);
  const a = [];
  return (
    s.split(",").forEach((r) => {
      if (r.includes("/")) {
        const [i, d] = r.split("/"),
          k = i === "*" ? e : parseInt(i);
        for (let L = k; L <= o; L += parseInt(d)) a.push(L);
      } else if (r.includes("-")) {
        const [i, d] = r.split("-").map(Number);
        for (let k = i; k <= d; k++) a.push(k);
      } else r !== "?" && a.push(parseInt(r));
    }),
    a
  );
};

calculateNextExecutionTime = (s) => {
  const e = new Date();
  if (s.runType === "daily") {
    const [o, a] = s.runTime.split(":").map(Number),
      r = new Date(e);
    return (r.setHours(o, a, 0, 0), r <= e && r.setDate(r.getDate() + 1), r);
  } else if (s.runType === "cron") {
    const o = s.cronExpression.split(" ").filter(Boolean);
    if (o.length < 5) return null;
    const [a, r, i, d, k] = o,
      L = parseCronField(a, 0, 59),
      f = parseCronField(r, 0, 23),
      c = parseCronField(i, 1, 31),
      t = parseCronField(d, 1, 12),
      M = parseCronField(k, 0, 7);
    let A = new Date(e);
    (A.setSeconds(0, 0), A.setMinutes(A.getMinutes() + 1));
    const P = new Date(e);
    for (P.setFullYear(P.getFullYear() + 1); A <= P; ) {
      const X = A.getMinutes(),
        te = A.getHours(),
        q = A.getDate(),
        G = A.getMonth() + 1,
        Q = A.getDay(),
        R = L.includes(X),
        ae = f.includes(te),
        Z = t.includes(G);
      let j = M.includes(Q),
        K = c.includes(q);
      // ... L/W/# 等特殊表达式处理
      if (R && ae && O && Z) return A;
      A.setMinutes(A.getMinutes() + 1);
    }
    return null;
  }
  return null;
};

matchesCronExpression = (s, e = new Date()) => {
  const o = s.split(" ").filter(Boolean);
  if (o.length < 5) return !1;
  const [a, r, i, d, k] = o,
    L = parseCronField(a, 0, 59),
    f = parseCronField(r, 0, 23),
    c = parseCronField(i, 1, 31),
    t = parseCronField(d, 1, 12),
    M = parseCronField(k, 0, 7),
    A = L.includes(e.getMinutes()),
    P = f.includes(e.getHours()),
    X = t.includes(e.getMonth() + 1);
  // ... 日期/星期匹配逻辑
  return A && P && R && X;
};
```

---

## 翻译后代码 - Cron解析与计算

```javascript
/**
 * 解析Cron字段
 * @param {string} field - Cron字段值，如 "*", "1,3,5", "10-20", "*/5"
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number[]} 所有匹配的值数组
 */
function parseCronField(field, min, max) {
  if (field === "*" || field === "?") {
    return Array.from({ length: max - min + 1 }, (_, i) => i + min);
  }
  const result = [];
  field.split(",").forEach((part) => {
    if (part.includes("/")) {
      // 步长表达式，如 "*/5" 或 "10/5"
      const [startStr, stepStr] = part.split("/");
      const start = startStr === "*" ? min : parseInt(startStr);
      const step = parseInt(stepStr);
      for (let v = start; v <= max; v += step) result.push(v);
    } else if (part.includes("-")) {
      // 范围表达式，如 "10-20"
      const [start, end] = part.split("-").map(Number);
      for (let v = start; v <= end; v++) result.push(v);
    } else if (part !== "?") {
      // 单个值
      result.push(parseInt(part));
    }
  });
  return result;
}

/**
 * 计算下次执行时间
 * @param {Object} task - 定时任务配置
 * @param {'daily' | 'cron'} task.runType - 运行类型
 * @param {string} [task.runTime] - 每日运行时间，如 "08:30"
 * @param {string} [task.cronExpression] - Cron表达式，如 "0 8 * * *"
 * @returns {Date | null} 下次执行时间
 */
function calculateNextExecutionTime(task) {
  const now = new Date();
  if (task.runType === "daily") {
    // 每日固定时间
    const [hour, minute] = task.runTime.split(":").map(Number);
    const next = new Date(now);
    next.setHours(hour, minute, 0, 0);
    if (next <= now) {
      next.setDate(next.getDate() + 1); // 如果已过今天的时间，推到明天
    }
    return next;
  } else if (task.runType === "cron") {
    // Cron表达式
    const parts = task.cronExpression.split(" ").filter(Boolean);
    if (parts.length < 5) return null;
    const [minuteField, hourField, dayField, monthField, weekdayField] = parts;
    const minutes = parseCronField(minuteField, 0, 59);
    const hours = parseCronField(hourField, 0, 23);
    const days = parseCronField(dayField, 1, 31);
    const months = parseCronField(monthField, 1, 12);
    const weekdays = parseCronField(weekdayField, 0, 7);

    let candidate = new Date(now);
    candidate.setSeconds(0, 0);
    candidate.setMinutes(candidate.getMinutes() + 1);

    const maxDate = new Date(now);
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    // 逐分钟遍历查找下一个匹配时间
    while (candidate <= maxDate) {
      const matchMinute = minutes.includes(candidate.getMinutes());
      const matchHour = hours.includes(candidate.getHours());
      const matchMonth = months.includes(candidate.getMonth() + 1);

      let matchWeekday = weekdays.includes(candidate.getDay());
      let matchDay = days.includes(candidate.getDate());

      // 处理特殊表达式 L(最后一天), W(最近工作日), #(第几个星期几)
      if (!matchDay && dayField.includes("L")) {
        const lastDay = new Date(candidate.getFullYear(), candidate.getMonth() + 1, 0).getDate();
        if (dayField === "L" || dayField.split(",").includes("L")) {
          matchDay = candidate.getDate() === lastDay;
        }
      }
      if (!matchDay && dayField.includes("W")) {
        if (dayField.endsWith("W")) {
          matchDay = matchesWeekday(candidate, dayField);
        } else {
          const weekdayParts = dayField.split(",").filter((p) => p.endsWith("W"));
          if (weekdayParts.length > 0) {
            matchDay = weekdayParts.some((p) => matchesWeekday(candidate, p));
          }
        }
      }
      if (!matchDay && dayField === "?") matchDay = true;
      if (!matchWeekday && weekdayField.includes("#")) {
        matchWeekday = matchesNthWeekday(candidate, weekdayField);
      }
      if (!matchWeekday && weekdayField.includes("L") && weekdayField.endsWith("L")) {
        matchWeekday = matchesLastWeekday(candidate, weekdayField);
      }
      if (!matchWeekday && weekdayField === "?") matchWeekday = true;

      // 日期和星期同时约束时，使用 AND 或 OR 逻辑
      const hasWeekdayConstraint = weekdayField !== "*" && weekdayField !== "?";
      const hasDayConstraint = dayField !== "*" && dayField !== "?";
      let matchDate;
      if (hasWeekdayConstraint && hasDayConstraint) {
        matchDate = matchDay || matchWeekday;
      } else {
        matchDate = matchDay && matchWeekday;
      }

      if (matchMinute && matchHour && matchDate && matchMonth) {
        return candidate;
      }
      candidate.setMinutes(candidate.getMinutes() + 1);
    }
    return null;
  }
  return null;
}

/**
 * 检查当前时间是否匹配Cron表达式
 * @param {string} cronExpression - 5字段Cron表达式
 * @param {Date} [date] - 要检查的时间，默认当前时间
 * @returns {boolean}
 */
function matchesCronExpression(cronExpression, date = new Date()) {
  const parts = cronExpression.split(" ").filter(Boolean);
  if (parts.length < 5) return false;
  const [minuteField, hourField, dayField, monthField, weekdayField] = parts;
  const minutes = parseCronField(minuteField, 0, 59);
  const hours = parseCronField(hourField, 0, 23);
  const days = parseCronField(dayField, 1, 31);
  const months = parseCronField(monthField, 1, 12);
  const weekdays = parseCronField(weekdayField, 0, 7);

  const matchMinute = minutes.includes(date.getMinutes());
  const matchHour = hours.includes(date.getHours());
  const matchMonth = months.includes(date.getMonth() + 1);

  let matchDay = days.includes(date.getDate());
  let matchWeekday = weekdays.includes(date.getDay());

  // 特殊表达式处理...
  if (!matchDay && dayField === "?") matchDay = true;
  if (!matchWeekday && weekdayField === "?") matchWeekday = true;

  const hasWeekdayConstraint = weekdayField !== "*" && weekdayField !== "?";
  const hasDayConstraint = dayField !== "*" && dayField !== "?";
  let matchDate;
  if (hasWeekdayConstraint && hasDayConstraint) {
    matchDate = matchDay || matchWeekday;
  } else {
    matchDate = matchDay && matchWeekday;
  }

  return matchMinute && matchHour && matchDate && matchMonth;
}

/**
 * 格式化时间差
 * @param {number} ms - 毫秒数
 * @returns {string} 如 "1天2小时3分4秒"
 */
function formatTimeDifference(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const h = hours % 24;
  const m = minutes % 60;
  const s = totalSeconds % 60;

  let result = "";
  if (days > 0) result += `${days}天`;
  if (h > 0 || days > 0) result += `${h}小时`;
  if (m > 0 || h > 0 || days > 0) result += `${m}分`;
  result += `${s}秒`;
  return result;
}
```

---

## 原始代码 - 任务配置与存储

```javascript
scheduledTasks = ref([]);
taskForm = reactive({
  name: "",
  runType: "daily",        // 'daily' | 'cron'
  runTime: null,           // 每日运行时间，如 "08:30"
  cronExpression: "",      // Cron表达式，如 "0 8 * * *"
  selectedTokens: [],      // 选中的账号ID列表
  selectedTasks: [],       // 选中的任务列表
  enabled: true,           // 是否启用
  offlineTimeEnabled: false, // 是否启用不上线时段检查
  legionStoreItems: {      // 助威商店配置
    7: { selected: false, count: 1 },
    8: { selected: false, count: 1 },
    9: { selected: false, count: 1 },
    10: { selected: false, count: 20 },
    11: { selected: false, count: 20 },
  },
  boxWeeklyRewards: { 5: 1 }, // 宝箱达标奖励配置
});

loadScheduledTasks = () => {
  try {
    const s = localStorage.getItem("scheduledTasks");
    if (s) {
      const e = JSON.parse(s);
      scheduledTasks.value = Array.isArray(e) ? e : [];
    } else scheduledTasks.value = [];
  } catch (s) {
    console.error("Failed to load scheduled tasks:", s);
    scheduledTasks.value = [];
  }
};

saveScheduledTasks = () => {
  try {
    const s = JSON.stringify(scheduledTasks.value);
    localStorage.setItem("scheduledTasks", s);
  } catch (s) {
    console.error("Failed to save scheduled tasks:", s);
  }
};
```

---

## 翻译后代码 - 任务配置与存储

```javascript
import { ref, reactive } from "vue";

// 定时任务列表
const scheduledTasks = ref([]);

// 任务表单配置
const taskForm = reactive({
  name: "",                          // 任务名称
  runType: "daily",                  // 运行类型: 'daily' | 'cron'
  runTime: null,                     // 每日运行时间，如 "08:30"
  cronExpression: "",                // Cron表达式，如 "0 8 * * *"
  selectedTokens: [],                // 选中的账号ID列表
  selectedTasks: [],                 // 选中的任务列表
  enabled: true,                     // 是否启用
  offlineTimeEnabled: false,         // 是否启用不上线时段检查
  legionStoreItems: {                // 助威商店多选购买配置
    7: { selected: false, count: 1 },   // 商品ID 7
    8: { selected: false, count: 1 },   // 商品ID 8
    9: { selected: false, count: 1 },   // 商品ID 9
    10: { selected: false, count: 20 }, // 商品ID 10
    11: { selected: false, count: 20 }, // 商品ID 11
  },
  boxWeeklyRewards: { 5: 1 },        // 宝箱达标奖励自选配置
});

/**
 * 从 localStorage 加载定时任务
 */
function loadScheduledTasks() {
  try {
    const stored = localStorage.getItem("scheduledTasks");
    if (stored) {
      const parsed = JSON.parse(stored);
      scheduledTasks.value = Array.isArray(parsed) ? parsed : [];
    } else {
      scheduledTasks.value = [];
    }
  } catch (error) {
    console.error("加载定时任务失败:", error);
    scheduledTasks.value = [];
  }
}

/**
 * 保存定时任务到 localStorage
 */
function saveScheduledTasks() {
  try {
    const serialized = JSON.stringify(scheduledTasks.value);
    localStorage.setItem("scheduledTasks", serialized);
  } catch (error) {
    console.error("保存定时任务失败:", error);
  }
}
```

---

## 原始代码 - 不上线时段检查

```javascript
isInOfflineTime = () => {
  const s = new Date(),
    e = s.getDay(),
    o = s.getHours(),
    a = s.getMinutes(),
    r = o * 60 + a;
  if (e === 5) {
    const k = r >= 300 && r <= 420;
    if (k) return true;  // 周五 05:00-07:00
  }
  if (e === 6) {
    const k = r >= 1190 && r <= 1270;
    if (k) return true;  // 周六 19:50-21:10
  }
  if (e === 0) {
    const k = r >= 1190 && r <= 1240;
    if (k) return true;  // 周日 19:50-20:40
  }
  return false;
};
```

---

## 翻译后代码 - 不上线时段检查

```javascript
/**
 * 检查当前是否处于不上线时段
 * 不上线时段定义：
 * - 周五 05:00 - 07:00 (300-420分钟)
 * - 周六 19:50 - 21:10 (1190-1270分钟)
 * - 周日 19:50 - 20:40 (1190-1240分钟)
 * @returns {boolean}
 */
function isInOfflineTime() {
  const now = new Date();
  const dayOfWeek = now.getDay();     // 0=周日, 1=周一, ..., 5=周五, 6=周六
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  console.log("[不上线时段检查] 当前时间:", now.toLocaleString("zh-CN"));
  console.log("[不上线时段检查] 星期:", ["日", "一", "二", "三", "四", "五", "六"][dayOfWeek]);

  // 周五 05:00 - 07:00
  if (dayOfWeek === 5) {
    const inRange = totalMinutes >= 300 && totalMinutes <= 420;
    console.log("[不上线时段检查] 周五时段 05:00-07:00:", inRange);
    if (inRange) return true;
  }

  // 周六 19:50 - 21:10
  if (dayOfWeek === 6) {
    const inRange = totalMinutes >= 1190 && totalMinutes <= 1270;
    console.log("[不上线时段检查] 周六时段 19:50-21:10:", inRange);
    if (inRange) return true;
  }

  // 周日 19:50 - 20:40
  if (dayOfWeek === 0) {
    const inRange = totalMinutes >= 1190 && totalMinutes <= 1240;
    console.log("[不上线时段检查] 周日时段 19:50-20:40:", inRange);
    if (inRange) return true;
  }

  console.log("[不上线时段检查] 不在不上线时段内");
  return false;
}
```

---

## 原始代码 - 定时任务执行

```javascript
executeScheduledTask = async (task) => {
  // 1. 检查不上线时段
  if (task.offlineTimeEnabled && isInOfflineTime()) {
    addLog({ message: `跳过任务: ${task.name} (当前在不上线时段)`, type: "warning" });
    return;
  }
  // 2. 连接Token
  for (const tokenId of task.selectedTokens) {
    await tokenStore.createWebSocketConnection(tokenId, token.token, token.wsUrl);
  }
  // 3. 按顺序执行任务
  for (const taskName of task.selectedTasks) {
    if (shouldStop.value) break;
    // 检查活动开放时间
    if (["batchbaoku45", "batchbaoku13"].includes(taskName) && !checkBaokuActivityOpen()) continue;
    if (["batchmengjing", "batchBuyDreamItems"].includes(taskName) && !checkMengjingActivityOpen()) continue;
    // ... 更多活动检查
    const taskFunction = eval(taskName);
    await taskFunction();
  }
};
```

---

## 翻译后代码 - 定时任务执行

```javascript
/**
 * 执行定时任务
 * @param {Object} task - 定时任务配置
 */
async function executeScheduledTask(task) {
  try {
    // 1. 检查不上线时段
    if (task.offlineTimeEnabled && isInOfflineTime()) {
      addLog({
        time: new Date().toLocaleTimeString(),
        message: `跳过任务: ${task.name} (当前在不上线时段)`,
        type: "warning",
      });
      return;
    }

    // 2. 连接所有选中的Token
    const availableTokens = [];
    for (const tokenId of task.selectedTokens) {
      const tokenInfo = tokens.value.find((t) => t.id === tokenId);
      if (tokenInfo) {
        try {
          await tokenStore.createWebSocketConnection(tokenId, tokenInfo.token, tokenInfo.wsUrl);
          // 等待连接确认
          let connected = false;
          const startTime = Date.now();
          while (Date.now() - startTime < 2000) {
            const conn = tokenStore.wsConnections[tokenId];
            if (conn?.status === "connected") {
              connected = true;
              break;
            }
            await new Promise((r) => setTimeout(r, 500));
          }
          if (connected) {
            availableTokens.push(tokenId);
          }
        } catch (error) {
          console.error(`连接Token失败: ${tokenInfo.name}`, error);
        }
      }
    }

    // 3. 按顺序执行选中的任务
    for (const taskName of task.selectedTasks) {
      if (shouldStop.value) break;

      // 检查特定活动的开放时间
      if (["batchbaoku45", "batchbaoku13"].includes(taskName) && !checkBaokuActivityOpen()) {
        addLog({ message: `跳过任务 (不在宝库开放时间)`, type: "warning" });
        continue;
      }
      if (["batchmengjing", "batchBuyDreamItems"].includes(taskName) && !checkMengjingActivityOpen()) {
        addLog({ message: `跳过任务 (不在梦境开放时间)`, type: "warning" });
        continue;
      }
      if (["batchSmartSendCar", "batchClaimCars"].includes(taskName) && !checkCarActivityOpen()) {
        addLog({ message: `跳过任务 (不在发车开放时间)`, type: "warning" });
        continue;
      }
      if (["batchTopUpArena", "batcharenafight"].includes(taskName) && !checkArenaActivityOpen()) {
        addLog({ message: `跳过任务 (不在竞技场开放时间)`, type: "warning" });
        continue;
      }

      addLog({ message: `执行任务: ${taskName}`, type: "info" });

      // 获取任务函数并执行
      const taskFunction = eval(taskName);
      if (typeof taskFunction === "function") {
        // 分批执行（每批最多 maxActive 个账号）
        const maxActive = batchSettings.maxActive || 5;
        const batches = [];
        for (let i = 0; i < availableTokens.length; i += maxActive) {
          batches.push(availableTokens.slice(i, i + maxActive));
        }

        for (let i = 0; i < batches.length && !shouldStop.value; i++) {
          selectedTokens.value = [...batches[i]];
          addLog({ message: `执行第 ${i + 1}/${batches.length} 批账号`, type: "info" });

          try {
            await taskFunction();
          } catch (error) {
            console.error(`执行任务 ${taskName} 第 ${i + 1} 批失败:`, error);
          }

          // 批次间等待
          if (i < batches.length - 1 && batchSettings.batchIntervalWait > 0) {
            const waitMs = batchSettings.batchIntervalWait * 1000;
            addLog({ message: `等待 ${batchSettings.batchIntervalWait} 秒后执行下一批...`, type: "info" });
            await new Promise((r) => setTimeout(r, waitMs));
          }
        }

        // 任务间等待
        const isLastTask = task.selectedTasks.indexOf(taskName) === task.selectedTasks.length - 1;
        if (!isLastTask && batchSettings.taskIntervalWait > 0) {
          const waitMs = batchSettings.taskIntervalWait * 1000;
          addLog({ message: `等待 ${batchSettings.taskIntervalWait} 秒后执行下一个功能...`, type: "info" });
          await new Promise((r) => setTimeout(r, waitMs));
        }
      }
    }

    addLog({ message: `定时任务执行完成: ${task.name}`, type: "success" });
  } catch (error) {
    addLog({ message: `定时任务执行失败: ${error.message}`, type: "error" });
    console.error(`执行定时任务 ${task.name} 失败:`, error);
  }
}
```

---

## 关键参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| `runType` | 'daily' \| 'cron' | 运行类型 |
| `runTime` | string | 每日运行时间，格式 "HH:mm" |
| `cronExpression` | string | 5字段Cron表达式 |
| `selectedTokens` | string[] | 选中的账号ID列表 |
| `selectedTasks` | string[] | 选中的任务名称列表 |
| `enabled` | boolean | 任务是否启用 |
| `offlineTimeEnabled` | boolean | 是否启用不上线时段检查 |
| `maxActive` | number | 每批同时执行的最大账号数 |
| `batchIntervalWait` | number | 批次间等待秒数 |
| `taskIntervalWait` | number | 任务间等待秒数 |

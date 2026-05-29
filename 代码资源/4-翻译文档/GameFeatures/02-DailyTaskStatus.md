# DailyTaskStatus 组件 - 翻译文档

## 原始代码位置
- 文件：`GameFeatures-CknTKSSq.js`
- 行号：`11727 ~ 12360`

## 组件概述
DailyTaskStatus 是**每日任务状态**组件，展示当前每日任务完成进度，支持一键补差执行任务、任务设置、执行日志查看等功能。

## 依赖关系
```
DailyTaskStatus
├── 外部依赖：
│   ├── _t() - Pinia Store
│   ├── It() - Naive UI useMessage
│   ├── Y() / O() - Vue ref / computed
│   ├── ft() - Vue reactive
│   ├── wt() / xt() / Zu() - Vue watch / onMounted / onBeforeUnmount
│   ├── dc - 每日任务执行器类
│   └── $e("n-progress") / $e("n-modal") / $e("n-select") 等 - Naive UI 组件
│
├── 被引用：GameStatus（日常Tab）
```

## 原始代码（编译后核心逻辑）
```javascript
const ew = {
  __name: "DailyTaskStatus",
  setup(t) {
    const A = _t(), s = It();
    const n = Y(!1), o = Y(!1), i = Y(!1), r = Y(!1);
    const v = Y(null); // 日志容器ref

    // 任务设置配置
    const c = ft({
      arenaFormation: 1,    // 竞技场阵容
      bossFormation: 1,     // BOSS阵容
      bossTimes: 2,         // BOSS次数
      claimBottle: !0,      // 领罐子
      payRecruit: !0,       // 付费招募
      openBox: !0,          // 开宝箱
      arenaEnable: !0,      // 竞技场
      claimHangUp: !0,      // 领挂机
      claimEmail: !0,       // 领邮件
      blackMarketPurchase: !0, // 黑市购买
      commandDelay: 500,    // 命令延迟(ms)
      taskDelay: 500,       // 任务延迟(ms)
    });

    // 任务列表（10个固定任务）
    const f = Y([
      { id: 1, name: "登录一次游戏", completed: !1, loading: !1 },
      { id: 2, name: "分享一次游戏", completed: !1, loading: !1 },
      { id: 3, name: "赠送好友3次金币", completed: !1, loading: !1 },
      { id: 4, name: "进行2次招募", completed: !1, loading: !1 },
      { id: 5, name: "领取5次挂机奖励", completed: !1, loading: !1 },
      { id: 6, name: "进行3次点金", completed: !1, loading: !1 },
      { id: 7, name: "开启3次宝箱", completed: !1, loading: !1 },
      { id: 12, name: "黑市购买1次物品（请设置采购清单）", completed: !1, loading: !1 },
      { id: 13, name: "进行1场竞技场战斗", completed: !1, loading: !1 },
      { id: 14, name: "收获1个任意盐罐", completed: !1, loading: !1 },
    ]);

    // 阵容选项
    const m = [1,2,3,4,5,6].map((ae) => ({ label: `阵容${ae}`, value: ae }));
    // BOSS次数选项
    const p = [0,1,2,3,4].map((ae) => ({ label: `${ae}次`, value: ae }));

    // 计算属性
    const Q = O(() => A.selectedTokenRoleInfo);           // 选中角色信息
    const G = O(() => Q.value?.role?.dailyTask?.dailyPoint ?? 0); // 当前积分
    const _ = O(() => Math.min(G.value, 100));            // 进度百分比(上限100)
    const N = O(() => _.value >= 100);                    // 是否全部完成
    const X = O(() => (N.value ? "#10b981" : "#3b82f6")); // 进度条颜色
    const I = O(() => A.selectedToken ? A.getWebSocketStatus(A.selectedToken.id) === "connected" : !1); // 是否连接
    const b = O(() => { /* 是否连接中 */ });               // 连接中状态

    // 日志列表
    const U = Y([]);
    const x = (ae, L = "info") => { /* 添加日志 */ };

    // 同步任务完成状态
    const R = (ae) => {
      if (!ae?.role?.dailyTask?.complete) { x("角色信息中无任务完成数据", "warning"); return; }
      const L = ae.role.dailyTask.complete;
      const oe = (ue) => ue === -1; // -1表示已完成
      f.value.forEach((ue) => { ue.completed = !1; });
      Object.keys(L).forEach((ue) => {
        const ve = Number(ue), z = f.value.findIndex((ne) => ne.id === ve);
        if (z >= 0) { f.value[z].completed = oe(L[ue]); }
      });
    };

    // 获取角色信息
    const M = async () => { /* 发送 role_getroleinfo 并同步任务 */ };

    // 一键补差
    const V = async () => {
      if (!A.selectedToken || r.value) { s.warning("没有选中Token或正在执行中"); return; }
      if (!I.value && !b.value) { s.error("WebSocket连接未建立"); return; }
      r.value = !0; i.value = !0; U.value = [];
      try {
        await new dc(A, { commandDelay: c.commandDelay, taskDelay: c.taskDelay })
          .run(A.selectedToken.id, { onLog: (L) => x(L.message, L.type), onProgress: (L) => x(`任务进度: ${L}%`) }, c);
        s.success("每日任务补差执行完成");
        setTimeout(async () => { await M(); }, 3000);
      } catch (ae) { s.error(`任务执行失败: ${ae.message}`); }
      finally { r.value = !1; }
    };

    // 手动刷新
    const F = async () => { /* 调用 M() 刷新 */ };

    // 设置本地存储
    const y = () => (A.selectedToken ? { roleId: A.selectedToken.id } : null);
    const Ce = (ae) => { /* 从localStorage读取设置 */ };
    const re = (ae, L) => { /* 保存到localStorage */ };

    // 监听设置变化自动保存
    wt(c, (ae) => { const L = y(); L && re(L.roleId, ae); }, { deep: !0 });

    // 监听选中Token变化
    wt(() => A.selectedToken, async (ae, L) => {
      if (ae && ae !== L) {
        x(`切换到Token: ${ae.name}`);
        const oe = Ce(ae.id); oe && Object.assign(c, oe);
        if (I.value) { try { await M(); } catch (fe) {} }
      }
    }, { immediate: !0 });

    // 监听角色信息变化自动同步任务
    wt(() => A.selectedTokenRoleInfo, (ae) => {
      ae?.role?.dailyTask?.complete && (x("角色信息更新，同步任务状态"), R(ae));
    }, { immediate: !0, deep: !0 });

    xt(async () => { /* 初始化 */ });

    // 渲染：进度卡片 + 设置弹窗 + 任务详情弹窗 + 日志弹窗
    return (ae, L) => {
      const oe = $e("n-progress"), fe = $e("n-icon"), w = $e("n-select"),
        C = $e("n-input-number"), P = $e("n-switch"), ue = $e("n-modal"), ve = $e("n-tag");
      return l(), u("div", CB, [
        // 状态卡片头部
        e("div", yB, [
          e("img", { src: wB, alt: "每日任务", class: "status-icon" }),
          e("div", { class: "status-info" }, [e("h3", null, "每日任务"), e("p", null, "当前进度")]),
          e("div", _B, [
            e("div", { class: ["status-badge", { completed: N.value }], onClick: () => (o.value = !0) }, [
              e("div", { class: ["status-dot", { completed: N.value }] }),
              e("span", null, "任务详情"),
            ]),
            e("button", { class: "settings-gear", onClick: () => (n.value = !0), title: "任务设置" }, [/* 齿轮SVG */]),
          ]),
        ]),
        // 进度条
        e("div", bB, [
          e("div", kB, [
            d(oe, { type: "line", percentage: _.value, height: 8, "border-radius": 4, color: X.value, "rail-color": "#f3f4f6" }),
          ]),
          e("div", { class: "info-container" }, "右上角小齿轮有惊喜"),
        ]),
        // 操作按钮
        e("div", QB, [
          e("button", { class: "action-button", disabled: r.value || !I.value, onClick: V }, [
            r.value ? e("span", FB, [/* loading图标 */, " 执行中... "]) :
            I.value ? e("span", $B, "一键补差") : e("span", UB, "WebSocket未连接"),
          ]),
        ]),
        // 设置弹窗
        d(ue, { show: n.value, "onUpdate:show": (z) => (n.value = z), preset: "card", title: "任务设置", style: { width: "90%", "max-width": "400px" } }, {
          default: g(() => [
            e("div", EB, [
              // 竞技场阵容
              e("div", SB, [
                e("label", { class: "setting-label" }, "竞技场阵容"),
                d(w, { value: c.arenaFormation, "onUpdate:value": (z) => (c.arenaFormation = z), options: E(m), size: "small" }),
              ]),
              // BOSS阵容
              e("div", DB, [
                e("label", { class: "setting-label" }, "BOSS阵容"),
                d(w, { value: c.bossFormation, "onUpdate:value": (z) => (c.bossFormation = z), options: E(m), size: "small" }),
              ]),
              // BOSS次数
              e("div", xB, [
                e("label", { class: "setting-label" }, "BOSS次数"),
                d(w, { value: c.bossTimes, "onUpdate:value": (z) => (c.bossTimes = z), options: E(p), size: "small" }),
              ]),
              // 命令延迟
              e("div", LB, [
                e("label", { class: "setting-label" }, "命令延迟 (毫秒)"),
                d(C, { value: c.commandDelay, "onUpdate:value": (z) => (c.commandDelay = z), min: 0, max: 5000, step: 100, size: "small" }),
              ]),
              // 任务延迟
              e("div", MB, [
                e("label", { class: "setting-label" }, "任务延迟 (毫秒)"),
                d(C, { value: c.taskDelay, "onUpdate:value": (z) => (c.taskDelay = z), min: 0, max: 5000, step: 100, size: "small" }),
              ]),
              // 开关组
              e("div", PB, [
                e("div", RB, [e("span", { class: "switch-label" }, "领罐子"), d(P, { value: c.claimBottle, "onUpdate:value": (z) => (c.claimBottle = z) })]),
                e("div", OB, [e("span", { class: "switch-label" }, "领挂机"), d(P, { value: c.claimHangUp, "onUpdate:value": (z) => (c.claimHangUp = z) })]),
                e("div", KB, [e("span", { class: "switch-label" }, "竞技场"), d(P, { value: c.arenaEnable, "onUpdate:value": (z) => (c.arenaEnable = z) })]),
                e("div", NB, [e("span", { class: "switch-label" }, "开宝箱"), d(P, { value: c.openBox, "onUpdate:value": (z) => (c.openBox = z) })]),
                e("div", VB, [e("span", { class: "switch-label" }, "领取邮件奖励"), d(P, { value: c.claimEmail, "onUpdate:value": (z) => (c.claimEmail = z) })]),
                e("div", WB, [e("span", { class: "switch-label" }, "黑市购买物品"), d(P, { value: c.blackMarketPurchase, "onUpdate:value": (z) => (c.blackMarketPurchase = z) })]),
                e("div", GB, [e("span", { class: "switch-label" }, "付费招募"), d(P, { value: c.payRecruit, "onUpdate:value": (z) => (c.payRecruit = z) })]),
              ]),
            ]),
          ]),
        }),
        // 任务详情弹窗
        d(ue, { show: o.value, "onUpdate:show": (z) => (o.value = z), preset: "card", title: "每日任务详情" }, {
          default: g(() => [
            e("div", YB, [
              f.value.map((z) => e("div", { key: z.id, class: "task-item" }, [
                e("div", jB, [
                  d(fe, { class: ["task-status-icon", { completed: z.completed }] }, {
                    default: g(() => [z.completed ? d(E(Bc)) : d(E(vd))]),
                  }),
                  e("span", XB, z.name),
                ]),
                d(ve, { type: z.completed ? "success" : "default", size: "small" },
                  { default: g(() => z.completed ? "已完成" : "未完成") }),
              ])),
            ]),
          ]),
        }),
        // 日志弹窗
        d(ue, { show: i.value, "onUpdate:show": (z) => (i.value = z), preset: "card", title: "任务执行日志" }, {
          default: g(() => [
            e("div", { ref: v, class: "log-container" }, [
              U.value.map((z) => e("div", { key: z.time + z.message, class: "log-item" }, [
                e("span", ZB, z.time),
                e("span", { class: ["log-message", { error: z.type === "error", success: z.type === "success", warning: z.type === "warning" }] }, z.message),
              ])),
            ]),
          ]),
        }),
      ]);
    };
  },
};
```

## 翻译后代码（Vue 3 + Naive UI）
```vue
<template>
  <div class="daily-task-status">
    <!-- 卡片头部 -->
    <div class="status-header">
      <img src="/icons/daily-task.png" alt="每日任务" class="status-icon" />
      <div class="status-info">
        <h3>每日任务</h3>
        <p>当前进度</p>
      </div>
      <div class="status-actions">
        <div :class="['status-badge', { completed: isAllCompleted }]" @click="showTaskDetail = true">
          <div :class="['status-dot', { completed: isAllCompleted }]"></div>
          <span>任务详情</span>
        </div>
        <button class="settings-gear" @click="showSettings = true" title="任务设置">
          <!-- 齿轮SVG图标 -->
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c..." />
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 进度条 -->
    <div class="progress-section">
      <div class="progress-bar">
        <n-progress
          type="line"
          :percentage="progressPercent"
          :height="8"
          :border-radius="4"
          :color="progressColor"
          rail-color="#f3f4f6"
        />
      </div>
      <div class="info-container">右上角小齿轮有惊喜</div>
    </div>

    <!-- 操作按钮 -->
    <div class="action-section">
      <button
        class="action-button"
        :disabled="isExecuting || !isConnected"
        @click="handleOneClickFix"
      >
        <span v-if="isExecuting" class="loading-state">
          <svg class="loading-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z" />
          </svg>
          执行中...
        </span>
        <span v-else-if="isConnected">一键补差</span>
        <span v-else>WebSocket未连接</span>
      </button>
    </div>

    <!-- 设置弹窗 -->
    <n-modal
      v-model:show="showSettings"
      preset="card"
      title="任务设置"
      style="width: 90%; max-width: 400px"
    >
      <div class="settings-form">
        <div class="form-item">
          <label class="setting-label">竞技场阵容</label>
          <n-select v-model:value="settings.arenaFormation" :options="formationOptions" size="small" />
        </div>
        <div class="form-item">
          <label class="setting-label">BOSS阵容</label>
          <n-select v-model:value="settings.bossFormation" :options="formationOptions" size="small" />
        </div>
        <div class="form-item">
          <label class="setting-label">BOSS次数</label>
          <n-select v-model:value="settings.bossTimes" :options="bossTimesOptions" size="small" />
        </div>
        <div class="form-item">
          <label class="setting-label">命令延迟 (毫秒)</label>
          <n-input-number v-model:value="settings.commandDelay" :min="0" :max="5000" :step="100" size="small" />
        </div>
        <div class="form-item">
          <label class="setting-label">任务延迟 (毫秒)</label>
          <n-input-number v-model:value="settings.taskDelay" :min="0" :max="5000" :step="100" size="small" />
        </div>
        <div class="switches-group">
          <div class="switch-item">
            <span class="switch-label">领罐子</span>
            <n-switch v-model:value="settings.claimBottle" />
          </div>
          <div class="switch-item">
            <span class="switch-label">领挂机</span>
            <n-switch v-model:value="settings.claimHangUp" />
          </div>
          <div class="switch-item">
            <span class="switch-label">竞技场</span>
            <n-switch v-model:value="settings.arenaEnable" />
          </div>
          <div class="switch-item">
            <span class="switch-label">开宝箱</span>
            <n-switch v-model:value="settings.openBox" />
          </div>
          <div class="switch-item">
            <span class="switch-label">领取邮件奖励</span>
            <n-switch v-model:value="settings.claimEmail" />
          </div>
          <div class="switch-item">
            <span class="switch-label">黑市购买物品</span>
            <n-switch v-model:value="settings.blackMarketPurchase" />
          </div>
          <div class="switch-item">
            <span class="switch-label">付费招募</span>
            <n-switch v-model:value="settings.payRecruit" />
          </div>
        </div>
      </div>
    </n-modal>

    <!-- 任务详情弹窗 -->
    <n-modal v-model:show="showTaskDetail" preset="card" title="每日任务详情" style="width: 90%; max-width: 400px">
      <div class="task-list">
        <div v-for="task in taskList" :key="task.id" class="task-item">
          <div class="task-item-left">
            <n-icon :class="['task-status-icon', { completed: task.completed }]">
              <CheckCircle v-if="task.completed" />
              <CloseCircle v-else />
            </n-icon>
            <span class="task-name">{{ task.name }}</span>
          </div>
          <n-tag :type="task.completed ? 'success' : 'default'" size="small">
            {{ task.completed ? '已完成' : '未完成' }}
          </n-tag>
        </div>
      </div>
    </n-modal>

    <!-- 日志弹窗 -->
    <n-modal v-model:show="showLogs" preset="card" title="任务执行日志" style="width: 90%; max-width: 500px">
      <div ref="logContainer" class="log-container">
        <div v-for="log in logs" :key="log.time + log.message" class="log-item">
          <span class="log-time">{{ log.time }}</span>
          <span :class="['log-message', log.type]">{{ log.message }}</span>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useGameStore } from '@/stores/game'
import { useMessage } from 'naive-ui'
import { CheckCircle, CloseCircle } from '@vicons/ionicons5'
import DailyTaskExecutor from '@/services/DailyTaskExecutor'

const store = useGameStore()
const message = useMessage()

// ===== 响应式状态 =====
const showSettings = ref(false)
const showTaskDetail = ref(false)
const showLogs = ref(false)
const isExecuting = ref(false)
const logContainer = ref(null)

// 任务设置
const settings = ref({
  arenaFormation: 1,
  bossFormation: 1,
  bossTimes: 2,
  claimBottle: true,
  payRecruit: true,
  openBox: true,
  arenaEnable: true,
  claimHangUp: true,
  claimEmail: true,
  blackMarketPurchase: true,
  commandDelay: 500,
  taskDelay: 500,
})

// 任务列表
const taskList = ref([
  { id: 1, name: '登录一次游戏', completed: false, loading: false },
  { id: 2, name: '分享一次游戏', completed: false, loading: false },
  { id: 3, name: '赠送好友3次金币', completed: false, loading: false },
  { id: 4, name: '进行2次招募', completed: false, loading: false },
  { id: 5, name: '领取5次挂机奖励', completed: false, loading: false },
  { id: 6, name: '进行3次点金', completed: false, loading: false },
  { id: 7, name: '开启3次宝箱', completed: false, loading: false },
  { id: 12, name: '黑市购买1次物品（请设置采购清单）', completed: false, loading: false },
  { id: 13, name: '进行1场竞技场战斗', completed: false, loading: false },
  { id: 14, name: '收获1个任意盐罐', completed: false, loading: false },
])

// 日志
const logs = ref([])
const MAX_LOGS = 500

// 选项
const formationOptions = [1, 2, 3, 4, 5, 6].map(i => ({ label: `阵容${i}`, value: i }))
const bossTimesOptions = [0, 1, 2, 3, 4].map(i => ({ label: `${i}次`, value: i }))

// ===== 计算属性 =====
const roleInfo = computed(() => store.selectedTokenRoleInfo)
const dailyPoint = computed(() => roleInfo.value?.role?.dailyTask?.dailyPoint ?? 0)
const progressPercent = computed(() => Math.min(dailyPoint.value, 100))
const isAllCompleted = computed(() => progressPercent.value >= 100)
const progressColor = computed(() => isAllCompleted.value ? '#10b981' : '#3b82f6')
const isConnected = computed(() => {
  if (!store.selectedToken) return false
  return store.getWebSocketStatus(store.selectedToken.id) === 'connected'
})
const isConnecting = computed(() => {
  if (!store.selectedToken) return false
  const status = store.getWebSocketStatus(store.selectedToken.id)
  return status === 'connecting' || status === 'reconnecting'
})

// ===== 方法 =====
function addLog(msg, type = 'info') {
  const time = new Date().toLocaleTimeString()
  logs.value.push({ time, message: msg, type })
  if (logs.value.length > MAX_LOGS) {
    logs.value.splice(0, logs.value.length - MAX_LOGS)
  }
  // 自动滚动到底部
  setTimeout(() => {
    if (logContainer.value) {
      logContainer.value.scrollTop = logContainer.value.scrollHeight
    }
  })
}

function syncTaskStatus(roleData) {
  if (!roleData?.role?.dailyTask?.complete) {
    addLog('角色信息中无任务完成数据', 'warning')
    return
  }
  const completeData = roleData.role.dailyTask.complete
  const isDone = (val) => val === -1

  addLog('开始同步任务完成状态...')
  addLog(`服务器返回的任务完成数据: ${JSON.stringify(completeData)}`)

  let total = 0, done = 0
  taskList.value.forEach(t => { t.completed = false })

  Object.keys(completeData).forEach(key => {
    const taskId = Number(key)
    const idx = taskList.value.findIndex(t => t.id === taskId)
    if (idx >= 0) {
      const completed = isDone(completeData[key])
      taskList.value[idx].completed = completed
      total++
      if (completed) done++
      addLog(`任务${taskId} "${taskList.value[idx].name}": ${completed ? '已完成' : '未完成'}`, completed ? 'success' : 'info')
    } else {
      addLog(`服务器返回未知任务ID: ${taskId} (完成值: ${completeData[key]})`, 'warning')
    }
  })

  addLog(`任务状态同步完成: ${done}/${total} 已完成`)
  addLog(`当前进度: ${dailyPoint.value}/100`)
}

async function fetchRoleInfo() {
  if (!store.selectedToken) throw new Error('没有选中的Token')
  const tokenId = store.selectedToken.id
  addLog('正在获取角色信息...')
  try {
    const data = await store.sendGetRoleInfo(tokenId)
    addLog('角色信息获取成功', 'success')
    if (data) syncTaskStatus(data)
    return data
  } catch (err) {
    addLog(`获取角色信息失败: ${err.message}`, 'error')
    throw err
  }
}

async function handleOneClickFix() {
  if (!store.selectedToken || isExecuting.value) {
    message.warning('没有选中Token或正在执行中')
    return
  }
  if (!isConnected.value && !isConnecting.value) {
    message.error('WebSocket连接未建立，请检查连接状态')
    return
  }

  isExecuting.value = true
  showLogs.value = true
  logs.value = []

  try {
    addLog('=== 开始执行一键补差任务 ===')
    const executor = new DailyTaskExecutor(store, {
      commandDelay: settings.value.commandDelay,
      taskDelay: settings.value.taskDelay,
    })
    await executor.run(store.selectedToken.id, {
      onLog: (log) => addLog(log.message, log.type),
      onProgress: (pct) => addLog(`任务进度: ${pct}%`),
    }, settings.value)

    addLog('=== 任务执行完成 ===', 'success')
    message.success('每日任务补差执行完成')

    setTimeout(async () => {
      try {
        await fetchRoleInfo()
        addLog('最终角色信息刷新完成', 'success')
      } catch (err) {
        addLog(`最终刷新失败: ${err.message}`, 'warning')
      }
    }, 3000)
  } catch (err) {
    addLog(`任务执行失败: ${err.message}`, 'error')
    console.error('详细错误信息:', err)
    message.error(`任务执行失败: ${err.message}`)
  } finally {
    isExecuting.value = false
  }
}

async function handleRefresh() {
  if (!isConnected.value && !isConnecting.value) {
    message.warning('WebSocket未连接，无法刷新任务状态')
    return
  }
  try {
    addLog('手动刷新任务状态...')
    await fetchRoleInfo()
    message.success('任务状态刷新成功')
  } catch (err) {
    addLog(`刷新失败: ${err.message}`, 'error')
    message.error(`刷新失败: ${err.message}`)
  }
}

// 设置本地存储
function getStorageKey() {
  return store.selectedToken ? `daily-settings:${store.selectedToken.id}` : null
}

function loadSettings(roleId) {
  try {
    const data = localStorage.getItem(`daily-settings:${roleId}`)
    return data ? JSON.parse(data) : null
  } catch (e) {
    console.error('Failed to load settings:', e)
    return null
  }
}

function saveSettings(roleId, data) {
  try {
    localStorage.setItem(`daily-settings:${roleId}`, JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save settings:', e)
  }
}

// ===== 监听器 =====
watch(settings, (val) => {
  const key = getStorageKey()
  if (key) saveSettings(store.selectedToken.id, val)
}, { deep: true })

watch(() => store.selectedToken, async (newVal, oldVal) => {
  if (newVal && newVal !== oldVal) {
    addLog(`切换到Token: ${newVal.name}`)
    const saved = loadSettings(newVal.id)
    if (saved) Object.assign(settings.value, saved)
    if (isConnected.value) {
      try { await fetchRoleInfo() } catch (e) {
        console.warn('切换token后获取角色信息失败:', e.message)
      }
    }
  }
}, { immediate: true })

watch(() => store.selectedTokenRoleInfo, (newVal) => {
  if (newVal?.role?.dailyTask?.complete) {
    addLog('角色信息更新，同步任务状态')
    syncTaskStatus(newVal)
  }
}, { immediate: true, deep: true })

onMounted(async () => {
  addLog('组件初始化完成')
  if (store.selectedToken && isConnected.value) {
    try { await fetchRoleInfo() } catch (e) {
      console.warn('初始化时获取角色信息失败:', e.message)
    }
  }
  const key = getStorageKey()
  if (key) {
    const saved = loadSettings(store.selectedToken.id)
    if (saved) Object.assign(settings.value, saved)
  }
})

onBeforeUnmount(() => {
  addLog('组件即将卸载')
})
</script>

<style scoped>
.daily-task-status {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}
.status-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.status-icon {
  width: 40px;
  height: 40px;
}
.status-info h3 {
  margin: 0;
  font-size: 16px;
}
.status-info p {
  margin: 0;
  font-size: 12px;
  color: #999;
}
.status-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}
.status-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 16px;
  background: #f3f4f6;
  cursor: pointer;
  font-size: 12px;
}
.status-badge.completed {
  background: #d1fae5;
  color: #065f46;
}
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
}
.status-dot.completed {
  background: #10b981;
}
.settings-gear {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 4px;
}
.settings-gear svg {
  width: 20px;
  height: 20px;
  color: #6b7280;
}
.progress-section {
  margin-bottom: 12px;
}
.info-container {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 8px;
}
.action-button {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #3b82f6;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.action-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.loading-icon {
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.settings-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.form-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.setting-label {
  font-size: 14px;
  color: #374151;
}
.switches-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.switch-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  background: #f9fafb;
  border-radius: 6px;
}
.switch-label {
  font-size: 13px;
  color: #4b5563;
}
.task-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: #f9fafb;
  border-radius: 8px;
}
.task-item-left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.task-status-icon {
  font-size: 18px;
  color: #ef4444;
}
.task-status-icon.completed {
  color: #10b981;
}
.task-name {
  font-size: 14px;
  color: #1f2937;
}
.log-container {
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.log-item {
  display: flex;
  gap: 8px;
  font-size: 12px;
  padding: 4px 0;
  border-bottom: 1px solid #f3f4f6;
}
.log-time {
  color: #9ca3af;
  white-space: nowrap;
}
.log-message {
  color: #4b5563;
}
.log-message.error {
  color: #ef4444;
}
.log-message.success {
  color: #10b981;
}
.log-message.warning {
  color: #f59e0b;
}
</style>
```

## 关键逻辑说明

| 功能 | 说明 |
|------|------|
| **任务列表** | 10个固定每日任务，通过服务器返回的 `dailyTask.complete` 同步完成状态 |
| **进度计算** | `dailyPoint` 字段表示当前积分，上限100，对应进度条百分比 |
| **一键补差** | 使用 `DailyTaskExecutor` 类自动执行未完成的任务 |
| **设置持久化** | 每个角色的设置独立存储在 `localStorage`，键名为 `daily-settings:{roleId}` |
| **日志系统** | 最大保存500条日志，自动滚动到底部，支持 info/success/warning/error 级别 |
| **阵容选择** | 支持6种阵容配置，用于竞技场和BOSS战 |
| **延迟设置** | 命令延迟和任务延迟可配置，防止请求过快 |

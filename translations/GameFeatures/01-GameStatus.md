# GameStatus 组件 - 翻译文档

## 原始代码位置
- 文件：`GameFeatures-CknTKSSq.js`
- 行号：`44788 ~ 45079`

## 组件概述
GameStatus 是整个游戏功能模块的主容器组件，采用 **Tab 标签页** 布局管理所有子功能模块。

## 依赖关系
```
GameStatus (主容器)
├── 外部依赖：
│   ├── _t() - Pinia Store (游戏数据状态管理)
│   ├── It() - Naive UI 消息通知
│   ├── Y() / O() - Vue ref / computed
│   ├── wt() / xt() / jA() - Vue watch / onMounted / onUnmounted
│   ├── QA / kA - Vue v-show 指令辅助
│   └── $e("n-tabs") / $e("n-tab-pane") - Naive UI 组件
│
├── 子组件引用：
│   ├── 日常 Tab: R(kw), M(tw), IN, MN, C_, p2
│   ├── 工具 Tab: ej, S_, N_, Z_, l2, _O, MO, YO, mN, CK, ON
│   ├── 俱乐部 Tab: V(BB), F(Xv)
│   ├── 活动 Tab: F2, U2, W2
│   ├── 盐场 Tab: gQ(warrank), E$(weekBattle), PF(monthBattle), Gq(legionWarMap), iz(legionWarStatistics)
│   ├── 蟠桃园 Tab: FW(peach), ZT(peachBattle)
│   ├── 排行榜 Tab: Bq(serverrank), VD(toprank), Jx(topclubrank), k7(goldclubrank), u9(greatRouteRank)
│   └── 切磋 Tab: pO(fightPvp)
```

## 原始代码（编译后）
```javascript
const wj = {
  __name: "GameStatus",
  setup(t) {
    const A = _t();          // Store
    It();                    // Message
    const s = Y({ isRegistered: !1 });
    Y(!1);
    const n = Y("daily"),    // 当前主Tab
      o = Y("warrank"),    // 盐场子Tab
      i = Y("peach"),      // 蟠桃园子Tab
      r = Y("serverrank"); // 排行榜子Tab

    // 计算属性：周一到周三显示特殊内容
    O(() => {
      const X = new Date().getDay();
      return X >= 1 && X <= 3;
    });

    // 状态：助手运行状态
    const v = Y({ isRunning: !1, remainingTime: 0, stopTime: 0 }),
      // 状态：挂机状态
      c = Y({
        isActive: !1, remainingTime: 0, elapsedTime: 0,
        lastTime: 0, hangUpTime: 0, isExtending: !1, isClaiming: !1,
      }),
      // 状态：签到/俱乐部
      f = Y({ isSignedIn: !1, clubName: "" });

    O(() => A.gameData.studyStatus);

    // 计算属性：角色信息
    const m = O(() => ((X = A.gameData) == null ? void 0 : X.roleInfo) || null);

    // 计算属性：是否显示爬塔（层数<450）
    const p = O(() => {
      const X = m.value?.role?.tower?.id;
      return !(Math.floor(X / 10) + 1 > 450);
    });

    // WebSocket连接状态
    O(() => (A.selectedToken ? A.getWebSocketStatus(A.selectedToken.id) === "connected" : !1));

    // 更新状态方法
    const Q = () => { /* 更新助手、挂机、签到状态 */ };
    let G = null;
    const _ = () => { /* 启动1秒定时器更新倒计时 */ };

    // 监听角色信息变化
    wt(m, (X) => { X && Q(); }, { deep: !0, immediate: !0 });

    const N = Y(!1);
    // 监听WebSocket连接，自动发送 legion_getinfo
    wt(() => (A.selectedToken ? A.getWebSocketStatus(A.selectedToken.id) : "disconnected"),
      (X) => { if (X === "connected" && !N.value && A.selectedToken) { N.value = !0; A.sendMessage(I, "legion_getinfo"); } });

    xt(() => { Q(); _(); /* 初始化发送消息 */ });
    jA(() => { G && clearInterval(G); });

    // 渲染函数：Tabs + 条件渲染各子组件
    return (X, I) => {
      const b = eC, U = $e("n-tab-pane"), x = $e("n-tabs"),
        R = kw, M = tw, V = BB, F = Xv;
      return l(), u("div", { class: ["game-status-container", {
          "full-grid": n.value === "fightPvp",
          "full-page-mode": n.value === "saltFieldGroup" || n.value === "peachGroup" || n.value === "rankGroup",
          "club-mode": n.value === "club",
        }] }, [
        d(b, { embedded: "" }),
        d(x, { class: "section-tabs", value: n.value, "onUpdate:value": I[0] || (I[0] = (y) => (n.value = y)),
          type: "line", animated: "", size: "small" }, {
          default: g(() => [
            d(U, { name: "daily", tab: "日常" }),
            d(U, { name: "club", tab: "俱乐部" }),
            d(U, { name: "activity", tab: "活动" }),
            Bj ? (l(), Re(U, { key: 0, name: "tools", tab: "工具" })) : de("", !0),
            d(U, { name: "saltFieldGroup", tab: "盐场" }),
            d(U, { name: "peachGroup", tab: "蟠桃园" }),
            d(U, { name: "rankGroup", tab: "排行榜" }),
            d(U, { name: "fightPvp", tab: "切磋" }),
          ]), _: 1,
        }, 8, ["value"]),
        // 日常Tab子组件
        kA(d(R, null, null, 512), [[QA, n.value === "daily"]]),
        kA(d(M, null, null, 512), [[QA, n.value === "daily"]]),
        kA(d(IN, null, null, 512), [[QA, n.value === "daily" && p.value]]),
        kA(d(MN, null, null, 512), [[QA, n.value === "daily"]]),
        kA(d(C_, null, null, 512), [[QA, n.value === "daily"]]),
        kA(d(p2, null, null, 512), [[QA, n.value === "daily"]]),
        // 工具Tab子组件
        kA(d(ej, null, null, 512), [[QA, n.value === "tools"]]),
        kA(d(S_, null, null, 512), [[QA, n.value === "tools"]]),
        kA(d(N_, null, null, 512), [[QA, n.value === "tools"]]),
        kA(d(Z_, null, null, 512), [[QA, n.value === "tools"]]),
        n.value === "tools" ? (l(), Re(l2, { key: 0 })) : de("", !0),
        n.value === "tools" ? (l(), Re(_O, { key: 1 })) : de("", !0),
        n.value === "tools" ? (l(), Re(MO, { key: 2 })) : de("", !0),
        n.value === "tools" ? (l(), Re(YO, { key: 3 })) : de("", !0),
        n.value === "tools" ? (l(), Re(mN, { key: 4 })) : de("", !0),
        n.value === "tools" ? (l(), Re(CK, { key: 5 })) : de("", !0),
        n.value === "tools" ? (l(), Re(ON, { key: 6 })) : de("", !0),
        // 俱乐部Tab
        n.value === "club" ? (l(), Re(V, { key: 9 })) : de("", !0),
        n.value === "club" ? (l(), Re(F, { key: 10 })) : de("", !0),
        // 活动Tab
        kA(d(F2, null, null, 512), [[QA, n.value === "activity"]]),
        kA(d(U2, null, null, 512), [[QA, n.value === "activity"]]),
        kA(d(W2, null, null, 512), [[QA, n.value === "activity"]]),
        // 盐场Tab（带子Tab）
        n.value === "saltFieldGroup" ? (l(), u("div", tj, [
          e("div", Aj, [
            d(x, { type: "segment", animated: "", value: o.value,
              "onUpdate:value": I[3] || (I[3] = (y) => (o.value = y)), size: "small" }, {
              default: g(() => [
                d(U, { name: "warrank", tab: "盐场" }),
                d(U, { name: "weekBattle", tab: "本周盐场战绩" }),
                d(U, { name: "monthBattle", tab: "本月盐场战绩" }),
                d(U, { name: "legionWarMap", tab: "盐场地图" }),
                d(U, { name: "legionWarStatistics", tab: "盐场战况" }),
              ]), _: 1,
            }, 8, ["value"]),
          ]),
          o.value === "weekBattle" ? (l(), u("div", sj, [d(E$)])) : de("", !0),
          o.value === "warrank" ? (l(), u("div", nj, [d(gQ)])) : de("", !0),
          o.value === "monthBattle" ? (l(), u("div", aj, [d(PF)])) : de("", !0),
          o.value === "legionWarMap" ? (l(), u("div", oj, [d(Gq)])) : de("", !0),
          o.value === "legionWarStatistics" ? (l(), u("div", lj, [d(iz)])) : de("", !0),
        ])) : de("", !0),
        // 蟠桃园Tab（带子Tab）
        n.value === "peachGroup" ? (l(), u("div", rj, [
          e("div", ij, [
            d(x, { type: "segment", animated: "", value: i.value,
              "onUpdate:value": I[4] || (I[4] = (y) => (i.value = y)), size: "small" }, {
              default: g(() => [
                d(U, { name: "peach", tab: "蟠桃园信息" }),
                d(U, { name: "peachBattle", tab: "蟠桃园战绩" }),
              ]), _: 1,
            }, 8, ["value"]),
          ]),
          i.value === "peachBattle" ? (l(), u("div", uj, [d(ZT)])) : de("", !0),
          i.value === "peach" ? (l(), u("div", cj, [d(FW)])) : de("", !0),
        ])) : de("", !0),
        // 排行榜Tab（带子Tab）
        n.value === "rankGroup" ? (l(), u("div", dj, [
          e("div", vj, [
            d(x, { type: "segment", animated: "", value: r.value,
              "onUpdate:value": I[5] || (I[5] = (y) => (r.value = y)), size: "small" }, {
              default: g(() => [
                d(U, { name: "serverrank", tab: "区服榜" }),
                d(U, { name: "toprank", tab: "巅峰榜" }),
                d(U, { name: "topclubrank", tab: "俱乐部榜" }),
                d(U, { name: "goldclubrank", tab: "黄金积分榜" }),
                d(U, { name: "greatRouteRank", tab: "伟大航路积分榜" }),
              ]), _: 1,
            }, 8, ["value"]),
          ]),
          r.value === "serverrank" ? (l(), u("div", fj, [d(Bq)])) : de("", !0),
          r.value === "toprank" ? (l(), u("div", gj, [d(VD)])) : de("", !0),
          r.value === "topclubrank" ? (l(), u("div", mj, [d(Jx)])) : de("", !0),
          r.value === "goldclubrank" ? (l(), u("div", pj, [d(k7)])) : de("", !0),
          r.value === "greatRouteRank" ? (l(), u("div", hj, [d(u9)])) : de("", !0),
        ])) : de("", !0),
        // 切磋Tab
        n.value === "fightPvp" ? (l(), Re(pO, { key: 14 })) : de("", !0),
      ], 2);
    };
  },
};
```

## 翻译后代码（Vue 3 + Naive UI）
```vue
<template>
  <div :class="['game-status-container', containerClass]">
    <!-- 嵌入式身份牌组件 -->
    <IdentityCard embedded />

    <!-- 主Tab导航 -->
    <n-tabs v-model:value="activeMainTab" type="line" animated size="small" class="section-tabs">
      <n-tab-pane name="daily" tab="日常" />
      <n-tab-pane name="club" tab="俱乐部" />
      <n-tab-pane name="activity" tab="活动" />
      <n-tab-pane v-if="showToolsTab" name="tools" tab="工具" />
      <n-tab-pane name="saltFieldGroup" tab="盐场" />
      <n-tab-pane name="peachGroup" tab="蟠桃园" />
      <n-tab-pane name="rankGroup" tab="排行榜" />
      <n-tab-pane name="fightPvp" tab="切磋" />
    </n-tabs>

    <!-- ====== 日常 Tab ====== -->
    <template v-if="activeMainTab === 'daily'">
      <DailyTaskStatus />
      <IdentityCard />
      <TowerStatus v-if="showTower" />
      <WeirdTowerStatus />
      <CarScoreInfo />
      <OtherDailyComponents />
    </template>

    <!-- ====== 工具 Tab ====== -->
    <template v-if="activeMainTab === 'tools'">
      <ToolComponents />
    </template>

    <!-- ====== 俱乐部 Tab ====== -->
    <template v-if="activeMainTab === 'club'">
      <ClubInfo />
      <ClubActivity />
    </template>

    <!-- ====== 活动 Tab ====== -->
    <template v-if="activeMainTab === 'activity'">
      <ActivityComponents />
    </template>

    <!-- ====== 盐场 Tab（带子Tab） ====== -->
    <div v-if="activeMainTab === 'saltFieldGroup'" class="warrank-full-container">
      <div class="sub-tabs-wrapper">
        <n-tabs v-model:value="activeSaltTab" type="segment" animated size="small">
          <n-tab-pane name="warrank" tab="盐场" />
          <n-tab-pane name="weekBattle" tab="本周盐场战绩" />
          <n-tab-pane name="monthBattle" tab="本月盐场战绩" />
          <n-tab-pane name="legionWarMap" tab="盐场地图" />
          <n-tab-pane name="legionWarStatistics" tab="盐场战况" />
        </n-tabs>
      </div>
      <WeekBattle v-if="activeSaltTab === 'weekBattle'" />
      <SaltFieldRank v-if="activeSaltTab === 'warrank'" />
      <MonthBattle v-if="activeSaltTab === 'monthBattle'" />
      <LegionWarMap v-if="activeSaltTab === 'legionWarMap'" />
      <LegionWarStatistics v-if="activeSaltTab === 'legionWarStatistics'" />
    </div>

    <!-- ====== 蟠桃园 Tab（带子Tab） ====== -->
    <div v-if="activeMainTab === 'peachGroup'" class="warrank-full-container">
      <div class="sub-tabs-wrapper">
        <n-tabs v-model:value="activePeachTab" type="segment" animated size="small">
          <n-tab-pane name="peach" tab="蟠桃园信息" />
          <n-tab-pane name="peachBattle" tab="蟠桃园战绩" />
        </n-tabs>
      </div>
      <PeachBattle v-if="activePeachTab === 'peachBattle'" />
      <PeachInfo v-if="activePeachTab === 'peach'" />
    </div>

    <!-- ====== 排行榜 Tab（带子Tab） ====== -->
    <div v-if="activeMainTab === 'rankGroup'" class="warrank-full-container">
      <div class="sub-tabs-wrapper">
        <n-tabs v-model:value="activeRankTab" type="segment" animated size="small">
          <n-tab-pane name="serverrank" tab="区服榜" />
          <n-tab-pane name="toprank" tab="巅峰榜" />
          <n-tab-pane name="topclubrank" tab="俱乐部榜" />
          <n-tab-pane name="goldclubrank" tab="黄金积分榜" />
          <n-tab-pane name="greatRouteRank" tab="伟大航路积分榜" />
        </n-tabs>
      </div>
      <ServerRankListPageCard v-if="activeRankTab === 'serverrank'" />
      <TopRankListPageCard v-if="activeRankTab === 'toprank'" />
      <TopClubRankListPageCard v-if="activeRankTab === 'topclubrank'" />
      <GoldRankListPageCard v-if="activeRankTab === 'goldclubrank'" />
      <GreatRouteRankListPageCard v-if="activeRankTab === 'greatRouteRank'" />
    </div>

    <!-- ====== 切磋 Tab ====== -->
    <FightPvp v-if="activeMainTab === 'fightPvp'" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { useMessage } from 'naive-ui'
import IdentityCard from './IdentityCard.vue'
import DailyTaskStatus from './DailyTaskStatus.vue'
import TowerStatus from './TowerStatus.vue'
import WeirdTowerStatus from './WeirdTowerStatus.vue'
import CarScoreInfo from './CarScoreInfo.vue'
import ClubInfo from './ClubInfo.vue'
import PeachInfo from './PeachInfo.vue'
import ServerRankListPageCard from './ServerRankListPageCard.vue'
import TopRankListPageCard from './TopRankListPageCard.vue'
import GoldRankListPageCard from './GoldRankListPageCard.vue'
import GreatRouteRankListPageCard from './GreatRouteRankListPageCard.vue'
import FightPvp from './FightPvp.vue'

const store = useGameStore()
const message = useMessage()

// ===== 响应式状态 =====
const activeMainTab = ref('daily')      // 当前主Tab
const activeSaltTab = ref('warrank')    // 盐场子Tab
const activePeachTab = ref('peach')     // 蟠桃园子Tab
const activeRankTab = ref('serverrank') // 排行榜子Tab

const showToolsTab = true  // 是否显示工具Tab

// 注册状态
const registerStatus = ref({ isRegistered: false })

// 助手运行状态
const helperStatus = ref({
  isRunning: false,
  remainingTime: 0,
  stopTime: 0,
})

// 挂机状态
const hangUpStatus = ref({
  isActive: false,
  remainingTime: 0,
  elapsedTime: 0,
  lastTime: 0,
  hangUpTime: 0,
  isExtending: false,
  isClaiming: false,
})

// 签到状态
const signInStatus = ref({ isSignedIn: false, clubName: '' })

// ===== 计算属性 =====
const roleInfo = computed(() => store.gameData?.roleInfo || null)

// 是否显示爬塔（当前层数<450）
const showTower = computed(() => {
  const towerId = roleInfo.value?.role?.tower?.id
  if (!towerId && towerId !== 0) return true
  const floor = Math.floor(towerId / 10) + 1
  return floor <= 450
})

// 容器样式类
const containerClass = computed(() => ({
  'full-grid': activeMainTab.value === 'fightPvp',
  'full-page-mode': ['saltFieldGroup', 'peachGroup', 'rankGroup'].includes(activeMainTab.value),
  'club-mode': activeMainTab.value === 'club',
}))

// WebSocket连接状态
const isConnected = computed(() => {
  if (!store.selectedToken) return false
  return store.getWebSocketStatus(store.selectedToken.id) === 'connected'
})

// ===== 方法 =====
function updateStatus() {
  if (!roleInfo.value) return
  const role = roleInfo.value.role

  // 更新助手状态
  if (role.bottleHelpers) {
    const now = Date.now() / 1000
    helperStatus.value.stopTime = role.bottleHelpers.helperStopTime
    helperStatus.value.isRunning = role.bottleHelpers.helperStopTime > now
    helperStatus.value.remainingTime = Math.max(0, Math.floor(role.bottleHelpers.helperStopTime - now))
  }

  // 更新挂机状态
  if (role.hangUp) {
    const now = Date.now() / 1000
    hangUpStatus.value.lastTime = role.hangUp.lastTime
    hangUpStatus.value.hangUpTime = role.hangUp.hangUpTime
    const elapsed = now - hangUpStatus.value.lastTime
    if (elapsed <= hangUpStatus.value.hangUpTime) {
      hangUpStatus.value.remainingTime = Math.floor(hangUpStatus.value.hangUpTime - elapsed)
      hangUpStatus.value.isActive = true
    } else {
      hangUpStatus.value.remainingTime = 0
      hangUpStatus.value.isActive = false
    }
    hangUpStatus.value.elapsedTime = Math.floor(hangUpStatus.value.hangUpTime - hangUpStatus.value.remainingTime)
  }

  // 更新报名状态
  if (role.statistics) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayTimestamp = today.getTime() / 1000
    registerStatus.value.isRegistered = Number(role.statistics['last:legion:match:sign:up:time']) > todayTimestamp
  }

  // 更新签到状态
  if (role.statisticsTime) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayTimestamp = today.getTime() / 1000
    signInStatus.value.isSignedIn = role.statisticsTime['legion:sign:in'] > todayTimestamp
  }
}

// 倒计时定时器
let timer = null
function startTimer() {
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    if (helperStatus.value.isRunning && helperStatus.value.remainingTime > 0) {
      helperStatus.value.remainingTime = Math.max(0, helperStatus.value.remainingTime - 1)
      if (helperStatus.value.remainingTime <= 0) helperStatus.value.isRunning = false
    }
    if (hangUpStatus.value.isActive && hangUpStatus.value.remainingTime > 0) {
      hangUpStatus.value.remainingTime = Math.max(0, hangUpStatus.value.remainingTime - 1)
      hangUpStatus.value.elapsedTime++
      if (hangUpStatus.value.remainingTime <= 0) hangUpStatus.value.isActive = false
    }
  }, 1000)
}

// ===== 生命周期 =====
let hasSentLegionInfo = false

watch(roleInfo, (newVal) => { newVal && updateStatus() }, { deep: true, immediate: true })

watch(() => store.selectedToken ? store.getWebSocketStatus(store.selectedToken.id) : 'disconnected',
  (status) => {
    if (status === 'connected' && !hasSentLegionInfo && store.selectedToken) {
      hasSentLegionInfo = true
      store.sendMessage(store.selectedToken.id, 'legion_getinfo')
    }
  }
)

onMounted(() => {
  updateStatus()
  startTimer()
  if (store.selectedToken && store.getWebSocketStatus(store.selectedToken.id) === 'connected') {
    store.sendMessage(store.selectedToken.id, 'legion_getinfo')
    hasSentLegionInfo = true
  }
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.game-status-container {
  padding: 16px;
}
.full-grid {
  display: grid;
  gap: 16px;
}
.full-page-mode {
  width: 100%;
}
.club-mode {
  /* 俱乐部模式样式 */
}
.section-tabs {
  margin-bottom: 16px;
}
.sub-tabs-wrapper {
  margin-bottom: 12px;
}
</style>
```

## 关键逻辑说明

| 功能 | 说明 |
|------|------|
| **Tab 切换** | 使用 Naive UI `n-tabs` 组件，主Tab有8个，盐场/蟠桃园/排行榜有子Tab |
| **条件渲染** | 通过 `v-if` / `v-show` 控制各子组件显示，未激活的Tab不渲染 |
| **状态同步** | 监听 `roleInfo` 变化自动更新助手、挂机、签到状态 |
| **倒计时** | 1秒定时器更新助手剩余时间和挂机剩余时间 |
| **WebSocket** | 连接成功后自动发送 `legion_getinfo` 获取俱乐部信息 |
| **爬塔显示** | 计算当前层数，超过450层隐藏普通爬塔组件 |

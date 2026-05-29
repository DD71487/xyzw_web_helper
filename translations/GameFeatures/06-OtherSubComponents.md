# 其他子组件 - 翻译文档

## 组件列表
| 组件名 | 文件行号 | 说明 |
|--------|---------|------|
| CarScoreInfo | 9272 | 俱乐部赛车积分信息 |
| TowerStatus | 37780 | 咸将塔爬塔状态 |
| WeirdTowerStatus | 37951 | 梦魇/进化塔状态 |
| PeachInfo | 38499 | 蟠桃园信息（含战绩查询、切磋） |
| LegionWarMap | 41422 | 盐场地图（Canvas六边形网格） |
| LegionWarStatistics | 42011 | 盐场战况统计 |
| FightPvp | 34487 | 切磋模块（独立Tab） |

---

## 1. CarScoreInfo - 俱乐部赛车积分

### 原始代码（编译后核心）
```javascript
const CarScoreInfo = {
  __name: "CarScoreInfo",
  props: { visible: Boolean, inline: Boolean },
  emits: ["update:visible"],
  setup(t, { expose, emit }) {
    const n = t, emitFn = emit, message = It(), store = _t();
    const loading = Y(!1), data = Y([]);
    const columns = O(() => [
      { title: "序号", key: "index", width: 60, align: "center", render: (row, idx) => idx + 1 },
      { title: "头像", key: "headImg", width: 60, align: "center",
        render: (row) => row.headImg ? it(Avatar, { size: 32, src: row.headImg, round: !0, fallbackSrc: "/icons/xiaoyugan.png" })
          : it("div", { style: { width: "32px", height: "32px", borderRadius: "50%", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", color: "#999" } }, row.name?.charAt(0) || "?") },
      { title: "成员", key: "name", align: "left",
        render: (row) => it("div", { style: { display: "flex", flexDirection: "column" } },
          [it("span", { style: { fontWeight: "500", color: "#1890ff" } }, row.name),
           it("span", { style: { fontSize: "12px", color: "#999" } }, `ID: ${row.roleId}`)]) },
      { title: "赛车积分", key: "score", align: "center", render: (row) => row.score || "0" },
    ]);

    // 获取赛车积分数据
    const fetchData = async () => {
      if (!store.selectedToken) { message.warning("请先选择游戏角色"); return; }
      const tokenId = store.selectedToken.id;
      if (store.getWebSocketStatus(tokenId) !== "connected") { message.error("WebSocket未连接"); return; }
      loading.value = !0;
      try {
        const res = await store.sendMessageWithPromise(tokenId, "car_getmemberrank", {}, 10000);
        const members = store.gameData?.legionInfo?.info?.members || {};
        const memberList = Object.values(members);
        let result = [];
        const scoreMap = new Map();
        res?.list?.forEach(item => scoreMap.set(item.roleId, item));
        if (memberList.length > 0) {
          result = memberList.map(m => {
            const scoreItem = scoreMap.get(m.roleId);
            return { roleId: m.roleId, name: m.name, headImg: m.headImg, score: scoreItem ? scoreItem.score : 0, power: m.power, rank: scoreItem ? scoreItem.rank : 9999, serverId: m.serverId };
          });
        } else if (res?.list) {
          result = res.list.map(item => ({ roleId: item.roleId, name: item.name, headImg: item.headImg?.replace(/`/g, "").trim(), score: item.score, power: item.power, rank: item.rank, serverId: item.serverId }));
        }
        result.sort((a, b) => b.score !== a.score ? b.score - a.score : (b.power || 0) - (a.power || 0));
        data.value = result;
        result.length > 0 ? message.success("赛车数据加载成功，已按积分从高到低排序") : message.warning("未查询到数据");
      } catch (e) { console.error("查询赛车数据失败:", e); message.error(`查询失败: ${e.message}`); data.value = []; }
      finally { loading.value = !1; }
    };

    const refresh = () => fetchData();
    const exportImage = async () => { /* html2canvas 导出图片 */ };

    return (/* 渲染数据表格 */);
  },
};
```

### 翻译后代码
```vue
<template>
  <div class="car-score-info">
    <n-data-table
      :columns="tableColumns"
      :data="scoreData"
      :loading="loading"
      bordered
      size="small"
      striped
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { useMessage } from 'naive-ui'
import { NDataTable, NAvatar } from 'naive-ui'

const store = useGameStore()
const message = useMessage()

const loading = ref(false)
const scoreData = ref([])

const tableColumns = computed(() => [
  { title: '序号', key: 'index', width: 60, align: 'center', render: (_, idx) => idx + 1 },
  { title: '头像', key: 'headImg', width: 60, align: 'center',
    render: (row) => row.headImg
      ? h(NAvatar, { size: 32, src: row.headImg, round: true, fallbackSrc: '/icons/xiaoyugan.png' })
      : h('div', { style: { width: '32px', height: '32px', borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#999' } }, row.name?.charAt(0) || '?')
  },
  { title: '成员', key: 'name', align: 'left',
    render: (row) => h('div', { style: { display: 'flex', flexDirection: 'column' } },
      [h('span', { style: { fontWeight: '500', color: '#1890ff' } }, row.name),
       h('span', { style: { fontSize: '12px', color: '#999' } }, `ID: ${row.roleId}`)])
  },
  { title: '赛车积分', key: 'score', align: 'center', render: (row) => row.score || '0' },
])

async function fetchData() {
  if (!store.selectedToken) { message.warning('请先选择游戏角色'); return }
  const tokenId = store.selectedToken.id
  if (store.getWebSocketStatus(tokenId) !== 'connected') { message.error('WebSocket未连接'); return }
  loading.value = true
  try {
    const res = await store.sendMessageWithPromise(tokenId, 'car_getmemberrank', {}, 10000)
    const members = store.gameData?.legionInfo?.info?.members || {}
    const memberList = Object.values(members)
    let result = []
    const scoreMap = new Map()
    res?.list?.forEach(item => scoreMap.set(item.roleId, item))

    if (memberList.length > 0) {
      result = memberList.map(m => {
        const scoreItem = scoreMap.get(m.roleId)
        return { roleId: m.roleId, name: m.name, headImg: m.headImg, score: scoreItem ? scoreItem.score : 0, power: m.power, rank: scoreItem ? scoreItem.rank : 9999, serverId: m.serverId }
      })
    } else if (res?.list) {
      result = res.list.map(item => ({
        roleId: item.roleId, name: item.name, headImg: item.headImg?.replace(/`/g, '').trim(),
        score: item.score, power: item.power, rank: item.rank, serverId: item.serverId,
      }))
    }
    result.sort((a, b) => b.score !== a.score ? b.score - a.score : (b.power || 0) - (a.power || 0))
    scoreData.value = result
    result.length > 0 ? message.success('赛车数据加载成功，已按积分从高到低排序') : message.warning('未查询到数据')
  } catch (e) {
    console.error('查询赛车数据失败:', e)
    message.error(`查询失败: ${e.message}`)
    scoreData.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchData())
</script>
```

---

## 2. TowerStatus - 咸将塔爬塔

### 原始代码（编译后核心）
```javascript
const TowerStatus = {
  __name: "TowerStatus",
  setup(t) {
    let stopFlag = !1;
    const stopFn = () => { stopFlag = !0; timer.value && (clearTimeout(timer.value), timer.value = null); isClimbing.value = !1; message.info("已手动停止批量爬塔"); };
    const store = _t(), message = It();
    const isClimbing = Y(!1), timer = Y(null);
    const roleInfo = O(() => store.gameData?.roleInfo || null);
    // 当前层数计算
    const currentFloor = O(() => {
      const tower = roleInfo.value?.role?.tower;
      if (!tower || (!tower.id && tower.id !== 0)) return "0 - 0";
      const id = tower.id, floor = Math.floor(id / 10) + 1, sub = (id % 10) + 1;
      return `${floor} - ${sub}`;
    });
    const energy = O(() => roleInfo.value?.role?.tower?.energy || 0);
    const canClimb = O(() => energy.value > 0 && !isClimbing.value);

    // 批量爬塔
    const startClimb = async () => {
      if (!store.selectedToken) { message.warning("请先选择Token"); return; }
      if (!canClimb.value) { message.warning("体力不足或正在爬塔中"); return; }
      timer.value && (clearTimeout(timer.value), timer.value = null);
      isClimbing.value = !0; stopFlag = !1;
      let count = 0, max = 100;
      timer.value = setTimeout(() => { isClimbing.value = !1; timer.value = null; stopFlag = !0; message.info("批量爬塔已超时自动停止"); }, 60000);
      try {
        const tokenId = store.selectedToken.id;
        for (let i = 0; i < max && !stopFlag; i++) {
          await refreshInfo();
          const tower = roleInfo.value?.role?.tower;
          if ((tower?.energy || 0) <= 0) break;
          await store.sendMessageWithPromise(tokenId, "fight_starttower", {}, 10000);
          count++;
          message.success(`第${count}次爬塔命令已发送`);
          await new Promise(r => setTimeout(r, 2000));
        }
        message.success(`已自动爬塔${count}次，体力已耗尽或达到上限。`);
      } catch (e) { message.error("批量爬塔失败: " + (e.message || "未知错误")); }
      finally { timer.value && (clearTimeout(timer.value), timer.value = null); isClimbing.value = !1; }
    };

    const refreshInfo = async () => {
      if (!store.selectedToken) return;
      try {
        const tokenId = store.selectedToken.id;
        if (store.getWebSocketStatus(tokenId) !== "connected") return;
        store.sendMessage(tokenId, "role_getroleinfo");
        store.sendMessage(tokenId, "tower_getinfo");
      } catch {}
    };

    const wsStatus = O(() => store.selectedToken ? store.getWebSocketStatus(store.selectedToken.id) : "disconnected");
    watch(wsStatus, (newVal, oldVal) => { newVal === "connected" && oldVal !== "connected" && setTimeout(() => refreshInfo(), 1000); });
    watch(() => store.selectedToken, (newVal, oldVal) => { newVal && newVal.id !== oldVal?.id && store.getWebSocketStatus(newVal.id) === "connected" && refreshInfo(); });
    watch(() => store.gameData.towerResult, (newVal, oldVal) => {
      newVal && newVal.timestamp !== oldVal?.timestamp && (newVal.success
        ? (message.success("咸将塔挑战成功！"), newVal.autoReward && setTimeout(() => message.success(`自动领取第${newVal.rewardFloor}层奖励`), 1000))
        : message.error("咸将塔挑战失败"));
      !stopFlag && setTimeout(() => { timer.value && (clearTimeout(timer.value), timer.value = null); isClimbing.value = !1; }, 2000);
    }, { deep: !0 });

    onMounted(() => { store.selectedToken && store.getWebSocketClient(store.selectedToken.id); store.selectedToken && wsStatus.value === "connected" && refreshInfo(); });

    return (/* 渲染：层数显示 + 体力 + 开始/停止按钮 */);
  },
};
```

### 翻译后代码
```vue
<template>
  <div class="tower-status">
    <div class="card-header">
      <img src="/icons/tower.png" alt="爬塔图标" class="status-icon" />
      <div class="status-info">
        <h3>咸将塔</h3>
        <p>一个不小心就过了</p>
      </div>
      <div class="energy-display">
        <img src="/icons/energy.png" alt="小鱼干" class="energy-icon" />
        <span class="energy-count">{{ energy }}</span>
      </div>
    </div>
    <div class="card-content">
      <div class="tower-floor">
        <span class="label">当前层数</span>
        <span class="floor-number">{{ currentFloor }}</span>
      </div>
    </div>
    <div class="card-actions">
      <button :class="['climb-button', { active: canClimb, disabled: !canClimb }]" :disabled="!canClimb" @click="startClimb">
        {{ isClimbing ? '爬塔中...' : '开始爬塔' }}
      </button>
      <button class="stop-button" @click="stopClimb">停止爬塔</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { useMessage } from 'naive-ui'

const store = useGameStore()
const message = useMessage()

let stopFlag = false
const isClimbing = ref(false)
const timer = ref(null)

const roleInfo = computed(() => store.gameData?.roleInfo || null)
const currentFloor = computed(() => {
  const tower = roleInfo.value?.role?.tower
  if (!tower || (!tower.id && tower.id !== 0)) return '0 - 0'
  const id = tower.id
  const floor = Math.floor(id / 10) + 1
  const sub = (id % 10) + 1
  return `${floor} - ${sub}`
})
const energy = computed(() => roleInfo.value?.role?.tower?.energy || 0)
const canClimb = computed(() => energy.value > 0 && !isClimbing.value)

function stopClimb() {
  stopFlag = true
  if (timer.value) { clearTimeout(timer.value); timer.value = null }
  isClimbing.value = false
  message.info('已手动停止批量爬塔')
}

async function startClimb() {
  if (!store.selectedToken) { message.warning('请先选择Token'); return }
  if (!canClimb.value) { message.warning('体力不足或正在爬塔中'); return }
  if (timer.value) { clearTimeout(timer.value); timer.value = null }
  isClimbing.value = true
  stopFlag = false
  let count = 0
  const max = 100
  timer.value = setTimeout(() => {
    isClimbing.value = false
    timer.value = null
    stopFlag = true
    message.info('批量爬塔已超时自动停止')
  }, 60000)
  try {
    const tokenId = store.selectedToken.id
    for (let i = 0; i < max && !stopFlag; i++) {
      await refreshInfo()
      const tower = roleInfo.value?.role?.tower
      if ((tower?.energy || 0) <= 0) break
      await store.sendMessageWithPromise(tokenId, 'fight_starttower', {}, 10000)
      count++
      message.success(`第${count}次爬塔命令已发送`)
      await new Promise(r => setTimeout(r, 2000))
    }
    message.success(`已自动爬塔${count}次，体力已耗尽或达到上限。`)
  } catch (e) {
    message.error('批量爬塔失败: ' + (e.message || '未知错误'))
  } finally {
    if (timer.value) { clearTimeout(timer.value); timer.value = null }
    isClimbing.value = false
  }
}

async function refreshInfo() {
  if (!store.selectedToken) return
  try {
    const tokenId = store.selectedToken.id
    if (store.getWebSocketStatus(tokenId) !== 'connected') return
    store.sendMessage(tokenId, 'role_getroleinfo')
    store.sendMessage(tokenId, 'tower_getinfo')
  } catch {}
}

const wsStatus = computed(() => store.selectedToken ? store.getWebSocketStatus(store.selectedToken.id) : 'disconnected')
watch(wsStatus, (newVal, oldVal) => {
  if (newVal === 'connected' && oldVal !== 'connected') setTimeout(() => refreshInfo(), 1000)
})
watch(() => store.selectedToken, (newVal, oldVal) => {
  if (newVal && newVal.id !== oldVal?.id && store.getWebSocketStatus(newVal.id) === 'connected') refreshInfo()
})
watch(() => store.gameData.towerResult, (newVal, oldVal) => {
  if (!newVal || newVal.timestamp === oldVal?.timestamp) return
  if (newVal.success) {
    message.success('咸将塔挑战成功！')
    if (newVal.autoReward) setTimeout(() => message.success(`自动领取第${newVal.rewardFloor}层奖励`), 1000)
  } else {
    message.error('咸将塔挑战失败')
  }
  if (!stopFlag) setTimeout(() => {
    if (timer.value) { clearTimeout(timer.value); timer.value = null }
    isClimbing.value = false
  }, 2000)
}, { deep: true })

onMounted(() => {
  if (store.selectedToken) store.getWebSocketClient(store.selectedToken.id)
  if (store.selectedToken && wsStatus.value === 'connected') refreshInfo()
})
</script>

<style scoped>
.tower-status { background: #fff; border-radius: 12px; padding: 16px; margin-bottom: 16px; }
.card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.status-icon { width: 40px; height: 40px; }
.status-info h3 { margin: 0; font-size: 16px; }
.status-info p { margin: 0; font-size: 12px; color: #999; }
.energy-display { margin-left: auto; display: flex; align-items: center; gap: 4px; }
.energy-icon { width: 20px; height: 20px; }
.energy-count { font-size: 14px; font-weight: 500; color: #f59e0b; }
.tower-floor { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; }
.label { font-size: 13px; color: #6b7280; }
.floor-number { font-size: 18px; font-weight: 600; color: #1f2937; }
.card-actions { display: flex; gap: 8px; margin-top: 12px; }
.climb-button { flex: 1; padding: 10px; border-radius: 8px; border: none; background: #3b82f6; color: white; cursor: pointer; }
.climb-button.disabled { opacity: 0.5; cursor: not-allowed; }
.stop-button { padding: 10px 16px; border-radius: 8px; border: 1px solid #ef4444; background: white; color: #ef4444; cursor: pointer; }
</style>
```

---

## 3. WeirdTowerStatus - 梦魇/进化塔

### 原始代码（编译后核心）
```javascript
const WeirdTowerStatus = {
  __name: "WeirdTowerStatus",
  setup(t) {
    let stopClimb = !1, stopUseItem = !1, stopMerge = !1;
    const stopClimbFn = () => { stopClimb = !0; climbTimer.value && (clearTimeout(climbTimer.value), climbTimer.value = null); isClimbing.value = !1; message.info("已手动停止批量爬塔"); };
    const stopUseItemFn = () => { stopUseItem = !0; useTimer.value && (clearTimeout(useTimer.value), useTimer.value = null); isUsingItem.value = !1; message.info("已手动停止使用道具"); };
    const store = _t(), message = It();
    const isClimbing = Y(!1), isUsingItem = Y(!1), isMerging = Y(!1);
    const climbTimer = Y(null), useTimer = Y(null), mergeTimer = Y(null);
    const evoTowerInfo = O(() => store.gameData?.evoTowerInfo || null);
    const evoTower = O(() => evoTowerInfo.value?.evoTower || null);
    const towerId = O(() => evoTower.value?.towerId || 0);
    const lotteryLeft = O(() => evoTower.value?.lotteryLeftCnt || 0);
    const currentFloor = O(() => { const id = towerId.value; if (id === 0) return "1-1"; const floor = Math.floor(id / 10) + 1, sub = (id % 10) + 1; return `${floor}-${sub}`; });
    const energy = O(() => evoTower.value?.energy || 0);
    const canClimb = O(() => energy.value > 0 && !isClimbing.value && !isUsingItem.value && !isMerging.value);

    // 活动周期
    const activityWeek = O(() => { /* 同IdentityCard */ });
    const isBlackMarketWeek = O(() => activityWeek.value === "黑市周");

    // 一键使用道具
    const useItems = async () => {
      if (!store.selectedToken) { message.warning("请先选择Token"); return; }
      if (isClimbing.value) { message.warning("正在爬塔中，请稍后再试"); return; }
      if (isMerging.value) { message.warning("正在合成中，请稍后再试"); return; }
      isUsingItem.value = !0; stopUseItem = !1;
      useTimer.value = setTimeout(() => { isUsingItem.value = !1; useTimer.value = null; stopUseItem = !0; message.info("一键使用道具已超时自动停止"); }, 60000);
      try {
        const tokenId = store.selectedToken.id;
        const mergeInfo = await store.sendMessageWithPromise(tokenId, "mergebox_getinfo", { actType: 1 }, 5000);
        const towerInfo = await store.sendMessageWithPromise(tokenId, "evotower_getinfo", {}, 5000);
        if (!mergeInfo?.mergeBox) throw new Error("获取活动信息失败");
        let costTotal = mergeInfo.mergeBox.costTotalCnt || 0;
        let left = towerInfo?.evoTower?.lotteryLeftCnt || 0;
        if (left <= 0) { message.info("没有剩余道具可使用"); isUsingItem.value = !1; useTimer.value && clearTimeout(useTimer.value); return; }
        message.success(`开始使用道具，剩余：${left}，已用：${costTotal}`);
        let used = 0;
        for (; left > 0 && !stopUseItem; ) {
          let pos = {};
          if (costTotal < 2) pos = { gridX: 4, gridY: 5 };
          else if (costTotal < 102) pos = { gridX: 7, gridY: 3 };
          else pos = { gridX: 6, gridY: 3 };
          await store.sendMessageWithPromise(tokenId, "mergebox_openbox", { actType: 1, pos }, 5000);
          costTotal++; left--; used++;
          await new Promise(r => setTimeout(r, 500));
        }
        await store.sendMessageWithPromise(tokenId, "mergebox_claimcostprogress", { actType: 1 }, 5000).catch(() => {});
        message.success(`已使用道具 ${used} 次`);
        await refreshInfo();
      } catch (e) { message.error("使用道具失败: " + (e.message || "未知错误")); }
      finally { useTimer.value && (clearTimeout(useTimer.value), useTimer.value = null); isUsingItem.value = !1; }
    };

    // 一键合成
    const mergeItems = async () => {
      if (!store.selectedToken) { message.warning("请先选择Token"); return; }
      if (isClimbing.value || isUsingItem.value) { message.warning("正在执行其他操作，请稍后再试"); return; }
      isMerging.value = !0; stopMerge = !1;
      mergeTimer.value = setTimeout(() => { isMerging.value = !1; mergeTimer.value = null; stopMerge = !0; message.info("一键合成已超时自动停止"); }, 60000);
      try {
        const tokenId = store.selectedToken.id;
        message.loading("正在执行一键合成...");
        let count = 0;
        const max = 20;
        for (; count < max && !stopMerge; ) {
          count++;
          const info = await store.sendMessageWithPromise(tokenId, "mergebox_getinfo", { actType: 1 }, 5000);
          if (!info?.mergeBox) throw new Error("返回数据缺少 mergeBox");
          // ... 合成逻辑
        }
      } catch (e) { message.error("合成失败: " + e.message); }
      finally { mergeTimer.value && (clearTimeout(mergeTimer.value), mergeTimer.value = null); isMerging.value = !1; }
    };

    return (/* 渲染：层数 + 体力 + 爬塔/使用道具/合成按钮 */);
  },
};
```

### 翻译后代码
```vue
<template>
  <div class="weird-tower-status">
    <div class="card-header">
      <img src="/icons/weird-tower.png" alt="进化塔" class="status-icon" />
      <div class="status-info">
        <h3>进化塔</h3>
        <p>梦魇挑战</p>
      </div>
      <div class="energy-display">
        <span class="energy-count">{{ energy }}</span>
      </div>
    </div>
    <div class="card-content">
      <div class="tower-floor">
        <span class="label">当前层数</span>
        <span class="floor-number">{{ currentFloor }}</span>
      </div>
      <div v-if="activityWeek" class="activity-week">本周活动：{{ activityWeek }}</div>
    </div>
    <div class="card-actions">
      <button :class="['climb-button', { disabled: !canClimb }]" :disabled="!canClimb" @click="startClimb">
        {{ isClimbing ? '爬塔中...' : '开始爬塔' }}
      </button>
      <button :class="['item-button', { disabled: !canUseItem }]" :disabled="!canUseItem" @click="useItems">
        {{ isUsingItem ? '使用中...' : '使用道具' }}
      </button>
      <button :class="['merge-button', { disabled: !canMerge }]" :disabled="!canMerge" @click="mergeItems">
        {{ isMerging ? '合成中...' : '一键合成' }}
      </button>
      <button class="stop-button" @click="stopAll">停止</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { useMessage } from 'naive-ui'

const store = useGameStore()
const message = useMessage()

let stopClimbFlag = false
let stopUseItemFlag = false
let stopMergeFlag = false

const isClimbing = ref(false)
const isUsingItem = ref(false)
const isMerging = ref(false)
const climbTimer = ref(null)
const useTimer = ref(null)
const mergeTimer = ref(null)

const evoTowerInfo = computed(() => store.gameData?.evoTowerInfo || null)
const evoTower = computed(() => evoTowerInfo.value?.evoTower || null)
const towerId = computed(() => evoTower.value?.towerId || 0)
const lotteryLeft = computed(() => evoTower.value?.lotteryLeftCnt || 0)

const currentFloor = computed(() => {
  const id = towerId.value
  if (id === 0) return '1-1'
  const floor = Math.floor(id / 10) + 1
  const sub = (id % 10) + 1
  return `${floor}-${sub}`
})

const energy = computed(() => evoTower.value?.energy || 0)
const canClimb = computed(() => energy.value > 0 && !isClimbing.value && !isUsingItem.value && !isMerging.value)
const canUseItem = computed(() => !isClimbing.value && !isMerging.value && lotteryLeft.value > 0)
const canMerge = computed(() => !isClimbing.value && !isUsingItem.value)

// 活动周期
const activityWeek = computed(() => {
  const now = new Date()
  const baseDate = new Date('2025-12-12T12:00:00')
  const weekMs = 7 * 24 * 60 * 60 * 1000
  const cycleMs = 3 * weekMs
  const diff = now - baseDate
  if (diff < 0) return null
  const remainder = diff % cycleMs
  if (remainder < weekMs) return '黑市周'
  if (remainder < 2 * weekMs) return '招募周'
  return '宝箱周'
})

function stopAll() {
  stopClimbFlag = true
  stopUseItemFlag = true
  stopMergeFlag = true
  if (climbTimer.value) { clearTimeout(climbTimer.value); climbTimer.value = null }
  if (useTimer.value) { clearTimeout(useTimer.value); useTimer.value = null }
  if (mergeTimer.value) { clearTimeout(mergeTimer.value); mergeTimer.value = null }
  isClimbing.value = false
  isUsingItem.value = false
  isMerging.value = false
  message.info('已手动停止所有操作')
}

async function useItems() {
  if (!store.selectedToken) { message.warning('请先选择Token'); return }
  if (isClimbing.value) { message.warning('正在爬塔中，请稍后再试'); return }
  if (isMerging.value) { message.warning('正在合成中，请稍后再试'); return }
  isUsingItem.value = true
  stopUseItemFlag = false
  useTimer.value = setTimeout(() => {
    isUsingItem.value = false
    useTimer.value = null
    stopUseItemFlag = true
    message.info('一键使用道具已超时自动停止')
  }, 60000)
  try {
    const tokenId = store.selectedToken.id
    const mergeInfo = await store.sendMessageWithPromise(tokenId, 'mergebox_getinfo', { actType: 1 }, 5000)
    const towerInfo = await store.sendMessageWithPromise(tokenId, 'evotower_getinfo', {}, 5000)
    if (!mergeInfo?.mergeBox) throw new Error('获取活动信息失败')
    let costTotal = mergeInfo.mergeBox.costTotalCnt || 0
    let left = towerInfo?.evoTower?.lotteryLeftCnt || 0
    if (left <= 0) { message.info('没有剩余道具可使用'); isUsingItem.value = false; if (useTimer.value) clearTimeout(useTimer.value); return }
    message.success(`开始使用道具，剩余：${left}，已用：${costTotal}`)
    let used = 0
    for (; left > 0 && !stopUseItemFlag; ) {
      let pos = {}
      if (costTotal < 2) pos = { gridX: 4, gridY: 5 }
      else if (costTotal < 102) pos = { gridX: 7, gridY: 3 }
      else pos = { gridX: 6, gridY: 3 }
      await store.sendMessageWithPromise(tokenId, 'mergebox_openbox', { actType: 1, pos }, 5000)
      costTotal++; left--; used++
      await new Promise(r => setTimeout(r, 500))
    }
    await store.sendMessageWithPromise(tokenId, 'mergebox_claimcostprogress', { actType: 1 }, 5000).catch(() => {})
    message.success(`已使用道具 ${used} 次`)
    await refreshInfo()
  } catch (e) {
    message.error('使用道具失败: ' + (e.message || '未知错误'))
  } finally {
    if (useTimer.value) { clearTimeout(useTimer.value); useTimer.value = null }
    isUsingItem.value = false
  }
}

async function mergeItems() {
  if (!store.selectedToken) { message.warning('请先选择Token'); return }
  if (isClimbing.value || isUsingItem.value) { message.warning('正在执行其他操作，请稍后再试'); return }
  isMerging.value = true
  stopMergeFlag = false
  mergeTimer.value = setTimeout(() => {
    isMerging.value = false
    mergeTimer.value = null
    stopMergeFlag = true
    message.info('一键合成已超时自动停止')
  }, 60000)
  try {
    const tokenId = store.selectedToken.id
    message.loading('正在执行一键合成...')
    let count = 0
    const max = 20
    for (; count < max && !stopMergeFlag; ) {
      count++
      const info = await store.sendMessageWithPromise(tokenId, 'mergebox_getinfo', { actType: 1 }, 5000)
      if (!info?.mergeBox) throw new Error('返回数据缺少 mergeBox')
      // 合成逻辑...
    }
  } catch (e) {
    message.error('合成失败: ' + e.message)
  } finally {
    if (mergeTimer.value) { clearTimeout(mergeTimer.value); mergeTimer.value = null }
    isMerging.value = false
  }
}

async function refreshInfo() {
  // 刷新信息
}
</script>
```

---

## 4. PeachInfo - 蟠桃园信息

### 原始代码（编译后核心）
```javascript
const PeachInfo = {
  __name: "PeachInfo",
  setup(t) {
    const message = It(), store = _t();
    const legionInfo = O(() => store.gameData?.legionInfo || null);
    const clubInfo = O(() => legionInfo.value?.info || null);

    // 获取本周一日期
    const getMondayDate = () => {
      const now = new Date(), day = now.getDay(), hour = now.getHours();
      let offset = 0;
      day === 0 ? (hour < 18 ? offset = 7 : offset = 0) : offset = day;
      const monday = new Date(now);
      monday.setDate(now.getDate() - offset);
      return `${monday.getFullYear()}/${String(monday.getMonth() + 1).padStart(2, "0")}/${String(monday.getDate()).padStart(2, "0")}`;
    };
    const formatNumber = (q) => q >= 1e8 ? (q / 1e8).toFixed(1) + "亿" : q >= 1e4 ? (q / 1e4).toFixed(1) + "万" : q.toString();
    const isFutureDate = (q) => { const d = new Date(q); return d.getDay() !== 0 || d > Date.now(); };
    const formatDateShort = (q) => { const parts = q.split("/"); return parts.length === 3 ? parts[0].slice(2) + parts[1] + parts[2] : q; };
    const isBattleTime = () => { const now = new Date(), day = now.getDay(), hour = now.getHours(), min = now.getMinutes(); return day === 0 && ((hour >= 18 && hour < 20) || (hour === 20 && min <= 30)); };

    // 弹窗和状态
    const showDetail = Y(!1), selectedPlayer = Y(null), battleData = Y([]);
    const selectedDate = Y(getMondayDate()), loading = Y(!1), targetId = Y("");
    const isQuerying = Y(!1), isPvpRunning = Y(!1);
    const pvpCount = Y(1), isPvpCountValid = Y(!0);

    // 进度统计
    const pvpProgress = ft({ visible: !1, totalCount: 0, completedCount: 0, remainingCount: 0, winCount: 0, lossCount: 0, percentage: 0 });
    const pvpResult = ft({ visible: !1, totalCount: 0, winCount: 0, lossCount: 0, winRate: 0, ourDieRate: 0, enemyDieRate: 0, resultCount: [] });
    const pvpLogs = Y([]);
    const dieStats = ft({ ourDieHeroGameCount: 0, enemyDieHeroGameCount: 0 });

    // 查询玩家详情（与排行榜组件相同逻辑）
    const queryPlayer = async (roleId) => { /* ... */ };
    // 连续切磋（与排行榜组件相同逻辑）
    const startPvp = async () => { /* ... */ };

    return (/* 渲染：战绩表格 + 查询弹窗 + 切磋功能 */);
  },
};
```

### 翻译后代码
```vue
<template>
  <div class="peach-info">
    <div class="date-selector">
      <n-date-picker v-model:value="selectedDate" type="date" />
      <n-button @click="fetchBattleData">查询战绩</n-button>
    </div>
    <n-data-table :columns="battleColumns" :data="battleData" :loading="loading" bordered size="small" />

    <!-- 玩家详情弹窗 -->
    <n-modal v-model:show="showDetail" preset="card" title="玩家详情" style="width: 90%; max-width: 700px">
      <PlayerDetail v-if="selectedPlayer" :player="selectedPlayer" />
      <div class="pvp-section">
        <n-input-number v-model:value="pvpCount" :min="1" :max="100" />
        <n-button type="primary" :loading="isPvpRunning" @click="startPvp">开始切磋</n-button>
      </div>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { useMessage } from 'naive-ui'
import { NDataTable, NModal, NButton, NInputNumber, NDatePicker } from 'naive-ui'

const store = useGameStore()
const message = useMessage()

const showDetail = ref(false)
const selectedPlayer = ref(null)
const battleData = ref([])
const selectedDate = ref(getMondayDate())
const loading = ref(false)
const isPvpRunning = ref(false)
const pvpCount = ref(1)

function getMondayDate() {
  const now = new Date(), day = now.getDay(), hour = now.getHours()
  let offset = 0
  day === 0 ? (hour < 18 ? offset = 7 : offset = 0) : offset = day
  const monday = new Date(now)
  monday.setDate(now.getDate() - offset)
  return `${monday.getFullYear()}/${String(monday.getMonth() + 1).padStart(2, '0')}/${String(monday.getDate()).padStart(2, '0')}`
}

function formatNumber(num) {
  if (!num) return '0'
  if (num >= 1e8) return (num / 1e8).toFixed(1) + '亿'
  if (num >= 1e4) return (num / 1e4).toFixed(1) + '万'
  return num.toString()
}

async function fetchBattleData() {
  // 查询蟠桃园战绩
}

async function queryPlayer(roleId) {
  // 查询玩家详情
}

async function startPvp() {
  // 连续切磋
}

const battleColumns = [
  { title: '排名', key: 'rank', width: 60 },
  { title: '玩家', key: 'name' },
  { title: '积分', key: 'score' },
  { title: '击杀', key: 'kill' },
  { title: '操作', key: 'actions', render: (row) => h(NButton, { size: 'small', onClick: () => queryPlayer(row.roleId) }, { default: () => '查询' }) },
]
</script>
```

---

## 5. LegionWarMap - 盐场地图（Canvas）

### 原始代码（编译后核心）
```javascript
const LegionWarMap = {
  __name: "LegionWarMap",
  setup(t) {
    const message = It(), store = _t();
    const canvasRef = zu(); // useTemplateRef
    const mapData = Y(Jr());
    const { isConnected, connecting, validData, battlefieldId, legionDetails, isJoined } = Zr(mapData);
    const isExporting = Y(!1);

    // 导出图片
    const exportImage = async () => {
      const el = document.querySelector(".legion-war-map-card .main-content-layout");
      if (!el) { message.error("未找到导出内容"); return; }
      isExporting.value = !0;
      try {
        const isMobile = window.innerWidth < 768;
        const origWidth = el.style.width, origMaxWidth = el.style.maxWidth;
        isMobile ? (el.style.width = "100%", el.style.maxWidth = "100%") : (el.style.width = "auto", el.style.maxWidth = "none");
        await new Promise(r => setTimeout(r, 100));
        const canvas = await html2canvas(el, { useCORS: !0, scale: isMobile ? 1.5 : 2, backgroundColor: "#ffffff", ignoreElements: (e) => e.classList.contains("no-export") });
        el.style.width = origWidth; el.style.maxWidth = origMaxWidth;
        const link = document.createElement("a");
        link.download = `盐场地图_${formatDate("yyyyMMdd_HHmmss")}.png`;
        link.href = canvas.toDataURL("image/png"); link.click();
        message.success("导出成功");
      } catch (e) { console.error("导出失败:", e); message.error("导出失败"); }
      finally { isExporting.value = !1; }
    };

    // 计算联盟分组数据
    const allianceData = O(() => {
      if (!validData.value?.legionInfo) return [];
      return Object.values(validData.value.legionInfo)
        .map(item => {
          const detail = legionDetails.value[item.id] || {};
          const allianceName = detail.announcement ? parseAnnouncement(detail.announcement) : "未知联盟";
          const redCount = detail.quenchNum !== void 0 ? detail.quenchNum : item.redCount;
          return { ...item, announcement: detail.announcement || "", alliance: allianceName, redCount };
        })
        .sort((a, b) => b.redCount !== a.redCount ? b.redCount - a.redCount : (a.power && b.power && b.power !== a.power ? b.power - a.power : parseInt(a.id) - parseInt(b.id)));
    });

    // 按联盟分组
    const groupedData = O(() => {
      const groups = {};
      ["大联盟", "曦盟", "正义联盟", "龙盟", "未知联盟"].forEach(name => groups[name] = []);
      allianceData.value.forEach(item => { const name = item.alliance; groups[name] ? groups[name].push(item) : groups["未知联盟"].push(item); });
      return groups;
    });

    // Canvas 六边形地图绘制
    const dpr = window.devicePixelRatio || 1;
    let hexRadius = 15.5, hexWidth = 2 * hexRadius, hexHeight = Math.sqrt(3) * hexRadius;
    const grid = Array.from({ length: 41 }, () => Array.from({ length: 41 }, () => 0));

    const getTypeColor = (type) => {
      switch (type) {
        case 1: return "#4477CE"; case 2: return "#D835D8"; case 3: return "#F9B500";
        case 4: return "#D21E1E"; case 5: return "#2B2B2B"; case 6: return "#000000";
        case 9: return "#4477CE"; default: return "#cccccc";
      }
    };
    const getTypeLabel = (type) => {
      switch (type) { case 1: return "小"; case 2: return "中"; case 3: return "大"; case 4: return "本"; case 5: return "城"; case 6: return "核"; default: return ""; }
    };

    const drawHexagon = (ctx, x, y, color, label) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) { const angle = (2 * Math.PI / 6) * i, px = x + hexRadius * Math.cos(angle), py = y + hexRadius * Math.sin(angle); i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); }
      ctx.closePath(); ctx.fillStyle = color; ctx.fill(); ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 1; ctx.stroke();
    };

    const allianceColors = { "大联盟": "#667eea", "曦盟": "#18a058", "正义联盟": "#2080f0", "龙盟": "#d03050", "未知联盟": "#f5a623" };

    const drawMap = () => {
      const ctx = canvasRef.value?.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, ctx.canvas.width / dpr, ctx.canvas.height / dpr);
      grid.forEach(row => row.fill(0));
      // ... 绘制六边形网格和建筑
    };

    watch(validData, () => nextTick(() => drawMap()), { deep: !0 });
    watch(legionDetails, () => nextTick(() => drawMap()), { deep: !0 });
    watch(isConnected, (val) => !val && nextTick(() => drawMap()));

    return (/* 渲染：Canvas地图 + 联盟列表 + 导出按钮 */);
  },
};
```

### 翻译后代码
```vue
<template>
  <div class="legion-war-map">
    <div class="map-header">
      <h2>盐场地图</h2>
      <n-button :loading="isExporting" @click="exportImage">导出图片</n-button>
    </div>
    <div class="main-content-layout">
      <canvas ref="canvasRef" class="war-map-canvas"></canvas>
      <div class="alliance-list">
        <div v-for="(items, name) in groupedData" :key="name" class="alliance-group">
          <h4 :style="{ color: allianceColors[name] }">{{ name }} ({{ items.length }})</h4>
          <div v-for="item in items" :key="item.id" class="alliance-item">
            <span>{{ item.name }}</span>
            <span>红{{ item.redCount }}</span>
            <span>{{ formatNumber(item.power) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useMessage } from 'naive-ui'
import html2canvas from 'html2canvas'

const message = useMessage()
const canvasRef = ref(null)
const isExporting = ref(false)

// 模拟数据（实际从WebSocket获取）
const validData = ref({ legionInfo: {} })
const legionDetails = ref({})

const allianceData = computed(() => {
  if (!validData.value?.legionInfo) return []
  return Object.values(validData.value.legionInfo)
    .map(item => {
      const detail = legionDetails.value[item.id] || {}
      const allianceName = detail.announcement ? parseAnnouncement(detail.announcement) : '未知联盟'
      const redCount = detail.quenchNum !== undefined ? detail.quenchNum : item.redCount
      return { ...item, alliance: allianceName, redCount }
    })
    .sort((a, b) => b.redCount !== a.redCount ? b.redCount - a.redCount : (b.power || 0) - (a.power || 0))
})

const groupedData = computed(() => {
  const groups = {}
  ;['大联盟', '曦盟', '正义联盟', '龙盟', '未知联盟'].forEach(name => groups[name] = [])
  allianceData.value.forEach(item => {
    const name = item.alliance
    groups[name] ? groups[name].push(item) : groups['未知联盟'].push(item)
  })
  return groups
})

const allianceColors = { '大联盟': '#667eea', '曦盟': '#18a058', '正义联盟': '#2080f0', '龙盟': '#d03050', '未知联盟': '#f5a623' }

function formatNumber(num) {
  if (!num) return '0'
  if (num >= 1e8) return (num / 1e8).toFixed(2) + '亿'
  if (num >= 1e4) return (num / 1e4).toFixed(2) + '万'
  return num.toString()
}

function parseAnnouncement(text) {
  // 解析公告获取联盟名称
  return text || '未知联盟'
}

async function exportImage() {
  const el = document.querySelector('.legion-war-map .main-content-layout')
  if (!el) { message.error('未找到导出内容'); return }
  isExporting.value = true
  try {
    const isMobile = window.innerWidth < 768
    const origWidth = el.style.width, origMaxWidth = el.style.maxWidth
    isMobile ? (el.style.width = '100%', el.style.maxWidth = '100%') : (el.style.width = 'auto', el.style.maxWidth = 'none')
    await new Promise(r => setTimeout(r, 100))
    const canvas = await html2canvas(el, { useCORS: true, scale: isMobile ? 1.5 : 2, backgroundColor: '#ffffff' })
    el.style.width = origWidth; el.style.maxWidth = origMaxWidth
    const link = document.createElement('a')
    link.download = `盐场地图_${new Date().toISOString().slice(0, 10)}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
    message.success('导出成功')
  } catch (e) {
    console.error('导出失败:', e)
    message.error('导出失败')
  } finally {
    isExporting.value = false
  }
}

// Canvas 绘制
const dpr = window.devicePixelRatio || 1
const hexRadius = 15.5
const hexWidth = 2 * hexRadius
const hexHeight = Math.sqrt(3) * hexRadius

function drawHexagon(ctx, x, y, color) {
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const angle = (2 * Math.PI / 6) * i
    const px = x + hexRadius * Math.cos(angle)
    const py = y + hexRadius * Math.sin(angle)
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
  }
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 1
  ctx.stroke()
}

function drawMap() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)
  // 绘制六边形网格...
}

watch([validData, legionDetails], () => nextTick(drawMap), { deep: true })
onMounted(() => nextTick(drawMap))
</script>

<style scoped>
.legion-war-map { padding: 16px; }
.map-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.main-content-layout { display: flex; gap: 16px; }
.war-map-canvas { flex: 1; border: 1px solid #e5e7eb; border-radius: 8px; }
.alliance-list { width: 280px; }
.alliance-group { margin-bottom: 12px; }
.alliance-group h4 { margin: 0 0 8px; font-size: 14px; }
.alliance-item { display: flex; justify-content: space-between; padding: 4px 0; font-size: 12px; border-bottom: 1px solid #f3f4f6; }
</style>
```

---

## 6. LegionWarStatistics - 盐场战况统计

### 原始代码（编译后核心）
```javascript
const LegionWarStatistics = {
  __name: "LegionWarStatistics",
  setup(t) {
    const message = It(), store = _t(), mapData = zu();
    const tabValue = Y("legion"); // legion | individual
    const isExporting = Y(!1), tableWidth = Y(600);

    const { isConnected, connecting, validData, battlefieldId, lastUpdateTime, legionDetails, isJoined } = Zr(mapData);

    // 导出图片
    const exportImage = async () => { /* 同LegionWarMap */ };

    // 俱乐部战况数据
    const legionStats = O(() => {
      if (!validData.value?.legionInfo) return [];
      return Object.values(validData.value.legionInfo)
        .map(item => {
          const detail = legionDetails.value[item.id];
          const redCount = detail?.quenchNum !== void 0 ? detail.quenchNum : item.redCount;
          const power = detail?.power !== void 0 ? detail.power : item.power;
          return { ...item, redCount, power, key: item.id };
        })
        .sort((a, b) => b.score - a.score);
    });

    // 个人战况数据
    const individualStats = O(() => {
      if (!validData.value?.memberInfo) return [];
      const myLegionId = store.gameData?.roleInfo?.role?.legionId;
      return Object.values(validData.value.memberInfo)
        .filter(item => item.legionId == myLegionId)
        .map((item, idx) => ({ ...item, key: idx, kd: item.die > 0 ? (item.kill / item.die).toFixed(2) : item.kill.toFixed(2) }))
        .sort((a, b) => b.kill - a.kill);
    });

    // 俱乐部表格列
    const legionColumns = [
      { title: "排名", key: "rank", width: 60, render: (row, idx) => idx + 1 },
      { title: "俱乐部名称", key: "name", width: 150 },
      { title: "击杀数", key: "killCnt", sorter: (a, b) => a.killCnt - b.killCnt },
      { title: "免费复活", key: "reviveCount", render: (row) => `${row.reviveCount}/150` },
      { title: "积分", key: "score", sorter: (a, b) => a.score - b.score },
      { title: "红数", key: "redCount", sorter: (a, b) => a.redCount - b.redCount },
      { title: "战力", key: "power", render: (row) => formatNumber(row.power), sorter: (a, b) => a.power - b.power },
      { title: "人数", key: "participantsCount", render: (row) => `${row.participantsCount}/30` },
      { title: "花费总丹", key: "danCount", sorter: (a, b) => a.danCount - b.danCount },
      { title: "四圣", key: "blessingInfo", render: (row) => `${row.blessingCount}个共${row.blessingScore}分` },
    ];

    // 个人表格列
    const individualColumns = [
      { title: "排名", key: "rank", width: 60, render: (row, idx) => idx + 1 },
      { title: "名称", key: "name", width: 120 },
      { title: "击杀数", key: "kill", sorter: (a, b) => a.kill - b.kill },
      { title: "死亡次数", key: "die", sorter: (a, b) => a.die - b.die },
      { title: "已复活次数", key: "revive", render: (row) => `${row.revive}/5` },
      { title: "积分", key: "score", sorter: (a, b) => a.score - b.score },
      { title: "刨地", key: "digGround", sorter: (a, b) => a.digGround - b.digGround },
      { title: "复活丹", key: "dan", sorter: (a, b) => a.dan - b.dan },
      { title: "K/D", key: "kd", sorter: (a, b) => parseFloat(a.kd) - parseFloat(b.kd) },
    ];

    const getRowClass = (row) => {
      const myLegionId = store.gameData?.roleInfo?.role?.legionId;
      return row.id == myLegionId ? "my-legion-row" : "";
    };

    const toggleConnection = async () => { if (isJoined.value) mapData.disconnect(!0); else try { await mapData.connect(); } catch (e) { message.error(e.message); } };
    const refreshData = () => { try { mapData.refreshData(); message.success("已发送刷新请求"); } catch (e) { message.warning(e.message); } };

    onMounted(() => { try { mapData.connect().catch(e => console.error("Auto connect failed", e)); } catch {} });
    onUnmounted(() => { mapData.disconnect(); });

    return (/* 渲染：Tab切换 + 数据表格 + 连接控制 */);
  },
};
```

### 翻译后代码
```vue
<template>
  <div class="legion-war-statistics">
    <div class="header-section">
      <div class="header-left">
        <img src="/icons/salt-field.png" alt="盐场图标" class="header-icon" />
        <div class="header-title">
          <h2>盐场实时战况</h2>
          <p>实时获取俱乐部盐场数据</p>
        </div>
      </div>
    </div>
    <div class="controls">
      <n-radio-group v-model:value="tabValue" size="small">
        <n-radio-button value="legion">战队战况</n-radio-button>
        <n-radio-button value="individual">个人战况</n-radio-button>
      </n-radio-group>
      <n-tag :type="connecting ? 'success' : 'error'">{{ connecting ? '已连接' : '未连接' }}</n-tag>
      <n-button size="small" @click="toggleConnection">{{ isJoined ? '断开' : '连接' }}</n-button>
      <n-button size="small" @click="refreshData">刷新</n-button>
      <n-button size="small" :loading="isExporting" @click="exportImage">导出图片</n-button>
    </div>
    <div class="table-content">
      <n-data-table
        v-if="tabValue === 'legion'"
        :columns="legionColumns"
        :data="legionStats"
        :row-class-name="getRowClass"
        bordered
        size="small"
      />
      <n-data-table
        v-else
        :columns="individualColumns"
        :data="individualStats"
        bordered
        size="small"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { useMessage } from 'naive-ui'
import { NDataTable, NRadioGroup, NRadioButton, NTag, NButton } from 'naive-ui'

const store = useGameStore()
const message = useMessage()

const tabValue = ref('legion')
const isExporting = ref(false)
const isJoined = ref(false)
const connecting = ref(false)
const validData = ref({ legionInfo: {}, memberInfo: {} })
const legionDetails = ref({})

const legionStats = computed(() => {
  if (!validData.value?.legionInfo) return []
  return Object.values(validData.value.legionInfo)
    .map(item => {
      const detail = legionDetails.value[item.id]
      const redCount = detail?.quenchNum !== undefined ? detail.quenchNum : item.redCount
      const power = detail?.power !== undefined ? detail.power : item.power
      return { ...item, redCount, power, key: item.id }
    })
    .sort((a, b) => b.score - a.score)
})

const individualStats = computed(() => {
  if (!validData.value?.memberInfo) return []
  const myLegionId = store.gameData?.roleInfo?.role?.legionId
  return Object.values(validData.value.memberInfo)
    .filter(item => item.legionId === myLegionId)
    .map((item, idx) => ({ ...item, key: idx, kd: item.die > 0 ? (item.kill / item.die).toFixed(2) : item.kill.toFixed(2) }))
    .sort((a, b) => b.kill - a.kill)
})

const legionColumns = [
  { title: '排名', key: 'rank', width: 60, render: (_, idx) => idx + 1 },
  { title: '俱乐部名称', key: 'name', width: 150 },
  { title: '击杀数', key: 'killCnt', sorter: (a, b) => a.killCnt - b.killCnt },
  { title: '免费复活', key: 'reviveCount', render: (row) => `${row.reviveCount}/150` },
  { title: '积分', key: 'score', sorter: (a, b) => a.score - b.score },
  { title: '红数', key: 'redCount', sorter: (a, b) => a.redCount - b.redCount },
  { title: '战力', key: 'power', render: (row) => formatNumber(row.power), sorter: (a, b) => a.power - b.power },
  { title: '人数', key: 'participantsCount', render: (row) => `${row.participantsCount}/30` },
  { title: '花费总丹', key: 'danCount', sorter: (a, b) => a.danCount - b.danCount },
  { title: '四圣', key: 'blessingInfo', render: (row) => `${row.blessingCount}个共${row.blessingScore}分` },
]

const individualColumns = [
  { title: '排名', key: 'rank', width: 60, render: (_, idx) => idx + 1 },
  { title: '名称', key: 'name', width: 120 },
  { title: '击杀数', key: 'kill', sorter: (a, b) => a.kill - b.kill },
  { title: '死亡次数', key: 'die', sorter: (a, b) => a.die - b.die },
  { title: '已复活次数', key: 'revive', render: (row) => `${row.revive}/5` },
  { title: '积分', key: 'score', sorter: (a, b) => a.score - b.score },
  { title: '刨地', key: 'digGround', sorter: (a, b) => a.digGround - b.digGround },
  { title: '复活丹', key: 'dan', sorter: (a, b) => a.dan - b.dan },
  { title: 'K/D', key: 'kd', sorter: (a, b) => parseFloat(a.kd) - parseFloat(b.kd) },
]

function getRowClass(row) {
  const myLegionId = store.gameData?.roleInfo?.role?.legionId
  return row.id === myLegionId ? 'my-legion-row' : ''
}

function formatNumber(num) {
  if (!num) return '0'
  if (num >= 1e8) return (num / 1e8).toFixed(2) + '亿'
  if (num >= 1e4) return (num / 1e4).toFixed(2) + '万'
  return num.toString()
}

async function toggleConnection() {
  if (isJoined.value) { /* disconnect */ }
  else { /* connect */ }
}

function refreshData() {
  message.success('已发送刷新请求')
}

async function exportImage() {
  // 导出图片逻辑
}

onMounted(() => { /* auto connect */ })
onUnmounted(() => { /* disconnect */ })
</script>

<style scoped>
.legion-war-statistics { padding: 16px; }
.header-section { display: flex; align-items: center; margin-bottom: 16px; }
.header-left { display: flex; align-items: center; gap: 12px; }
.header-icon { width: 40px; height: 40px; }
.header-title h2 { margin: 0; font-size: 18px; }
.header-title p { margin: 0; font-size: 12px; color: #999; }
.controls { display: flex; gap: 12px; align-items: center; margin-bottom: 16px; }
.table-content { overflow-x: auto; }
.my-legion-row { background: #fff7e6 !important; }
</style>
```

---

## 7. FightPvp - 切磋模块

### 原始代码（编译后核心）
```javascript
const FightPvp = {
  __name: "FightPvp",
  props: { visible: Boolean, inline: Boolean },
  emits: ["update:visible"],
  setup(t, { expose, emit }) {
    const legacyConfig = Jt, props = t, emitFn = emit;
    const message = It(), store = _t();
    const visibleModel = O({ get: () => props.visible, set: (v) => emitFn("update:visible", v) });
    const resultData = Y(null), loading = Y(!1), statusText = Y("正在查询对手信息...");
    const targetIdInput = Y(""), targetId = Y("");
    const selectedPlayer = Y(null), pvpCount = Y(1), pvpResult = Y(null);
    watch(targetIdInput, (newVal, oldVal) => { newVal !== oldVal && (pvpResult.value = null); });

    const quickOptions = [{ label: "1", value: 1 }, { label: "10", value: 10 }, { label: "25", value: 25 }, { label: "50", value: 50 }];
    const currentPage = Y(1), pageSize = Y(20);
    const totalPages = O(() => pvpResult.value ? Math.ceil(Object.keys(pvpResult.value).length / pageSize.value) : 0);
    const pagedData = O(() => { if (!pvpResult.value) return {}; const start = (currentPage.value - 1) * pageSize.value, end = start + pageSize.value; return Object.fromEntries(Object.entries(pvpResult.value).slice(start, end)); });

    const formatNumber = (num) => num >= 1e8 ? (num / 1e8).toFixed(2) + "亿" : num >= 1e4 ? (num / 1e4).toFixed(2) + "万" : num.toString();

    // 执行切磋
    const doPvp = async () => {
      if (!store.selectedToken) { message.warning("请先选择游戏角色"); return; }
      const tokenId = store.selectedToken.id;
      if (store.getWebSocketStatus(tokenId) !== "connected") { message.error("WebSocket未连接"); return; }
      loading.value = !0; statusText.value = "正在进行切磋，请稍候...";
      try {
        let wins = 0, ourDieTotal = 0, enemyDieTotal = 0, logs = [];
        for (let i = 0; i < pvpCount.value; i++) {
          const res = await store.sendMessageWithPromise(tokenId, "fight_startpvp", { targetId: targetId.value }, 5000);
          if (!res.battleData) { pvpResult.value = null; message.warning("切磋错误"); return; }
          let ourDie = 0; res.battleData.result.sponsor.teamInfo.forEach(h => { h.hp == 0 && ourDie++; }); ourDieTotal += ourDie;
          let enemyDie = 0; res.battleData.result.accept.teamInfo.forEach(h => { h.hp == 0 && enemyDie++; }); enemyDieTotal += enemyDie;
          const log = {
            leftName: res.battleData.leftTeam.name, leftheadImg: res.battleData.leftTeam.headImg, leftpower: formatNumber(res.battleData.leftTeam.power),
            rightName: res.battleData.rightTeam.name, rightheadImg: res.battleData.rightTeam.headImg, rightpower: formatNumber(res.battleData.rightTeam.power),
            leftDieHero: ourDie, rightDieHero: enemyDie, isWin: !!res.battleData.result.isWin,
          };
          res.battleData.result.isWin && wins++; logs.push(log);
        }
        const result = { winCount: wins, ourTotalDieHeroCount: ourDieTotal, enemyTotalDieHeroCount: enemyDieTotal, resultCount: logs };
        pvpResult.value = result; message.success("切磋完成"); return result;
      } catch (e) { message.error(`查询失败: ${e.message}`); pvpResult.value = null; }
      finally { loading.value = !1; statusText.value = "正在查询对手信息..."; }
    };

    // 查询对手信息
    const queryOpponent = async () => {
      if (!store.selectedToken) { message.warning("请先选择游戏角色"); return; }
      const tokenId = store.selectedToken.id;
      if (store.getWebSocketStatus(tokenId) !== "connected") { message.error("WebSocket未连接"); return; }
      pvpResult.value = null; loading.value = !0; statusText.value = "正在查询对手信息...";
      try {
        const res = await store.sendMessageWithPromise(tokenId, "rank_getroleinfo", { bottleType: 0, includeBottleTeam: !1, isSearch: !1, roleId: targetId.value }, 5000);
        if (!res.roleInfo && !res.legionInfo) { selectedPlayer.value = null; message.warning("未查询到对手信息"); return; }
        const data = {};
        const heroData = processHeroes(res.roleInfo.heroes);
        const pearlInfo = processPearlInfo(res.roleInfo);
        heroData.heroList.forEach(h => { h.PearlInfo = pearlInfo[h.artifactId] || {}; });
        data.legionName = res.legionInfo?.name || "无俱乐部";
        data.legionRed = res.legionInfo?.statistics["battle:red:quench"] || "无";
        data.legionMaxRed = res.legionInfo?.statistics["red:quench"] || "无";
        data.MaxPower = formatNumber(res.legionInfo?.statistics["max:power"] || "0");
        data.heroList = heroData.heroList;
        data.headImg = res.roleInfo.headImg;
        data.lordWeaponId = formatWeaponId(res.roleInfo.lordWeaponId);
        data.name = res.roleInfo.name;
        data.power = formatNumber(res.roleInfo.power);
        data.serverName = res.roleInfo.serverName;
        data.hole = heroData.holeCount;
        data.red = heroData.redCount;
        data.legacy = res.roleInfo.legacy?.color || 0;
        selectedPlayer.value = data; message.success("对手信息加载成功"); return data;
      } catch (e) { message.error(`查询失败: ${e.message}`); pvpResult.value = null; }
      finally { loading.value = !1; statusText.value = "正在查询对手信息..."; }
    };

    return (/* 渲染：目标ID输入 + 查询/切磋按钮 + 结果展示 */);
  },
};
```

### 翻译后代码
```vue
<template>
  <div class="fight-pvp">
    <div class="pvp-input-section">
      <n-input v-model:value="targetIdInput" placeholder="输入对手ID" />
      <n-button type="primary" :loading="loading" @click="queryOpponent">查询</n-button>
    </div>

    <div v-if="selectedPlayer" class="opponent-info">
      <div class="player-header">
        <img :src="selectedPlayer.headImg" class="player-avatar" />
        <div class="player-meta">
          <h4>{{ selectedPlayer.name }}</h4>
          <p>{{ selectedPlayer.serverName }} | {{ selectedPlayer.legionName }}</p>
          <p>战力: {{ selectedPlayer.power }} | 红淬: {{ selectedPlayer.red }}</p>
        </div>
      </div>
      <div class="hero-list">
        <div v-for="hero in selectedPlayer.heroList" :key="hero.heroId" class="hero-card">
          <img :src="hero.heroAvate" class="hero-avatar" />
          <span>{{ hero.heroName }}</span>
          <span class="red">红{{ hero.red }}</span>
        </div>
      </div>
      <div class="pvp-actions">
        <n-radio-group v-model:value="pvpCount" size="small">
          <n-radio-button v-for="opt in quickOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</n-radio-button>
        </n-radio-group>
        <n-button type="primary" :loading="loading" @click="doPvp">开始切磋</n-button>
      </div>
    </div>

    <div v-if="pvpResult" class="pvp-result">
      <h4>切磋结果</h4>
      <p>胜: {{ pvpResult.winCount }} / {{ pvpCount }}</p>
      <p>我方阵亡英雄: {{ pvpResult.ourTotalDieHeroCount }}</p>
      <p>敌方阵亡英雄: {{ pvpResult.enemyTotalDieHeroCount }}</p>
      <n-data-table :columns="resultColumns" :data="pvpResult.resultCount" size="small" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useGameStore } from '@/stores/game'
import { useMessage } from 'naive-ui'
import { NInput, NButton, NRadioGroup, NRadioButton, NDataTable } from 'naive-ui'

const store = useGameStore()
const message = useMessage()

const targetIdInput = ref('')
const targetId = ref('')
const selectedPlayer = ref(null)
const loading = ref(false)
const pvpCount = ref(1)
const pvpResult = ref(null)

const quickOptions = [{ label: '1', value: 1 }, { label: '10', value: 10 }, { label: '25', value: 25 }, { label: '50', value: 50 }]

watch(targetIdInput, (newVal, oldVal) => {
  if (newVal !== oldVal) pvpResult.value = null
})

function formatNumber(num) {
  if (!num) return '0'
  if (num >= 1e8) return (num / 1e8).toFixed(2) + '亿'
  if (num >= 1e4) return (num / 1e4).toFixed(2) + '万'
  return num.toString()
}

function processHeroes(heroes) {
  let redCount = 0, holeCount = 0, heroList = []
  Object.values(heroes || {}).forEach(hero => {
    const config = getHeroConfig(hero.heroId) || {}
    const equipStats = calcEquipment(hero.equipment)
    const item = {
      heroId: hero.heroId, artifactId: hero.artifactId || '', power: formatNumber(hero.power),
      star: hero.star, equipment: hero.equipment, heroName: config.name,
      heroAvate: config.avatar, level: hero.level, hole: equipStats.holeCount, red: equipStats.redCount,
      HolyBeast: hero.hB?.active, HBlevel: hero.hB?.order || 0,
    }
    redCount += item.red; holeCount += item.hole; heroList.push(item)
  })
  return { redCount, holeCount, heroList: heroList.sort((a, b) => a.heroSort - b.heroSort) }
}

async function queryOpponent() {
  if (!store.selectedToken) { message.warning('请先选择游戏角色'); return }
  const tokenId = store.selectedToken.id
  if (store.getWebSocketStatus(tokenId) !== 'connected') { message.error('WebSocket未连接'); return }
  targetId.value = targetIdInput.value
  pvpResult.value = null
  loading.value = true
  try {
    const res = await store.sendMessageWithPromise(tokenId, 'rank_getroleinfo', { bottleType: 0, includeBottleTeam: false, isSearch: false, roleId: targetId.value }, 5000)
    if (!res.roleInfo && !res.legionInfo) { selectedPlayer.value = null; message.warning('未查询到对手信息'); return }
    const heroData = processHeroes(res.roleInfo.heroes)
    const pearlInfo = processPearlInfo(res.roleInfo)
    heroData.heroList.forEach(h => { h.PearlInfo = pearlInfo[h.artifactId] || {} })
    selectedPlayer.value = {
      legionName: res.legionInfo?.name || '无俱乐部', legionRed: res.legionInfo?.statistics?.['battle:red:quench'] || '无',
      legionMaxRed: res.legionInfo?.statistics?.['red:quench'] || '无', MaxPower: formatNumber(res.legionInfo?.statistics?.['max:power'] || '0'),
      heroList: heroData.heroList, headImg: res.roleInfo.headImg, lordWeaponId: res.roleInfo.lordWeaponId,
      name: res.roleInfo.name, power: formatNumber(res.roleInfo.power), serverName: res.roleInfo.serverName,
      hole: heroData.holeCount, red: heroData.redCount, legacy: res.roleInfo.legacy?.color || 0,
    }
    message.success('对手信息加载成功')
  } catch (e) {
    message.error(`查询失败: ${e.message}`)
    pvpResult.value = null
  } finally {
    loading.value = false
  }
}

async function doPvp() {
  if (!store.selectedToken) { message.warning('请先选择游戏角色'); return }
  const tokenId = store.selectedToken.id
  if (store.getWebSocketStatus(tokenId) !== 'connected') { message.error('WebSocket未连接'); return }
  loading.value = true
  try {
    let wins = 0, ourDieTotal = 0, enemyDieTotal = 0, logs = []
    for (let i = 0; i < pvpCount.value; i++) {
      const res = await store.sendMessageWithPromise(tokenId, 'fight_startpvp', { targetId: targetId.value }, 5000)
      if (!res.battleData) { pvpResult.value = null; message.warning('切磋错误'); return }
      let ourDie = 0
      res.battleData.result.sponsor.teamInfo.forEach(h => { h.hp === 0 && ourDie++ })
      ourDieTotal += ourDie
      let enemyDie = 0
      res.battleData.result.accept.teamInfo.forEach(h => { h.hp === 0 && enemyDie++ })
      enemyDieTotal += enemyDie
      const log = {
        leftName: res.battleData.leftTeam.name, leftheadImg: res.battleData.leftTeam.headImg, leftpower: formatNumber(res.battleData.leftTeam.power),
        rightName: res.battleData.rightTeam.name, rightheadImg: res.battleData.rightTeam.headImg, rightpower: formatNumber(res.battleData.rightTeam.power),
        leftDieHero: ourDie, rightDieHero: enemyDie, isWin: !!res.battleData.result.isWin,
      }
      if (res.battleData.result.isWin) wins++
      logs.push(log)
    }
    pvpResult.value = { winCount: wins, ourTotalDieHeroCount: ourDieTotal, enemyTotalDieHeroCount: enemyDieTotal, resultCount: logs }
    message.success('切磋完成')
  } catch (e) {
    message.error(`查询失败: ${e.message}`)
    pvpResult.value = null
  } finally {
    loading.value = false
  }
}

const resultColumns = [
  { title: '场次', key: 'index', width: 60, render: (_, idx) => idx + 1 },
  { title: '结果', key: 'isWin', width: 80, render: (row) => row.isWin ? h('span', { style: { color: '#10b981' } }, '胜') : h('span', { style: { color: '#ef4444' } }, '负') },
  { title: '我方', key: 'leftName', render: (row) => `${row.leftName} (${row.leftpower})` },
  { title: '敌方', key: 'rightName', render: (row) => `${row.rightName} (${row.rightpower})` },
]
</script>

<style scoped>
.fight-pvp { padding: 16px; }
.pvp-input-section { display: flex; gap: 12px; margin-bottom: 16px; }
.opponent-info { background: #f9fafb; border-radius: 12px; padding: 16px; margin-bottom: 16px; }
.player-header { display: flex; align-items: center; gap: 16px; margin-bottom: 12px; }
.player-avatar { width: 64px; height: 64px; border-radius: 50%; }
.player-meta h4 { margin: 0 0 4px; }
.player-meta p { margin: 2px 0; font-size: 13px; color: #6b7280; }
.hero-list { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
.hero-card { display: flex; align-items: center; gap: 8px; padding: 6px 10px; background: white; border-radius: 8px; font-size: 12px; }
.hero-avatar { width: 32px; height: 32px; border-radius: 6px; }
.red { color: #ff4d4f; }
.pvp-actions { display: flex; gap: 12px; align-items: center; }
.pvp-result { background: #f9fafb; border-radius: 12px; padding: 16px; }
</style>
```

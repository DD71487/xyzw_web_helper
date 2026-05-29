# 排行榜组件 - 翻译文档

## 原始代码位置
- 文件：`GameFeatures-CknTKSSq.js`
- 组件及行号：
  - `TopRankListPageCard`: `28194 ~ 31059`
  - `GreatRouteRankListPageCard`: `31060 ~ 32773`
  - `GoldRankListPageCard`: `32774 ~ 40077`
  - `ServerRankListPageCard`: `40078 ~ 44787`

## 组件概述
排行榜模块包含 **4个核心排行榜组件**（代码中显示5个子Tab，但TopClubRank未在grep中匹配到独立组件名，可能内联或复用）。各组件结构高度相似，均支持：
- 分页浏览排行榜数据
- 查询玩家详细信息（含英雄、装备、鱼灵）
- 连续切磋功能（带进度统计）
- 数据导出

## 依赖关系
```
排行榜组件组
├── 外部依赖：
│   ├── _t() - Pinia Store
│   ├── It() - Naive UI useMessage
│   ├── Y() / O() - Vue ref / computed
│   ├── ft() - Vue reactive
│   ├── jt - 英雄配置表
│   ├── Po - 阵容类型识别
│   ├── ls - 鱼灵信息处理
│   ├── hu - 排行榜数据处理
│   ├── Ps / Ms - 日期工具
│   └── $e("n-data-table") / $e("n-modal") / $e("n-progress") - Naive UI
│
├── 被引用：GameStatus（排行榜Tab）
│   ├── ServerRankListPageCard -> 区服榜
│   ├── TopRankListPageCard -> 巅峰榜
│   ├── GoldRankListPageCard -> 黄金积分榜
│   └── GreatRouteRankListPageCard -> 伟大航路积分榜
```

## 共同结构分析

4个排行榜组件代码结构高度一致，核心差异在于：

| 组件 | 数据来源 | 排名范围 | 特殊功能 |
|------|---------|---------|---------|
| **ServerRankListPageCard** | `rank_getserverrank` / `legionRankList` | 区服内 | 基础排行榜 |
| **TopRankListPageCard** | `rank_gettoprank` | 全服巅峰 | 支持分页 |
| **GoldRankListPageCard** | `rank_getgoldrank` | 黄金积分 | 分5个段位(gold1-5) |
| **GreatRouteRankListPageCard** | `rank_getgreatrouterank` | 伟大航路 | 特殊排行榜 |

## 原始代码（编译后共同结构）
```javascript
// 以 TopRankListPageCard 为例
const ND = {
  __name: "TopRankListPageCard",
  props: { visible: { type: Boolean, default: !1 }, inline: { type: Boolean, default: !1 } },
  emits: ["update:visible"],
  setup(t, { expose: A, emit: s }) {
    const n = t, o = s, i = It(), r = _t();
    // ...
    const v = Y(!1), c = Y(null);      // 加载状态 / 排行榜数据
    const f = Y(null), m = Y(Ps());    // 日期选择
    const p = Y(1), Q = Y(100);        // 分页
    const G = Y(!1), _ = Y(null);      // 查询加载 / 选中玩家
    const N = Y(!1), X = Y("");        // 切磋加载 / 目标ID
    const I = Y(1), b = Y(!0);         // 切磋次数 / 次数有效性

    // 进度统计
    const U = ft({ visible: !1, totalCount: 0, completedCount: 0, remainingCount: 0, winCount: 0, lossCount: 0, percentage: 0 });
    // 结果统计
    const x = ft({ visible: !1, totalCount: 0, winCount: 0, lossCount: 0, winRate: 0, ourDieRate: 0, enemyDieRate: 0, resultCount: [] });
    const R = Y([]);                    // 切磋结果列表
    const M = ft({ ourDieHeroGameCount: 0, enemyDieHeroGameCount: 0 }); // 死亡统计
    const V = Y(!1), F = Y(null);       // 详情弹窗 / 详情数据

    // 分页数据
    const y = O(() => {
      if (!c.value) return {};
      const q = (p.value - 1) * Q.value, h = q + Q.value;
      const B = Object.entries(c.value);
      B.sort((k, ge) => k[1].rank - ge[1].rank);
      return Object.fromEntries(B.slice(q, h));
    });

    // 格式化
    const Ce = (q) => q >= 1e8 ? (q / 1e8).toFixed(2) + "亿" : q >= 1e4 ? (q / 1e4).toFixed(2) + "万" : q.toString();
    const re = (q) => q.toFixed(0).toString();

    // 打开详情
    const ae = (q) => { V.value = !0; F.value = q; };

    // 处理英雄信息（与ClubInfo相同逻辑）
    const L = (q) => { /* 计算装备红淬开孔 */ };
    const oe = (q) => { /* 处理英雄列表 */ };

    // 重置切磋状态
    const fe = () => { x.visible = !1; U.visible = !1; R.value = []; M.ourDieHeroGameCount = 0; M.enemyDieHeroGameCount = 0; I.value = 1; };

    // 更新进度
    const w = (q, h, B) => { U.completedCount = q; U.winCount = h; U.lossCount = B; U.remainingCount = U.totalCount - q; U.percentage = Math.round((q / U.totalCount) * 100); };

    // 显示结果
    const C = (q, h, B) => { x.totalCount = U.totalCount; x.winCount = q; x.lossCount = h; x.winRate = Math.round((q / U.totalCount) * 100); x.ourDieRate = Math.round((M.ourDieHeroGameCount / U.totalCount) * 100); x.enemyDieRate = Math.round((M.enemyDieHeroGameCount / U.totalCount) * 100); x.resultCount = B; x.visible = !0; U.visible = !1; };

    // 查询玩家详情
    const ue = async (q) => {
      if (!r.selectedToken) { i.warning("请先选择游戏角色"); return; }
      const h = r.selectedToken.id;
      if (r.getWebSocketStatus(h) !== "connected") { i.error("WebSocket未连接"); return; }
      fe(); N.value = !0; X.value = q;
      try {
        const T = await r.sendMessageWithPromise(h, "rank_getroleinfo", {
          bottleType: 0, includeBottleTeam: !1, isSearch: !1, roleId: q,
          includeHero: !0, includeHeroDetail: !0, includePearl: !0,
        }, 5e3);
        if (!T.roleInfo) { i.warning("未查询到对手信息"); return; }
        const S = ls(T.roleInfo);
        let H = oe(T.roleInfo.heroes);
        H.heroList.forEach((le) => { le.PearlInfo = S[le.artifactId] || {}; });
        const Z = H.redCount, be = H.holeCount, ce = T.roleInfo.red || 0, ye = T.roleInfo.maxRed || 0;
        const K = T.legionInfo?.statistics?.["battle:red:quench"] || ce;
        const te = T.legionInfo?.statistics?.["red:quench"] || ye;
        const ee = T.legionInfo?.statistics?.["max:power"] || T.roleInfo.maxPower || 0;
        const ie = {
          id: q, name: T.roleInfo.name, headImg: T.roleInfo.headImg, power: T.roleInfo.power,
          level: T.roleInfo.level, serverName: T.roleInfo.serverName, legionName: T.legionInfo?.name || "无",
          redQuench: ce, holyBeast: H.heroList.filter((le) => le.HolyBeast).length,
          maxPower: Ce(ee), currentRedDrum: ce, maxRedDrum: ye,
          totalRedCount: Z, totalHoleCount: be, legionRedQuench: K, legionMaxRed: te,
          heroList: H.heroList, legacy: T.roleInfo.legacy?.color || 0, lineupType: Po(H.heroList),
        };
        _.value = ie; G.value = !0; i.success("查询成功");
      } catch (T) { i.error(`查询失败: ${T.message}`); }
      finally { N.value = !1; }
    };

    // 连续切磋
    const ve = async (q) => {
      if (!_.value) return;
      if (!b.value) { i.error("请输入有效的切磋次数 (1-100)"); return; }
      const h = parseInt(I.value);
      i.info(`开始连续切磋: ${_.value.name}，共${h}次`);
      if (!r.selectedToken) { i.warning("请先选择游戏角色"); return; }
      const B = r.selectedToken.id;
      if (r.getWebSocketStatus(B) !== "connected") { i.error("WebSocket未连接"); return; }
      N.value = !0; U.visible = !0; U.totalCount = h; U.completedCount = 0; U.remainingCount = h;
      U.winCount = 0; U.lossCount = 0; U.percentage = 0; M.ourDieHeroGameCount = 0; M.enemyDieHeroGameCount = 0; R.value = [];
      try {
        let Z = 0, be = 0, ce = [];
        for (let ye = 0; ye < h; ye++) {
          i.info(`正在进行第 ${ye + 1}/${h} 场切磋`);
          const K = await r.sendMessageWithPromise(B, "fight_startpvp", { targetId: _.value.id }, 1e4);
          if (K && K.battleData) {
            let te = 0, ee = 0;
            K.battleData.result?.sponsor?.teamInfo?.forEach((le) => { le.hp == 0 && te++; });
            K.battleData.result?.accept?.teamInfo?.forEach((le) => { le.hp == 0 && ee++; });
            const ie = {
              isWin: K.battleData.result?.isWin || !1,
              leftName: K.battleData.leftTeam?.name || "未知", leftheadImg: K.battleData.leftTeam?.headImg || "",
              leftpower: Ce(K.battleData.leftTeam?.power || 0), leftDieHero: te,
              rightName: K.battleData.rightTeam?.name || "未知", rightheadImg: K.battleData.rightTeam?.headImg || "",
              rightpower: Ce(K.battleData.rightTeam?.power || 0), rightDieHero: ee,
            };
            ce.push(ie);
            te > 0 && M.ourDieHeroGameCount++;
            ee > 0 && M.enemyDieHeroGameCount++;
            ie.isWin ? Z++ : be++;
            w(ye + 1, Z, be);
            ye < h - 1 && await new Promise((le) => setTimeout(le, 500));
          } else {
            i.warning(`第 ${ye + 1} 场切磋失败`); be++; w(ye + 1, Z, be);
          }
        }
        C(Z, be, ce); i.success(`连续切磋完成，共${h}场`);
      } catch (Z) { i.error(`连续切磋失败: ${Z.message}`); U.visible = !1; }
      finally { N.value = !1; }
    };

    // 表格列
    const z = [/* 序号、头像、名称、战力、红淬、阵容等列 */];

    // 渲染：数据表格 + 查询弹窗 + 切磋进度 + 结果统计
    return (q, h) => { /* ... */ };
  },
};
```

## 翻译后代码（Vue 3 + Naive UI）- 以 TopRankListPageCard 为例
```vue
<template>
  <div class="rank-list-page">
    <!-- 排行榜表格 -->
    <n-data-table
      :columns="rankColumns"
      :data="pagedRankData"
      :loading="loading"
      bordered
      size="small"
      striped
      :pagination="pagination"
    />

    <!-- 玩家详情弹窗 -->
    <n-modal v-model:show="showDetail" preset="card" title="玩家详情" style="width: 90%; max-width: 700px">
      <div v-if="selectedPlayer" class="player-detail">
        <div class="player-header">
          <img :src="selectedPlayer.headImg" class="player-avatar" />
          <div class="player-info">
            <h4>{{ selectedPlayer.name }}</h4>
            <p>ID: {{ selectedPlayer.id }} | Lv.{{ selectedPlayer.level }}</p>
            <p>{{ selectedPlayer.serverName }} | {{ selectedPlayer.legionName }}</p>
          </div>
        </div>
        <div class="player-stats">
          <div class="stat-item"><span>战力</span><span>{{ selectedPlayer.power }}</span></div>
          <div class="stat-item"><span>红淬</span><span class="red">{{ selectedPlayer.redQuench }}</span></div>
          <div class="stat-item"><span>四圣</span><span>{{ selectedPlayer.holyBeast }}</span></div>
          <div class="stat-item"><span>最高战力</span><span>{{ selectedPlayer.maxPower }}</span></div>
        </div>
        <!-- 英雄阵容 -->
        <div class="hero-lineup">
          <div v-for="hero in selectedPlayer.heroList" :key="hero.heroId" class="hero-card">
            <img :src="hero.heroAvate" class="hero-avatar" />
            <div class="hero-meta">
              <span class="name">{{ hero.heroName }}</span>
              <span class="red">红{{ hero.red }}</span>
              <span v-if="hero.HolyBeast" class="hb">四圣{{ hero.HBlevel }}</span>
            </div>
          </div>
        </div>
        <!-- 切磋操作 -->
        <div class="pvp-section">
          <n-input-number v-model:value="pvpCount" :min="1" :max="100" placeholder="切磋次数" />
          <n-button type="primary" :loading="isPvpRunning" @click="startPvp">开始切磋</n-button>
        </div>
      </div>
    </n-modal>

    <!-- 切磋进度弹窗 -->
    <n-modal v-model:show="pvpProgress.visible" preset="card" title="切磋进度" :closable="false">
      <n-progress type="line" :percentage="pvpProgress.percentage" />
      <p>已完成: {{ pvpProgress.completedCount }} / {{ pvpProgress.totalCount }}</p>
      <p>胜: {{ pvpProgress.winCount }} | 负: {{ pvpProgress.lossCount }}</p>
    </n-modal>

    <!-- 切磋结果弹窗 -->
    <n-modal v-model:show="pvpResult.visible" preset="card" title="切磋结果统计" style="width: 90%; max-width: 600px">
      <div class="result-summary">
        <div class="result-item"><span>总场次</span><span>{{ pvpResult.totalCount }}</span></div>
        <div class="result-item"><span>胜率</span><span class="green">{{ pvpResult.winRate }}%</span></div>
        <div class="result-item"><span>我方阵亡率</span><span class="red">{{ pvpResult.ourDieRate }}%</span></div>
        <div class="result-item"><span>敌方阵亡率</span><span class="green">{{ pvpResult.enemyDieRate }}%</span></div>
      </div>
      <n-data-table :columns="resultColumns" :data="pvpResult.resultCount" size="small" />
    </n-modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { useMessage } from 'naive-ui'
import { NDataTable, NModal, NButton, NInputNumber, NProgress, NTag } from 'naive-ui'
import { processPearlInfo } from '@/utils/pearl'
import { identifyLineup } from '@/utils/lineup'
import { formatNumber } from '@/utils/format'

const props = defineProps({ visible: Boolean, inline: Boolean })
const emit = defineEmits(['update:visible'])

const store = useGameStore()
const message = useMessage()

// ===== 状态 =====
const loading = ref(false)
const rankData = ref(null)
const currentPage = ref(1)
const pageSize = ref(100)
const showDetail = ref(false)
const selectedPlayer = ref(null)
const isQuerying = ref(false)
const isPvpRunning = ref(false)
const pvpCount = ref(1)
const isPvpCountValid = ref(true)

const pvpProgress = ref({
  visible: false, totalCount: 0, completedCount: 0, remainingCount: 0,
  winCount: 0, lossCount: 0, percentage: 0,
})
const pvpResult = ref({
  visible: false, totalCount: 0, winCount: 0, lossCount: 0,
  winRate: 0, ourDieRate: 0, enemyDieRate: 0, resultCount: [],
})
const pvpLogs = ref([])
const dieStats = ref({ ourDieHeroGameCount: 0, enemyDieHeroGameCount: 0 })

// ===== 计算属性 =====
const totalPages = computed(() => rankData.value ? Math.ceil(Object.keys(rankData.value).length / pageSize.value) : 0)

const pagedRankData = computed(() => {
  if (!rankData.value) return []
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  const entries = Object.entries(rankData.value)
  entries.sort((a, b) => a[1].rank - b[1].rank)
  return Object.fromEntries(entries.slice(start, end))
})

const pagination = computed(() => ({
  page: currentPage.value,
  pageSize: pageSize.value,
  pageCount: totalPages.value,
  onChange: (page) => { currentPage.value = page },
}))

// ===== 方法 =====
function resetPvp() {
  pvpResult.value.visible = false
  pvpProgress.value.visible = false
  pvpLogs.value = []
  dieStats.value = { ourDieHeroGameCount: 0, enemyDieHeroGameCount: 0 }
  pvpCount.value = 1
}

function updateProgress(completed, wins, losses) {
  const p = pvpProgress.value
  p.completedCount = completed
  p.winCount = wins
  p.lossCount = losses
  p.remainingCount = p.totalCount - completed
  p.percentage = Math.round((completed / p.totalCount) * 100)
}

function showResult(wins, losses, logs) {
  const p = pvpProgress.value
  pvpResult.value = {
    visible: true, totalCount: p.totalCount, winCount: wins, lossCount: losses,
    winRate: Math.round((wins / p.totalCount) * 100),
    ourDieRate: Math.round((dieStats.value.ourDieHeroGameCount / p.totalCount) * 100),
    enemyDieRate: Math.round((dieStats.value.enemyDieHeroGameCount / p.totalCount) * 100),
    resultCount: logs,
  }
  pvpProgress.value.visible = false
}

async function queryPlayer(roleId) {
  if (!store.selectedToken) { message.warning('请先选择游戏角色'); return }
  const tokenId = store.selectedToken.id
  if (store.getWebSocketStatus(tokenId) !== 'connected') { message.error('WebSocket未连接'); return }

  resetPvp()
  isQuerying.value = true
  try {
    const res = await store.sendMessageWithPromise(tokenId, 'rank_getroleinfo', {
      bottleType: 0, includeBottleTeam: false, isSearch: false, roleId,
      includeHero: true, includeHeroDetail: true, includePearl: true,
    }, 5000)
    if (!res.roleInfo) { message.warning('未查询到对手信息'); return }

    const pearlInfo = processPearlInfo(res.roleInfo)
    const heroData = processHeroes(res.roleInfo.heroes)
    heroData.heroList.forEach(h => { h.PearlInfo = pearlInfo[h.artifactId] || {} })

    selectedPlayer.value = {
      id: roleId, name: res.roleInfo.name, headImg: res.roleInfo.headImg,
      power: res.roleInfo.power, level: res.roleInfo.level, serverName: res.roleInfo.serverName,
      legionName: res.legionInfo?.name || '无', redQuench: res.roleInfo.red || 0,
      holyBeast: heroData.heroList.filter(h => h.HolyBeast).length,
      maxPower: formatNumber(res.legionInfo?.statistics?.['max:power'] || res.roleInfo.maxPower || 0),
      currentRedDrum: res.roleInfo.red || 0, maxRedDrum: res.roleInfo.maxRed || 0,
      totalRedCount: heroData.redCount, totalHoleCount: heroData.holeCount,
      legionRedQuench: res.legionInfo?.statistics?.['battle:red:quench'] || res.roleInfo.red || 0,
      legionMaxRed: res.legionInfo?.statistics?.['red:quench'] || res.roleInfo.maxRed || 0,
      heroList: heroData.heroList, legacy: res.roleInfo.legacy?.color || 0,
      lineupType: identifyLineup(heroData.heroList),
    }
    showDetail.value = true
    message.success('查询成功')
  } catch (e) {
    message.error(`查询失败: ${e.message}`)
  } finally {
    isQuerying.value = false
  }
}

async function startPvp() {
  if (!selectedPlayer.value) return
  if (!isPvpCountValid.value) { message.error('请输入有效的切磋次数 (1-100)'); return }
  const count = parseInt(pvpCount.value)
  message.info(`开始连续切磋: ${selectedPlayer.value.name}，共${count}次`)

  if (!store.selectedToken) { message.warning('请先选择游戏角色'); return }
  const tokenId = store.selectedToken.id
  if (store.getWebSocketStatus(tokenId) !== 'connected') { message.error('WebSocket未连接'); return }

  isPvpRunning.value = true
  pvpProgress.value = { visible: true, totalCount: count, completedCount: 0, remainingCount: count, winCount: 0, lossCount: 0, percentage: 0 }
  dieStats.value = { ourDieHeroGameCount: 0, enemyDieHeroGameCount: 0 }
  pvpLogs.value = []

  try {
    let wins = 0, losses = 0, logs = []
    for (let i = 0; i < count; i++) {
      message.info(`正在进行第 ${i + 1}/${count} 场切磋`)
      const res = await store.sendMessageWithPromise(tokenId, 'fight_startpvp', { targetId: selectedPlayer.value.id }, 10000)
      if (res?.battleData) {
        let ourDie = 0, enemyDie = 0
        res.battleData.result?.sponsor?.teamInfo?.forEach(h => { h.hp === 0 && ourDie++ })
        res.battleData.result?.accept?.teamInfo?.forEach(h => { h.hp === 0 && enemyDie++ })
        const log = {
          isWin: res.battleData.result?.isWin || false,
          leftName: res.battleData.leftTeam?.name || '未知',
          leftheadImg: res.battleData.leftTeam?.headImg || '',
          leftpower: formatNumber(res.battleData.leftTeam?.power || 0),
          leftDieHero: ourDie,
          rightName: res.battleData.rightTeam?.name || '未知',
          rightheadImg: res.battleData.rightTeam?.headImg || '',
          rightpower: formatNumber(res.battleData.rightTeam?.power || 0),
          rightDieHero: enemyDie,
        }
        logs.push(log)
        if (ourDie > 0) dieStats.value.ourDieHeroGameCount++
        if (enemyDie > 0) dieStats.value.enemyDieHeroGameCount++
        log.isWin ? wins++ : losses++
        updateProgress(i + 1, wins, losses)
        if (i < count - 1) await new Promise(r => setTimeout(r, 500))
      } else {
        message.warning(`第 ${i + 1} 场切磋失败`)
        losses++
        updateProgress(i + 1, wins, losses)
      }
    }
    showResult(wins, losses, logs)
    message.success(`连续切磋完成，共${count}场`)
  } catch (e) {
    message.error(`连续切磋失败: ${e.message}`)
    pvpProgress.value.visible = false
  } finally {
    isPvpRunning.value = false
  }
}

// 表格列
const rankColumns = computed(() => [
  { title: '排名', key: 'rank', width: 60, align: 'center', render: (row) => row.rank },
  { title: '头像', key: 'headImg', width: 50, align: 'center',
    render: (row) => row.headImg ? h('img', { src: row.headImg, style: { width: '32px', height: '32px', borderRadius: '50%' } }) : '-' },
  { title: '玩家', key: 'name', align: 'left',
    render: (row) => h('span', { style: { cursor: 'pointer', color: '#1890ff', textDecoration: 'underline' }, onClick: () => queryPlayer(row.id) }, row.name) },
  { title: '战力', key: 'power', width: 100, align: 'center', render: (row) => formatNumber(row.power) },
  { title: '红淬', key: 'redQuench', width: 80, align: 'center', render: (row) => h('span', { style: { color: '#ff4d4f' } }, row.redQuench) },
  { title: '阵容', key: 'lineupType', width: 100, align: 'center',
    render: (row) => row.lineupType ? h(NTag, { size: 'small', bordered: false }, { default: () => row.lineupType }) : '-' },
])

const resultColumns = [
  { title: '场次', key: 'index', width: 60, render: (_, idx) => idx + 1 },
  { title: '结果', key: 'isWin', width: 80, render: (row) => row.isWin ? h('span', { style: { color: '#10b981' } }, '胜') : h('span', { style: { color: '#ef4444' } }, '负') },
  { title: '我方', key: 'leftName', render: (row) => `${row.leftName} (${row.leftpower})` },
  { title: '敌方', key: 'rightName', render: (row) => `${row.rightName} (${row.rightpower})` },
]
</script>

<style scoped>
.rank-list-page { padding: 16px; }
.player-detail { padding: 16px; }
.player-header { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
.player-avatar { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; }
.player-info h4 { margin: 0 0 4px; font-size: 18px; }
.player-info p { margin: 2px 0; font-size: 13px; color: #6b7280; }
.player-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 16px; }
.stat-item { display: flex; justify-content: space-between; padding: 8px 12px; background: #f9fafb; border-radius: 8px; }
.stat-item .red { color: #ff4d4f; }
.hero-lineup { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
.hero-card { display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 8px; }
.hero-avatar { width: 40px; height: 40px; border-radius: 8px; }
.hero-meta { display: flex; flex-direction: column; font-size: 12px; }
.hero-meta .name { font-weight: 500; }
.hero-meta .red { color: #ff4d4f; }
.hero-meta .hb { color: #52c41a; }
.pvp-section { display: flex; gap: 12px; align-items: center; }
.result-summary { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 16px; }
.result-item { display: flex; justify-content: space-between; padding: 10px; background: #f9fafb; border-radius: 8px; }
.result-item .green { color: #10b981; }
.result-item .red { color: #ef4444; }
</style>
```

## 关键逻辑说明

| 功能 | 说明 |
|------|------|
| **分页机制** | 每页100条，前端分页处理，排序按rank字段 |
| **玩家查询** | 通过 `rank_getroleinfo` 获取玩家详细信息，含英雄、装备、鱼灵 |
| **连续切磋** | 支持1-100场连续PVP，每场间隔500ms，实时显示进度 |
| **死亡统计** | 统计双方英雄阵亡情况，计算阵亡率 |
| **结果展示** | 切磋完成后展示胜率、阵亡率、每场详细结果 |
| **英雄处理** | 与ClubInfo共用相同的英雄处理逻辑 |
| **阵容识别** | 通过英雄列表自动识别阵容类型 |
| **鱼灵绑定** | 将鱼灵信息绑定到对应英雄artifactId |

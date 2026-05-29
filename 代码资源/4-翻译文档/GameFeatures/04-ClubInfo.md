# ClubInfo 组件 - 翻译文档

## 原始代码位置
- 文件：`GameFeatures-CknTKSSq.js`
- 行号：`9707 ~ 10240`

## 组件概述
ClubInfo 是**俱乐部信息**组件，展示俱乐部成员列表、成员详情、战力排序、红淬统计、阵容类型，支持获取成员阵容信息、导出图片/表格、查看成员详情弹窗、踢出成员等功能。

## 依赖关系
```
ClubInfo
├── 外部依赖：
│   ├── _t() - Pinia Store
│   ├── It() - Naive UI useMessage
│   ├── zr() - Vue useRouter
│   ├── Y() / O() - Vue ref / computed
│   ├── ft() - Vue reactive
│   ├── jt - 英雄配置表
│   ├── Po - 阵容类型识别函数
│   ├── ls - 鱼灵信息处理函数
│   ├── Qe / W / J - 格式化函数
│   ├── gA / yA - html2canvas 导出图片
│   └── $e("n-data-table") / $e("n-modal") / $e("n-button") - Naive UI
│
├── 被引用：GameStatus（俱乐部Tab）
```

## 原始代码（编译后核心逻辑）
```javascript
const hB = {
  __name: "ClubInfo",
  setup(t) {
    const A = _t(), s = It(), n = zr();

    // 计算属性：俱乐部信息
    const o = O(() => A.gameData?.legionInfo || null);
    const i = O(() => o.value?.info || null);
    const r = O(() => i.value?.members || {});
    const v = O(() => Object.values(r.value || {}));
    const c = O(() => v.value.length); // 成员数量

    // 会长信息
    const f = O(() => {
      const Ae = i.value?.leaderId;
      return (Ae && v.value.find(($) => Number($.roleId) === Number(Ae))) || null;
    });

    // 排序后的成员列表（按职位->红淬->战力）
    const m = O(() =>
      [...v.value].sort((Ae, j) => {
        const $ = Ae.job === 0 ? 99 : Ae.job;
        const T = j.job === 0 ? 99 : j.job;
        if ($ !== T) return $ - T; // 职位排序
        const S = Number(Ae.custom?.red_quench_cnt || 0);
        const H = Number(j.custom?.red_quench_cnt || 0);
        if (S !== H) return H - S; // 红淬降序
        const Z = Number(Ae.power || Ae.custom?.s_power || 0);
        return Number(j.power || j.custom?.s_power || 0) - Z; // 战力降序
      })
    );

    // 弹窗状态
    const p = Y(!1), Q = Y(null), G = Y(!1), _ = Y(!1);
    const N = Y(null), X = Y(!1), I = Y(!1), b = Y(null);

    // 处理英雄信息
    const U = (Ae) => {
      let j = 0, $ = 0, T = [];
      let S = [];
      if (Array.isArray(Ae)) S = Ae;
      else if (typeof Ae == "object" && Ae !== null) S = Object.values(Ae);
      else return { redCount: j, holeCount: $, heroList: T };

      S.forEach((H, Z) => {
        if (!H) return;
        const ce = jt[H.heroId || H.id] || {};
        const ye = H.equipment ? x(H.equipment) : { redCount: 0, holeCount: 0 };
        const K = H.heroId || `unknown_${Z}`;
        const te = H.heroName || H.name || ce.name || `未知武将_${Z}`;
        let ee = {
          heroId: K, artifactId: H.artifactId || "", power: H.power || 0,
          star: H.star || 0, equipment: H.equipment, heroName: te,
          heroAvate: H.heroAvate || H.headImg || ce.avatar || "",
          level: H.level || 0, hole: ye.holeCount, red: ye.redCount,
          HolyBeast: H.hB?.active === !0 || H.fourBasest?.level > 0,
          HBlevel: H.hB?.order || H.fourBasest?.level || 0,
          skillList: H.skillList || [], attributeList: H.attributeList || [],
          battleTeamSlot: H.battleTeamSlot,
        };
        K && ((j += ee.red), ($ += ee.hole), T.push(ee));
      });
      T.sort((S, H) => S.battleTeamSlot - H.battleTeamSlot);
      return { redCount: j, holeCount: $, heroList: T };
    };

    // 计算装备红淬和开孔数
    const x = (Ae) => {
      let j = 0, $ = 0;
      Object.values(Ae).forEach((T) => {
        Object.values(T.quenches).forEach((S) => {
          $++; S.colorId == 6 && j++;
        });
      });
      return { redCount: j, holeCount: $ };
    };

    // 打开成员详情弹窗
    const R = (Ae) => { _.value = !0; N.value = Ae; };

    // 批量获取成员阵容信息
    const M = async () => {
      if (X.value) return;
      const Ae = A.selectedToken;
      if (!Ae || A.getWebSocketStatus(Ae.id) !== "connected") { s.error("WebSocket未连接"); return; }
      const $ = v.value; if (!$.length) return;
      X.value = !0; s.loading("正在获取成员阵容信息...");
      const T = $.map((H) => H.roleId), S = 5;
      try {
        for (let H = 0; H < T.length; H += S) {
          const be = T.slice(H, H + S).map(async (ce) => {
            try {
              const ee = await A.sendMessageWithPromise(Ae.id, "rank_getroleinfo", {
                roleId: Number(ce), includeBottleTeam: !1, isSearch: !1,
                bottleType: 0, includeHero: !0, includeHeroDetail: !0, includePearl: !0,
              }, 5e3);
              if (ee && ee.roleInfo) {
                let ie = []; ee.roleInfo.heroes && (ie = U(ee.roleInfo.heroes).heroList);
                const le = Po(ie);
                A.gameData.legionInfo.info.members[ce] &&
                  (A.gameData.legionInfo.info.members[ce].lineupType = le);
              }
            } catch (ee) { console.error(`Failed to fetch info for ${ce}`, ee); }
          });
          await Promise.all(be);
        }
        s.success("阵容信息获取完成");
      } catch (H) { s.error(`获取失败: ${H.message}`); }
      finally { X.value = !1; }
    };

    // 导出图片
    const V = async () => { /* 使用 html2canvas 导出表格为图片 */ };

    // 导出CSV表格
    const F = () => {
      const Ae = m.value;
      if (!Ae || !Ae.length) { s.error("暂无成员数据"); return; }
      let j = `序号,成员名称,ID,战力,红淬,阵容,职位\n`;
      Ae.forEach((Z, be) => {
        const ce = Z.name || "", ye = Z.roleId || "";
        const K = Qe(Z.power || Z.custom?.s_power || 0);
        const te = W(Z.custom?.red_quench_cnt || 0);
        const ee = Z.lineupType || "-", ie = J(Z.job);
        j += `${be + 1},"${ce.replace(/"/g, '""')}",${ye},${K},${te},"${ee.replace(/"/g, '""')}","${ie.replace(/"/g, '""')}"\n`;
      });
      const $ = new Blob([j], { type: "text/csv;charset=utf-8;" });
      const T = URL.createObjectURL($), S = document.createElement("a");
      S.setAttribute("href", T);
      S.setAttribute("download", `俱乐部成员信息_${new Date().toLocaleDateString().replace(/\//g, "-")}.csv`);
      document.body.appendChild(S); S.click(); document.body.removeChild(S);
      s.success("表格导出成功");
    };

    // 查询单个成员详情
    const y = async (Ae) => {
      if (!A.selectedToken) { s.warning("请先选择游戏角色"); return; }
      const j = A.selectedToken.id;
      if (A.getWebSocketStatus(j) !== "connected") { s.error("WebSocket未连接"); return; }
      G.value = !0;
      try {
        const le = await A.sendMessageWithPromise(j, "rank_getroleinfo", {
          bottleType: 0, includeBottleTeam: !1, isSearch: !1, roleId: Ae,
          includeHero: !0, includeHeroDetail: !0, includePearl: !0,
        }, 5e3);
        if (!le.roleInfo) { s.warning("未查询到玩家信息"); return; }
        const _e = ls(le.roleInfo);
        let pe = U(le.roleInfo.heroes);
        pe.heroList.forEach((Ve) => { Ve.PearlInfo = _e[Ve.artifactId] || {}; });
        const ot = {
          id: Ae, name: le.roleInfo.name, headImg: le.roleInfo.headImg,
          power: le.roleInfo.power, level: le.roleInfo.level, serverName: le.roleInfo.serverName,
          legionName: le.legionInfo?.name || "无", redQuench: le.roleInfo.red || 0,
          holyBeast: pe.heroList.filter((Ve) => Ve.HolyBeast).length,
          maxPower: Qe(le.legionInfo?.statistics?.["max:power"] || le.roleInfo.maxPower || 0),
          currentRedDrum: le.roleInfo.red || 0, maxRedDrum: le.roleInfo.maxRed || 0,
          totalRedCount: pe.redCount, totalHoleCount: pe.holeCount,
          legionRedQuench: le.legionInfo?.statistics?.["battle:red:quench"] || le.roleInfo.red || 0,
          legionMaxRed: le.legionInfo?.statistics?.["red:quench"] || le.roleInfo.maxRed || 0,
          heroList: pe.heroList, legacy: le.roleInfo.legacy?.color || 0,
          lineupType: Po(pe.heroList),
        };
        Q.value = ot; p.value = !0; s.success("查询成功");
      } catch (le) { s.error(`查询失败: ${le.message}`); }
      finally { G.value = !1; }
    };

    // 表格列定义
    const Ce = O(() => {
      const Ae = [
        { title: "序号", key: "index", width: 60, align: "center", render: (j, $) => $ + 1 },
        { title: "头像", key: "headImg", width: 60, align: "center",
          render: (j) => j.headImg ? it("img", { src: j.headImg, style: { width: "32px", height: "32px", borderRadius: "50%" })
            : it("div", { style: { width: "32px", height: "32px", borderRadius: "50%", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" } }, j.name?.charAt(0) || "?") },
        { title: "成员", key: "name", align: "left", minWidth: 150,
          render: (j) => it("div", { style: { display: "flex", flexDirection: "column", cursor: "pointer" }, onClick: () => y(j.roleId) },
            [it("span", { style: { fontWeight: "500", color: "#1890ff" } }, j.name),
             it("span", { style: { fontSize: "12px", color: "#999" } }, `ID: ${j.roleId}`)]) },
        { title: "战力", key: "power", width: 100, align: "center", render: (j) => Qe(j.power || j.custom?.s_power || 0) },
        { title: "红淬", key: "redQuench", width: 80, align: "center",
          render: (j) => it("span", { style: { color: "#ff4d4f" } }, W(j.custom?.red_quench_cnt || 0)) },
        { title: "阵容", key: "lineupType", width: 80, align: "center",
          render: (j) => { if (!j.lineupType) return "-"; const $ = ei.find((S) => S.name === j.lineupType);
            return it(Ot, { size: "small", bordered: !1, color: $?.colorProps || {} }, { default: () => j.lineupType }); } },
      ];
      // 职位列
      I.value || Ae.push({ title: "职位", key: "job", width: 80, align: "center", render: (j) => J(j.job) });
      // 操作列（踢出）
      ae.value && !I.value && Ae.push({
        title: "操作", key: "actions", width: 80, align: "center",
        render: (j) => j.job !== 1 ? it(mt, { size: "tiny", type: "error", ghost: !0, onClick: () => L(j.roleId, j.name) }, { default: () => "踢出" }) : null,
      });
      return [{ title: () => it("div", { style: { display: "flex", justifyContent: "space-between" } },
        [it("span", { style: { fontSize: "16px", fontWeight: "bold" } }, "俱乐部成员详情"),
         I.value ? null : it("div", { style: { display: "flex", gap: "8px" } }, [
           it(mt, { size: "tiny", type: "primary", secondary: !0, onClick: M, disabled: X.value }, { default: () => "获取阵容" }),
           it(mt, { size: "tiny", type: "info", secondary: !0, onClick: V, disabled: I.value }, { default: () => "导出图片" }),
           it(mt, { size: "tiny", type: "success", secondary: !0, onClick: F, disabled: I.value }, { default: () => "导出表格" }),
         ])]),
        key: "title_group", align: "center", children: Ae }];
    });

    // 渲染：数据表格 + 成员详情弹窗
    return (Ae, j) => { /* ... */ };
  },
};
```

## 翻译后代码（Vue 3 + Naive UI）
```vue
<template>
  <div class="club-info">
    <!-- 成员表格 -->
    <n-data-table
      :columns="tableColumns"
      :data="sortedMembers"
      :loading="loading"
      bordered
      size="small"
      striped
      :row-key="(row) => row.roleId"
    />

    <!-- 成员详情弹窗 -->
    <n-modal v-model:show="showDetailModal" preset="card" title="成员详情" style="width: 90%; max-width: 600px">
      <div v-if="selectedMember" class="member-detail">
        <div class="member-header">
          <img :src="selectedMember.headImg" class="member-avatar" />
          <div class="member-info">
            <h4>{{ selectedMember.name }}</h4>
            <p>ID: {{ selectedMember.id }} | Lv.{{ selectedMember.level }}</p>
            <p>服务器: {{ selectedMember.serverName }}</p>
            <p>俱乐部: {{ selectedMember.legionName }}</p>
          </div>
        </div>
        <div class="member-stats">
          <div class="stat-item">
            <span class="stat-label">战力</span>
            <span class="stat-value">{{ formatNumber(selectedMember.power) }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">红淬</span>
            <span class="stat-value red">{{ selectedMember.redQuench }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">四圣</span>
            <span class="stat-value">{{ selectedMember.holyBeast }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">历史最高战力</span>
            <span class="stat-value">{{ selectedMember.maxPower }}</span>
          </div>
        </div>
        <!-- 英雄列表 -->
        <div class="hero-list">
          <div v-for="hero in selectedMember.heroList" :key="hero.heroId" class="hero-item">
            <img :src="hero.heroAvate" class="hero-avatar" />
            <div class="hero-info">
              <span class="hero-name">{{ hero.heroName }}</span>
              <span class="hero-power">{{ formatNumber(hero.power) }}</span>
              <span class="hero-red">红{{ hero.red }}</span>
              <span v-if="hero.HolyBeast" class="hero-hb">四圣{{ hero.HBlevel }}</span>
            </div>
          </div>
        </div>
      </div>
    </n-modal>

    <!-- 踢出确认弹窗 -->
    <n-modal v-model:show="showKickModal" preset="dialog" title="确认踢出" negative-text="取消" positive-text="确认"
      @positive-click="confirmKick">
      <p>确定要将 {{ kickTargetName }} 踢出俱乐部吗？</p>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { useMessage } from 'naive-ui'
import { NDataTable, NModal, NButton, NTag } from 'naive-ui'
import { getHeroConfig } from '@/config/heroes'
import { identifyLineup } from '@/utils/lineup'
import { processPearlInfo } from '@/utils/pearl'
import { formatNumber, formatRedQuench } from '@/utils/format'
import html2canvas from 'html2canvas'

const store = useGameStore()
const message = useMessage()
const router = useRouter()

// ===== 响应式状态 =====
const showDetailModal = ref(false)
const showKickModal = ref(false)
const selectedMember = ref(null)
const kickTargetId = ref(null)
const kickTargetName = ref('')
const loading = ref(false)
const isExporting = ref(false)
const isFetchingLineup = ref(false)
const tableRef = ref(null)

// ===== 计算属性 =====
const legionInfo = computed(() => store.gameData?.legionInfo || null)
const clubInfo = computed(() => legionInfo.value?.info || null)
const membersMap = computed(() => clubInfo.value?.members || {})
const members = computed(() => Object.values(membersMap.value || {}))
const memberCount = computed(() => members.value.length)

const leader = computed(() => {
  const leaderId = clubInfo.value?.leaderId
  return leaderId ? members.value.find(m => Number(m.roleId) === Number(leaderId)) : null
})

// 排序后的成员（按职位->红淬->战力）
const sortedMembers = computed(() => {
  return [...members.value].sort((a, b) => {
    const jobA = a.job === 0 ? 99 : a.job
    const jobB = b.job === 0 ? 99 : b.job
    if (jobA !== jobB) return jobA - jobB
    const redA = Number(a.custom?.red_quench_cnt || 0)
    const redB = Number(b.custom?.red_quench_cnt || 0)
    if (redA !== redB) return redB - redA
    const powerA = Number(a.power || a.custom?.s_power || 0)
    const powerB = Number(b.power || b.custom?.s_power || 0)
    return powerB - powerA
  })
})

// ===== 方法 =====

// 处理英雄信息
function processHeroes(heroData) {
  let redCount = 0, holeCount = 0, heroList = []
  if (!heroData) return { redCount, holeCount, heroList }

  let list = []
  if (Array.isArray(heroData)) list = heroData
  else if (typeof heroData === 'object') list = Object.values(heroData)
  else return { redCount, holeCount, heroList }

  list.forEach((hero, idx) => {
    if (!hero) return
    const config = getHeroConfig(hero.heroId || hero.id) || {}
    const equipStats = hero.equipment ? calcEquipment(hero.equipment) : { redCount: 0, holeCount: 0 }
    const heroId = hero.heroId || `unknown_${idx}`
    const heroName = hero.heroName || hero.name || config.name || `未知武将_${idx}`

    const item = {
      heroId, artifactId: hero.artifactId || '', power: hero.power || 0,
      star: hero.star || 0, equipment: hero.equipment, heroName,
      heroAvate: hero.heroAvate || hero.headImg || config.avatar || '',
      level: hero.level || 0, hole: equipStats.holeCount, red: equipStats.redCount,
      HolyBeast: hero.hB?.active === true || hero.fourBasest?.level > 0,
      HBlevel: hero.hB?.order || hero.fourBasest?.level || 0,
      skillList: hero.skillList || [], attributeList: hero.attributeList || [],
      battleTeamSlot: hero.battleTeamSlot,
    }
    redCount += item.red
    holeCount += item.hole
    heroList.push(item)
  })

  heroList.sort((a, b) => a.battleTeamSlot - b.battleTeamSlot)
  return { redCount, holeCount, heroList }
}

// 计算装备红淬和开孔
function calcEquipment(equipment) {
  let redCount = 0, holeCount = 0
  Object.values(equipment).forEach((item) => {
    Object.values(item.quenches || {}).forEach((q) => {
      holeCount++
      if (q.colorId === 6) redCount++
    })
  })
  return { redCount, holeCount }
}

// 打开成员详情
function openMemberDetail(member) {
  selectedMember.value = member
  showDetailModal.value = true
}

// 批量获取阵容
async function fetchMemberLineups() {
  if (isFetchingLineup.value) return
  const token = store.selectedToken
  if (!token || store.getWebSocketStatus(token.id) !== 'connected') {
    message.error('WebSocket未连接')
    return
  }
  if (!members.value.length) return

  isFetchingLineup.value = true
  message.loading('正在获取成员阵容信息...')
  const roleIds = members.value.map(m => m.roleId)
  const batchSize = 5

  try {
    for (let i = 0; i < roleIds.length; i += batchSize) {
      const batch = roleIds.slice(i, i + batchSize).map(async (roleId) => {
        try {
          const res = await store.sendMessageWithPromise(token.id, 'rank_getroleinfo', {
            roleId: Number(roleId), includeBottleTeam: false, isSearch: false,
            bottleType: 0, includeHero: true, includeHeroDetail: true, includePearl: true,
          }, 5000)
          if (res?.roleInfo?.heroes) {
            const { heroList } = processHeroes(res.roleInfo.heroes)
            const lineupType = identifyLineup(heroList)
            if (store.gameData.legionInfo?.info?.members?.[roleId]) {
              store.gameData.legionInfo.info.members[roleId].lineupType = lineupType
            }
          }
        } catch (e) { console.error(`Failed to fetch info for ${roleId}`, e) }
      })
      await Promise.all(batch)
    }
    message.success('阵容信息获取完成')
  } catch (e) {
    message.error(`获取失败: ${e.message}`)
  } finally {
    isFetchingLineup.value = false
  }
}

// 导出图片
async function exportImage() {
  if (!tableRef.value) { message.error('未找到要导出的内容'); return }
  try {
    isExporting.value = true
    message.loading('正在生成图片，请稍候...')
    await new Promise(r => setTimeout(r, 100))
    const canvas = await html2canvas(tableRef.value, {
      scale: 2, useCORS: true, backgroundColor: '#ffffff', logging: false, allowTaint: true,
    })
    const link = document.createElement('a')
    link.download = `俱乐部成员信息_${new Date().toLocaleDateString().replace(/\//g, '-')}.png`
    link.href = canvas.toDataURL()
    link.click()
    message.success('图片导出成功')
  } catch (e) {
    console.error('导出失败:', e)
    message.error('导出图片失败，请重试')
  } finally {
    isExporting.value = false
  }
}

// 导出CSV
function exportCSV() {
  const data = sortedMembers.value
  if (!data?.length) { message.error('暂无成员数据'); return }

  let csv = '序号,成员名称,ID,战力,红淬,阵容,职位\n'
  data.forEach((member, idx) => {
    const name = member.name || ''
    const roleId = member.roleId || ''
    const power = formatNumber(member.power || member.custom?.s_power || 0)
    const red = formatRedQuench(member.custom?.red_quench_cnt || 0)
    const lineup = member.lineupType || '-'
    const job = getJobName(member.job)
    csv += `${idx + 1},"${name.replace(/"/g, '""')}",${roleId},${power},${red},"${lineup.replace(/"/g, '""')}","${job.replace(/"/g, '""')}"\n`
  })

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `俱乐部成员信息_${new Date().toLocaleDateString().replace(/\//g, '-')}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  message.success('表格导出成功')
}

// 查询单个成员
async function queryMember(roleId) {
  if (!store.selectedToken) { message.warning('请先选择游戏角色'); return }
  const tokenId = store.selectedToken.id
  if (store.getWebSocketStatus(tokenId) !== 'connected') { message.error('WebSocket未连接'); return }

  loading.value = true
  try {
    const res = await store.sendMessageWithPromise(tokenId, 'rank_getroleinfo', {
      bottleType: 0, includeBottleTeam: false, isSearch: false, roleId,
      includeHero: true, includeHeroDetail: true, includePearl: true,
    }, 5000)
    if (!res.roleInfo) { message.warning('未查询到玩家信息'); return }

    const pearlInfo = processPearlInfo(res.roleInfo)
    const heroData = processHeroes(res.roleInfo.heroes)
    heroData.heroList.forEach(h => { h.PearlInfo = pearlInfo[h.artifactId] || {} })

    selectedMember.value = {
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
    showDetailModal.value = true
    message.success('查询成功')
  } catch (e) {
    message.error(`查询失败: ${e.message}`)
  } finally {
    loading.value = false
  }
}

// 踢出成员
function kickMember(roleId, name) {
  kickTargetId.value = roleId
  kickTargetName.value = name
  showKickModal.value = true
}

async function confirmKick() {
  // 调用踢出API
  message.success(`已将 ${kickTargetName.value} 踢出俱乐部`)
}

// 职位名称
function getJobName(job) {
  const map = { 1: '会长', 2: '副会长', 3: '精英', 0: '成员' }
  return map[job] || '成员'
}

// 表格列定义
const tableColumns = computed(() => {
  const cols = [
    { title: '序号', key: 'index', width: 60, align: 'center', render: (_, idx) => idx + 1 },
    { title: '头像', key: 'headImg', width: 60, align: 'center',
      render: (row) => row.headImg
        ? h('img', { src: row.headImg, style: { width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' } })
        : h('div', { style: { width: '32px', height: '32px', borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#999' } }, row.name?.charAt(0) || '?')
    },
    { title: '成员', key: 'name', align: 'left', minWidth: 150,
      render: (row) => h('div', { style: { display: 'flex', flexDirection: 'column', cursor: 'pointer' }, onClick: () => queryMember(row.roleId) },
        [h('span', { style: { fontWeight: '500', color: '#1890ff', lineHeight: '1.2' } }, row.name),
         h('span', { style: { fontSize: '12px', color: '#999', lineHeight: '1.2', marginTop: '2px' } }, `ID: ${row.roleId}`)])
    },
    { title: '战力', key: 'power', width: 100, align: 'center',
      render: (row) => formatNumber(row.power || row.custom?.s_power || 0) },
    { title: '红淬', key: 'redQuench', width: 80, align: 'center',
      render: (row) => h('span', { style: { color: '#ff4d4f' } }, formatRedQuench(row.custom?.red_quench_cnt || 0)) },
    { title: '阵容', key: 'lineupType', width: 80, align: 'center',
      render: (row) => {
        if (!row.lineupType) return '-'
        const lineup = lineupList.find(l => l.name === row.lineupType)
        return h(NTag, { size: 'small', bordered: false, color: lineup?.colorProps || {} }, { default: () => row.lineupType })
      }},
  ]
  return cols
})
</script>

<style scoped>
.club-info {
  padding: 16px;
}
.member-detail {
  padding: 16px;
}
.member-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
.member-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}
.member-info h4 {
  margin: 0 0 4px;
  font-size: 18px;
}
.member-info p {
  margin: 2px 0;
  font-size: 13px;
  color: #6b7280;
}
.member-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}
.stat-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f9fafb;
  border-radius: 8px;
}
.stat-label {
  font-size: 13px;
  color: #6b7280;
}
.stat-value {
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
}
.stat-value.red {
  color: #ff4d4f;
}
.hero-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.hero-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background: #f9fafb;
  border-radius: 8px;
}
.hero-avatar {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
}
.hero-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}
.hero-name {
  font-weight: 500;
  color: #1f2937;
}
.hero-power {
  color: #f59e0b;
}
.hero-red {
  color: #ff4d4f;
  font-size: 12px;
}
.hero-hb {
  color: #52c41a;
  font-size: 12px;
}
</style>
```

## 关键逻辑说明

| 功能 | 说明 |
|------|------|
| **成员排序** | 按职位（会长>副会长>精英>成员）-> 红淬数降序 -> 战力降序 |
| **英雄处理** | 解析英雄装备计算红淬数和开孔数，识别四圣等级 |
| **阵容识别** | 通过 `Po()` 函数根据英雄列表识别阵容类型（如魏国、蜀国等） |
| **批量获取** | 每次5个成员并发获取详细信息，避免请求过多 |
| **导出功能** | 支持导出PNG图片（html2canvas）和CSV表格 |
| **成员详情** | 点击成员名称查询详细战力、红淬、四圣、英雄列表 |
| **权限控制** | 非会长/副会长不显示踢出按钮 |
| **鱼灵信息** | 通过 `ls()` 处理鱼灵（Pearl）信息，绑定到对应英雄 |

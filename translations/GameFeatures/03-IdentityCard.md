# IdentityCard 组件 - 翻译文档

## 原始代码位置
- 文件：`GameFeatures-CknTKSSq.js`
- 行号：`12728 ~ 13214`

## 组件概述
IdentityCard（身份牌）是**角色信息展示卡片**，展示角色头像、名称、等级、战力、段位以及大量游戏资源数量。支持嵌入式（embedded）和弹窗（overlay）两种展示模式。

## 依赖关系
```
IdentityCard
├── 外部依赖：
│   ├── Jt - 段位/legacy配置
│   ├── _t() - Pinia Store
│   ├── Y() / O() - Vue ref / computed
│   ├── wt() / xt() - Vue watch / onMounted
│   ├── gt() - Vue defineComponent
│   ├── $e("n-tag") / $e("n-button") - Naive UI 组件
│   └── ks - 身份牌图标
│
├── 被引用：GameStatus（日常Tab、俱乐部Tab）
```

## 原始代码（编译后核心逻辑）
```javascript
const Zw = gt({
  __name: "IdentityCard",
  props: { visible: { type: Boolean }, embedded: { type: Boolean } },
  emits: ["close"],
  setup(t, { emit: A }) {
    const s = Jt,          // 段位配置
      n = _t(),            // Store
      o = A;               // emit
    const i = Y(!1);       // 资源展开/收起

    // 计算属性：角色信息提取
    const r = O(() => {
      const Ge = n.gameData;
      const Ne = Ge?.roleInfo?.role;
      return Ne ? {
        roleId: Ne.roleId,
        name: Ne.name,
        headImg: Ne.headImg,
        level: Ne.level,
        power: Ne.power || Ne.fighting || 0,
        gold: Ne.gold ?? 0,
        legacy: Ne.legacy?.color ?? 0,
        diamond: Ne.diamond ?? 0,
        fishing: Ne.fishing || Ne.fish || null,
        items: Ne.items || Ne.itemList || Ne.bag?.items || Ne.inventory || null,
      } : {};
    });

    const c = O(() => Object.keys(r.value || {}).length > 0); // 是否有数据

    // 头像备选列表
    const f = ["/icons/1733492491706148.png", ...].map((Ge) => "/" + Ge.replace(/^\//, ""));

    const m = Y(""),        // 当前头像URL
      p = Y("");            // 备选头像URL

    // 段位映射
    const Q = {
      0: { icon: "🌱", class: "rank-beginner" },
      1: { icon: "🌱", class: "rank-beginner" },
      2: { icon: "⚔️", class: "rank-known" },
      3: { icon: "🗡️", class: "rank-veteran" },
      4: { icon: "🏹", class: "rank-master" },
      5: { icon: "⚡", class: "rank-hero" },
      6: { icon: "👑", class: "rank-overlord" },
      7: { icon: "🔱", class: "rank-supreme" },
    };

    // 段位信息
    const G = O(() => {
      const Ge = Number(r.value.legacy || 0), Ne = Q[Ge] || Q[0];
      return { title: (s[Ge] || { name: "初出茅庐" }).name, icon: Ne.icon, class: Ne.class };
    });

    // 格式化大数字
    const _ = (Ge) => {
      const Ne = 1e8, lt = 1e4;
      return Ge >= Ne ? (Ge / Ne).toFixed(1) + "亿" : Ge >= lt ? (Ge / lt).toFixed(1) + "万" : Ge.toLocaleString();
    };
    const N = (Ge) => { /* 另一种格式化 */ };

    // 资源计算属性
    const X = O(() => r.value.gold ?? 0);
    const I = O(() => r.value.diamond ?? 0);

    // 从items中查找指定ID道具数量
    const b = (Ge, Ne) => {
      if (!Ge) return null;
      if (Array.isArray(Ge)) {
        const De = Ge.find((Ke) => Number(Ke.id ?? Ke.itemId) === Ne);
        return De ? Number(De.num ?? De.count ?? De.quantity ?? 0) : 0;
      }
      // object类型处理...
      return Number(lt) || 0;
    };

    const U = O(() => r.value.items);
    // 各种道具数量计算属性（约40+个）
    const x = O(() => b(U.value, 1011));   // 普通鱼竿
    const R = O(() => b(U.value, 1012));   // 金鱼竿
    const M = O(() => b(U.value, 1013));   // 珍珠
    const V = O(() => b(U.value, 1001));   // 招募令
    const F = O(() => b(U.value, 1006));   // 精铁
    // ... 更多道具

    // 活动周期计算
    const xe = O(() => {
      const Ge = new Date(), Ne = new Date("2025-12-12T12:00:00"), lt = 7 * 24 * 60 * 60 * 1e3, De = 3 * lt, Ke = Ge - Ne;
      if (Ke < 0) return null;
      const Ze = Ke % De;
      return Ze < lt ? "黑市周" : Ze < 2 * lt ? "招募周" : "宝箱周";
    });

    // 资源列表
    const Le = O(() => {
      const Ge = [
        { label: "金币", value: N(X.value), raw: X.value },
        { label: "金砖", value: N(I.value), raw: I.value },
        { label: "普通鱼竿", value: we(me.value), raw: ke(me.value) },
        { label: "金鱼竿", value: we(se.value), raw: ke(se.value) },
        { label: "珍珠", value: we(M.value), raw: ke(M.value) },
        // ... 约40+种资源
      ];
      const Ne = Ge.filter((De) => De.raw > 0), lt = Ge.filter((De) => De.raw === 0);
      return [...Ne, ...lt]; // 有数量的排前面
    });

    const Pe = O(() => Le.value.length > 6); // 是否超过6项需要折叠

    // 头像加载
    const ot = () => { /* 设置头像 */ };
    const Ve = () => { /* 随机头像 */ };

    xt(async () => { ot(); /* 初始化获取角色信息 */ });
    wt(() => r.value, ot, { deep: !0 });

    // 渲染：embedded模式 / overlay弹窗模式
    return (Ge, Ne) => {
      const lt = $e("n-tag"), De = $e("n-button");
      return t.embedded
        ? l(), u("div", Qw, [
            e("div", Iw, [
              e("div", { class: "card-header" }, [
                e("img", { src: ks, alt: "身份牌", class: "icon" }),
                e("div", { class: "info" }, [e("h3", null, "身份牌"), e("p", null, "角色与资源概览")]),
              ]),
              c.value ? l(), u("div", { key: 0, class: ["role-profile-header", G.value?.class] }, [
                e("div", Fw, [
                  e("div", Uw, [e("img", { src: m.value, alt: r.value.name || "角色", class: "role-avatar", onError: Ve })]),
                  e("div", Hw, [
                    e("div", Ew, [
                      D(a(r.value.name || "未知角色") + " ", 1),
                      r.value.legacy > 0 ? d(lt, { style: { color: "#fff", backgroundColor: s[r.value.legacy]?.value, marginLeft: "8px" }, size: "small", bordered: !1 },
                        { default: g(() => [D(a(s[r.value.legacy]?.name || "未知"), 1)]), _: 1 }, 8, ["style"]) : de("", !0),
                    ]),
                    e("div", Sw, [
                      e("span", Tw, "Lv." + a(r.value.level || 1), 1),
                      e("span", Dw, "战力 " + a(_(r.value.power)), 1),
                    ]),
                    xe.value ? l(), u("div", xw, " 本周活动：" + a(xe.value), 1) : de("", !0),
                  ]),
                ]),
              ], 2) : de("", !0),
              c.value ? l(), u("div", { key: 1, class: ["resources", { collapsed: !i.value }] }, [
                l(!0), u(Fe, null, Se(Le.value, (qe) => l(), u("div", { key: qe.label, class: "res-item" }, [
                  e("span", Lw, a(qe.label), 1),
                  e("span", Mw, a(qe.value), 1),
                ])), 128),
              ], 2) : de("", !0),
              c.value && Pe.value ? l(), u("div", Pw, [
                d(De, { text: "", onClick: () => (i.value = !i.value) }, { default: g(() => [D(a(i.value ? "收起" : "展开全部"), 1)]), _: 1 }),
              ]) : l(), u("div", Rw, "正在获取角色信息..."),
            ]),
          ])
        : l(), Re(ec, { name: "drop" }, {
            default: g(() => [/* overlay弹窗模式 */]),
          });
    };
  },
});
```

## 翻译后代码（Vue 3 + Naive UI）
```vue
<template>
  <!-- 嵌入式模式 -->
  <div v-if="embedded" class="identity-card embedded">
    <div class="card-inner">
      <div class="card-header">
        <img src="/icons/identity-card.png" alt="身份牌" class="icon" />
        <div class="info">
          <h3>身份牌</h3>
          <p>角色与资源概览</p>
        </div>
      </div>

      <template v-if="hasData">
        <!-- 角色信息头部 -->
        <div :class="['role-profile-header', rankInfo.class]">
          <div class="profile-main">
            <div class="avatar-wrapper">
              <img :src="avatarUrl" :alt="roleData.name || '角色'" class="role-avatar" @error="handleAvatarError" />
            </div>
            <div class="profile-info">
              <div class="role-name">
                {{ roleData.name || '未知角色' }}
                <n-tag
                  v-if="roleData.legacy > 0"
                  :style="{ color: '#fff', backgroundColor: legacyConfig[roleData.legacy]?.value, marginLeft: '8px' }"
                  size="small"
                  :bordered="false"
                >
                  {{ legacyConfig[roleData.legacy]?.name || '未知' }}
                </n-tag>
              </div>
              <div class="role-stats">
                <span class="level-text">Lv.{{ roleData.level || 1 }}</span>
                <span class="power-value">战力 {{ formatNumber(roleData.power) }}</span>
              </div>
              <div v-if="activityWeek" class="activity-week">
                本周活动：{{ activityWeek }}
              </div>
            </div>
          </div>
        </div>

        <!-- 资源列表 -->
        <div :class="['resources', { collapsed: !isExpanded }]">
          <div v-for="item in resourceList" :key="item.label" class="res-item">
            <span class="res-label">{{ item.label }}</span>
            <span class="res-value">{{ item.value }}</span>
          </div>
        </div>

        <!-- 展开/收起按钮 -->
        <div v-if="hasData && resourceList.length > 6" class="expand-toggle">
          <n-button text @click="isExpanded = !isExpanded">
            {{ isExpanded ? '收起' : '展开全部' }}
          </n-button>
        </div>
      </template>

      <div v-else class="loading-state">
        正在获取角色信息...
      </div>
    </div>
  </div>

  <!-- 弹窗覆盖层模式 -->
  <transition v-else name="drop">
    <div v-show="visible" class="identity-overlay" @click.self="handleClose">
      <div class="identity-modal">
        <div class="strap">
          <div class="strap-tape"></div>
          <div class="strap-buckle"></div>
        </div>
        <div class="modal-content">
          <div class="card-header">
            <img src="/icons/identity-card.png" alt="身份牌" class="icon" />
            <div class="info">
              <h3>身份牌</h3>
              <p>角色与战力概览</p>
            </div>
            <button class="close-btn" @click="handleClose">✕</button>
          </div>

          <template v-if="hasData">
            <div :class="['role-profile-header', rankInfo.class]">
              <div class="profile-main">
                <div class="avatar-wrapper">
                  <img :src="avatarUrl" :alt="roleData.name || '角色'" class="role-avatar" @error="handleAvatarError" />
                </div>
                <div class="profile-info">
                  <div class="role-name">
                    {{ roleData.name || '未知角色' }}
                    <n-tag
                      v-if="roleData.legacy > 0"
                      :style="{ color: '#fff', backgroundColor: legacyConfig[roleData.legacy]?.value, marginLeft: '8px' }"
                      size="small"
                      :bordered="false"
                    >
                      {{ legacyConfig[roleData.legacy]?.name || '未知' }}
                    </n-tag>
                  </div>
                  <div class="role-stats">
                    <span class="level-text">Lv.{{ roleData.level || 1 }}</span>
                    <span class="power-value">战力 {{ formatNumber(roleData.power) }}</span>
                  </div>
                  <div v-if="activityWeek" class="activity-week">
                    本周活动：{{ activityWeek }}
                  </div>
                </div>
              </div>
              <div class="glow-border"></div>
            </div>
          </template>

          <div v-else class="loading-state">
            正在获取角色信息...
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { NTag, NButton } from 'naive-ui'

const props = defineProps({
  visible: { type: Boolean, default: false },
  embedded: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])

const store = useGameStore()

// ===== 响应式状态 =====
const isExpanded = ref(false)
const avatarUrl = ref('')
const fallbackAvatar = ref('')

// 头像备选列表
const avatarPool = [
  '/icons/1733492491706148.png',
  '/icons/1733492491706152.png',
  '/icons/1736425783912140.png',
  '/icons/173746572831736.png',
  '/icons/174023274867420.png',
]

// 段位映射
const rankMap = {
  0: { icon: '🌱', class: 'rank-beginner' },
  1: { icon: '🌱', class: 'rank-beginner' },
  2: { icon: '⚔️', class: 'rank-known' },
  3: { icon: '🗡️', class: 'rank-veteran' },
  4: { icon: '🏹', class: 'rank-master' },
  5: { icon: '⚡', class: 'rank-hero' },
  6: { icon: '👑', class: 'rank-overlord' },
  7: { icon: '🔱', class: 'rank-supreme' },
}

// 段位配置（从外部注入）
const legacyConfig = {
  0: { name: '初出茅庐', value: '#9ca3af' },
  // ... 更多段位配置
}

// ===== 计算属性 =====
const roleData = computed(() => {
  const info = store.gameData?.roleInfo?.role
  if (!info) return {}
  return {
    roleId: info.roleId,
    name: info.name,
    headImg: info.headImg,
    level: info.level,
    power: info.power || info.fighting || 0,
    gold: info.gold ?? 0,
    legacy: info.legacy?.color ?? 0,
    diamond: info.diamond ?? 0,
    fishing: info.fishing || info.fish || null,
    items: info.items || info.itemList || info.bag?.items || info.inventory || null,
  }
})

const hasData = computed(() => Object.keys(roleData.value || {}).length > 0)

const rankInfo = computed(() => {
  const legacy = Number(roleData.value.legacy || 0)
  const rank = rankMap[legacy] || rankMap[0]
  return {
    title: legacyConfig[legacy]?.name || '初出茅庐',
    icon: rank.icon,
    class: rank.class,
  }
})

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

// 道具查找
function getItemCount(items, itemId) {
  if (!items) return 0
  if (Array.isArray(items)) {
    const item = items.find(i => Number(i.id ?? i.itemId) === itemId)
    return item ? Number(item.num ?? item.count ?? item.quantity ?? 0) : 0
  }
  const direct = items[String(itemId)] ?? items[itemId]
  if (direct != null) {
    return typeof direct === 'number' ? direct : Number(direct.num ?? direct.count ?? direct.quantity ?? 0)
  }
  const found = Object.values(items).find(i => Number(i?.itemId ?? i?.id) === itemId)
  return found ? Number(found.num ?? found.count ?? found.quantity ?? 0) : 0
}

// 各种资源数量
const resources = computed(() => {
  const items = roleData.value.items
  return {
    gold: roleData.value.gold ?? 0,
    diamond: roleData.value.diamond ?? 0,
    normalRod: getItemCount(items, 1011),
    goldRod: getItemCount(items, 1012),
    pearl: getItemCount(items, 1013),
    recruitToken: getItemCount(items, 1001),
    iron: getItemCount(items, 1006),
    jade: getItemCount(items, 1023),
    advStone: getItemCount(items, 1003),
    blueJade: getItemCount(items, 10002),
    redJade: getItemCount(items, 10003),
    fourBeastShard: getItemCount(items, 10101),
    goldBag: getItemCount(items, 3001),
    diamondBag: getItemCount(items, 3002),
    purpleShard: getItemCount(items, 3005),
    orangeShard: getItemCount(items, 3006),
    redShard: getItemCount(items, 3007),
    ironBag: getItemCount(items, 3008),
    advBag: getItemCount(items, 3009),
    nightmareBag: getItemCount(items, 3010),
    whiteJadeBag: getItemCount(items, 3011),
    wrenchBag: getItemCount(items, 3012),
    treasureBowl: getItemCount(items, 3020),
    luxuryBowl: getItemCount(items, 3021),
    redUniversalShard: getItemCount(items, 3201),
    orangeUniversalShard: getItemCount(items, 3302),
    saltIndigo: getItemCount(items, 1019),
    crystal: getItemCount(items, 1016),
    skinCoin: getItemCount(items, 1020),
    sweepCarpet: getItemCount(items, 1021),
    whiteJade: getItemCount(items, 1033),
    shell: getItemCount(items, 1035),
    goldSaltIndigo: getItemCount(items, 1007),
    arenaTicket: getItemCount(items, 1008),
    woodBox: getItemCount(items, 2001),
    bronzeBox: getItemCount(items, 2002),
    goldBox: getItemCount(items, 2003),
    platinumBox: getItemCount(items, 2004),
    diamondBox: getItemCount(items, 2005),
    refreshTicket: getItemCount(items, 35002),
    parts: getItemCount(items, 35009),
    woodTorch: getItemCount(items, 1008),
    bronzeTorch: getItemCount(items, 1009),
    godTorch: getItemCount(items, 1010),
    legionCoin: getItemCount(items, 1014),
    wrench: getItemCount(items, 1026),
    cheerCoin: getItemCount(items, 2101),
  }
})

// 格式化大数字
function formatNumber(num) {
  if (!num) return '0'
  const yi = 1e8, wan = 1e4
  if (num >= yi) return (num / yi).toFixed(1) + '亿'
  if (num >= wan) return (num / wan).toFixed(1) + '万'
  return num.toLocaleString()
}

function formatValue(val) {
  return val == null ? '-' : formatNumber(Number(val))
}

function rawValue(val) {
  return val == null ? 0 : Number(val)
}

// 资源列表（用于渲染）
const resourceList = computed(() => {
  const list = [
    { label: '金币', value: formatValue(resources.value.gold), raw: rawValue(resources.value.gold) },
    { label: '金砖', value: formatValue(resources.value.diamond), raw: rawValue(resources.value.diamond) },
    { label: '普通鱼竿', value: formatValue(resources.value.normalRod), raw: rawValue(resources.value.normalRod) },
    { label: '金鱼竿', value: formatValue(resources.value.goldRod), raw: rawValue(resources.value.goldRod) },
    { label: '珍珠', value: formatValue(resources.value.pearl), raw: rawValue(resources.value.pearl) },
    { label: '复活丹', value: formatValue(resources.value.revivePill), raw: rawValue(resources.value.revivePill) },
    { label: '招募令', value: formatValue(resources.value.recruitToken), raw: rawValue(resources.value.recruitToken) },
    { label: '精铁', value: formatValue(resources.value.iron), raw: rawValue(resources.value.iron) },
    { label: '彩玉', value: formatValue(resources.value.jade), raw: rawValue(resources.value.jade) },
    { label: '进阶石', value: formatValue(resources.value.advStone), raw: rawValue(resources.value.advStone) },
    { label: '蓝玉', value: formatValue(resources.value.blueJade), raw: rawValue(resources.value.blueJade) },
    { label: '红玉', value: formatValue(resources.value.redJade), raw: rawValue(resources.value.redJade) },
    { label: '四圣宝珠碎片', value: formatValue(resources.value.fourBeastShard), raw: rawValue(resources.value.fourBeastShard) },
    { label: '金币袋子', value: formatValue(resources.value.goldBag), raw: rawValue(resources.value.goldBag) },
    { label: '金砖袋子', value: formatValue(resources.value.diamondBag), raw: rawValue(resources.value.diamondBag) },
    { label: '紫色随机碎片', value: formatValue(resources.value.purpleShard), raw: rawValue(resources.value.purpleShard) },
    { label: '橙色随机碎片', value: formatValue(resources.value.orangeShard), raw: rawValue(resources.value.orangeShard) },
    { label: '红色随机碎片', value: formatValue(resources.value.redShard), raw: rawValue(resources.value.redShard) },
    { label: '精铁袋子', value: formatValue(resources.value.ironBag), raw: rawValue(resources.value.ironBag) },
    { label: '进阶袋子', value: formatValue(resources.value.advBag), raw: rawValue(resources.value.advBag) },
    { label: '梦魇袋子', value: formatValue(resources.value.nightmareBag), raw: rawValue(resources.value.nightmareBag) },
    { label: '白玉袋子', value: formatValue(resources.value.whiteJadeBag), raw: rawValue(resources.value.whiteJadeBag) },
    { label: '扳手袋子', value: formatValue(resources.value.wrenchBag), raw: rawValue(resources.value.wrenchBag) },
    { label: '聚宝盆', value: formatValue(resources.value.treasureBowl), raw: rawValue(resources.value.treasureBowl) },
    { label: '豪华聚宝盆', value: formatValue(resources.value.luxuryBowl), raw: rawValue(resources.value.luxuryBowl) },
    { label: '红色万能碎片', value: formatValue(resources.value.redUniversalShard), raw: rawValue(resources.value.redUniversalShard) },
    { label: '橙色万能碎片', value: formatValue(resources.value.orangeUniversalShard), raw: rawValue(resources.value.orangeUniversalShard) },
    { label: '盐靛', value: formatValue(resources.value.saltIndigo), raw: rawValue(resources.value.saltIndigo) },
    { label: '晶石', value: formatValue(resources.value.crystal), raw: rawValue(resources.value.crystal) },
    { label: '皮肤币', value: formatValue(resources.value.skinCoin), raw: rawValue(resources.value.skinCoin) },
    { label: '扫荡魔毯', value: formatValue(resources.value.sweepCarpet), raw: rawValue(resources.value.sweepCarpet) },
    { label: '白玉', value: formatValue(resources.value.whiteJade), raw: rawValue(resources.value.whiteJade) },
    { label: '贝壳', value: formatValue(resources.value.shell), raw: rawValue(resources.value.shell) },
    { label: '金盐靛', value: formatValue(resources.value.goldSaltIndigo), raw: rawValue(resources.value.goldSaltIndigo) },
    { label: '竞技场门票', value: formatValue(resources.value.arenaTicket), raw: rawValue(resources.value.arenaTicket) },
    { label: '木制宝箱', value: formatValue(resources.value.woodBox), raw: rawValue(resources.value.woodBox) },
    { label: '青铜宝箱', value: formatValue(resources.value.bronzeBox), raw: rawValue(resources.value.bronzeBox) },
    { label: '黄金宝箱', value: formatValue(resources.value.goldBox), raw: rawValue(resources.value.goldBox) },
    { label: '铂金宝箱', value: formatValue(resources.value.platinumBox), raw: rawValue(resources.value.platinumBox) },
    { label: '钻石宝箱', value: formatValue(resources.value.diamondBox), raw: rawValue(resources.value.diamondBox) },
    { label: '刷新券', value: formatValue(resources.value.refreshTicket), raw: rawValue(resources.value.refreshTicket) },
    { label: '零件', value: formatValue(resources.value.parts), raw: rawValue(resources.value.parts) },
    { label: '木柴火把', value: formatValue(resources.value.woodTorch), raw: rawValue(resources.value.woodTorch) },
    { label: '青铜火把', value: formatValue(resources.value.bronzeTorch), raw: rawValue(resources.value.bronzeTorch) },
    { label: '咸神火把', value: formatValue(resources.value.godTorch), raw: rawValue(resources.value.godTorch) },
    { label: '军团币', value: formatValue(resources.value.legionCoin), raw: rawValue(resources.value.legionCoin) },
    { label: '扳手', value: formatValue(resources.value.wrench), raw: rawValue(resources.value.wrench) },
    { label: '助威币', value: formatValue(resources.value.cheerCoin), raw: rawValue(resources.value.cheerCoin) },
  ]
  const hasValue = list.filter(item => item.raw > 0)
  const zeroValue = list.filter(item => item.raw === 0)
  return [...hasValue, ...zeroValue]
})

// ===== 方法 =====
function setAvatar() {
  if (roleData.value.headImg) {
    avatarUrl.value = roleData.value.headImg
  } else {
    if (!fallbackAvatar.value) {
      const seed = roleData.value.roleId || roleData.value.name || 'default'
      const hash = Array.from(String(seed)).reduce((sum, char) => sum + char.charCodeAt(0), 0)
      fallbackAvatar.value = avatarPool[hash % avatarPool.length]
    }
    avatarUrl.value = fallbackAvatar.value
  }
}

function handleAvatarError() {
  if (!fallbackAvatar.value) {
    const idx = Math.floor(Math.random() * avatarPool.length)
    fallbackAvatar.value = avatarPool[idx] || avatarPool[0]
  }
  avatarUrl.value = fallbackAvatar.value
}

function handleClose() {
  emit('close')
}

// ===== 生命周期 =====
onMounted(async () => {
  setAvatar()
  if (store.selectedToken && store.getWebSocketStatus(store.selectedToken.id) === 'connected') {
    try {
      await store.sendMessage(store.selectedToken.id, 'role_getroleinfo')
    } catch (e) {}
  }
})

watch(() => roleData.value, setAvatar, { deep: true })
</script>

<style scoped>
.identity-card.embedded {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.card-header .icon {
  width: 40px;
  height: 40px;
}
.card-header h3 {
  margin: 0;
  font-size: 16px;
}
.card-header p {
  margin: 0;
  font-size: 12px;
  color: #999;
}
.role-profile-header {
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
}
.rank-beginner { background: linear-gradient(135deg, #f3f4f6, #e5e7eb); }
.rank-known { background: linear-gradient(135deg, #dbeafe, #bfdbfe); }
.rank-veteran { background: linear-gradient(135deg, #dcfce7, #bbf7d0); }
.rank-master { background: linear-gradient(135deg, #fef3c7, #fde68a); }
.rank-hero { background: linear-gradient(135deg, #fee2e2, #fecaca); }
.rank-overlord { background: linear-gradient(135deg, #f3e8ff, #e9d5ff); }
.rank-supreme { background: linear-gradient(135deg, #ffedd5, #fed7aa); }
.profile-main {
  display: flex;
  align-items: center;
  gap: 16px;
}
.avatar-wrapper {
  flex-shrink: 0;
}
.role-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255,255,255,0.5);
}
.profile-info {
  flex: 1;
}
.role-name {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  display: flex;
  align-items: center;
}
.role-stats {
  display: flex;
  gap: 12px;
  margin-top: 6px;
}
.level-text {
  font-size: 14px;
  color: #6b7280;
}
.power-value {
  font-size: 14px;
  color: #f59e0b;
  font-weight: 500;
}
.activity-week {
  margin-top: 6px;
  font-size: 12px;
  color: #8b5cf6;
  background: rgba(139, 92, 246, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
  display: inline-block;
}
.resources {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  max-height: 200px;
  overflow: hidden;
  transition: max-height 0.3s ease;
}
.resources.collapsed {
  max-height: 72px;
}
.res-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  background: #f9fafb;
  border-radius: 6px;
  font-size: 13px;
}
.res-label {
  color: #6b7280;
}
.res-value {
  color: #1f2937;
  font-weight: 500;
}
.expand-toggle {
  text-align: center;
  margin-top: 8px;
}
.loading-state {
  text-align: center;
  padding: 20px;
  color: #9ca3af;
}

/* 弹窗模式 */
.identity-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.identity-modal {
  background: #fff;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  position: relative;
  overflow: hidden;
}
.strap {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
}
.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(0,0,0,0.05);
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
}
.glow-border {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  pointer-events: none;
  box-shadow: inset 0 0 20px rgba(255,255,255,0.3);
}
</style>
```

## 关键逻辑说明

| 功能 | 说明 |
|------|------|
| **角色信息提取** | 从 `gameData.roleInfo.role` 提取角色基础信息，兼容多种字段名（power/fighting, fishing/fish, items/itemList/bag.items/inventory） |
| **段位系统** | 8个段位等级（0-7），每个段位有对应图标、CSS类、颜色配置 |
| **资源面板** | 展示约45种游戏资源，有数量的排在前面，0数量的排在后面 |
| **大数字格式化** | >=1亿显示"x.x亿"，>=1万显示"x.x万"，否则显示千分位 |
| **头像回退** | 头像加载失败时，根据角色ID哈希或随机选择备选头像 |
| **活动周期** | 基于固定日期2025-12-12计算当前是黑市周/招募周/宝箱周 |
| **展开/收起** | 资源超过6项时显示收起状态，点击展开显示全部 |
| **双模式** | `embedded`为true时内嵌显示，false时弹窗覆盖层显示 |

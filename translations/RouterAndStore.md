# 路由配置与 Pinia Store 翻译文档

> 源码来自 XYZW 游戏管理系统（Vue 3 + Vite + Naive UI + Pinia + Vue Router）
>
> 原始代码经过 Vite 构建混淆，变量名已缩短。本文档将混淆后的代码还原为可读的语义化名称。

---

## 一、路由配置

### 1.1 createRouter 配置

**原始混淆代码：**
```js
const cR = ppe({
  history: $he(),
  routes: FAe,
  scrollBehavior(t, n, r) {
    return r || { top: 0 };
  }
});
```

**还原翻译：**
```ts
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  }
});
```

**说明：**
- `ppe` = `createRouter`（Vue Router 的路由创建函数）
- `$he` = `createWebHistory`（HTML5 History 模式）
- `FAe` = 路由表（routes 数组）
- `scrollBehavior`：页面切换时滚动到顶部，如有保存位置则恢复

---

### 1.2 路由表（routes）

**原始混淆代码：**
```js
const _L = gpe ?? [];
const FAe = [
  { path: "/", name: "Home", component: () => _n(() => import("./Home-BxWYpG6M.js"), __vite__mapDeps([...])) },
  { path: "/tokens", name: "TokenImport", component: () => _n(() => import("./index--7ug8MZB.js"), __vite__mapDeps([...])) },
  { name: "DefaultLayout", path: "/admin", component: () => _n(() => import("./DefaultLayout-B7gLqgBM.js"), __vite__mapDeps([...])) },
  // ...children
  { path: "/websocket-test", name: "WebSocketTest", component: () => _n(() => import("./WebSocketTester-DyA8ulah.js"), __vite__mapDeps([...])) },
  { path: "/login", redirect: "/tokens" },
  { path: "/register", redirect: "/tokens" },
  { path: "/game-roles", redirect: "/tokens" },
  ..._L,
  { path: "/:pathMatch(.*)*", name: "NotFound", component: () => _n(() => import("./NotFound-CVW_YHHK.js"), __vite__mapDeps([...])) },
];
```

**还原翻译：**
```ts
import type { RouteRecordRaw } from "vue-router";

const dynamicRoutes = legacyRouteMap ?? [];

const routes: RouteRecordRaw[] = [
  // ===== 首页 =====
  {
    path: "/",
    name: "Home",
    component: () => import("./views/Home.vue"),
    meta: { title: "首页", requiresToken: false },
  },

  // ===== Token 管理 =====
  {
    path: "/tokens",
    name: "TokenImport",
    component: () => import("./views/TokenImport.vue"),
    meta: { title: "Token管理", requiresToken: false },
    props: (route) => ({
      token: route.query.token,
      name: route.query.name,
      server: route.query.server,
      wsUrl: route.query.wsUrl,
      api: route.query.api,
      auto: route.query.auto === "true",
    }),
  },

  // ===== 管理后台（嵌套布局） =====
  {
    name: "DefaultLayout",
    path: "/admin",
    component: () => import("./layouts/DefaultLayout.vue"),
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("./views/Dashboard.vue"),
        meta: { title: "控制台", requiresToken: true },
      },
      {
        path: "game-features",
        name: "GameFeatures",
        component: () => import("./views/GameFeatures.vue"),
        meta: { title: "游戏功能", requiresToken: true },
      },
      {
        path: "message-test",
        name: "MessageTest",
        component: () => import("./views/MessageTester.vue"),
        meta: { title: "消息测试", requiresToken: true },
      },
      {
        path: "legion-war",
        name: "LegionWar",
        component: () => import("./views/LegionWar.vue"),
        meta: { title: "实时盐场", requiresToken: true },
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("./views/Profile.vue"),
        meta: { title: "个人设置", requiresToken: true },
      },
      {
        path: "daily-tasks",
        name: "DailyTasks",
        component: () => import("./views/DailyTasks.vue"),
        meta: { title: "日常任务", requiresToken: true },
      },
      {
        path: "batch-daily-tasks",
        name: "BatchDailyTasks",
        component: () => import("./views/BatchDailyTasks.vue"),
        meta: { title: "批量日常", requiresToken: true },
      },
      ...dynamicRoutes, // 动态路由（来自旧版路由映射表 gpe）
    ],
  },

  // ===== WebSocket 测试 =====
  {
    path: "/websocket-test",
    name: "WebSocketTest",
    component: () => import("./views/WebSocketTester.vue"),
    meta: { title: "WebSocket测试", requiresToken: true },
  },

  // ===== 重定向（旧路径兼容） =====
  { path: "/login", redirect: "/tokens" },
  { path: "/register", redirect: "/tokens" },
  { path: "/game-roles", redirect: "/tokens" },

  // ===== 动态路由扩展 =====
  ...dynamicRoutes,

  // ===== 404 兜底 =====
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("./views/NotFound.vue"),
    meta: { title: "页面不存在" },
  },
];
```

**路由表汇总：**

| 路径 | 路由名 | 组件文件 | meta.title | requiresToken |
|------|--------|----------|------------|---------------|
| `/` | Home | Home-BxWYpG6M.js | 首页 | ❌ |
| `/tokens` | TokenImport | index--7ug8MZB.js | Token管理 | ❌ |
| `/admin/dashboard` | Dashboard | Dashboard-DOMtKxjz.js | 控制台 | ✅ |
| `/admin/game-features` | GameFeatures | GameFeatures-CknTKSSq.js | 游戏功能 | ✅ |
| `/admin/message-test` | MessageTest | MessageTester-Ceq9D2Es.js | 消息测试 | ✅ |
| `/admin/legion-war` | LegionWar | LegionWar-RziOsa7H.js | 实时盐场 | ✅ |
| `/admin/profile` | Profile | Profile-BT6VKzf5.js | 个人设置 | ✅ |
| `/admin/daily-tasks` | DailyTasks | DailyTasks-OePNIteH.js | 日常任务 | ✅ |
| `/admin/batch-daily-tasks` | BatchDailyTasks | BatchDailyTasks-XgqKel1u.js | 批量日常 | ✅ |
| `/websocket-test` | WebSocketTest | WebSocketTester-DyA8ulah.js | WebSocket测试 | ✅ |
| `/login` | — | — | 重定向到 /tokens | — |
| `/register` | — | — | 重定向到 /tokens | — |
| `/game-roles` | — | — | 重定向到 /tokens | — |
| `/:pathMatch(.*)*` | NotFound | NotFound-CVW_YHHK.js | 页面不存在 | — |

**旧版路由映射表（gpe）：**

| 路径 | 路由名 | 组件文件 |
|------|--------|----------|
| `/BatchDailyTasks` | /BatchDailyTasks | BatchDailyTasks-XgqKel1u.js |
| `/Changelog` | /Changelog | Changelog-CAU39tPM.js |
| `/DailyTasks` | /DailyTasks | DailyTasks-OePNIteH.js |
| `/Dashboard` | /Dashboard | Dashboard-DOMtKxjz.js |
| `/GameFeatures` | /GameFeatures | GameFeatures-CknTKSSq.js |
| `/GameRoles` | /GameRoles | GameRoles-Ccor5s1i.js |
| `/Home` | /Home | Home-BxWYpG6M.js |
| `/LegionWar` | /LegionWar | LegionWar-RziOsa7H.js |
| `/Login` | /Login | Login-Cqy34XNO.js |
| `/NotFound` | /NotFound | NotFound-CVW_YHHK.js |
| `/Profile` | /Profile | Profile-BT6VKzf5.js |
| `/Register` | /Register | Register-CV3Sfm_F.js |
| `/TokenImport` | — | 嵌套路由（含 bin/manual/singlebin/url/wxqrcode 子路由） |

---

### 1.3 路由守卫（beforeEach）

**原始混淆代码：**
```js
cR.beforeEach((t, n, r) => {
  const i = Ic();
  if (document.title = t.meta.title
    ? `${t.meta.title} - XYZW 游戏管理系统`
    : "XYZW 游戏管理系统",
    t.name === "LegionWar" && !LAe()) {
    r("/admin/dashboard");
    return;
  }
  t.meta.requiresToken && !i.hasTokens
    ? r("/tokens")
    : t.path === "/" && i.hasTokens
      ? i.selectedToken
        ? r("/admin/dashboard")
        : r("/tokens")
      : r();
});
```

**还原翻译：**
```ts
router.beforeEach((to, from, next) => {
  const tokenStore = useTokenStore();

  // 设置页面标题
  document.title = to.meta.title
    ? `${to.meta.title} - XYZW 游戏管理系统`
    : "XYZW 游戏管理系统";

  // 实时盐场时间限制检查
  if (to.name === "LegionWar" && !isLegionWarOpenTime()) {
    next("/admin/dashboard");
    return;
  }

  // Token 检查：需要 Token 但没有 → 跳转到 Token 管理
  if (to.meta.requiresToken && !tokenStore.hasTokens) {
    next("/tokens");
  }
  // 首页且有 Token → 跳转到控制台或 Token 管理
  else if (to.path === "/" && tokenStore.hasTokens) {
    tokenStore.selectedToken
      ? next("/admin/dashboard")
      : next("/tokens");
  }
  // 正常放行
  else {
    next();
  }
});
```

**实时盐场开放时间检查函数（LAe → isLegionWarOpenTime）：**

**原始混淆代码：**
```js
function LAe() {
  const t = new Date(),
    n = t.getDay(),
    r = t.getDate(),
    i = t.getHours(),
    o = t.getMinutes(),
    a = i * 60 + o,
    c = (u, l) => {
      let s = [];
      for (let h = 0; h < 31; h++) {
        let d = new Date(u, l, h);
        d.getMonth() == l && d.getDay() == 0 && s.push(h);
      }
      return s;
    };
  if (n == 6 && a >= 1195 && a <= 1260) return !0;
  const f = c(t.getFullYear(), t.getMonth());
  return n == 0 && f.length >= 4 && r == f[3] && a >= 1195 && a <= 1290;
}
```

**还原翻译：**
```ts
/**
 * 检查当前是否为实时盐场（LegionWar）开放时间
 * 开放规则：
 *   - 周六 19:55 ~ 21:00 开放
 *   - 周日（当月第4个周日）19:55 ~ 21:30 开放
 */
function isLegionWarOpenTime(): boolean {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const dayOfMonth = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const timeInMinutes = hours * 60 + minutes;

  // 获取指定年月中所有周日的日期
  const getSundays = (year: number, month: number): number[] => {
    const sundays: number[] = [];
    for (let day = 1; day <= 31; day++) {
      const date = new Date(year, month, day);
      if (date.getMonth() === month && date.getDay() === 0) {
        sundays.push(day);
      }
    }
    return sundays;
  };

  // 周六 19:55 ~ 21:00
  if (dayOfWeek === 6 && timeInMinutes >= 1195 && timeInMinutes <= 1260) {
    return true;
  }

  // 当月第4个周日 19:55 ~ 21:30
  const sundays = getSundays(now.getFullYear(), now.getMonth());
  if (
    dayOfWeek === 0 &&
    sundays.length >= 4 &&
    dayOfMonth === sundays[3] &&
    timeInMinutes >= 1195 &&
    timeInMinutes <= 1290
  ) {
    return true;
  }

  return false;
}
```

> **注意：** 未发现 `afterEach` 路由守卫的使用。

---

### 1.4 懒加载配置

**原始混淆代码：**
```js
const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = [
  "assets/BatchDailyTasks-XgqKel1u.js",
  "assets/imageExport-Ebjauk0F.js",
  // ... 所有 chunk 文件路径
]))) => i.map(i => d[i]);
```

**还原翻译：**
```ts
// Vite 自动生成的依赖预加载映射
// 每个路由组件使用 defineAsyncComponent + import() 实现懒加载
// __vite__mapDeps 将索引数组映射为完整的资源路径数组，用于预加载

// 路由懒加载模式：
const Home = () => import("./views/Home.vue");
const Dashboard = () => import("./views/Dashboard.vue");
// ... 所有路由组件均使用动态 import 实现按需加载
```

**说明：**
- `_n` = `defineAsyncComponent`（Vue 异步组件定义）
- `__vite__mapDeps` = Vite 自动生成的 chunk 依赖映射函数，将索引数组转换为完整资源路径数组
- 所有路由组件均采用 `() => import(...)` 懒加载模式

---

## 二、Pinia Store 翻译

### 2.1 useTokenStore（核心 Token 存储）

**Store ID:** `"tokens"`
**定义位置:** index-UoU16364.js（主 chunk）
**混淆变量名:** `Ic`（store 实例）、`B9`（defineStore）

**原始混淆代码（精简）：**
```js
const Ic = B9("tokens", () => {
  const t = Ge({});           // wsConnections
  const n = Ge({});           // connectionLocks
  const r = Ge({roleInfo: null, legionInfo: null, ...}); // gameData
  const i = Ge({});           // tokenGameDataMap
  const o = Ge({});           // tokenActivityMap
  const li = vd("gameTokens", []);  // gameTokens (持久化)
  const ms = vd("selectedTokenId", null); // selectedTokenId (持久化)
  const te = Ge(new Set);     // runningTokens
  const jo = vd("tokenGroups", []);  // tokenGroups (持久化)
  const bc = vd("activeConnections", {}); // activeConnections (持久化)
  // ... 大量 actions
  return {
    gameTokens: li, selectedTokenId: ms, wsConnections: t,
    gameData: r, tokenAutoRefreshStatus: E, runningTokens: te,
    hasTokens: jbe, selectedToken: Y0, selectedTokenRoleInfo: l,
    addToken: g, updateToken: m, removeToken: v, selectToken: b,
    parseBase64Token: T, importBase64Token: A,
    createWebSocketConnection: K, closeWebSocketConnection: U,
    getWebSocketStatus: G, getWebSocketClient: F,
    sendMessage: J, sendMessageWithPromise: ie,
    setMessageListener: z, setShowMsg: W,
    sendHeartbeat: ne, sendGetRoleInfo: oe, sendGetDataBundleVersion: ue,
    sendSignIn: xe, sendClaimDailyReward: he,
    sendGetTeamInfo: Z, sendGameMessage: ke,
    sendGetMonthlyActivity: se,
    startAutoRefresh: we, stopAutoRefresh: Re,
    exportTokens: Pe, importTokens: Qe,
    clearAllTokens: Be, cleanExpiredTokens: Ee,
    upgradeTokenToPermanent: Ke, initTokenStore: Ze,
    setTokenRunning: le, isTokenRunning: pe,
    attemptTokenRefresh: D, refreshGameData: _,
    sendMessageToLegion: je, sendMessageToWorld: Oe,
    getCurrentTowerLevel: Y, getTowerInfo: X,
    setBattleVersion: qe, getBattleVersion: at,
    validateToken: S, debugToken: me => {...},
    validateConnectionUniqueness: pt,
    connectionMonitor: yt,
    currentSessionId: () => P,
    tokenGroups: jo,
    createTokenGroup: de, deleteTokenGroup: ce,
    updateTokenGroup: ve, addTokenToGroup: Ue,
    removeTokenFromGroup: rt, getTokenGroups: dt,
    getGroupTokenIds: ct, getValidGroupTokenIds: _t,
    cleanupInvalidTokens: lt,
    exportTokenGroups: Ie, importTokenGroups: Xe,
    tokenGameDataMap: i, getTokenGameData: a,
    updateTokenGameData: c, tokenActivityMap: o,
    getTokenActivity: f, setTokenActivity: u,
    devTools: {...},
  };
});
```

**还原翻译：**
```ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useStorage } from "@vueuse/core";

export const useTokenStore = defineStore("tokens", () => {
  // ==================== State ====================

  /** WebSocket 连接映射 { tokenId: WsConnectionState } */
  const wsConnections = ref<Record<string, WsConnectionState>>({});

  /** 连接锁映射 { lockKey: LockInfo } */
  const connectionLocks = ref<Record<string, LockInfo>>({});

  /** 当前选中 Token 的游戏数据 */
  const gameData = ref<GameData>({
    roleInfo: null,
    legionInfo: null,
    carInfo: null,
    commonActivityInfo: null,
    bossTowerInfo: null,
    evoTowerInfo: null,
    monthActivity: null,
    presetTeam: null,
    nmextInfo: null,
    battleVersion: null,
    studyStatus: {
      isAnswering: false,
      questionCount: 0,
      answeredCount: 0,
      status: "",
      timestamp: null,
    },
    lastUpdated: null,
  });

  /** 每个 Token 的独立游戏数据映射 */
  const tokenGameDataMap = ref<Record<string, TokenGameData>>({});

  /** Token 活跃度映射 { tokenId: dailyPoint } */
  const tokenActivityMap = ref<Record<string, number>>({});

  /** 游戏 Token 列表（持久化到 localStorage） */
  const gameTokens = useStorage<GameToken[]>("gameTokens", []);

  /** 当前选中的 Token ID（持久化） */
  const selectedTokenId = useStorage<string | null>("selectedTokenId", null);

  /** 正在执行任务的 Token ID 集合 */
  const runningTokens = ref<Set<string>>(new Set());

  /** Token 分组列表（持久化） */
  const tokenGroups = useStorage<TokenGroup[]>("tokenGroups", []);

  /** 跨标签页活跃连接状态（持久化） */
  const activeConnections = useStorage<Record<string, any>>("activeConnections", {});

  /** Token 自动刷新状态 */
  const tokenAutoRefreshStatus = ref<Record<string, AutoRefreshStatus>>({});

  // ==================== Getters ====================

  /** 是否有 Token */
  const hasTokens = computed(() => gameTokens.value.length > 0);

  /** 当前选中的 Token 对象 */
  const selectedToken = computed(() =>
    gameTokens.value.find(t => t.id === selectedTokenId.value)
  );

  /** 当前选中 Token 的角色信息 */
  const selectedTokenRoleInfo = computed(() => gameData.value.roleInfo);

  // ==================== Actions ====================

  /** 添加 Token */
  function addToken(tokenData: Partial<GameToken>): GameToken {
    const token: GameToken = {
      id: tokenData.id || `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: tokenData.name,
      token: tokenData.token,
      wsUrl: tokenData.wsUrl || null,
      server: tokenData.server || "",
      remark: tokenData.remark || "",
      level: tokenData.level || 1,
      profession: tokenData.profession || "",
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString(),
      isActive: true,
      sourceUrl: tokenData.sourceUrl || null,
      importMethod: tokenData.importMethod || "manual",
      avatar: tokenData.avatar || "",
    };
    gameTokens.value.push(token);
    return token;
  }

  /** 更新 Token */
  function updateToken(id: string, updates: Partial<GameToken>): boolean {
    const index = gameTokens.value.findIndex(t => t.id === id);
    if (index !== -1) {
      const updated = {
        ...gameTokens.value[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      if (updates.token) {
        updated.lastRefreshAt = new Date().toISOString();
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);
        updated.expiresAt = expiresAt.toISOString();
      }
      gameTokens.value[index] = updated;
      return true;
    }
    return false;
  }

  /** 删除 Token */
  async function removeToken(id: string): Promise<boolean> {
    gameTokens.value = gameTokens.value.filter(t => t.id !== id);
    if (wsConnections.value[id]) closeWebSocketConnection(id);
    if (selectedTokenId.value === id) selectedTokenId.value = null;
    await deleteArrayBuffer(id);
    return true;
  }

  /** 选择 Token（切换当前活跃角色） */
  function selectToken(id: string, forceReconnect = false): GameToken | null {
    const token = gameTokens.value.find(t => t.id === id);
    if (!token) return null;

    const isAlreadySelected = selectedTokenId.value === id;
    const isConnected = wsConnections.value[id]?.status === "connected";
    const isConnecting = wsConnections.value[id]?.status === "connecting";

    // 断开旧 Token 连接
    if (!isAlreadySelected && selectedTokenId.value) {
      const oldId = selectedTokenId.value;
      if (wsConnections.value[oldId]) {
        closeWebSocketConnection(oldId);
      }
    }

    // 重置游戏数据
    resetGameData();

    // 更新选中状态
    selectedTokenId.value = id;
    updateToken(id, { lastUsed: new Date().toISOString() });

    // 如果已连接，刷新数据
    if (isConnected) {
      refreshGameData(id);
      return token;
    }

    // 创建新连接
    createWebSocketConnection(id, token.token, token.wsUrl, () => {
      refreshGameData(id);
    });

    return token;
  }

  /** 解析 Base64 Token */
  function parseBase64Token(tokenStr: string): ParseResult {
    try {
      if (!tokenStr || typeof tokenStr !== "string")
        throw new Error("Token字符串无效");

      const base64 = tokenStr.replace(/^data:.*base64,/, "").trim();
      if (base64.length === 0) throw new Error("Token字符串为空");

      let decoded: string;
      try { decoded = atob(base64); } catch { decoded = tokenStr.trim(); }

      let parsed: any;
      try { parsed = JSON.parse(decoded); } catch { parsed = { token: decoded }; }

      const actualToken = parsed.token || parsed.gameToken || decoded;
      if (!validateToken(actualToken))
        throw new Error(`提取的token无效: "${actualToken}"`);

      return { success: true, data: { ...parsed, actualToken } };
    } catch (e) {
      return { success: false, error: "解析失败：" + (e as Error).message };
    }
  }

  /** 导入 Base64 Token */
  function importBase64Token(name: string, tokenStr: string, extra = {}): ImportResult {
    const parsed = parseBase64Token(tokenStr);
    if (!parsed.success) {
      return { success: false, error: parsed.error, message: `Token "${name}" 导入失败: ${parsed.error}` };
    }
    const tokenData = { name, token: parsed.data.actualToken, ...extra, ...parsed.data };
    try {
      const added = addToken(tokenData);
      return {
        success: true,
        token: added,
        tokenName: name,
        message: `Token "${name}" 导入成功`,
      };
    } catch (e) {
      return { success: false, error: (e as Error).message, message: `Token "${name}" 添加失败` };
    }
  }

  /** 创建 WebSocket 连接 */
  async function createWebSocketConnection(
    tokenId: string,
    token: string,
    wsUrl: string | null = null,
    onConnectCallback?: () => void
  ): Promise<any> { /* ... */ }

  /** 关闭 WebSocket 连接 */
  function closeWebSocketConnection(tokenId: string): void { /* ... */ }

  /** 获取 WebSocket 连接状态 */
  function getWebSocketStatus(tokenId: string): string {
    const conn = wsConnections.value[tokenId];
    if (conn) return conn.status;
    const crossTab = checkCrossTabConnection(tokenId);
    return crossTab ? crossTab.action : "disconnected";
  }

  /** 发送游戏命令（带 Promise 等待响应） */
  async function sendMessageWithPromise(
    tokenId: string,
    cmd: string,
    body: any = {},
    timeout = 8000
  ): Promise<any> { /* ... */ }

  /** 尝试自动刷新 Token */
  async function attemptTokenRefresh(
    tokenId: string,
    forceReconnect = false,
    retryCount = 0
  ): Promise<boolean> {
    // 支持 URL/BIN/微信二维码/手动等多种导入方式的自动刷新
    // 最多重试 3 次
    // 刷新成功后自动重连
    /* ... */
  }

  /** 刷新游戏数据 */
  async function refreshGameData(tokenId: string): Promise<void> {
    // 依次刷新：阵容数据 → 俱乐部信息 → 赛车信息 → 怪异塔信息
    // 每项数据有独立的超时和延迟
    /* ... */
  }

  /** 处理收到的游戏消息 */
  async function handleGameMessage(
    tokenId: string,
    message: any,
    client?: any
  ): Promise<void> {
    // 根据 cmd 类型更新对应的 gameData 字段：
    // role_getroleinforesp → roleInfo
    // legion_getinforesp → legionInfo
    // car_getrolecarresp → carInfo
    // evotowerinforesp → evoTowerInfo
    // nmext_getinforesp → nmextInfo
    // 同时同步 randomSeed
    /* ... */
  }

  /** 同步 randomSeed（基于 lastLoginTime） */
  function syncRandomSeed(tokenId: string, data: any, client: any): void {
    const lastLoginTime = extractLastLoginTime(data);
    if (!lastLoginTime) return;
    const seed = generateRandomSeed(lastLoginTime);
    client.send("system_custom", { key: "randomSeed", value: seed });
  }

  /** 启动自动刷新 */
  function startAutoRefresh(): void { /* 已禁用 */ }

  /** 停止自动刷新 */
  function stopAutoRefresh(): void { /* 已禁用 */ }

  /** 导出所有 Token */
  function exportTokens(): ExportData {
    return {
      tokens: gameTokens.value,
      exportedAt: new Date().toISOString(),
      version: "2.0",
    };
  }

  /** 导入 Token */
  function importTokens(data: ImportData): ImportResult { /* ... */ }

  /** 清除所有 Token */
  async function clearAllTokens(): Promise<void> { /* ... */ }

  /** 清理过期 Token（超过24小时未使用的非URL导入Token） */
  async function cleanExpiredTokens(): Promise<number> { /* ... */ }

  /** 初始化 Token Store */
  function initTokenStore(): void {
    startConnectionMonitor();
    setupCrossTabSync();
    setupStorageListener();
  }

  // ---- Token 分组管理 ----
  function createTokenGroup(name: string, color = "#1677ff"): TokenGroup { /* ... */ }
  function deleteTokenGroup(id: string): void { /* ... */ }
  function updateTokenGroup(id: string, updates: Partial<TokenGroup>): void { /* ... */ }
  function addTokenToGroup(groupId: string, tokenId: string): void { /* ... */ }
  function removeTokenFromGroup(groupId: string, tokenId: string): void { /* ... */ }
  function getTokenGroups(tokenId: string): TokenGroup[] { /* ... */ }
  function getGroupTokenIds(groupId: string): string[] { /* ... */ }
  function exportTokenGroups(): boolean { /* ... */ }
  function importTokenGroups(json: string, replace = false): boolean { /* ... */ }

  // ---- DevTools ----
  const devTools = {
    getConnectionStats: () => connectionMonitor.getStats(),
    forceCleanup: () => connectionMonitor.forceCleanup(),
    showConnectionLocks: () => Object.keys(connectionLocks.value),
    showCrossTabStates: () => Object.keys(activeConnections.value),
  };

  return {
    // State
    gameTokens, selectedTokenId, wsConnections, gameData,
    tokenAutoRefreshStatus, runningTokens, tokenGroups,
    // Getters
    hasTokens, selectedToken, selectedTokenRoleInfo,
    // Actions - Token CRUD
    addToken, updateToken, removeToken, selectToken,
    parseBase64Token, importBase64Token,
    // Actions - WebSocket
    createWebSocketConnection, closeWebSocketConnection,
    getWebSocketStatus, getWebSocketClient,
    // Actions - 消息发送
    sendMessage, sendMessageWithPromise,
    setMessageListener, setShowMsg,
    sendHeartbeat, sendGetRoleInfo, sendGetDataBundleVersion,
    sendSignIn, sendClaimDailyReward, sendGetTeamInfo,
    sendGameMessage, sendGetMonthlyActivity,
    sendMessageToLegion, sendMessageToWorld,
    // Actions - 刷新
    startAutoRefresh, stopAutoRefresh,
    attemptTokenRefresh, refreshGameData,
    // Actions - 导入导出
    exportTokens, importTokens,
    clearAllTokens, cleanExpiredTokens,
    upgradeTokenToPermanent,
    // Actions - 初始化
    initTokenStore, setTokenRunning, isTokenRunning,
    // Actions - 战斗版本
    setBattleVersion, getBattleVersion,
    getCurrentTowerLevel, getTowerInfo,
    // Actions - 验证
    validateToken, debugToken, validateConnectionUniqueness,
    // Actions - 监控
    connectionMonitor, currentSessionId,
    // Actions - 分组
    createTokenGroup, deleteTokenGroup, updateTokenGroup,
    addTokenToGroup, removeTokenFromGroup,
    getTokenGroups, getGroupTokenIds, getValidGroupTokenIds,
    cleanupInvalidTokens, exportTokenGroups, importTokenGroups,
    // Actions - 游戏数据映射
    tokenGameDataMap, getTokenGameData, updateTokenGameData,
    tokenActivityMap, getTokenActivity, setTokenActivity,
    // DevTools
    devTools,
  };
});
```

---

### 2.2 useLocalTokenStore（本地 Token 管理器）

**Store ID:** `"localToken"`
**定义位置:** localTokenManager-BQJEcmfy.js
**混淆变量名:** `oe`（store 定义）、`z`（defineStore）、导出为 `u`

**还原翻译：**
```ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useLocalTokenStore = defineStore("localToken", () => {
  // ==================== State ====================

  /** 用户认证 Token */
  const userToken = ref<string | null>(null);

  /** 游戏 Token 映射 { roleId: GameTokenData } */
  const gameTokens = ref<Record<string, GameTokenData>>({});

  /** WebSocket 连接映射 { roleId: WsConnectionState } */
  const wsConnections = ref<Record<string, WsConnectionState>>({});

  // ==================== Getters ====================

  /** 用户是否已认证 */
  const isUserAuthenticated = computed(() => !!userToken.value);

  /** 是否有游戏 Token */
  const hasGameTokens = computed(() => Object.keys(gameTokens.value).length > 0);

  // ==================== IndexedDB 操作 ====================

  /** 数据库名称 */
  const DB_NAME = "xyzw_token_db";
  const DB_VERSION = 1;
  const KV_STORE = "kv";
  const TOKEN_STORE = "gameTokens";

  /** 打开 IndexedDB */
  function openDB(): Promise<IDBDatabase> { /* ... */ }

  /** 执行 IndexedDB 事务 */
  async function dbTransaction(storeName: string, mode: IDBTransactionMode, operation: Function): Promise<any> { /* ... */ }

  /** KV 读取 */
  async function kvGet(key: string): Promise<any> { /* ... */ }

  /** KV 写入 */
  async function kvSet(key: string, value: any): Promise<void> { /* ... */ }

  /** KV 删除 */
  async function kvDelete(key: string): Promise<void> { /* ... */ }

  /** 读取用户 Token */
  async function getUserToken(): Promise<string | undefined> { return kvGet("userToken"); }

  /** 保存用户 Token */
  async function saveUserToken(token: string): Promise<void> { return kvSet("userToken", token); }

  /** 删除用户 Token */
  async function deleteUserToken(): Promise<void> { return kvDelete("userToken"); }

  /** 读取所有游戏 Token */
  async function getAllGameTokens(): Promise<Record<string, GameTokenData>> { /* ... */ }

  /** 保存游戏 Token */
  async function saveGameToken(roleId: string, data: GameTokenData): Promise<void> { /* ... */ }

  /** 删除游戏 Token */
  async function deleteGameToken(roleId: string): Promise<void> { /* ... */ }

  /** 清空所有游戏 Token */
  async function clearAllGameTokensDB(): Promise<void> { /* ... */ }

  /** 从 localStorage 迁移数据到 IndexedDB */
  async function migrateFromLocalStorage(): Promise<{ migrated: boolean; error?: string }> { /* ... */ }

  // ==================== Actions ====================

  /** 设置用户 Token */
  function setUserToken(token: string): void {
    userToken.value = token;
    saveUserToken(token).catch(e => console.warn("保存用户Token失败:", e));
  }

  /** 清除用户 Token */
  function clearUserToken(): void {
    userToken.value = null;
    deleteUserToken().catch(e => console.warn("清除用户Token失败:", e));
  }

  /** 添加游戏 Token */
  function addGameToken(roleId: string, data: Partial<GameTokenData>): GameTokenData { /* ... */ }

  /** 获取游戏 Token */
  function getGameToken(roleId: string): GameTokenData | undefined { /* ... */ }

  /** 更新游戏 Token */
  function updateGameToken(roleId: string, updates: Partial<GameTokenData>): void { /* ... */ }

  /** 删除游戏 Token */
  function removeGameToken(roleId: string): void { /* ... */ }

  /** 清空所有游戏 Token */
  function clearAllGameTokens(): void { /* ... */ }

  /** 创建 WebSocket 连接 */
  async function createWebSocketConnection(roleId: string, token: string, wsUrl?: string | null): Promise<any> {
    // 懒加载 WsAgent 和 gameCommands
    const { WsAgent } = await import("./wsAgent");
    const { gameCommands } = await import("./gameCommands");

    // 解析 Base64 Token
    let actualToken = token;
    try {
      const base64 = token.replace(/^data:.*base64,/, "").trim();
      const decoded = atob(base64);
      try {
        const parsed = JSON.parse(decoded);
        actualToken = parsed.token || parsed.gameToken || decoded;
      } catch { actualToken = decoded; }
    } catch { actualToken = token; }

    // 创建 WsAgent 实例
    const agent = new WsAgent({
      heartbeatInterval: 2000,
      queueInterval: 50,
      channel: "x",
      autoReconnect: true,
      maxReconnectAttempts: 5,
    });

    // 设置回调
    agent.onOpen = () => { /* 更新状态为 connected */ };
    agent.onMessage = (msg) => { /* 处理消息 */ };
    agent.onError = (err) => { /* 更新状态为 error */ };
    agent.onClose = () => { /* 更新状态为 disconnected */ };
    agent.onReconnect = (attempt) => { /* 更新状态为 reconnecting */ };

    // 构建 WebSocket URL
    const url = wsUrl || WsAgent.buildUrl(
      "wss://xxz-xyzw.hortorgames.com/agent",
      { p: actualToken, e: "x", lang: "chinese" }
    );

    await agent.connect(url);
    return agent;
  }

  /** 关闭 WebSocket 连接 */
  function closeWebSocketConnection(roleId: string): void { /* ... */ }

  /** 获取 WebSocket 连接状态 */
  function getWebSocketStatus(roleId: string): string { /* ... */ }

  /** 获取 WebSocket 连接详情 */
  function getWebSocketDetails(roleId: string): ConnectionDetails { /* ... */ }

  /** 发送游戏命令 */
  function sendGameCommand(roleId: string, cmd: string, params = {}): boolean { /* ... */ }

  /** 发送游戏命令（带 Promise） */
  async function sendGameCommandWithPromise(
    roleId: string, cmd: string, params = {}, timeout = 8000
  ): Promise<any> { /* ... */ }

  /** 导出所有 Token */
  function exportTokens(): ExportData { /* ... */ }

  /** 导入 Token */
  function importTokens(data: ImportData): ImportResult { /* ... */ }

  /** 清理过期 Token */
  function cleanExpiredTokens(): number { /* ... */ }

  /** 初始化 Token 管理器 */
  async function initTokenManager(): Promise<void> {
    await migrateFromLocalStorage();
    const [savedUserToken, savedGameTokens] = await Promise.all([
      getUserToken(), getAllGameTokens()
    ]);
    if (savedUserToken) userToken.value = savedUserToken;
    gameTokens.value = savedGameTokens || {};
    cleanExpiredTokens();
  }

  return {
    userToken, gameTokens, wsConnections,
    isUserAuthenticated, hasGameTokens,
    setUserToken, clearUserToken,
    addGameToken, getGameToken, updateGameToken, removeGameToken, clearAllGameTokens,
    createWebSocketConnection, closeWebSocketConnection,
    getWebSocketStatus, getWebSocketDetails,
    sendGameCommand, sendGameCommandWithPromise,
    exportTokens, importTokens, cleanExpiredTokens,
    initTokenManager,
  };
});
```

---

### 2.3 useAuthStore（认证存储）

**Store ID:** `"auth"`
**定义位置:** auth-BYvggjsB.js
**混淆变量名:** `p`（store 定义）、`h`（defineStore）、导出为 `u`

**原始混淆代码：**
```js
const p = h("auth", () => {
  const s = c(null),           // user
    t = c(localStorage.getItem("token") || null),  // token
    o = c(!1),                 // isLoading
    n = k(),                   // localTokenStore
    i = u(() => !!t.value && !!s.value),  // isAuthenticated
    m = u(() => s.value),      // userInfo
    g = async (e) => { ... },  // login
    f = async (e) => { ... },  // register
    a = () => { ... };         // logout
  return {
    user: s, token: t, isLoading: o,
    isAuthenticated: i, userInfo: m,
    login: g, register: f, logout: a,
    fetchUserInfo: async () => { ... },
    initAuth: async () => { ... },
  };
});
```

**还原翻译：**
```ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useLocalTokenStore } from "./localTokenManager";

export const useAuthStore = defineStore("auth", () => {
  // ==================== State ====================

  /** 当前用户信息 */
  const user = ref<UserInfo | null>(null);

  /** 认证 Token */
  const token = ref<string | null>(localStorage.getItem("token") || null);

  /** 是否正在加载 */
  const isLoading = ref(false);

  /** 本地 Token 管理器实例 */
  const localTokenStore = useLocalTokenStore();

  // ==================== Getters ====================

  /** 是否已认证 */
  const isAuthenticated = computed(() => !!token.value && !!user.value);

  /** 用户信息 */
  const userInfo = computed(() => user.value);

  // ==================== Actions ====================

  /** 本地登录（无后端，生成模拟用户） */
  async function login(credentials: { username: string; email?: string; password: string }): Promise<LoginResult> {
    try {
      isLoading.value = true;
      const userInfo: UserInfo = {
        id: "local_user_" + Date.now(),
        username: credentials.username,
        email: credentials.email || `${credentials.username}@local.game`,
        avatar: "/icons/xiaoyugan.png",
        createdAt: new Date().toISOString(),
      };
      const authToken = "local_token_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);

      token.value = authToken;
      user.value = userInfo;
      localStorage.setItem("token", token.value);
      localStorage.setItem("user", JSON.stringify(user.value));
      localTokenStore.setUserToken(authToken);

      return { success: true };
    } catch (e) {
      console.error("登录错误:", e);
      return { success: false, message: "本地认证失败" };
    } finally {
      isLoading.value = false;
    }
  }

  /** 本地注册（存储到 localStorage） */
  async function register(data: { username: string; email: string; password: string }): Promise<RegisterResult> {
    try {
      isLoading.value = true;
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      if (registeredUsers.some((u: any) => u.username === data.username)) {
        return { success: false, message: "用户名已存在" };
      }
      const newUser = { ...data, id: "user_" + Date.now(), createdAt: new Date().toISOString() };
      registeredUsers.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
      return { success: true, message: "注册成功，请登录" };
    } catch (e) {
      console.error("注册错误:", e);
      return { success: false, message: "本地注册失败" };
    } finally {
      isLoading.value = false;
    }
  }

  /** 登出 */
  function logout(): void {
    user.value = null;
    token.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("gameRoles");
    localTokenStore.clearUserToken();
    localTokenStore.clearAllGameTokens();
  }

  /** 获取用户信息（从 localStorage 恢复） */
  async function fetchUserInfo(): Promise<boolean> {
    try {
      if (!token.value) return false;
      const stored = localStorage.getItem("user");
      if (stored) {
        try {
          user.value = JSON.parse(stored);
          return true;
        } catch (e) {
          console.error("解析用户信息失败:", e);
          logout();
          return false;
        }
      } else {
        logout();
        return false;
      }
    } catch (e) {
      console.error("获取用户信息失败:", e);
      logout();
      return false;
    }
  }

  /** 初始化认证（从 localStorage 恢复会话） */
  async function initAuth(): Promise<void> {
    const stored = localStorage.getItem("user");
    if (token.value && stored) {
      try {
        user.value = JSON.parse(stored);
        localTokenStore.initTokenManager();
      } catch (e) {
        console.error("初始化认证失败:", e);
        logout();
      }
    }
  }

  return {
    user, token, isLoading,
    isAuthenticated, userInfo,
    login, register, logout,
    fetchUserInfo, initAuth,
  };
});
```

---

## 三、全局配置

### 3.1 Vue App 创建与插件注册

**原始混淆代码：**
```js
Ex = $N(zAe);
Ex.use(I9());
Ex.use(cR);
Ex.use(w5);
// ...
VAe();
Ex.mount("#app");
```

**还原翻译：**
```ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import naive from "naive-ui";
import App from "./App.vue";

// 创建 Vue 应用
const app = createApp(App);

// 注册 Pinia 状态管理
app.use(createPinia());

// 注册 Vue Router
app.use(router);

// 注册 Naive UI 组件库
app.use(naive);

// 初始化主题
initTheme();

// 挂载应用
app.mount("#app");
```

**说明：**
- `$N` = `createApp`（Vue 应用创建函数）
- `zAe` = App 根组件
- `I9()` = `createPinia()`（Pinia 状态管理创建函数）
- `cR` = `router`（Vue Router 实例）
- `w5` = `naive`（Naive UI 插件，通过 `rhe({components: ...})` 创建，注册所有 Naive UI 组件）
- `VAe` = `initTheme()`（主题初始化函数）

---

### 3.2 App 根组件

**原始混淆代码：**
```js
const zAe = {
  __name: "App",
  setup(t) {
    const { isDark, initTheme, setupSystemThemeListener, updateReactiveState } = UAe();
    const a = be(() => n.value ? ahe : null);
    // ...
    return (f, u) => {
      const l = Rd("router-view");
      const s = Rd("n-dialog-provider");
      const h = Rd("n-notification-provider");
      const d = Rd("n-loading-bar-provider");
      const g = Rd("n-message-provider");
      const m = Rd("n-config-provider");
      return fb(), pb(m, { theme: a.value }, {
        default: Yd(() => [
          Ci(g, null, { default: Yd(() => [
            Ci(d, null, { default: Yd(() => [
              Ci(h, null, { default: Yd(() => [
                Ci(s, null, { default: Yd(() => [
                  GS("div", GAe, [Ci(l)])
                ]), _: 1 })
              ]), _: 1 })
            ]), _: 1 })
          ]), _: 1 })
        ]), _: 1
      }, 8, ["theme"]);
    };
  }
};
```

**还原翻译：**
```vue
<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <n-message-provider>
      <n-loading-bar-provider>
        <n-notification-provider>
          <n-dialog-provider>
            <div id="app">
              <router-view />
            </div>
          </n-dialog-provider>
        </n-notification-provider>
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme } from "naive-ui";
import { useTheme } from "./composables/useTheme";

const { isDark, initTheme, setupSystemThemeListener, updateReactiveState } = useTheme();

onMounted(() => {
  initTheme();
  setupSystemThemeListener();
  window.addEventListener("theme-change", () => {
    updateReactiveState();
    setTimeout(() => updateReactiveState(), 50);
  });
  updateReactiveState();
});

onUnmounted(() => {
  window.removeEventListener("theme-change", handler);
});
</script>
```

**说明：**
- App 组件嵌套了 Naive UI 的全局 Provider：ConfigProvider → MessageProvider → LoadingBarProvider → NotificationProvider → DialogProvider
- `ahe` = `darkTheme`（Naive UI 暗色主题）
- `Rd` = `resolveComponent`（Vue 组件解析）

---

### 3.3 主题管理（useTheme composable）

**还原翻译：**
```ts
/**
 * 主题管理 Composable
 * 支持暗色/亮色/自动模式
 * 通过 localStorage 持久化主题偏好
 * 监听系统主题变化
 */
function useTheme() {
  const isDark = ref(false);

  /** 检查当前是否为暗色模式 */
  const checkDark = () =>
    document.documentElement.classList.contains("dark") ||
    document.documentElement.getAttribute("data-theme") === "dark";

  /** 更新响应式状态 */
  const updateReactiveState = () => { isDark.value = checkDark(); };

  /** 设置暗色主题 */
  function setDarkTheme(): void {
    document.documentElement.classList.add("dark");
    document.documentElement.setAttribute("data-theme", "dark");
    document.body.classList.add("dark");
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    isDark.value = true;
    window.dispatchEvent(new CustomEvent("theme-change", { detail: { isDark: true } }));
  }

  /** 设置亮色主题 */
  function setLightTheme(): void {
    document.documentElement.classList.remove("dark");
    document.documentElement.removeAttribute("data-theme");
    document.body.classList.remove("dark");
    document.body.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    isDark.value = false;
    window.dispatchEvent(new CustomEvent("theme-change", { detail: { isDark: false } }));
  }

  /** 切换主题 */
  function toggleTheme(): void {
    isDark.value ? setLightTheme() : setDarkTheme();
  }

  /** 初始化主题 */
  function initTheme(): void {
    const saved = localStorage.getItem("theme") || "auto";
    if (saved === "dark") {
      setDarkTheme();
    } else if (saved === "light") {
      setLightTheme();
    } else {
      // auto: 跟随系统
      if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
        setDarkTheme();
      } else {
        setLightTheme();
      }
    }
    updateReactiveState();
  }

  /** 监听系统主题变化 */
  function setupSystemThemeListener(): void {
    window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (!localStorage.getItem("theme")) initTheme();
    });
  }

  /** 获取当前主题名称 */
  function getCurrentTheme(): "dark" | "light" {
    return isDark.value ? "dark" : "light";
  }

  return {
    isDark, initTheme, toggleTheme,
    setDarkTheme, setLightTheme,
    setupSystemThemeListener, getCurrentTheme,
    updateReactiveState,
  };
}
```

---

### 3.4 全局组件注册

**Naive UI 组件注册：**
```ts
// 通过 naive-ui 插件批量注册所有组件
const naive = create({
  components: Object.keys(allComponents).map(key => allComponents[key]),
});
app.use(naive);
```

**Router 内置组件注册（由 vue-router 自动完成）：**
- `RouterLink` → `<router-link>`
- `RouterView` → `<router-view>`

> **注意：** 未发现自定义全局组件或全局指令的注册。

---

## 四、工具函数

### 4.1 g_utils（编码/解码工具集）

**混淆变量名:** `R_`
**导出名:** `g_utils`

**还原翻译：**
```ts
/**
 * 游戏协议编码/解码工具集
 * 封装了 BON 协议编解码、加密/解密、消息解析等功能
 */
export const g_utils = {
  /** 获取加密器实例 */
  getEnc: getEnc,

  /** 编码消息（对象 → Uint8Array） */
  encode: (data: any, encName: string = "x"): Uint8Array => {
    const encoded = bon.encode(data, false);
    const enc = getEnc(encName);
    const encrypted = enc.encrypt(encoded);
    return encrypted.buffer.byteLength === encrypted.length
      ? encrypted.buffer
      : encrypted.buffer.slice(0, encrypted.length);
  },

  /** 解码消息（ArrayBuffer → ProtoMsg） */
  parse: (data: ArrayBuffer, encName: string = "auto"): ProtoMsg => {
    const uint8 = new Uint8Array(data);
    const enc = getEnc(encName);
    const decrypted = enc.decrypt(uint8);
    const decoded = bon.decode(decrypted);
    return new ProtoMsg(decoded);
  },

  /** BON 协议编解码器 */
  bon: bon,
};
```

**模块导出列表：**
```ts
export {
  BonDecoder,    // BON 解码器类
  BonEncoder,    // BON 编码器类
  DataReader,    // 数据读取器
  DataWriter,    // 数据写入器
  Int64,         // 64位整数支持
  ProtoMsg,      // 协议消息类
  ProtoMsgLegion,// 盐场协议消息类
  bon,           // BON 编解码 { encode, decode }
  encode,        // 编码函数
  g_utils,       // 工具集
  getEnc,        // 获取加密器
  parse,         // 解码函数
};
```

---

### 4.2 BON 协议解析

**来源:** `@o4e/bon` 库（版本 3.1.48）
**混淆变量名:** `ql`（bon 实例）、`Y5`（BonDecoder）、`K5`（BonEncoder）

**还原翻译：**
```ts
/**
 * BON (Binary Object Notation) 协议
 * 类似 JSON 的二进制序列化格式，用于游戏服务器通信
 */
export const bon = {
  /** 编码：JS 对象 → Uint8Array */
  encode(data: any, withHeader = true): Uint8Array {
    const encoder = new BonEncoder();
    encoder.reset();
    encoder.encode(data);
    return encoder.getBytes(withHeader);
  },

  /** 解码：Uint8Array → JS 对象 */
  decode(data: Uint8Array): any {
    const decoder = new BonDecoder();
    decoder.reset(data);
    return decoder.decode();
  },
};
```

**BON 消息体自动解码流程（在 WsAgent 中）：**
```ts
// 收到 WebSocket 消息后
if (message.body && shouldDecodeBody(message.body)) {
  try {
    if (g_utils?.bon?.decode) {
      const uint8 = convertToUint8Array(message.body);
      if (uint8) {
        const decoded = g_utils.bon.decode(uint8);
        message.decodedBody = decoded;  // 附加解码后的数据
      }
    }
  } catch (e) {
    logger.error("BON消息体解码失败:", e.message);
  }
}
```

---

### 4.3 加密函数

#### 4.3.1 LZ4 XOR 加密

**混淆变量名:** `E`（lz4XorEncode）、`M`（lz4XorDecode）

**还原翻译：**
```ts
/**
 * LZ4 XOR 加密/解密
 * 先用 LZ4 压缩，再进行 XOR 异或加密
 * 用于 WebSocket 消息的传输加密
 */
export const lz4XorEncode: Encryptor = {
  // LZ4 压缩 + XOR 加密
  encrypt(data: Uint8Array): Uint8Array { /* ... */ },
};

export const lz4XorDecode: Decryptor = {
  // XOR 解密 + LZ4 解压
  decrypt(data: Uint8Array): Uint8Array { /* ... */ },
};
```

#### 4.3.2 XOR 加密

**混淆变量名:** `L`（xorEncode）、`w`（xorDecode）

```ts
/** 简单 XOR 异或加密 */
export function xorEncode(data: Uint8Array, key: number): Uint8Array { /* ... */ }

/** 简单 XOR 异或解密 */
export function xorDecode(data: Uint8Array, key: number): Uint8Array { /* ... */ }
```

#### 4.3.3 加密器注册系统

```ts
/** 注册加密器 */
function registerEncryptor(name: string, encryptor: { encrypt, decrypt }): void { /* ... */ }

/** 获取加密器 */
function getEnc(name: string): Encryptor { /* ... */ }

// 默认注册的加密器：
// { decrypt: lz4XorDecode, encrypt: lz4XorEncode }
```

#### 4.3.4 randomSeed 生成

**混淆变量名:** `_ge`

```ts
/**
 * 基于 lastLoginTime 生成 randomSeed
 * 用于游戏反作弊校验
 */
function generateRandomSeed(lastLoginTime: number): number {
  if (lastLoginTime == null) return 0;
  const num = Number(lastLoginTime);
  if (Number.isNaN(num)) return 0;

  let seed = num | 0;
  seed ^= 0x5bd1e995;               // MurmurHash3 常量
  seed = ((seed << 16) | (seed >>> 16)) >>> 0;
  seed ^= 0x19d3a6de;
  seed ^= 0x3c2c7c3b;
  return seed >>> 0;
}
```

---

### 4.4 WebSocket 封装（WsAgent）

**混淆变量名:** `tge`（WsAgent 类）

**还原翻译：**
```ts
/**
 * WebSocket 客户端封装
 * 支持心跳、消息队列、自动重连、BON 解码
 */
class WsAgent {
  url: string;
  utils: typeof g_utils;
  enc: Encryptor | undefined;
  socket: WebSocket | null;
  ack: number;
  seq: number;
  sendQueue: any[];
  sendQueueTimer: number | null;
  heartbeatTimer: number | null;
  heartbeatInterval: number;
  messageListener: ((msg: any) => void) | null;
  connected: boolean;
  isReconnecting: boolean;
  promises: Record<string, PromiseHandlers>;
  registry: GameCommandRegistry;
  onConnect: (() => void) | null;
  onDisconnect: (() => void) | null;
  onError: ((err: any) => void) | null;

  constructor({ url, utils, heartbeatMs = 5000 }: WsAgentOptions) {
    this.url = url;
    this.utils = utils || g_utils;
    this.enc = this.utils?.getEnc ? this.utils.getEnc("auto") : undefined;
    this.heartbeatInterval = heartbeatMs;
    this.registry = createGameCommandRegistry(new GameCommands(this.utils, this.enc));
    // ... 初始化其他属性
  }

  /** 初始化 WebSocket 连接 */
  init(): void {
    logger.info(`连接: ${this.url.split("?")[0]}`);
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      logger.info("连接成功");
      this.connected = true;
      this.setupHeartbeat();
      this.processQueueLoop();
      this.onConnect?.();
    };

    this.socket.onmessage = (event) => {
      // 处理消息：JSON / ArrayBuffer / Blob
      // 自动进行 BON 解码
      // 处理 Promise 响应
      /* ... */
    };

    this.socket.onclose = (event) => {
      logger.info(`WebSocket 连接关闭: ${event.code} ${event.reason}`);
      this.connected = false;
      // ... 重连逻辑
    };

    this.socket.onerror = (error) => {
      logger.error("WebSocket 错误:", error);
      this.onError?.(error);
    };
  }

  /** 发送消息 */
  send(data: any): void { /* 加入队列或直接发送 */ }

  /** 发送消息并等待响应 */
  async sendWithPromise(options: { cmd: string; body: any; timeout: number }): Promise<any> { /* ... */ }

  /** 设置心跳 */
  private setupHeartbeat(): void { /* 每 heartbeatInterval 毫秒发送心跳 */ }

  /** 处理发送队列 */
  private processQueueLoop(): void { /* 每 50ms 处理队列中的消息 */ }

  /** 重连 */
  reconnect(): void { /* 断开后 1 秒重连 */ }

  /** 断开连接 */
  disconnect(): void { this.socket?.close(); }

  /** 构建 WebSocket URL */
  static buildUrl(baseUrl: string, params: Record<string, string>): string {
    const query = new URLSearchParams(params).toString();
    return `${baseUrl}?${query}`;
  }

  /** 获取连接状态 */
  getStatus(): AgentStatus { /* ... */ }
}
```

**默认 WebSocket 服务器地址：**
```
wss://xxz-xyzw.hortorgames.com/agent?p={token}&e=x&lang=chinese
```

---

### 4.5 GameCommands（游戏命令注册表）

**混淆变量名:** `Jpe`（GameCommands 类）、`ege`（注册函数）

**还原翻译：**
```ts
/**
 * 游戏命令注册表
 * 注册所有游戏协议命令及其默认参数
 */
class GameCommands {
  encoder: typeof g_utils;
  enc: Encryptor;
  commands: Map<string, CommandFactory>;

  constructor(encoder: typeof g_utils, enc: Encryptor) {
    this.encoder = encoder;
    this.enc = enc;
    this.commands = new Map();
  }

  /** 注册命令 */
  register(cmd: string, defaultBody = {}): GameCommands {
    this.commands.set(cmd, (ack = 0, seq = 0, overrides = {}) => {
      const body = this.encoder?.bon?.encode
        ? this.encoder.bon.encode({ ...defaultBody, ...overrides })
        : { ...defaultBody, ...overrides };
      return { cmd, ack, seq, time: Date.now(), body };
    });
    return this;
  }

  /** 注册心跳命令 */
  registerHeartbeat(): GameCommands {
    this.commands.set("heart_beat", (ack, seq) => ({
      cmd: "_sys/ack", ack, seq, time: Date.now(), body: {},
    }));
    return this;
  }

  /** 编码数据包 */
  encodePacket(data: any): Uint8Array | string {
    return this.encoder?.encode
      ? this.encoder.encode(data, this.enc)
      : JSON.stringify(data);
  }

  /** 构建命令 */
  build(cmd: string, ack: number, seq: number, params: any): GameMessage {
    const factory = this.commands.get(cmd);
    if (!factory) throw new Error(`Unknown cmd: ${cmd}`);
    return factory(ack, seq, params);
  }
}

/** 创建并注册所有游戏命令 */
function createGameCommandRegistry(gameCommands: GameCommands): GameCommands {
  return gameCommands
    .registerHeartbeat()
    .register("role_getroleinfo", {
      clientVersion: "2.10.3-f10a39eaa0c409f4-wx",
      inviteUid: 0,
      platform: "hortor",
      platformExt: "mix",
      scene: "",
    })
    .register("system_getdatabundlever", { isAudit: false })
    .register("system_buygold", { buyNum: 1 })
    .register("system_claimhangupreward")
    .register("system_signinreward")
    .register("system_custom", { key: "", value: 0 })
    .register("task_claimdailypoint", { taskId: 1 })
    .register("task_claimdailyreward", { rewardId: 0 })
    .register("task_claimweekreward", { rewardId: 0 })
    .register("friend_batch", { friendId: 0 })
    .register("hero_recruit", { byClub: false, recruitNumber: 1, recruitType: 3 })
    .register("item_openbox", { itemId: 2001, number: 10 })
    .register("item_batchclaimboxpointreward")
    .register("item_openpack")
    .register("rank_getserverrank")
    .register("arena_startarea")
    .register("fight_startlevel")
    .register("arena_getareatarget", { refresh: false })
    .register("arena_getarearank")
    .register("store_goodslist", { storeId: 1 })
    .register("store_buy", { goodsId: 1 })
    .register("store_purchase", { goodsId: 1 })
    .register("store_getpurchase")
    .register("store_refresh", { storeId: 1 })
    .register("legion_getinfo")
    .register("legion_signin")
    .register("legion_getwarrank")
    .register("legionwar_getdetails")
    .register("legion_storebuygoods")
    .register("legion_storegoodslist")
    .register("legion_kickout")
    .register("legion_applylist")
    .register("legion_approveapply")
    .register("legion_refuseapply")
    .register("mail_getlist", { category: [0, 4, 5], lastId: 0, size: 60 })
    .register("mail_claimallattachment", { category: 0 })
    .register("study_startgame")
    .register("study_answer")
    .register("study_claimreward", { rewardId: 1 })
    .register("fight_starttower")
    .register("fight_startboss")
    .register("fight_startlegionboss")
    .register("fight_startdungeon")
    .register("fight_startpvp")
    .register("evotower_getinfo")
    .register("evotower_fight")
    .register("evotower_claimreward")
    .register("evotower_claimtask", { taskId: 1 })
    .register("activity_battlepassrewardclaim", { battlePassId: 1003 })
    .register("pet_activatebook", { petId: 101 })
    .register("pet_claimbookreward", { petId: 101 })
    .register("pet_openegg", { itemId: 37011 })
    .register("mergebox_getinfo")
    .register("mergebox_claimfreeenergy")
    .register("mergebox_openbox")
    .register("mergebox_automergeitem", { actType: 1 })
    .register("mergebox_mergeitem", { actType: 1 })
    .register("bottlehelper_claim")
    .register("bottlehelper_start", { bottleType: -1 })
    .register("bottlehelper_stop", { bottleType: -1 })
    .register("legionmatch_rolesignup")
    .register("artifact_lottery", { lotteryNumber: 1, newFree: true, type: 1 })
    // ... 更多命令
    ;
}
```

---

### 4.6 BIN 数据转换（Token 认证）

**混淆变量名:** `w0e`

**还原翻译：**
```ts
/**
 * BIN 数据转换为 Token
 * 通过游戏认证服务器获取认证信息
 */
async function convertBinToToken(binData: any): Promise<string> {
  // 向认证服务器发送 BIN 数据
  const response = await sendHttpRequest(
    "https://xxz-xyzw.hortorgames.com/login/authuser",
    binData,
    1  // sequence number
  );

  // 使用 g_utils 解析响应
  const parsed = g_utils.parse(response);
  const data = parsed.getData();

  // 生成会话信息
  const now = Date.now();
  const sessId = now * 100 + Math.floor(Math.random() * 100);
  const connId = now + Math.floor(Math.random() * 10);

  return JSON.stringify({
    ...data,
    sessId,
    connId,
    isRestore: 0,
  });
}
```

---

### 4.7 HTTP 请求封装

**混淆变量名:** `IG`

**还原翻译：**
```ts
/**
 * 发送 HTTP 请求到游戏服务器
 * 使用 BON 协议编码请求体，返回 ArrayBuffer 响应
 */
async function sendHttpRequest(
  url: string,
  data: any,
  seq: number
): Promise<ArrayBuffer> {
  // 优先使用 fetch API（支持连接超时）
  if (isFetchAvailable()) {
    const response = await fetchWithTimeout(
      `${url}?_seq=${seq}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: data,
        connectTimeout: 15000,
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.arrayBuffer();
  }

  // 回退到 axios
  const response = await axios.post(url, data, {
    params: { _seq: seq },
    headers: {
      "Content-Type": "application/octet-stream",
      referrerPolicy: "no-referrer",
    },
    responseType: "arraybuffer",
  });
  return response.data;
}
```

---

### 4.8 IndexedDB 存储封装

**混淆变量名:** `pge`（createIndexedDBHelper）

**还原翻译：**
```ts
/**
 * IndexedDB 存储封装
 * 数据库名: "xyzw"，版本: 1
 * 存储 Token 相关的二进制数据（BIN 数据）
 */
const {
  getArrayBuffer,     // 读取 ArrayBuffer
  storeArrayBuffer,   // 存储 ArrayBuffer
  deleteArrayBuffer,  // 删除 ArrayBuffer
  clearAll,           // 清空所有数据
} = createIndexedDBHelper({
  dbName: "xyzw",
  version: 1,
  storeName: "tokens",
});
```

---

### 4.9 日志系统

**混淆变量名:** `Ype`（Logger 类）、`$i`（日志级别）、`Ut`（全局 logger 实例）

**还原翻译：**
```ts
/** 日志级别 */
const LogLevel = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
  VERBOSE: 4,
} as const;

/**
 * 日志管理器
 * 支持命名空间、开发模式、详细日志
 * 日志级别可通过 localStorage 持久化配置
 */
class Logger {
  namespace: string;
  isDev: boolean;
  enableVerbose: boolean;
  level: number;

  constructor(namespace = "APP") {
    this.namespace = namespace;
    this.isDev = false;
    this.enableVerbose = localStorage.getItem("ws_debug_verbose") === "true";
    this.level = this.getLogLevel();
  }

  getLogLevel(): number {
    if (!this.isDev) return LogLevel.WARN;
    const saved = localStorage.getItem("ws_debug_level");
    return saved ? parseInt(saved, 10) : LogLevel.VERBOSE;
  }

  error(msg: string, ...args: any[]): void { /* ... */ }
  warn(msg: string, ...args: any[]): void { /* ... */ }
  info(msg: string, ...args: any[]): void { /* ... */ }
  debug(msg: string, ...args: any[]): void { /* ... */ }
  verbose(msg: string, ...args: any[]): void { /* ... */ }

  // WebSocket 专用日志方法
  wsConnect(url: string): void { /* ... */ }
  wsDisconnect(url: string, reason?: string): void { /* ... */ }
  wsError(url: string, error: any): void { /* ... */ }
  wsMessage(url: string, cmd: string, isIncoming?: boolean): void { /* ... */ }
  wsStatus(url: string, status: string, detail?: string): void { /* ... */ }
  connectionLock(url: string, operation: string, isAcquire: boolean): void { /* ... */ }
}
```

---

### 4.10 事件总线

**混淆变量名:** `Gbe`（emit）、`Qv`（EventEmitter 实例）、`su`（事件总线对象）

**还原翻译：**
```ts
/**
 * 全局事件总线
 * 用于跨组件/跨 Store 通信
 */
const eventBus = {
  /** 触发事件（同时触发 $any 通配事件） */
  $emit: (event: string, ...args: any[]): any => {
    const result = emitter.emit(event, ...args);
    if (!nonBroadcastEvents.has(event)) {
      emitter.emit("$any", event, ...args);
    }
    return result;
  },

  /** 监听特定事件 */
  onSome: (handler: (event: string, ...args: any[]) => void): void => { /* ... */ },
};

// 注册各种事件处理器
registerTokenEvents(eventBus);
registerConnectionEvents(eventBus);
registerGameDataEvents(eventBus);
// ... 更多事件注册
```

---

### 4.11 时间工具

**混淆变量名:** `Cz`（isInCurrentWeek）

**还原翻译：**
```ts
/** 检查给定时间戳是否在当前周内 */
function isInCurrentWeek(timestamp: number): boolean { /* ... */ }

/** 休眠函数 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

---

## 五、混淆变量名映射表

| 混淆名 | 还原名 | 说明 |
|--------|--------|------|
| `$N` | `createApp` | Vue 应用创建 |
| `B9` | `defineStore` | Pinia Store 定义 |
| `ppe` | `createRouter` | Vue Router 创建 |
| `$he` | `createWebHistory` | HTML5 History 模式 |
| `_n` | `defineAsyncComponent` | 异步组件 |
| `Ge` | `ref` | Vue ref |
| `be` | `computed` | Vue computed |
| `vd` | `useStorage` | VueUse 持久化存储 |
| `Br` | `onMounted` | Vue 生命周期 |
| `rc` | `onUnmounted` | Vue 生命周期 |
| `Rd` | `resolveComponent` | Vue 组件解析 |
| `fb` | `openBlock` | Vue 编译辅助 |
| `pb` | `createBlock` | Vue 编译辅助 |
| `Ci` | `createVNode` | Vue 虚拟节点 |
| `Yd` | `withCtx` | Vue 编译辅助 |
| `GS` | `createElementVNode` | Vue 编译辅助 |
| `Ic` | `useTokenStore` | Token Store 实例 |
| `oe` | `useLocalTokenStore` | 本地 Token Store |
| `p` | `useAuthStore` | 认证 Store |
| `cR` | `router` | 路由实例 |
| `FAe` | `routes` | 路由表 |
| `gpe` | `legacyRouteMap` | 旧版路由映射 |
| `_L` | `dynamicRoutes` | 动态路由 |
| `LAe` | `isLegionWarOpenTime` | 盐场开放检查 |
| `R_` | `g_utils` | 编解码工具集 |
| `ql` | `bon` | BON 协议实例 |
| `tge` | `WsAgent` | WebSocket 客户端类 |
| `Jpe` | `GameCommands` | 游戏命令注册表 |
| `ege` | `createGameCommandRegistry` | 创建命令注册表 |
| `Ype` | `Logger` | 日志管理器 |
| `Gbe` | `eventBus.$emit` | 事件总线触发 |
| `_ge` | `generateRandomSeed` | 随机种子生成 |
| `w0e` | `convertBinToToken` | BIN 转 Token |
| `IG` | `sendHttpRequest` | HTTP 请求 |
| `ahe` | `darkTheme` | Naive UI 暗色主题 |
| `w5` | `naive` | Naive UI 插件 |
| `zAe` | `App` | App 根组件 |
| `Ex` | `app` | Vue 应用实例 |
| `pge` | `createIndexedDBHelper` | IndexedDB 封装 |

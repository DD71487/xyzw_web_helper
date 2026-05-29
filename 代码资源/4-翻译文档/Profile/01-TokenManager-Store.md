# TokenManager 核心存储模块 (localTokenManager)

## 文件位置
`/workspace/target_formatted/localTokenManager-BQJEcmfy.js`

---

## 1. IndexedDB 数据库初始化

### 原始代码
```javascript
const F = "xyzw_token_db",  // 数据库名称
  H = 1,                     // 数据库版本
  h = "kv",                  // 键值对存储
  w = "gameTokens";          // 游戏Token存储

function J() {
  return new Promise((o, s) => {
    const n = indexedDB.open(F, H);
    ((n.onupgradeneeded = (k) => {
      const r = n.result;
      (r.objectStoreNames.contains(h) || r.createObjectStore(h, { keyPath: "key" }),
        r.objectStoreNames.contains(w) || r.createObjectStore(w, { keyPath: "roleId" }));
    }),
      (n.onsuccess = () => o(n.result)),
      (n.onerror = () => s(n.error)));
  });
}
```

### 翻译后代码
```javascript
const DB_NAME = "xyzw_token_db",      // 数据库名称
  DB_VERSION = 1,                      // 数据库版本
  KV_STORE = "kv",                     // 键值对存储(用户Token)
  GAME_TOKEN_STORE = "gameTokens";     // 游戏Token存储

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    // 数据库升级/创建时的回调
    request.onupgradeneeded = (event) => {
      const db = request.result;
      // 创建键值对存储(用于用户Token)
      if (!db.objectStoreNames.contains(KV_STORE)) {
        db.createObjectStore(KV_STORE, { keyPath: "key" });
      }
      // 创建游戏Token存储(以roleId为主键)
      if (!db.objectStoreNames.contains(GAME_TOKEN_STORE)) {
        db.createObjectStore(GAME_TOKEN_STORE, { keyPath: "roleId" });
      }
    };
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
```

### 功能说明
- 使用 IndexedDB 持久化存储 Token 数据
- 两个 ObjectStore：`kv` 存储用户Token，`gameTokens` 存储游戏角色Token
- 数据库版本为 1，支持后续升级

---

## 2. 数据库事务操作封装

### 原始代码
```javascript
async function T(o, s, n) {
  const k = await J();
  return new Promise((r, m) => {
    const a = k.transaction(o, s),
      S = a.objectStore(o),
      d = n(S);
    ((a.oncomplete = () => r(d)), (a.onerror = () => m(a.error)), (a.onabort = () => m(a.error)));
  });
}
```

### 翻译后代码
```javascript
/**
 * 执行数据库事务
 * @param {string} storeName - 存储名称
 * @param {string} mode - 事务模式 ("readonly" | "readwrite")
 * @param {Function} operation - 对 objectStore 执行的操作
 */
async function executeTransaction(storeName, mode, operation) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, mode);
    const objectStore = transaction.objectStore(storeName);
    const result = operation(objectStore);
    
    transaction.oncomplete = () => resolve(result);
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}
```

---

## 3. 用户 Token 操作

### 原始代码
```javascript
async function x() { return N("userToken"); }          // 获取
async function W(o) { return Q("userToken", o); }        // 设置
async function Y() { return X("userToken"); }            // 删除
```

### 翻译后代码
```javascript
// 获取用户认证Token
async function getUserToken() {
  return getValue("userToken");
}

// 保存用户认证Token
async function setUserToken(token) {
  return setValue("userToken", token);
}

// 清除用户认证Token
async function clearUserToken() {
  return deleteValue("userToken");
}
```

---

## 4. 游戏 Token 操作

### 原始代码
```javascript
async function P() {
  return T(w, "readonly", (o) =>
    new Promise((s, n) => {
      const k = o.getAll();
      ((k.onsuccess = () => {
        const r = k.result || [], m = {};
        (r.forEach((a) => { a && a.roleId && (m[a.roleId] = a); }), s(m));
      }), (k.onerror = () => n(k.error)));
    }),
  );
}
async function y(o, s) { return T(w, "readwrite", (n) => { n.put({ ...s, roleId: o }); }); }
async function G(o) { return T(w, "readwrite", (s) => { s.delete(o); }); }
async function Z() { return T(w, "readwrite", (o) => { o.clear(); }); }
```

### 翻译后代码
```javascript
// 获取所有游戏Token，返回以 roleId 为键的对象
async function getAllGameTokens() {
  return executeTransaction(GAME_TOKEN_STORE, "readonly", (store) =>
    new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => {
        const results = request.result || [];
        const tokenMap = {};
        // 转换为以 roleId 为键的映射对象
        results.forEach((item) => {
          if (item && item.roleId) {
            tokenMap[item.roleId] = item;
          }
        });
        resolve(tokenMap);
      };
      request.onerror = () => reject(request.error);
    })
  );
}

// 保存游戏Token
async function saveGameToken(roleId, tokenData) {
  return executeTransaction(GAME_TOKEN_STORE, "readwrite", (store) => {
    store.put({ ...tokenData, roleId });
  });
}

// 删除指定游戏Token
async function deleteGameToken(roleId) {
  return executeTransaction(GAME_TOKEN_STORE, "readwrite", (store) => {
    store.delete(roleId);
  });
}

// 清空所有游戏Token
async function clearAllGameTokens() {
  return executeTransaction(GAME_TOKEN_STORE, "readwrite", (store) => {
    store.clear();
  });
}
```

---

## 5. 数据迁移 (localStorage → IndexedDB)

### 原始代码
```javascript
async function I() {
  try {
    const o = await P(), s = o && Object.keys(o).length > 0, k = !!(await x());
    if (s || k) return { migrated: !1 };
    const r = localStorage.getItem("userToken"), m = localStorage.getItem("gameTokens");
    let a = {};
    try { a = m ? JSON.parse(m) : {}; } catch { a = {}; }
    if (!(r || (a && Object.keys(a).length > 0))) return { migrated: !1 };
    r && (await W(r));
    for (const [d, p] of Object.entries(a || {})) await y(d, p);
    return { migrated: !0 };
  } catch (o) {
    return (console.warn("Token DB migration skipped:", o), { migrated: !1, error: o == null ? void 0 : o.message });
  }
}
```

### 翻译后代码
```javascript
/**
 * 从 localStorage 迁移数据到 IndexedDB
 * 目的：将旧版本存储在 localStorage 中的 Token 数据迁移到 IndexedDB
 */
async function migrateFromLocalStorage() {
  try {
    // 检查 IndexedDB 中是否已有数据
    const existingTokens = await getAllGameTokens();
    const hasExistingGameTokens = existingTokens && Object.keys(existingTokens).length > 0;
    const hasExistingUserToken = !!(await getUserToken());
    
    // 如果 IndexedDB 中已有数据，不需要迁移
    if (hasExistingGameTokens || hasExistingUserToken) {
      return { migrated: false };
    }
    
    // 从 localStorage 读取旧数据
    const oldUserToken = localStorage.getItem("userToken");
    const oldGameTokensJson = localStorage.getItem("gameTokens");
    
    let oldGameTokens = {};
    try {
      oldGameTokens = oldGameTokensJson ? JSON.parse(oldGameTokensJson) : {};
    } catch {
      oldGameTokens = {};
    }
    
    // 没有旧数据需要迁移
    if (!oldUserToken && (!oldGameTokens || Object.keys(oldGameTokens).length === 0)) {
      return { migrated: false };
    }
    
    // 执行迁移
    if (oldUserToken) {
      await setUserToken(oldUserToken);
    }
    for (const [roleId, tokenData] of Object.entries(oldGameTokens || {})) {
      await saveGameToken(roleId, tokenData);
    }
    
    return { migrated: true };
  } catch (error) {
    console.warn("Token DB migration skipped:", error);
    return { migrated: false, error: error?.message };
  }
}
```

---

## 6. Pinia Store 定义 (localToken)

### 原始代码
```javascript
const oe = z("localToken", () => {
  const o = A(null),      // userToken
    s = A({}),            // gameTokens
    n = A({}),            // wsConnections
    k = _(() => !!o.value),    // isUserAuthenticated
    r = _(() => Object.keys(s.value).length > 0),  // hasGameTokens
```

### 翻译后代码
```javascript
const useLocalTokenStore = defineStore("localToken", () => {
  // ============ 响应式状态 ============
  const userToken = ref(null);           // 用户认证Token
  const gameTokens = ref({});            // 游戏角色Token映射 {roleId: tokenData}
  const wsConnections = ref({});         // WebSocket连接映射 {roleId: connection}
  
  // ============ 计算属性 ============
  const isUserAuthenticated = computed(() => !!userToken.value);
  const hasGameTokens = computed(() => Object.keys(gameTokens.value).length > 0);
```

---

## 7. WebSocket 连接管理

### 原始代码
```javascript
    C = async (e, t, c = null) => {
      n.value[e] && v(e);
      try {
        const { WsAgent: u } = await D(...),
          { gameCommands: l } = await D(...);
        let i = t;
        try {
          const g = t.replace(/^data:.*base64,/, "").trim(), b = atob(g);
          try { const U = JSON.parse(b); i = U.token || U.gameToken || b; } 
          catch { i = b; }
        } catch (g) { i = t; }
        const f = new u({ heartbeatInterval: 2e3, queueInterval: 50, channel: "x", autoReconnect: !0, maxReconnectAttempts: 5 });
        ((f.onOpen = () => { ... }),
          (f.onMessage = (g) => { g.cmd && R(e, g); }),
          (f.onError = (g) => { ... }),
          (f.onClose = (g) => { ... }),
          (f.onReconnect = (g) => { ... }));
        const E = c || u.buildUrl("wss://xxz-xyzw.hortorgames.com/agent", { p: i, e: "x", lang: "chinese" });
        return (n.value[e] = { agent: f, gameCommands: l, status: "connecting", roleId: e, wsUrl: E, actualToken: i, ... }, await f.connect(E), f);
      } catch (u) { ... }
    },
```

### 翻译后代码
```javascript
/**
 * 创建 WebSocket 连接
 * @param {string} roleId - 角色ID
 * @param {string} token - Token字符串(支持Base64编码)
 * @param {string} customWsUrl - 自定义WebSocket地址(可选)
 */
const createWebSocketConnection = async (roleId, token, customWsUrl = null) => {
  // 关闭已有连接
  if (wsConnections.value[roleId]) {
    closeWebSocketConnection(roleId);
  }
  
  try {
    // 动态导入 WebSocket Agent 和游戏命令模块
    const { WsAgent } = await loadWsAgent();
    const { gameCommands } = await loadGameCommands();
    
    // 解析Token(支持Base64编码)
    let actualToken = token;
    try {
      const base64Str = token.replace(/^data:.*base64,/, "").trim();
      const decoded = atob(base64Str);
      try {
        const parsed = JSON.parse(decoded);
        actualToken = parsed.token || parsed.gameToken || decoded;
      } catch {
        actualToken = decoded;
      }
    } catch (error) {
      console.warn("Base64解析失败，使用原始token:", error.message);
      actualToken = token;
    }
    
    // 创建 WebSocket Agent 实例
    const agent = new WsAgent({
      heartbeatInterval: 2000,      // 心跳间隔 2秒
      queueInterval: 50,            // 队列间隔 50ms
      channel: "x",                 // 通信频道
      autoReconnect: true,          // 自动重连
      maxReconnectAttempts: 5,      // 最大重连次数
    });
    
    // 设置事件回调
    agent.onOpen = () => {
      wsConnections.value[roleId].status = "connected";
      wsConnections.value[roleId].connectedAt = new Date().toISOString();
      setTimeout(() => {
        agent.send(gameCommands.role_getroleinfo(0, 0, { roleId }));
        agent.send(gameCommands.system_getdatabundlever());
      }, 1000);
    };
    
    agent.onMessage = (message) => {
      if (message.cmd) handleMessage(roleId, message);
    };
    
    agent.onError = (error) => {
      console.error(`WebSocket错误 [${roleId}]:`, error);
      if (wsConnections.value[roleId]) {
        wsConnections.value[roleId].status = "error";
        wsConnections.value[roleId].lastError = error.message;
      }
    };
    
    agent.onClose = () => {
      if (wsConnections.value[roleId]) {
        wsConnections.value[roleId].status = "disconnected";
      }
    };
    
    agent.onReconnect = (attempt) => {
      if (wsConnections.value[roleId]) {
        wsConnections.value[roleId].status = "reconnecting";
        wsConnections.value[roleId].reconnectAttempt = attempt;
      }
    };
    
    // 构建WebSocket URL
    const wsUrl = customWsUrl || WsAgent.buildUrl(
      "wss://xxz-xyzw.hortorgames.com/agent",
      { p: actualToken, e: "x", lang: "chinese" }
    );
    
    // 保存连接信息
    wsConnections.value[roleId] = {
      agent,
      gameCommands,
      status: "connecting",
      roleId,
      wsUrl,
      actualToken,
      createdAt: new Date().toISOString(),
      lastError: null,
      reconnectAttempt: 0,
    };
    
    await agent.connect(wsUrl);
    return agent;
  } catch (error) {
    console.error(`创建WebSocket连接失败 [${roleId}]:`, error);
    if (wsConnections.value[roleId]) {
      wsConnections.value[roleId].status = "error";
      wsConnections.value[roleId].lastError = error.message;
    }
    return null;
  }
};
```

---

## 8. Store 返回的完整 API

### 翻译后代码
```javascript
return {
  // 状态
  userToken,              // 用户认证Token
  gameTokens,             // 游戏Token映射
  wsConnections,          // WebSocket连接映射
  isUserAuthenticated,    // 是否已登录
  hasGameTokens,          // 是否有游戏Token
  
  // 用户Token操作
  setUserToken,           // 设置用户Token
  clearUserToken,         // 清除用户Token
  
  // 游戏Token操作
  addGameToken,           // 添加游戏Token
  getGameToken,           // 获取游戏Token(更新lastUsed)
  updateGameToken,        // 更新游戏Token
  removeGameToken,        // 删除游戏Token
  clearAllGameTokens,     // 清空所有游戏Token
  
  // WebSocket操作
  createWebSocketConnection,   // 创建连接
  closeWebSocketConnection,    // 关闭连接
  getWebSocketStatus,          // 获取连接状态
  getWebSocketDetails,         // 获取连接详情
  sendGameCommand,             // 发送游戏命令
  sendGameCommandWithPromise,  // 发送命令(带Promise)
  
  // 导入导出
  exportTokens,           // 导出所有Token
  importTokens,           // 导入Token
  cleanExpiredTokens,     // 清理过期Token
  
  // 初始化
  initTokenManager,       // 初始化Token管理器
};
```

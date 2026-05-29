# TokenManager UI 组件 (Profile页面)

## 文件位置
`/workspace/target_formatted/Profile-BT6VKzf5.js`

---

## 1. TokenManager 组件主结构

### 原始代码
```javascript
const kn = {
  __name: "TokenManager",
  setup(e) {
    const t = rt(),        // message 消息提示
      n = lt(),            // dialog 对话框
      o = wt(),            // localToken store
      s = jt(),            // gameRoles store
      a = ge(!1),          // loading 状态
```

### 翻译后代码
```javascript
const TokenManager = {
  __name: "TokenManager",
  setup(props) {
    const message = useMessage();        // Naive UI 消息提示
    const dialog = useDialog();          // Naive UI 对话框
    const tokenStore = useLocalToken();  // Token 状态管理
    const rolesStore = useGameRoles();   // 游戏角色状态管理
    const isLoading = ref(false);        // 加载状态
```

---

## 2. Token 显示辅助函数

### 原始代码
```javascript
    f = (u) => {    // 格式化Token显示(脱敏)
      if (!u) return "";
      const r = u.length;
      return r <= 8 ? u : u.substring(0, 8) + "***" + u.substring(r - 8);
    },
    h = (u) => new Date(u).toLocaleString("zh-CN"),   // 格式化日期
    j = (u) => o.getWebSocketStatus(u),                // 获取WS状态
```

### 翻译后代码
```javascript
// Token脱敏显示: 前8位 + *** + 后8位
const maskToken = (token) => {
  if (!token) return "";
  const len = token.length;
  return len <= 8 ? token : token.substring(0, 8) + "***" + token.substring(len - 8);
};

// 格式化为中文日期时间
const formatDate = (dateStr) => new Date(dateStr).toLocaleString("zh-CN");

// 获取WebSocket连接状态
const getConnectionStatus = (roleId) => tokenStore.getWebSocketStatus(roleId);
```

---

## 3. 状态映射函数

### 原始代码
```javascript
    x = (u) => {       // 状态 → Tag类型
      switch (u) {
        case "connected": return "success";
        case "error": return "error";
        case "connecting": return "warning";
        default: return "default";
      }
    },
    N = (u) => {       // 状态 → 中文文本
      switch (u) {
        case "connected": return "已连接";
        case "error": return "连接错误";
        case "connecting": return "连接中";
        default: return "未连接";
      }
    },
    X = (u) => {       // 状态 → 图标组件
      switch (u) {
        case "connected": return oo;      // Wifi图标
        case "error": return Ht;          // AlertCircle图标
        case "connecting": return $t;     // Time图标
        default: return uo;               // WifiOutline图标
      }
    },
    _ = (u) => {       // 导入方式 → 中文
      switch (u) {
        case "url": return "URL导入";
        case "bin": return "Bin导入";
        case "wxQrcode": return "微信二维码";
        default: return "手动导入";
      }
    },
```

### 翻译后代码
```javascript
// WebSocket状态 → NTag类型映射
const getStatusTagType = (status) => {
  switch (status) {
    case "connected": return "success";   // 绿色
    case "error": return "error";         // 红色
    case "connecting": return "warning";  // 橙色
    default: return "default";            // 灰色
  }
};

// WebSocket状态 → 中文显示文本
const getStatusText = (status) => {
  switch (status) {
    case "connected": return "已连接";
    case "error": return "连接错误";
    case "connecting": return "连接中";
    default: return "未连接";
  }
};

// WebSocket状态 → 图标组件映射
const getStatusIcon = (status) => {
  switch (status) {
    case "connected": return WifiIcon;        // 实心Wifi
    case "error": return AlertCircleIcon;     // 警告圆圈
    case "connecting": return TimeIcon;       // 时钟
    default: return WifiOutlineIcon;          // 空心Wifi
  }
};

// 导入方式 → 中文显示
const getImportMethodText = (method) => {
  switch (method) {
    case "url": return "URL导入";
    case "bin": return "Bin导入";
    case "wxQrcode": return "微信二维码";
    default: return "手动导入";
  }
};
```

---

## 4. 操作菜单生成

### 原始代码
```javascript
    q = (u) => {    // 生成下拉菜单选项
      const r = [
        { label: "编辑", key: "edit", icon: () => ne(ee, null, { default: () => ne(He) }) },
        { label: "复制Token", key: "copy", icon: () => ne(ee, null, { default: () => ne(Zt) }) },
      ];
      return (
        u.importMethod === "url" && u.sourceUrl
          ? r.unshift({ label: "从URL刷新", key: "refresh-url", icon: () => ne(ee, null, { default: () => ne(_t) }) })
          : r.unshift({ label: "刷新Token", key: "refresh", icon: () => ne(ee, null, { default: () => ne(Be) }) }),
        r.push(
          { type: "divider" },
          { label: "删除", key: "delete", icon: () => ne(ee, null, { default: () => ne(Ct) }) },
        ),
        r
      );
    },
```

### 翻译后代码
```javascript
/**
 * 生成Token操作下拉菜单
 * @param {Object} token - Token数据对象
 * @returns {Array} 菜单选项数组
 */
const generateTokenMenu = (token) => {
  const menuItems = [
    { label: "编辑", key: "edit", icon: () => h(NIcon, null, { default: () => h(EditIcon) }) },
    { label: "复制Token", key: "copy", icon: () => h(NIcon, null, { default: () => h(CopyIcon) }) },
  ];
  
  // URL导入的Token显示"从URL刷新"，其他显示"刷新Token"
  if (token.importMethod === "url" && token.sourceUrl) {
    menuItems.unshift({
      label: "从URL刷新",
      key: "refresh-url",
      icon: () => h(NIcon, null, { default: () => h(RefreshIcon) })
    });
  } else {
    menuItems.unshift({
      label: "刷新Token",
      key: "refresh",
      icon: () => h(NIcon, null, { default: () => h(RefreshIcon) })
    });
  }
  
  // 添加分隔线和删除选项
  menuItems.push(
    { type: "divider" },
    { label: "删除", key: "delete", icon: () => h(NIcon, null, { default: () => h(TrashIcon) }) }
  );
  
  return menuItems;
};
```

---

## 5. 菜单操作处理

### 原始代码
```javascript
    W = (u, r, b) => {   // 处理菜单选择
      switch (u) {
        case "edit": H(); break;
        case "copy": Y(b.token); break;
        case "refresh": S(r); break;
        case "refresh-url": B(r, b); break;
        case "delete": $(r); break;
      }
    },
```

### 翻译后代码
```javascript
/**
 * 处理下拉菜单操作
 * @param {string} action - 操作类型
 * @param {string} roleId - 角色ID
 * @param {Object} tokenData - Token数据
 */
const handleMenuAction = (action, roleId, tokenData) => {
  switch (action) {
    case "edit":
      handleEdit();
      break;
    case "copy":
      copyToClipboard(tokenData.token);
      break;
    case "refresh":
      refreshToken(roleId);
      break;
    case "refresh-url":
      refreshFromUrl(roleId, tokenData);
      break;
    case "delete":
      deleteToken(roleId);
      break;
  }
};
```

---

## 6. Token 刷新功能

### 原始代码
```javascript
    S = (u) => {    // 刷新Token
      const r = o.getGameToken(u);
      if (!r) { t.error("找不到对应的Token数据"); return; }
      if (!r.sourceUrl) { t.warning("该Token没有配置源地址，无法重新生成。请手动重新导入Token。"); return; }
      n.info({
        title: "重新获取Token",
        content: "确定要从源地址重新获取此角色的Token吗？",
        positiveText: "确定",
        negativeText: "取消",
        onPositiveClick: async () => {
          try {
            const b = t.loading("正在重新获取Token...", { duration: 0 });
            let w;
            const C = r.sourceUrl;
            if (C.startsWith(window.location.origin) || C.startsWith("/") || C.startsWith("http://localhost") || C.startsWith("http://127.0.0.1"))
              w = await fetch(C);
            else {
              try { w = await fetch(C, { method: "GET", headers: { Accept: "application/json" }, mode: "cors" }); }
              catch (k) { throw new Error(`跨域请求被阻止。请确保目标服务器支持CORS。错误详情: ${k.message}`); }
            }
            if (!w.ok) throw new Error(`请求失败: ${w.status} ${w.statusText}`);
            const v = await w.json();
            if (!v.token) throw new Error("返回数据中未找到token字段");
            (o.updateGameToken(u, { token: v.token, server: v.server || r.server, regeneratedAt: new Date().toISOString(), lastRefreshed: new Date().toISOString() }),
              o.getWebSocketStatus(u) === "connected" && (o.closeWebSocketConnection(u), setTimeout(() => { o.createWebSocketConnection(u, v.token, r.wsUrl); }, 500)),
              b.destroy(), t.success("Token已成功重新获取"));
          } catch (b) { (console.error("重新获取Token失败:", b), t.error(b.message || "Token重新获取失败")); }
        },
      });
    },
```

### 翻译后代码
```javascript
/**
 * 刷新Token(从源地址重新获取)
 * @param {string} roleId - 角色ID
 */
const refreshToken = (roleId) => {
  const tokenData = tokenStore.getGameToken(roleId);
  
  // 验证Token存在
  if (!tokenData) {
    message.error("找不到对应的Token数据");
    return;
  }
  
  // 验证有源地址
  if (!tokenData.sourceUrl) {
    message.warning("该Token没有配置源地址，无法重新生成。请手动重新导入Token。");
    return;
  }
  
  // 显示确认对话框
  dialog.info({
    title: "重新获取Token",
    content: "确定要从源地址重新获取此角色的Token吗？",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      try {
        const loadingBar = message.loading("正在重新获取Token...", { duration: 0 });
        let response;
        const sourceUrl = tokenData.sourceUrl;
        
        // 判断请求方式(同源直接请求，跨域使用CORS)
        if (isSameOrigin(sourceUrl)) {
          response = await fetch(sourceUrl);
        } else {
          try {
            response = await fetch(sourceUrl, {
              method: "GET",
              headers: { Accept: "application/json" },
              mode: "cors"
            });
          } catch (err) {
            throw new Error(`跨域请求被阻止。请确保目标服务器支持CORS。错误详情: ${err.message}`);
          }
        }
        
        if (!response.ok) {
          throw new Error(`请求失败: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        if (!data.token) {
          throw new Error("返回数据中未找到token字段");
        }
        
        // 更新Token数据
        tokenStore.updateGameToken(roleId, {
          token: data.token,
          server: data.server || tokenData.server,
          regeneratedAt: new Date().toISOString(),
          lastRefreshed: new Date().toISOString()
        });
        
        // 如果已连接，断开并重新连接
        if (tokenStore.getWebSocketStatus(roleId) === "connected") {
          tokenStore.closeWebSocketConnection(roleId);
          setTimeout(() => {
            tokenStore.createWebSocketConnection(roleId, data.token, tokenData.wsUrl);
          }, 500);
        }
        
        loadingBar.destroy();
        message.success("Token已成功重新获取");
      } catch (error) {
        console.error("重新获取Token失败:", error);
        message.error(error.message || "Token重新获取失败");
      }
    }
  });
};

// 判断是否为同源请求
const isSameOrigin = (url) => {
  return url.startsWith(window.location.origin) ||
    url.startsWith("/") ||
    url.startsWith("http://localhost") ||
    url.startsWith("http://127.0.0.1");
};
```

---

## 7. 从 URL 刷新 Token

### 原始代码
```javascript
    B = async (u, r) => {   // 从URL刷新
      if (!r.sourceUrl) { t.warning("该Token没有配置源URL"); return; }
      n.info({
        title: "从URL刷新Token",
        content: `确定要从源URL重新获取Token吗？\n源地址：${r.sourceUrl}`,
        positiveText: "确定", negativeText: "取消",
        onPositiveClick: async () => {
          try {
            const b = t.loading("正在从URL获取新Token...", { duration: 0 });
            let w;
            if (isSameOrigin(r.sourceUrl)) w = await fetch(r.sourceUrl);
            else { const v = `/api/proxy?url=${encodeURIComponent(r.sourceUrl)}`; w = await fetch(v); }
            if (!w.ok) throw new Error(`HTTP ${w.status}: ${w.statusText}`);
            const Q = await w.json();
            if (!Q.token) throw new Error("返回数据中未找到token字段");
            (o.updateGameToken(u, { token: Q.token, lastUsed: new Date().toISOString() }), b.destroy(), t.success("Token刷新成功"));
          } catch (b) { (console.error("URL刷新Token失败:", b), t.error("刷新失败: " + b.message)); }
        },
      });
    },
```

### 翻译后代码
```javascript
/**
 * 从源URL刷新Token(使用代理)
 * @param {string} roleId - 角色ID
 * @param {Object} tokenData - Token数据
 */
const refreshFromUrl = async (roleId, tokenData) => {
  if (!tokenData.sourceUrl) {
    message.warning("该Token没有配置源URL");
    return;
  }
  
  dialog.info({
    title: "从URL刷新Token",
    content: `确定要从源URL重新获取Token吗？\n源地址：${tokenData.sourceUrl}`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      try {
        const loadingBar = message.loading("正在从URL获取新Token...", { duration: 0 });
        let response;
        
        // 同源直接请求，跨域使用后端代理
        if (isSameOrigin(tokenData.sourceUrl)) {
          response = await fetch(tokenData.sourceUrl);
        } else {
          const proxyUrl = `/api/proxy?url=${encodeURIComponent(tokenData.sourceUrl)}`;
          response = await fetch(proxyUrl);
        }
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        if (!data.token) {
          throw new Error("返回数据中未找到token字段");
        }
        
        // 更新Token
        tokenStore.updateGameToken(roleId, {
          token: data.token,
          lastUsed: new Date().toISOString()
        });
        
        loadingBar.destroy();
        message.success("Token刷新成功");
      } catch (error) {
        console.error("URL刷新Token失败:", error);
        message.error("刷新失败: " + error.message);
      }
    }
  });
};
```

---

## 8. Token 导出功能

### 原始代码
```javascript
    z = () => {    // 导出Token
      try {
        const u = o.exportTokens(),
          r = JSON.stringify(u, null, 2),
          b = new Blob([r], { type: "application/json" }),
          w = document.createElement("a");
        ((w.href = URL.createObjectURL(b)),
          (w.download = `tokens_backup_${new Date().toISOString().split("T")[0]}.json`),
          w.click(), t.success("Token数据已导出"));
      } catch (u) { t.error("导出失败: " + u.message); }
    },
```

### 翻译后代码
```javascript
/**
 * 导出所有Token为JSON文件
 * 文件名格式: tokens_backup_YYYY-MM-DD.json
 */
const exportTokens = () => {
  try {
    // 从store获取导出数据
    const exportData = tokenStore.exportTokens();
    const jsonStr = JSON.stringify(exportData, null, 2);
    
    // 创建Blob并下载
    const blob = new Blob([jsonStr], { type: "application/json" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `tokens_backup_${new Date().toISOString().split("T")[0]}.json`;
    downloadLink.click();
    
    message.success("Token数据已导出");
  } catch (error) {
    message.error("导出失败: " + error.message);
  }
};
```

---

## 9. Token 导入功能

### 原始代码
```javascript
    P = ({ file: u }) => {   // 导入Token
      const r = new FileReader();
      ((r.onload = (b) => {
        try {
          const w = JSON.parse(b.target.result),
            C = o.importTokens(w);
          C.success ? (t.success(C.message), s.fetchGameRoles()) : t.error(C.message);
        } catch { t.error("导入失败：文件格式错误"); }
      }), r.readAsText(u.file));
    },
```

### 翻译后代码
```javascript
/**
 * 从JSON文件导入Token
 * @param {Object} fileInfo - 上传的文件信息
 */
const importTokens = ({ file }) => {
  const reader = new FileReader();
  
  reader.onload = (event) => {
    try {
      const importData = JSON.parse(event.target.result);
      const result = tokenStore.importTokens(importData);
      
      if (result.success) {
        message.success(result.message);
        rolesStore.fetchGameRoles();  // 刷新角色列表
      } else {
        message.error(result.message);
      }
    } catch {
      message.error("导入失败：文件格式错误");
    }
  };
  
  reader.readAsText(file.file);
};
```

---

## 10. 复制 Token 到剪贴板

### 原始代码
```javascript
    Y = async (u) => {   // 复制Token
      try {
        (await navigator.clipboard.writeText(u), t.success("Token已复制到剪贴板"));
      } catch {
        const b = document.createElement("textarea");
        ((b.value = u), document.body.appendChild(b), b.select(), document.execCommand("copy"), document.body.removeChild(b), t.success("Token已复制到剪贴板"));
      }
    },
```

### 翻译后代码
```javascript
/**
 * 复制Token到剪贴板
 * 优先使用现代 Clipboard API，回退到传统execCommand
 * @param {string} token - Token字符串
 */
const copyToClipboard = async (token) => {
  try {
    // 尝试使用现代 Clipboard API
    await navigator.clipboard.writeText(token);
    message.success("Token已复制到剪贴板");
  } catch {
    // 回退方案：创建临时textarea执行复制
    const textarea = document.createElement("textarea");
    textarea.value = token;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    message.success("Token已复制到剪贴板");
  }
};
```

---

## 11. WebSocket 连接/断开切换

### 原始代码
```javascript
    l = (u, r) => {   // 连接/断开WebSocket
      if (j(u) === "connected") {
        (o.closeWebSocketConnection(u), t.info("WebSocket连接已断开"));
      } else {
        try {
          (o.createWebSocketConnection(u, r.token, r.wsUrl), t.success("正在建立WebSocket连接..."));
        } catch { t.error("建立WebSocket连接失败"); }
      }
    },
```

### 翻译后代码
```javascript
/**
 * 切换WebSocket连接状态
 * @param {string} roleId - 角色ID
 * @param {Object} tokenData - Token数据
 */
const toggleConnection = (roleId, tokenData) => {
  const status = getConnectionStatus(roleId);
  
  if (status === "connected") {
    // 已连接则断开
    tokenStore.closeWebSocketConnection(roleId);
    message.info("WebSocket连接已断开");
  } else {
    // 未连接则建立连接
    try {
      tokenStore.createWebSocketConnection(roleId, tokenData.token, tokenData.wsUrl);
      message.success("正在建立WebSocket连接...");
    } catch {
      message.error("建立WebSocket连接失败");
    }
  }
};
```

---

## 12. 清理过期 Token

### 原始代码
```javascript
    M = () => {   // 清理过期Token
      n.info({
        title: "清理过期Token",
        content: "确定要清理超过24小时未使用的Token吗？",
        positiveText: "确定", negativeText: "取消",
        onPositiveClick: () => {
          const u = o.cleanExpiredTokens();
          t.success(`已清理 ${u} 个过期Token`);
        },
      });
    },
```

### 翻译后代码
```javascript
/**
 * 清理超过24小时未使用的过期Token
 */
const cleanExpiredTokens = () => {
  dialog.info({
    title: "清理过期Token",
    content: "确定要清理超过24小时未使用的Token吗？",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => {
      const cleanedCount = tokenStore.cleanExpiredTokens();
      message.success(`已清理 ${cleanedCount} 个过期Token`);
    }
  });
};
```

---

## 13. 清除所有 Token

### 原始代码
```javascript
    K = () => {   // 清除所有Token
      n.error({
        title: "清除所有Token",
        content: "确定要清除所有游戏Token吗？这将断开所有WebSocket连接。此操作不可恢复！",
        positiveText: "确定清除", negativeText: "取消",
        onPositiveClick: () => {
          (o.clearAllGameTokens(), t.success("所有游戏Token已清除"));
        },
      });
    };
```

### 翻译后代码
```javascript
/**
 * 清除所有游戏Token(危险操作)
 */
const clearAllTokens = () => {
  dialog.error({
    title: "清除所有Token",
    content: "确定要清除所有游戏Token吗？这将断开所有WebSocket连接。此操作不可恢复！",
    positiveText: "确定清除",
    negativeText: "取消",
    onPositiveClick: () => {
      tokenStore.clearAllGameTokens();
      message.success("所有游戏Token已清除");
    }
  });
};
```

# Token 多方式导入模块

## 概述
支持5种Token导入方式：手动输入、URL获取、微信扫码、BIN多角色、BIN单角色

---

## 1. 手动输入导入 (manual)

### 文件位置
`/workspace/target_formatted/manual-BXqhRZtw.js`

### 原始代码
```javascript
const Q = I({
  __name: "manual",
  emits: ["cancel", "ok"],
  setup(j, { emit: _ }) {
    const d = _,
      p = y(),      // token store
      f = h(),      // message
      U = k(),      // form ref
      u = k(!1),    // loading
      a = F({ name: "", base64Token: "", server: "", wsUrl: "" }),
      C = {
        name: [
          { required: !0, message: "请输入角色名称", trigger: "blur" },
          { min: 1, max: 50, message: "名称长度应在1到50个字符之间", trigger: "blur" },
        ],
        base64Token: [
          { required: !0, message: "请输入Token字符串", trigger: "blur" },
          { min: 20, message: "Token字符串长度应至少20个字符", trigger: "blur" },
        ],
      },
      N = () => {
        u.value = !0;
        try {
          (p.addToken({ name: a.name, token: a.base64Token, server: a.server, wsUrl: a.wsUrl }),
            f.success("Token添加成功"), ... d("ok"));
        } catch (m) { f.error(`添加Token失败: ${m.message || m}`); }
        finally { u.value = !1; }
      };
```

### 翻译后代码
```javascript
const ManualImport = defineComponent({
  __name: "manual",
  emits: ["cancel", "ok"],
  setup(props, { emit }) {
    const tokenStore = useTokenStore();
    const message = useMessage();
    const formRef = ref();
    const isLoading = ref(false);
    
    // 表单数据
    const formData = ref({
      name: "",         // 角色名称
      base64Token: "",  // Token字符串
      server: "",       // 服务器(可选)
      wsUrl: "",        // WebSocket地址(可选)
    });
    
    // 表单验证规则
    const formRules = {
      name: [
        { required: true, message: "请输入角色名称", trigger: "blur" },
        { min: 1, max: 50, message: "名称长度应在1到50个字符之间", trigger: "blur" },
      ],
      base64Token: [
        { required: true, message: "请输入Token字符串", trigger: "blur" },
        { min: 20, message: "Token字符串长度应至少20个字符", trigger: "blur" },
      ],
    };
    
    // 提交表单
    const handleSubmit = () => {
      isLoading.value = true;
      try {
        tokenStore.addToken({
          name: formData.value.name,
          token: formData.value.base64Token,
          server: formData.value.server,
          wsUrl: formData.value.wsUrl,
        });
        message.success("Token添加成功");
        // 重置表单
        formData.value = { name: "", base64Token: "", server: "", wsUrl: "" };
        emit("ok");
      } catch (error) {
        message.error(`添加Token失败: ${error.message || error}`);
      } finally {
        isLoading.value = false;
      }
    };
```

### 功能说明
| 字段 | 必填 | 说明 |
|------|------|------|
| name | 是 | 角色名称，1-50字符 |
| base64Token | 是 | Token字符串，至少20字符 |
| server | 否 | 服务器名称 |
| wsUrl | 否 | 自定义WebSocket连接地址 |

---

## 2. URL 获取导入 (url)

### 文件位置
`/workspace/target_formatted/url-WN-sIDo1.js`

### 原始代码
```javascript
const M = C({
  __name: "url",
  emits: ["cancel", "ok"],
  setup(O, { emit: _ }) {
    const c = y(),      // token store
      u = x(),          // message
      m = v(),          // form ref
      p = v(!1),        // loading
      e = I({ name: "", url: "", server: "", wsUrl: "" }),
      N = {
        name: [
          { required: !0, message: "请输入角色名称", trigger: "blur" },
          { min: 1, max: 50, message: "名称长度应在1到50个字符之间", trigger: "blur" },
        ],
        url: [
          { required: !0, message: "请输入Token获取地址", trigger: "blur" },
          { type: "url", message: "请输入有效的URL地址", trigger: "blur" },
        ],
      },
      T = async () => {
        if (m.value) {
          try { await m.value.validate(); } 
          catch { u.error("请修正表单中的错误后再提交"); return; }
          p.value = !0;
          try {
            const o = await B.get(e.url);
            if (o.status === 200 && o.data && o.data.token) {
              const a = {
                name: e.name, token: o.data.token, server: e.server || "未知",
                wsUrl: e.wsUrl || "", id: Date.now().toString(),
                sourceUrl: e.url, importMethod: "url",
              };
              (c.addToken(a), u.success("Token添加成功"), ... f("ok"));
            } else u.error("接口返回数据格式不正确，未找到token字段");
          } catch { u.error("获取Token失败，请检查URL地址或网络连接"); }
          finally { p.value = !1; }
        }
      };
```

### 翻译后代码
```javascript
const UrlImport = defineComponent({
  __name: "url",
  emits: ["cancel", "ok"],
  setup(props, { emit }) {
    const tokenStore = useTokenStore();
    const message = useMessage();
    const formRef = ref();
    const isLoading = ref(false);
    
    // 表单数据
    const formData = ref({
      name: "",     // 角色名称
      url: "",      // Token获取API地址
      server: "",   // 服务器(可选)
      wsUrl: "",    // WebSocket地址(可选)
    });
    
    // 表单验证规则
    const formRules = {
      name: [
        { required: true, message: "请输入角色名称", trigger: "blur" },
        { min: 1, max: 50, message: "名称长度应在1到50个字符之间", trigger: "blur" },
      ],
      url: [
        { required: true, message: "请输入Token获取地址", trigger: "blur" },
        { type: "url", message: "请输入有效的URL地址", trigger: "blur" },
      ],
    };
    
    // 获取并添加Token
    const fetchAndAddToken = async () => {
      if (!formRef.value) return;
      
      // 表单验证
      try {
        await formRef.value.validate();
      } catch {
        message.error("请修正表单中的错误后再提交");
        return;
      }
      
      isLoading.value = true;
      try {
        // 从URL获取Token
        const response = await axios.get(formData.value.url);
        
        if (response.status === 200 && response.data && response.data.token) {
          const tokenData = {
            name: formData.value.name,
            token: response.data.token,
            server: formData.value.server || "未知",
            wsUrl: formData.value.wsUrl || "",
            id: Date.now().toString(),
            sourceUrl: formData.value.url,    // 保存源URL用于后续刷新
            importMethod: "url",
          };
          
          tokenStore.addToken(tokenData);
          message.success("Token添加成功");
          
          // 重置表单
          formData.value = { name: "", url: "", server: "", wsUrl: "" };
          emit("ok");
        } else {
          message.error("接口返回数据格式不正确，未找到token字段");
        }
      } catch (error) {
        message.error("获取Token失败，请检查URL地址或网络连接");
      } finally {
        isLoading.value = false;
      }
    };
```

### 功能说明
- 通过API接口获取Token，接口需返回 `{token: "..."}` 格式
- 自动保存 `sourceUrl`，支持后续自动刷新
- 支持CORS跨域或同源请求

---

## 3. 微信扫码导入 (wxqrcode)

### 文件位置
`/workspace/target_formatted/wxqrcode-BCLthGDr.js`

### 核心流程

#### 3.1 环境检测
```javascript
// 原始代码
const x = (() => {    // 是否为Android WebView
  try { return /Android/.test(navigator.userAgent) && /wv|WebView/.test(navigator.userAgent); }
  catch { return !1; }
})();
const y = (() => {    // 是否为Capacitor环境
  try { return ze(); } catch { return !1; }
})();
```

#### 3.2 获取微信二维码
```javascript
// 原始代码
const xe = async () => {
  let t;
  y ? (t = "https://open.weixin.qq.com/...")           // Capacitor直接访问
    : x ? (t = ve[0]("https://open.weixin.qq.com/...")) // WebView通过代理
    : (t = "/api/weixin/connect/app/qrconnect?...");     // 浏览器通过后端代理
  
  // 请求二维码页面，解析图片地址
  let i = new DOMParser().parseFromString(o, "text/html")
    .querySelector("img.auth_qrcode")?.src;
  if (!i) { const n = o.match(/https:\/\/[^"']*qrcode[^"']*/i); n && (i = n[0]); }
};
```

#### 3.3 轮询扫码状态
```javascript
// 原始代码
const be = async () => {
  const t = y ? `https://long.open.weixin.qq.com/...` 
    : x ? `${z}/api/weixin-long/...` 
    : `/api/weixin-long/...`;
  
  if (o.includes("window.wx_errcode=405")) {   // 扫码成功
    const n = o.match(/wx_redirecturl='[^']*code=([a-zA-Z0-9]+)/);
    await ke(n[1], c);   // 用code登录获取Token
  }
  if (o.includes("window.wx_errcode=408")) {   // 二维码过期
    w("二维码已过期，请重新生成", "error");
  }
};
```

#### 3.4 微信登录获取游戏Token
```javascript
// 原始代码
const Re = async (e) => {
  // 构建登录请求
  const o = JSON.stringify({ gameId: "xyzwapp", code: e, ... });
  const a = ee(o);   // 加密请求体
  
  // 发送登录请求
  const i = y ? `https://comb-platform.hortorgames.com/...` 
    : x ? `${z}/api/hortor/...` 
    : `/api/hortor/...`;
  
  const n = await fetch(i, { method: "POST", headers: ue, body: a });
  const s = n.data.combUser;
  
  // 使用游戏加密模块生成bin
  const r = window.__require("13");
  const c = r.encMsg({ platform: "hortor", info: s, ... }, 
    { decrypt: r.lz4XorDecode, encrypt: r.lz4XorEncode });
  return new Uint8Array(c);
};
```

### 翻译后代码
```javascript
const WxQrcodeImport = defineComponent({
  setup(props, { emit }) {
    const message = useMessage();
    
    // ============ 环境检测 ============
    const isAndroidWebView = (() => {
      try {
        return /Android/.test(navigator.userAgent) && /wv|WebView/.test(navigator.userAgent);
      } catch { return false; }
    })();
    
    const isCapacitor = (() => {
      try { return isCapacitorEnv(); } catch { return false; }
    })();
    
    // ============ 状态 ============
    const qrCodeUrl = ref(null);        // 二维码图片URL
    const qrUuid = ref(null);           // 二维码UUID
    const isLoading = ref(false);       // 加载状态
    const statusText = ref("点击获取微信登录二维码");
    const statusType = ref("info");
    const pollTimer = ref(null);        // 轮询定时器
    const isPolling = ref(false);
    
    // ============ 代理URL转换 ============
    const proxyUrls = [
      (url) => {
        if (url.includes("open.weixin.qq.com")) 
          return `${PROXY_BASE}/api/weixin${new URL(url).pathname}${new URL(url).search}`;
        if (url.includes("long.open.weixin.qq.com")) 
          return `${PROXY_BASE}/api/weixin-long${new URL(url).pathname}${new URL(url).search}`;
        if (url.includes("comb-platform.hortorgames.com")) 
          return `${PROXY_BASE}/api/hortor${new URL(url).pathname}${new URL(url).search}`;
        return url;
      },
    ];
    
    // ============ 获取二维码 ============
    const fetchQrCode = async () => {
      try {
        isLoading.value = true;
        setStatus("正在获取二维码...", "info");
        
        // 根据环境选择请求方式
        let qrUrl;
        if (isCapacitor) {
          qrUrl = "https://open.weixin.qq.com/connect/app/qrconnect?appid=wxfb0d5667e5cb1c44&...";
        } else if (isAndroidWebView) {
          qrUrl = proxyUrls[0]("https://open.weixin.qq.com/connect/app/qrconnect?...");
        } else {
          qrUrl = "/api/weixin/connect/app/qrconnect?appid=wxfb0d5667e5cb1c44&...";
        }
        
        // 请求并解析二维码
        const response = await fetch(qrUrl, { headers: WX_HEADERS });
        const html = await response.text();
        
        // 解析二维码图片地址
        let imgSrc = new DOMParser().parseFromString(html, "text/html")
          .querySelector("img.auth_qrcode")?.src;
        if (!imgSrc) {
          const match = html.match(/https:\/\/[^"']*qrcode[^"']*/i);
          if (match) imgSrc = match[0];
        }
        
        if (!imgSrc) throw new Error("未找到二维码图片地址");
        
        qrUuid.value = imgSrc.split("/").pop().split("?")[0];
        qrCodeUrl.value = imgSrc;
        setStatus("请使用微信扫码登录", "success");
        startPolling();
        return true;
      } catch (error) {
        console.error("二维码解析失败", error);
        setStatus("二维码获取失败：" + error.message, "error");
        return false;
      } finally {
        isLoading.value = false;
      }
    };
    
    // ============ 轮询扫码状态 ============
    const startPolling = () => {
      if (isPolling.value) return;
      isPolling.value = true;
      const startTime = Date.now();
      
      pollTimer.value = setInterval(async () => {
        try {
          if (!qrUuid.value) return;
          
          // 检查超时(2分钟)
          const elapsed = Date.now() - startTime;
          if (elapsed > 120000) {
            setStatus("二维码已超时，请重新获取", "error");
            stopPolling();
            return;
          }
          
          // 查询扫码状态
          const statusUrl = buildStatusUrl(qrUuid.value);
          const response = await fetch(statusUrl);
          const text = await response.text();
          
          if (text.includes("window.wx_errcode=405")) {
            // 扫码成功，提取code
            const codeMatch = text.match(/wx_redirecturl='[^']*code=([a-zA-Z0-9]+)/);
            const nicknameMatch = text.match(/window\.wx_nickname\s*=\s*['"]([^'"]+)['"]/);
            if (codeMatch) {
              stopPolling();
              const nickname = nicknameMatch ? nicknameMatch[1] : "";
              setStatus(`扫码成功，正在登录... 用户：${nickname || "未知用户"}`, "success");
              await handleLogin(codeMatch[1], nickname);
            }
          } else if (text.includes("window.wx_errcode=408")) {
            setStatus("二维码已过期，请重新生成", "error");
            stopPolling();
          }
        } catch (error) {
          console.error("扫码状态检查失败", error);
        }
      }, 1000);
    };
    
    // ============ 微信登录获取游戏Token ============
    const handleLogin = async (wxCode, nickname = "") => {
      try {
        isLoading.value = true;
        
        // 构建登录请求数据
        const loginData = {
          gameId: "xyzwapp",
          code: wxCode,
          gameTp: "app",
          sysInfo: '{"system":"Android","hortorSDKVersion":"4.0.6-cn",...}',
          channel: "android",
          appFrom: "com.tencent.mm",
          packageName: "com.hortor.games.xyzw",
          tp: "app-we",
        };
        
        // 加密请求体
        const encryptedBody = encryptLoginData(JSON.stringify(loginData));
        
        // 发送登录请求
        const loginUrl = buildLoginUrl();
        const response = await fetch(loginUrl, {
          method: "POST",
          headers: LOGIN_HEADERS,
          body: encryptedBody,
        });
        
        const result = await response.json();
        if (result.meta?.errCode !== 0) {
          throw new Error("登录失败：" + result.meta?.errMsg);
        }
        
        const combUser = result.data?.combUser;
        if (!combUser) throw new Error("登录响应结构异常");
        
        // 使用游戏加密模块生成bin数据
        const cryptoModule = window.__require?.("13");
        if (!cryptoModule?.encMsg || !cryptoModule?.lz4XorEncode) {
          throw new Error("游戏加密模块未加载，无法生成bin");
        }
        
        const binData = cryptoModule.encMsg(
          { platform: "hortor", platformExt: "mix", info: combUser, ... },
          { decrypt: cryptoModule.lz4XorDecode, encrypt: cryptoModule.lz4XorEncode }
        );
        
        // 解析bin获取角色列表
        await parseBinAndAddTokens(new Uint8Array(binData));
        
      } catch (error) {
        setStatus("处理失败：" + error.message, "error");
        console.error("扫码处理失败:", error);
      } finally {
        isLoading.value = false;
      }
    };
```

### 功能说明
| 步骤 | 说明 |
|------|------|
| 1. 获取二维码 | 模拟微信OAuth流程，获取登录二维码 |
| 2. 扫码轮询 | 每秒轮询扫码状态，最多2分钟 |
| 3. 获取Code | 用户扫码确认后，获取微信授权Code |
| 4. 游戏登录 | 用Code向游戏服务器登录，获取combUser |
| 5. 生成Bin | 使用游戏加密模块生成bin格式数据 |
| 6. 解析角色 | 解析bin获取角色列表，选择添加 |

---

## 4. BIN 多角色导入 (bin)

### 文件位置
`/workspace/target_formatted/bin-BPBW-39X.js`

### 原始代码
```javascript
const ge = P({
  __name: "bin",
  setup(fe, { emit: $ }) {
    const { storeArrayBuffer: R } = q(),
      E = (t) => {   // 处理文件上传
        j.add(async () => {
          const e = new FileReader();
          e.onload = async (a) => {
            const o = a.target?.result;
            try {
              const s = await se(o), n = JSON.parse(s);
              y.value = Object.values(n).sort((u, v) => v.power - u.power);  // 角色列表
            } catch { y.value = []; }
            try {
              const s = x.parse(o);   // 解析bin文件
              let n = s.getData();
              w.value = n;            // 保存bin数据
            } catch (s) { ... }
          };
          e.readAsArrayBuffer(t);
        });
        return !1;
      },
      V = async (t) => {   // 添加角色到列表
        const e = { ...w.value };
        e.serverId = t.serverId;
        const a = x.encode(e),    // 重新编码bin
          o = oe(a),              // 计算hash
          r = await re(a);        // 生成token
        // 添加到待提交列表
        p.value.push({ id: o, roleId: t.roleId, token: r, name: B, server: S + "服", importMethod: "bin" });
      };
```

### 翻译后代码
```javascript
const BinMultiImport = defineComponent({
  __name: "bin",
  setup(props, { emit }) {
    const { storeArrayBuffer } = useArrayBufferStore();
    const tokenStore = useTokenStore();
    const message = useMessage();
    
    // 状态
    const isLoading = ref(false);
    const formData = ref({ name: "", server: "", wsUrl: "", importMethod: "", nameTemplate: "{name}-{index}-{id}" });
    const pendingTokens = ref([]);    // 待添加的Token列表
    const serverRoleList = ref([]);   // 服务器角色列表
    const binData = ref(null);        // 解析后的bin数据
    
    // 文件上传队列(避免并发)
    const uploadQueue = new PQueue({ concurrency: 1, interval: 1000 });
    
    // 处理文件上传
    const handleFileUpload = (file) => {
      uploadQueue.add(async () => {
        console.log("上传文件数据:", file);
        const reader = new FileReader();
        
        reader.onload = async (event) => {
          const arrayBuffer = event.target?.result;
          
          // 尝试获取服务器角色列表
          try {
            const decompressed = await decompress(arrayBuffer);
            const serverList = JSON.parse(decompressed);
            if (serverList && typeof serverList === "object") {
              serverRoleList.value = Object.values(serverList).sort((a, b) => b.power - a.power);
              message.success("获取服务器角色列表成功，请选择角色添加");
            }
          } catch (error) {
            console.error("Failed to get server list", error);
            message.warning("获取服务器角色列表失败，请检查文件是否正确");
          }
          
          // 解析bin文件
          try {
            const parsed = BinParser.parse(arrayBuffer);
            let data = parsed.getData();
            if (!data && parsed._raw) {
              console.log("Bin文件 getData() 为空，尝试使用 _raw");
              data = { ...parsed._raw };
            }
            console.log("Bin文件解析:", data);
            binData.value = data;
          } catch (error) {
            console.error("Bin文件解析失败", error);
          }
        };
        
        reader.onerror = () => message.error("读取文件失败，请重试");
        reader.readAsArrayBuffer(file);
      });
      return false;   // 阻止默认上传
    };
    
    // 添加角色到待提交列表
    const addRoleToPending = async (role) => {
      if (!binData.value) {
        message.error("Bin数据丢失，请重新上传");
        return;
      }
      
      try {
        // 复制bin数据并设置serverId
        const roleBinData = { ...binData.value };
        roleBinData.serverId = role.serverId;
        
        // 重新编码bin
        const encoded = BinParser.encode(roleBinData);
        const hash = computeHash(encoded);
        const token = await generateToken(encoded);
        
        // 计算服务器名称
        let serverId = Number(role.serverId);
        let roleIndex = 0;
        if (serverId >= 2000000) { roleIndex = 2; serverId -= 2000000; }
        else if (serverId >= 1000000) { roleIndex = 1; serverId -= 1000000; }
        const serverNum = serverId - 27;
        
        // 生成角色名称
        const roleName = (formData.value.nameTemplate || "{name}-{index}-{id}")
          .replace(/{name}/g, () => role.name || `角色_${role.roleId}`)
          .replace(/{index}/g, () => String(roleIndex))
          .replace(/{id}/g, () => String(role.roleId))
          .replace(/{server}/g, () => String(serverNum) + "服");
        
        // 检查是否已存在
        if (pendingTokens.value.some((item) => item.roleId === role.roleId && item.name === roleName)) {
          message.warning(`角色 ${roleName} 已在待添加列表中`);
          return;
        }
        
        // 保存到IndexedDB
        if (!(await storeArrayBuffer(hash, encoded))) {
          throw new Error("保存BIN数据到IndexedDB失败，请检查浏览器存储空间或权限");
        }
        
        // 添加到待提交列表
        pendingTokens.value.push({
          id: hash,
          roleId: role.roleId,
          token: token,
          name: roleName,
          server: String(serverNum) + "服",
          roleIndex: roleIndex,
          wsUrl: formData.value.wsUrl || "",
          importMethod: "bin",
        });
        
        message.success(`已添加角色: ${roleName}`);
      } catch (error) {
        console.error("添加角色失败", error);
        message.error("添加角色失败: " + error.message);
      }
    };
```

### 功能说明
- 上传 `.bin` 或 `.dmp` 文件
- 解析文件获取服务器角色列表(按战力排序)
- 选择角色后，根据模板生成角色名称
- 重新编码bin并保存到IndexedDB
- 支持命名模板变量：`{name}` `{id}` `{index}` `{server}`

---

## 5. BIN 单角色导入 (singlebin)

### 文件位置
`/workspace/target_formatted/singlebin-BBIEmkcK.js`

### 原始代码
```javascript
const re = D({
  __name: "singlebin",
  setup(se, { emit: C }) {
    const A = (n) => {   // 从文件名解析角色信息
      n = n.trim();
      let e = n.match(/^bin-(.*?)服-([0-2])-([0-9]{6,12})-(.*)\.bin$/);
      return e
        ? { server: e[1], roleIndex: e[2], roleId: e[3], roleName: e[4] }
        : { server: "", roleIndex: "", roleId: "", roleName: r.name || "" };
    };
    
    const F = (n) => {   // 处理文件上传
      V.add(async () => {
        const e = A(n.name),   // 解析文件名
          d = new FileReader();
        d.onload = async (v) => {
          const p = v.target?.result,
            a = K(p),          // 计算hash
            g = await O(p);    // 生成token
          
          if (!(await $(a, p))) { message.error("保存BIN数据到IndexedDB失败"); return; }
          if (i.value.some((b) => b.id === a)) { message.error("上传列表中已存在同名角色!"); return; }
          
          i.value.push({
            id: a, token: g, name: N, server: e.server + "" + e.roleIndex || "",
            wsUrl: r.wsUrl || "", importMethod: "bin",
          });
        };
        d.readAsArrayBuffer(n);
      });
      return !1;
    };
```

### 翻译后代码
```javascript
const BinSingleImport = defineComponent({
  __name: "singlebin",
  setup(props, { emit }) {
    const { storeArrayBuffer } = useArrayBufferStore();
    const tokenStore = useTokenStore();
    const message = useMessage();
    
    const isLoading = ref(false);
    const formData = ref({ name: "", server: "", wsUrl: "", importMethod: "" });
    const pendingTokens = ref([]);
    const uploadQueue = new PQueue({ concurrency: 1, interval: 1000 });
    
    /**
     * 从bin文件名解析角色信息
     * 文件名格式: bin-{服务器}服-{角色序号}-{角色ID}-{角色名}.bin
     * 示例: bin-3服-0-123456-战士.bin
     */
    const parseBinFilename = (filename) => {
      if (!filename) return;
      filename = filename.trim();
      
      const match = filename.match(/^bin-(.*?)服-([0-2])-([0-9]{6,12})-(.*)\.bin$/);
      if (match) {
        formData.value.name = `${match[1]}_${match[2]}_${match[4]}`;
        return {
          server: match[1],      // 服务器编号
          roleIndex: match[2],   // 角色序号(0-2)
          roleId: match[3],      // 角色ID
          roleName: match[4],    // 角色名称
        };
      }
      return { server: "", roleIndex: "", roleId: "", roleName: formData.value.name || "" };
    };
    
    // 处理文件上传
    const handleFileUpload = (file) => {
      uploadQueue.add(async () => {
        console.log("上传文件数据:", file);
        
        // 从文件名解析角色信息
        const fileInfo = parseBinFilename(file.name);
        
        const reader = new FileReader();
        reader.onload = async (event) => {
          const arrayBuffer = event.target?.result;
          const hash = computeHash(arrayBuffer);
          const token = await generateToken(arrayBuffer);
          const roleName = fileInfo.roleName || file.name.split(".")[0] || "";
          
          // 保存到IndexedDB
          if (!(await storeArrayBuffer(hash, arrayBuffer))) {
            message.error("保存BIN数据到IndexedDB失败");
            return;
          }
          
          // 检查是否已存在
          if (pendingTokens.value.some((item) => item.id === hash)) {
            message.error("上传列表中已存在同名角色!");
            return;
          }
          
          // 检查是否已存在于store
          if (tokenStore.gameTokens.find((item) => item.id === hash)) {
            message.warning(`角色"${roleName}"已存在，将更新该角色的Token`);
          }
          
          message.success("Token读取成功，请检查角色名称等信息后提交");
          
          // 添加到待提交列表
          pendingTokens.value.push({
            id: hash,
            token: token,
            name: roleName,
            server: fileInfo.server + "" + fileInfo.roleIndex || "",
            wsUrl: formData.value.wsUrl || "",
            importMethod: "bin",
          });
        };
        
        reader.onerror = () => message.error("读取文件失败，请重试");
        reader.readAsArrayBuffer(file);
      });
      return false;
    };
```

### 功能说明
- 上传单个 `.bin` 文件
- 自动从文件名解析角色信息(服务器、序号、ID、名称)
- 计算文件hash作为唯一标识
- 保存原始bin数据到IndexedDB用于后续刷新

---

## 6. 导入方式汇总

| 导入方式 | 文件 | 特点 | 自动刷新支持 |
|----------|------|------|-------------|
| 手动输入 | `manual-BXqhRZtw.js` | 直接粘贴Token字符串 | 否 |
| URL获取 | `url-WN-sIDo1.js` | 从API接口获取，保存sourceUrl | 是 |
| 微信扫码 | `wxqrcode-BCLthGDr.js` | 模拟微信OAuth登录流程 | 是(通过bin数据) |
| BIN多角色 | `bin-BPBW-39X.js` | 上传bin文件，选择多个角色 | 是(通过bin数据) |
| BIN单角色 | `singlebin-BBIEmkcK.js` | 上传单个bin文件，自动解析 | 是(通过bin数据) |

# Profile 页面模块总览

## 文件位置
`/workspace/target_formatted/Profile-BT6VKzf5.js`

---

## 1. 页面结构

### 原始代码
```javascript
const Fn = {
  __name: "Profile",
  setup(e) {
    const t = rt(),    // message
      n = lt(),        // dialog
      o = wt(),        // localToken store
      s = jt(),        // gameRoles store
      a = ge(!1),      // loading
      r = ge("manual"), // importMethod
      m = ge(!1),      // importModalVisible
      c = ge(!1),      // showToken
      d = ge(!1),      // showEditModal
      p = ge({}),      // editForm
      f = ge({}),      // editFormRules
      h = ge(null),    // editFormRef
      j = ge("");      // activeTab
```

### 翻译后代码
```javascript
const Profile = {
  __name: "Profile",
  setup(props) {
    const message = useMessage();           // Naive UI 消息提示
    const dialog = useDialog();             // Naive UI 对话框
    const tokenStore = useLocalToken();     // Token 状态管理
    const rolesStore = useGameRoles();      // 游戏角色状态管理
    
    // UI 状态
    const isLoading = ref(false);           // 加载状态
    const importMethod = ref("manual");      // 当前导入方式
    const importModalVisible = ref(false);   // 导入弹窗显示状态
    const showToken = ref(false);            // 是否明文显示Token
    const showEditModal = ref(false);        // 编辑弹窗显示状态
    const editForm = ref({});                // 编辑表单数据
    const editFormRules = ref({});           // 编辑表单验证规则
    const editFormRef = ref(null);           // 编辑表单引用
    const activeTab = ref("");               // 当前激活的标签页
```

---

## 2. 导入方式选择

### 原始代码
```javascript
    const importMethods = [
      { label: "手动输入", value: "manual", icon: () => ne(ee, null, { default: () => ne(He) }) },
      { label: "URL获取", value: "url", icon: () => ne(ee, null, { default: () => ne(_t) }) },
      { label: "微信扫码", value: "wxQrcode", icon: () => ne(ee, null, { default: () => ne(Be) }) },
      { label: "BIN多角色", value: "bin", icon: () => ne(ee, null, { default: () => ne(Ct) }) },
      { label: "BIN单角色", value: "singlebin", icon: () => ne(ee, null, { default: () => ne(Zt) }) },
    ];
```

### 翻译后代码
```javascript
// 支持的导入方式列表
const importMethods = [
  { label: "手动输入", value: "manual", icon: () => h(NIcon, null, { default: () => h(EditIcon) }) },
  { label: "URL获取", value: "url", icon: () => h(NIcon, null, { default: () => h(LinkIcon) }) },
  { label: "微信扫码", value: "wxQrcode", icon: () => h(NIcon, null, { default: () => h(QrcodeIcon) }) },
  { label: "BIN多角色", value: "bin", icon: () => h(NIcon, null, { default: () => h(FolderIcon) }) },
  { label: "BIN单角色", value: "singlebin", icon: () => h(NIcon, null, { default: () => h(FileIcon) }) },
];
```

---

## 3. Token 列表渲染

### 原始代码
```javascript
    return () => {
      const tokens = Object.values(o.gameTokens).sort((a, b) => new Date(b.lastUsed || 0) - new Date(a.lastUsed || 0));
      return ne("div", { class: "token-manager" }, [
        // Token列表
        tokens.map((token) => ne("div", { class: "token-item" }, [
          ne("div", { class: "token-info" }, [
            ne("span", { class: "token-name" }, token.name),
            ne("span", { class: "token-server" }, token.server),
            ne("span", { class: "token-status" }, j(token.roleId)),
          ]),
          // 操作按钮
          ne("div", { class: "token-actions" }, [
            ne("button", { onClick: () => l(token.roleId, token) }, "连接"),
            ne("button", { onClick: () => Y(token.token) }, "复制"),
            ne("button", { onClick: () => $(token.roleId) }, "删除"),
          ]),
        ])),
      ]);
    };
```

### 翻译后代码
```javascript
return () => {
  // 按最后使用时间排序
  const tokens = Object.values(tokenStore.gameTokens)
    .sort((a, b) => new Date(b.lastUsed || 0) - new Date(a.lastUsed || 0));
  
  return h("div", { class: "token-manager" }, [
    // Token列表
    tokens.map((token) => h("div", { class: "token-item" }, [
      // Token信息区
      h("div", { class: "token-info" }, [
        h("span", { class: "token-name" }, token.name),
        h("span", { class: "token-server" }, token.server),
        h("span", { class: "token-status" }, getConnectionStatus(token.roleId)),
      ]),
      // 操作按钮区
      h("div", { class: "token-actions" }, [
        h("button", { onClick: () => toggleConnection(token.roleId, token) }, "连接"),
        h("button", { onClick: () => copyToClipboard(token.token) }, "复制"),
        h("button", { onClick: () => deleteToken(token.roleId) }, "删除"),
      ]),
    ])),
  ]);
};
```

---

## 4. 模块依赖关系

```
Profile (主页面)
├── TokenManager (Token管理组件)
│   ├── localTokenStore (Pinia Store)
│   │   ├── IndexedDB (数据持久化)
│   │   ├── WebSocket Agent (游戏连接)
│   │   └── Token 导入/导出
│   ├── Import Components
│   │   ├── manual (手动输入)
│   │   ├── url (URL获取)
│   │   ├── wxqrcode (微信扫码)
│   │   ├── bin (BIN多角色)
│   │   └── singlebin (BIN单角色)
│   └── Form Validation (表单验证)
└── gameRolesStore (游戏角色状态)
```

---

## 5. 核心数据流

```
用户操作 → Profile组件 → TokenManager组件 → localTokenStore
                                              ↓
                                    IndexedDB (持久化存储)
                                              ↓
                                    WebSocket Agent (游戏连接)
```

---

## 6. 关键状态说明

| 状态 | 类型 | 说明 |
|------|------|------|
| `userToken` | string | 用户认证Token |
| `gameTokens` | Object | 游戏角色Token映射 `{roleId: tokenData}` |
| `wsConnections` | Object | WebSocket连接映射 `{roleId: connection}` |
| `isUserAuthenticated` | boolean | 是否已登录 |
| `hasGameTokens` | boolean | 是否有游戏Token |

---

## 7. 文件输出清单

| 文件 | 内容 |
|------|------|
| `01-TokenManager-Store.md` | TokenManager核心存储模块 |
| `02-TokenManager-UI.md` | TokenManager UI组件功能 |
| `03-Import-Methods.md` | 5种Token导入方式 |
| `04-Form-Validation.md` | 表单验证系统 |
| `05-Profile-Overview.md` | Profile页面总览 |

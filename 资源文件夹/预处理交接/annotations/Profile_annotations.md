# Profile 增量标记

> 目标文件: `/workspace/formatted_528/Profile-CnTTXBgA.js`
> 开源源码: `/workspace/opensource/src/views/Profile.vue`
> 生成时间: 2026-05-28

---

## [新增] 函数列表

| 函数名 | 行号 | 功能描述 | 移植优先级 |
|--------|------|---------|-----------|
| `kt()` 初始化调用 | 行41 | Profile setup 开头的初始化调用，可能是 `useI18n()` 或路由守卫 | P2-中 |
| `TokenManager` 内联组件 (`kn`/`wn`) | 行2117-2898 | 源码中为独立组件引用，目标中内联定义完整TokenManager | P1-高 |
| `maskToken` (`f`) | 行2125-2129 | Token脱敏显示，`u.substring(0,8)+"***"+u.substring(r-8)` | P1-高 |
| `formatDate` (`h`) | 行2130 | 日期格式化，`new Date(u).toLocaleString("zh-CN")` | P2-中 |
| `getWebSocketStatus` (`j`) | 行2131 | 获取WebSocket状态 | P1-高 |
| `getStatusType` (`x`) | 行2132-2143 | 状态→标签类型映射(connected→success等) | P2-中 |
| `getStatusText` (`N`) | 行2144-2155 | 状态→中文文本(已连接/连接错误/连接中/未连接) | P2-中 |
| `getStatusIcon` (`X`) | 行2156-2167 | 状态→图标组件(Wifi/AlertCircle/Time/WifiOutline) | P2-中 |
| `getImportMethodLabel` (`_`) | 行2168-2179 | 导入方式→中文(URL导入/Bin导入/微信二维码/手动导入) | P2-中 |
| `addToken` (`O`) | 行2180-2182 | 添加Token提示 | P2-中 |
| `getTokenMenuOptions` (`q`) | 行2183-2217 | 生成Token操作菜单(编辑/复制/刷新/删除/从URL刷新) | P1-高 |
| `handleMenuSelect` (`W`) | 行2219-2237 | 菜单选择处理 | P1-高 |
| `refreshTokenManager` (`F`) | 行2238-2240 | 刷新Token管理器 | P2-中 |
| `clearUserToken` (`m`) | 行2241-2251 | 清除用户Token | P1-高 |
| `toggleWebSocket` (`l`) | 行2252-2262 | 切换WebSocket连接 | P1-高 |
| `refreshGameToken` (`S`) | 行2263-2326 | 从源地址重新获取Token，含CORS处理和WebSocket重连 | P1-高 |
| `removeGameToken` (`$`) | 行2328-2339 | 删除游戏Token | P1-高 |
| `editToken` (`H`) | 行2340-2342 | 编辑Token(开发中) | P3-低 |
| `copyToken` (`Y`) | 行2343-2356 | 复制Token到剪贴板，含降级方案 | P2-中 |
| `refreshFromUrl` (`B`) | 行2357-2397 | 从URL刷新Token，含代理 `/api/proxy?url=` 处理跨域 | P1-高 |
| `exportTokens` (`z`) | 行2399-2412 | 导出Token为JSON文件下载 | P2-中 |
| `importTokens` (`P`) | 行2413-2427 | 从JSON文件导入Token | P2-中 |
| `cleanExpired` (`M`) | 行2428-2439 | 清理过期Token（>24h） | P2-中 |
| `clearAllTokens` (`K`) | 行2440-2451 | 清除所有游戏Token | P1-高 |
| `bulkOptions` / `handleBulkAction` | 渲染属性 | 批量操作下拉菜单，源码中无对应 | P2-中 |
| `useLocalTokenManager` (`wt`) | 行43 | Token管理Store，源码中为独立store | P1-高 |
| `useGameRoles` (`jt`) | 行44 | 游戏角色Store | P1-高 |
| `selectedGameRoleKey` (`yt`) | 行39 | 当前选中游戏角色的key | P2-中 |
| `useAuthStore` (`Ot`) | 行51 | 认证Store | P1-高 |
| `IconQuestionCircle` (`$e`) | 行1369-1451 | 问号圆圈图标组件 | P3-低 |
| `Schema` (`Ae`) | 行1284-1368 | 表单验证Schema类 | P2-中 |
| `ValidateBase` (`te`) | 行811-891 | 验证基类 | P2-中 |
| `Validate` (`ft`) | 行1271-1283 | 验证入口类 | P2-中 |
| `StringValidator` (`Co`) | 行892-961 | 字符串验证器 | P2-中 |
| `NumberValidator` (`To`) | 行962-1020 | 数字验证器 | P2-中 |
| `ArrayValidator` (`So`) | 行1021-1104 | 数组验证器 | P2-中 |
| `ObjectValidator` (`$o`) | 行1105-1143 | 对象验证器 | P2-中 |
| `BooleanValidator` (`Oo`) | 行1144-1176 | 布尔验证器 | P2-中 |
| `TypeValidator` (`Lo`) | 行1185-1228 | 类型验证器(email/url/ip) | P2-中 |
| `CustomValidator` (`Vo`) | 行1229-1263 | 自定义验证器 | P2-中 |
| `isElement` (`Xe`) | 行239-241 | 判断是否为DOM元素 | P3-低 |
| `isScrollable` (`Ye`) | 行242-244 | 判断overflow是否可滚动 | P3-低 |
| `isScrollableElement` (`Te`) | 行245-268 | 判断元素是否可滚动 | P3-低 |
| `computeScrollOffset` (`be`) | 行269-277 | 计算滚动偏移量 | P3-低 |
| `scrollIntoView` (`De`) | 行278-422 | scroll-into-view核心实现 | P3-低 |
| `isNonNullObject` (`ut`) | 行423-425 | 判断是否为非空对象 | P3-低 |
| `scrollTo` (`co`) | 行426-437 | 执行滚动操作 | P3-低 |
| `normalizeOptions` (`fo`) | 行438-443 | 规范化滚动选项 | P3-低 |
| `scrollIntoViewIfNeeded` (`po`) | 行445-453 | scroll-into-view-if-needed入口 | P3-低 |
| `toString` (`he`) | 行710 | `Object.prototype.toString` | P3-低 |
| `isArray` (`je`) | 行711-713 | 判断是否为数组 | P3-低 |
| `isObject` (`le`) | 行714-716 | 判断是否为对象 | P3-低 |
| `isString` (`Me`) | 行717-719 | 判断是否为字符串 | P3-低 |
| `isNumber` (`yo`) | 行720-722 | 判断是否为数字 | P3-低 |
| `isBoolean` (`ko`) | 行723-725 | 判断是否为布尔值 | P3-低 |
| `isFunction` (`Le`) | 行726-728 | 判断是否为函数 | P3-低 |
| `isEmptyObject` (`wo`) | 行729-731 | 判断是否为空对象 | P3-低 |
| `isNullOrEmpty` (`fe`) | 行732-734 | 判断是否为null或空字符串 | P3-低 |
| `isEmptyArray` (`dt`) | 行735-737 | 判断是否为空数组 | P3-低 |
| `deepEqual` (`Pe`) | 行738-747 | 深度比较 | P3-低 |
| `mergeMessages` (`We`) | 行748-758 | 合并验证消息对象 | P3-低 |
| `getValueByPath` (`jo`) | 行759-763 | 按路径获取对象值 | P3-低 |
| `getHighestPriorityStatus` (`ho`) | 行455-462 | 获取最高优先级验证状态 | P3-低 |
| `collectErrors` (`go`) | 行463-470 | 收集所有错误信息 | P3-低 |
| `getFieldId` (`ct`) | 行471-473 | 生成表单字段ID | P3-低 |

## [修改] 函数列表

| 函数名 | 行号 | 修改内容 | 开源版本 | 目标版本 |
|--------|------|---------|---------|---------|
| `saveProfile` (`N`) | 行2937-2943 | 逻辑基本一致，消息文本相同 | `message.success("个人信息保存成功")` | 逻辑一致 |
| `changePassword` (`X`) | 行2944-2952 | 验证方式从自定义rules改为Arco Form内置验证 | `passwordRules` 自定义验证规则 | Arco Form `s.value.validate()` 内置验证 |
| `updateTheme` (`_`) | 行2954-2964 | 逻辑一致，但合并了savePreferences功能 | 独立savePreferences函数 | 合并到各字段更新逻辑 |
| `deleteAccount` (`F`) | 行2975-2986 | 对话框内容微调 | 基础warning对话框 | 相同逻辑 |
| `Profile` 组件整体 | 行2906-3458 | TokenManager从外部引用变为内联定义 | `<TokenManager />` 独立组件 | 内联完整TokenManager组件 |
| `passwordFormRef` (`s`) | 行2913 | ref_key增加 | `ref(null)` | `ref(null)` + `ref_key: "passwordFormRef"` |

## [共享] 函数列表（跳过，无需移植）

| 函数名 | 行号 | 说明 |
|--------|------|------|
| `userInfo` (`a`) | 行2914-2920 | 用户信息reactive对象，结构一致 |
| `passwordForm` (`f`) | 行2921 | 密码表单reactive对象，结构一致 |
| `preferences` (`h`) | 行2922-2927 | 系统偏好reactive对象，结构一致 |
| `themeOptions` (`j`) | 行2928-2932 | 主题选项，数据一致 |
| `languageOptions` (`x`) | 行2933-2936 | 语言选项，数据一致 |
| `setupTwoFactor` (`O`) | 行2966-2968 | 两步验证设置，逻辑一致 |
| `viewLoginHistory` (`q`) | 行2969-2971 | 查看登录历史，逻辑一致 |
| `exportData` (`W`) | 行2972-2974 | 数据导出，逻辑一致 |
| `message` (`t`) | 行2910 | useMessage()实例，一致 |
| `dialog` (`n`) | 行2911 | useDialog()实例，一致 |
| `authStore` (`o`) | 行2912 | useAuthStore()实例，一致 |

## [删除] 函数列表

| 函数名 | 行号 | 说明 |
|--------|------|------|
| `passwordRules` | 源码行181-197 | 密码验证规则对象，目标中由Arco Form内置验证替代 |
| `savePreferences` | 源码行239-243 | 保存偏好设置到localStorage，目标中合并到各字段更新逻辑 |
| `changeAvatar` | 源码行262-264 | 头像更换功能，目标中已移除 |
| `router` | 源码行150 | `useRouter()`返回值，目标中未使用故移除 |

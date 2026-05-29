# 目标代码分析与差异报告

> 分析日期：2026-05-28
> 目标网站：https://xyzw-web-helper-ena.pages.dev / https://xiaohuaxyzw.top
> 开源项目：https://github.com/w1249178256/xyzw_web_helper
> 基线版本：开源项目最新 main 分支

---

## 一、目标代码完整性评估

### 1.1 代码获取情况

| 来源 | 完整性 | 说明 |
|------|--------|------|
| 目标网站 ena.pages.dev | ✅ 完整 | 所有 JS/CSS chunk 均可公开下载 |
| APK 528 | ✅ **与目标网站字节级一致** | 所有 chunk 哈希和大小完全匹配 |
| xiaohuaxyzw.top | ✅ 与 ena 一致 | 同一份构建产物 |

### 1.2 APK 528 vs 目标网站验证

```
BatchDailyTasks: APK528=537074 Web=537074 ✅
GameFeatures:    APK528=899601 Web=899601 ✅
Dashboard:       APK528=3366   Web=3366   ✅
Profile:         APK528=51510  Web=51510  ✅
LegionWar:       APK528=11201  Web=11201  ✅
DailyTasks:      APK528=17051  Web=17051  ✅
Home:            APK528=7070   Web=7070   ✅
Login:           APK528=5085   Web=5085   ✅
gameCommands:    APK528=6652   Web=6652   ✅
imageExport:     APK528=33800  Web=33800  ✅
```

**结论：APK 528 = 目标网站，字节级完全一致。可直接从 APK 528 提取所有代码。**

### 1.3 代码可读性评估

| 维度 | 评估 |
|------|------|
| 代码完整性 | ✅ 100% — 所有功能代码完整保留 |
| Vite minify | ⚠️ 变量名压缩为单字符，但逻辑结构完整 |
| 代码混淆 | ✅ 无混淆 — Vite 默认只做 minify |
| Source Map | ❌ 无 — 生产构建不包含 .map 文件 |
| 中文字符串 | ✅ 完整保留 — 所有 UI 文本、日志消息完整可读 |
| 函数结构 | ✅ 完整保留 — if/else/for/async/await 结构清晰 |
| 类名保留 | ✅ 部分保留 — WakeLockManager、CrossPlatformStorage 等类名未压缩 |

**结论：prettier 格式化后可读性约 60-70%，对照开源源码映射变量名后可达 90%+**

---

## 二、差异总量概览

### 2.1 总体数据

| 指标 | 数值 |
|------|------|
| 目标新增中文字符串 | ~3,100+ |
| 目标删除中文字符串 | ~1,200+ |
| 目标净增中文字符串 | ~1,900+ |
| 差异最大的模块 | BatchDailyTasks（+1438 净增） |
| Capacitor 代码位置 | 2个文件、约 200 行 |

### 2.2 模块差异热力图

```
模块                  差异量        类型
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BatchDailyTasks      ████████████  大幅新增
imageExport          ██████        大幅新增
Profile              ████          大幅新增
GameFeatures         ███           中度新增+重构
Login                ██            重构
DailyTasks           ██            重构+精简
LegionWar            ██            大幅精简
DefaultLayout        █             小幅新增
gameCommands         █             数据外置
gameRoles            ▏             无变化
Dashboard/Home       ▏             无变化
```

### 2.3 逐模块中文字符串统计

| 模块 | 开源 | 目标 | 新增 | 删除 | 修改 |
|------|:---:|:---:|:---:|:---:|:---:|
| BatchDailyTasks | 654 | 2092 | 1717 | 279 | 118 |
| GameFeatures | 501 | 708 | 639 | 432 | 37 |
| Profile | 37 | 126 | 94 | 5 | 0 |
| DailyTasks | 110 | 89 | 27 | 48 | 7 |
| LegionWar | 320 | 45 | 8 | 283 | 4 |
| gameCommands | 14 | 0 | 0 | 14 | 0 |
| imageExport | 6 | 400 | 397 | 3 | 0 |
| Login | 214 | 143 | 49 | 120 | 18 |
| DefaultLayout | 3 | 16 | 13 | 0 | 0 |
| gameRoles | 17 | 17 | 2 | 2 | 0 |

---

## 三、新增功能清单（目标独有）

### P0 — 基础设施（必须先移植）

| # | 功能 | 所在模块 | 复杂度 |
|---|------|---------|--------|
| 1 | 防休眠/WakeLock 系统（Web+Tauri+Capacitor 三端） | BatchDailyTasks | 中 |
| 2 | 跨平台存储 CrossPlatformStorage | BatchDailyTasks | 低 |
| 3 | getEnvironment() 环境检测 | BatchDailyTasks | 低 |
| 4 | Capacitor 文件下载/分享/相册保存 → Web API 替换 | imageExport | 中 |

### P1 — 核心功能

| # | 功能 | 所在模块 | 复杂度 |
|---|------|---------|--------|
| 5 | 定时任务系统（Cron + 固定时间 + 不上线时段） | BatchDailyTasks | 高 |
| 6 | 任务模板系统（创建/编辑/导入/导出/引用账号） | BatchDailyTasks | 高 |
| 7 | 配置加密导出/导入（密码保护 ≥6位） | BatchDailyTasks | 中 |
| 8 | 分组管理（创建/删除/导入/导出分组） | BatchDailyTasks | 中 |
| 9 | 批量重试机制（400340/200350/200750） | BatchDailyTasks | 中 |
| 10 | 批量分批执行（按并发数分批） | BatchDailyTasks | 中 |
| 11 | DailyTaskRunner 类（完整日常任务执行器） | imageExport | 高 |
| 12 | Token 管理（添加/删除/刷新/复制/导出） | Profile | 中 |
| 13 | 多方式导入（Bin/URL/手动/微信二维码） | Profile | 中 |
| 14 | 导航新增（任务管理/Token管理/首页） | DefaultLayout | 低 |

### P2 — 游戏功能

| # | 功能 | 所在模块 | 复杂度 |
|---|------|---------|--------|
| 15 | 十殿星级挑战 + 星级抽奖 | BatchDailyTasks | 高 |
| 16 | 英雄四圣升级（红玉/蓝玉 + 配置） | BatchDailyTasks | 中 |
| 17 | 碎片礼包批量开启 | BatchDailyTasks | 低 |
| 18 | 免费扭蛋领取 + 批量重试 | BatchDailyTasks | 低 |
| 19 | 月赛助威（助威币领取 + 助威商店购买） | BatchDailyTasks | 中 |
| 20 | 蟠桃大战成就系统（50+ 成就） | BatchDailyTasks | 高 |
| 21 | 一键收车 + 400340 错误重试 | BatchDailyTasks | 中 |
| 22 | 升级改装（车辆改装 1/2/3） | BatchDailyTasks | 低 |
| 23 | 周免费礼/黑市周免费礼自动领取 | BatchDailyTasks | 低 |
| 24 | 助威商店多选购买 | BatchDailyTasks | 低 |
| 25 | 宝箱达标奖励自选大奖 | BatchDailyTasks | 中 |
| 26 | 加钟增强（上限检测/详细日志） | BatchDailyTasks | 低 |
| 27 | 竞技场增强（阵容切换/恢复/门票同步） | BatchDailyTasks | 中 |
| 28 | 月赛系统（天宫/月宫/秘蓝/青铜/进阶） | GameFeatures | 高 |
| 29 | 盐场匹配详情导出 xlsx | GameFeatures | 中 |
| 30 | 俱乐部信息扩展（盐场战绩/怪异塔/赛车） | GameFeatures | 中 |
| 31 | 碎片系统（万能/随机碎片） | GameFeatures | 低 |
| 32 | 蟠桃大战排行榜（K/D/击杀/连杀） | GameFeatures | 中 |
| 33 | QQ 登录 | Login | 中 |
| 34 | 微信扫码登录 | Login | 高 |

### P3 — 优化与社交

| # | 功能 | 所在模块 | 复杂度 |
|---|------|---------|--------|
| 35 | 蟠桃大战语音/表情系统 | BatchDailyTasks | 低 |
| 36 | 活跃度自动排序 | BatchDailyTasks | 低 |
| 37 | 周重置检查 + 自动清空状态 | BatchDailyTasks | 低 |
| 38 | 俱乐部成员导出 CSV | GameFeatures | 低 |
| 39 | 登录页品牌化重构 | Login | 低 |

---

## 四、修改功能清单

| # | 原功能 | 修改内容 | 所在模块 |
|---|--------|---------|---------|
| 1 | "每日任务" | → "日常任务" | DailyTasks |
| 2 | "区服ID" | → "服务器ID" | Login |
| 3 | "Bin数据丢失" | → "Bin数据缺失" | Login |
| 4 | 答题题目硬编码 | → 外部 answer.json 动态加载 | gameCommands |
| 5 | Token 管理在 Login | → 迁移到 Profile | Login→Profile |
| 6 | 俱乐部功能在 LegionWar | → 迁移到 GameFeatures | LegionWar→GameFeatures |
| 7 | "梦想之盟" | → "晨曦之盟" | GameFeatures |
| 8 | "连接WS"/"断开WS" | → "连接"/"断开" | Profile |
| 9 | "全部战况" | → 删除 | GameFeatures |
| 10 | "分享图片" | → 删除 | GameFeatures |

---

## 五、删除功能清单

| # | 删除内容 | 原所在模块 | 原因 |
|---|---------|-----------|------|
| 1 | 切磋相关 UI | GameFeatures | 迁移或移除 |
| 2 | 部分阵容管理 | GameFeatures | 迁移到 BatchDailyTasks |
| 3 | 图鉴升星 | GameFeatures | 迁移到 BatchDailyTasks |
| 4 | 宝箱操作 | GameFeatures | 迁移到 BatchDailyTasks |
| 5 | 旧密码验证字符串 | Profile | 重构 |
| 6 | WebSocket 连接字符串 | DailyTasks | 简化 |
| 7 | 角色信息获取字符串 | DailyTasks | 简化 |
| 8 | 具体任务描述字符串 | DailyTasks | 数据外置 |
| 9 | "按积分开箱" | BatchDailyTasks | 替换为"宝箱周开箱" |
| 10 | "车辆强制刷新保底" | BatchDailyTasks | 替换为新的重试机制 |

---

## 六、Capacitor 代码精确位置与替换方案

| 位置 | 代码 | Web 替换方案 |
|------|------|-------------|
| BatchDailyTasks L751 | `isCapacitor()` | 删除或始终返回 false |
| BatchDailyTasks L752-794 | `CrossPlatformStorage` | 直接用 localStorage |
| BatchDailyTasks L16773-16778 | `getEnvironment()` | 始终返回 `'browser'` |
| BatchDailyTasks L16780-16950 | `WakeLockManager` | `navigator.wakeLock` |
| BatchDailyTasks L16907-16932 | `requestCapacitorWakeLock()` | `navigator.wakeLock.request('screen')` |
| BatchDailyTasks L16934-16960 | `releaseCapacitorWakeLock()` | `WakeLockSentinel.release()` |
| imageExport L1458 | `window.Capacitor !== void 0` | 始终走 Web 分支 |
| imageExport L1549-1620 | `downloadInApk()` | `Blob + URL.createObjectURL + <a download>` |
| imageExport L1551-1552 | `Capacitor.getPlatform()` | 删除 |
| imageExport L1560-1561 | `Capacitor.Plugins.Filesystem` | `Blob download` |
| imageExport L1585-1586 | `Capacitor.Plugins.Share` | `navigator.share()` 或复制到剪贴板 |

---

## 七、模块重组清单（目标对开源的架构调整）

| 开源模块 | 目标去向 | 说明 |
|---------|---------|------|
| src/utils/batch/ 所有独立文件 | 内联到 BatchDailyTasks | Vite 打包优化 |
| src/utils/dailyTaskRunner.js | 内联到 imageExport | 功能合并 |
| src/utils/HeroList.js | 内联到 index 主 chunk | 数据内联 |
| src/utils/studyQuestionsFromJSON.js | 内联到 index 主 chunk | 数据内联 |
| src/utils/bonProtocol.js | 内联到 index + wsAgent | 协议内联 |
| src/stores/cache.ts | 内联到 GameFeatures + index | Store 内联 |
| src/stores/common.ts | 内联到 GameFeatures + index | Store 内联 |
| src/stores/tokenStore.ts | 内联到 BatchDailyTasks + index | Store 内联 |
| src/stores/legionWarStore.js | 代码内联 | Store 内联 |
| src/stores/changelogStore.js | 未找到对应代码 | 可能删除 |
| src/utils/PeachTaskIds.js | 内联到 BatchDailyTasks | 数据内联 |
| src/utils/clubBattleUtils.js | 代码内联 | 工具内联 |
| src/utils/clubWarrankUtils.js | 代码内联 | 工具内联 |
| src/utils/goldWarrankUtils.js | 代码内联 | 工具内联 |
| src/utils/dreamConstants.js | 代码内联 | 数据内联 |
| src/utils/xyzwWebSocket.js | 代码内联 | 通信内联 |
| src/utils/xyzwLegionWarWebSocket.js | 代码内联 | 通信内联 |
| src/utils/tokenDb.js | 代码内联 | 存储内联 |
| Token 管理（Login 中） | 迁移到 Profile | 模块拆分 |
| 俱乐部功能（LegionWar 中） | 迁移到 GameFeatures | 模块拆分 |
| 答题题目（gameCommands 硬编码） | 外置到 answer.json | 数据外置 |

---

## 八、全局新增（index 主 chunk）

| # | 功能 | 说明 |
|---|------|------|
| 1 | 多服务器支持 | jp/wj/wyx/xl/yw/zyz 服务器 |
| 2 | 亚服审核/正式/测试服务器 | 服务器类型区分 |
| 3 | IOS 平台强制开关 | 平台适配 |
| 4 | QQ 热启动 Bug 处理 | 兼容性修复 |
| 5 | 微信商业上报 | 数据统计 |
| 6 | 数据库升级/阻塞处理 | IndexedDB 管理 |
| 7 | 服务器维护检测 | 运维功能 |
| 8 | 强制清理所有连接 | 连接管理 |
| 9 | BON 协议 Blob 解码支持 | 协议增强 |
| 10 | 保存图片到相册（Capacitor） | APK 适配 |
| 11 | 分享功能（Capacitor） | APK 适配 |

# 增量标记总览

> 生成时间: 2026-05-28
> 基于: 4个模块的变量名映射表 + 开源源码对比分析

---

## 一、各模块增量统计

| 模块 | [新增] | [修改] | [共享] | [删除] | 合计 |
|------|--------|--------|--------|--------|------|
| BatchDailyTasks | 19 | 20 | 37 | 0 | 76 |
| imageExport | 50 | 12 | 19 | 0 | 81 |
| Profile | 64 | 6 | 11 | 4 | 85 |
| GameFeatures | 65 | 12 | 32 | 7 | 116 |
| **合计** | **198** | **50** | **99** | **11** | **358** |

### 统计说明

- **[新增] 198个**: 目标代码中有但开源源码中不存在的函数/类/常量，需要从零实现
- **[修改] 50个**: 开源和目标都有但逻辑不同的函数，需要基于开源版本改造
- **[共享] 99个**: 开源和目标逻辑一致的函数，可直接复用，无需移植
- **[删除] 11个**: 仅开源有但目标中已移除的函数，无需处理

---

## 二、按优先级排序的移植任务清单

### P1-高优先级（核心业务逻辑，影响主要功能）

| 序号 | 模块 | 函数名 | 功能描述 | 预估工时 |
|------|------|--------|---------|---------|
| 1 | BatchDailyTasks | `CrossPlatformStorage` 类(6个方法) | 跨平台存储管理器，TokenCard状态持久化基础 | 4h |
| 2 | BatchDailyTasks | `startStarChallenge` / `loadStarChallengeData` | 十殿星级挑战，新增游戏玩法 | 6h |
| 3 | BatchDailyTasks | `saveCardStatus` / `restoreCardStatus` / `getStorageKey` | 卡片状态持久化到CrossPlatformStorage | 3h |
| 4 | imageExport | `ERROR_CODE_MAP` / `CONTEXT_ERROR_MAP` / 错误处理函数(4个) | 错误处理体系，DailyTaskRunner核心依赖 | 4h |
| 5 | imageExport | `DailyTaskRunner.build*Tasks` 方法(11个) | 从run()拆分的任务构建方法，核心重构 | 8h |
| 6 | imageExport | `DailyTaskRunner.ensureConnection` / `isConnected` | 连接管理，自动重连 | 3h |
| 7 | imageExport | `DailyTaskRunner.sendCommandSafe` | 静默错误版命令发送 | 2h |
| 8 | imageExport | `DailyTaskRunner.fetchRoleData` / `getHangUpStatus` | 角色数据获取+挂机状态判断 | 4h |
| 9 | imageExport | `extractTargetList` / `normalizeTarget` | 竞技场目标选择重构 | 3h |
| 10 | imageExport | `downloadInApk` / `downloadFile` | Capacitor文件下载(需替换为Web方案) | 4h |
| 11 | Profile | `TokenManager` 内联组件(14个方法) | 完整Token管理功能 | 8h |
| 12 | Profile | `useLocalTokenManager` / `useGameRoles` / `useAuthStore` | Store依赖 | 4h |
| 13 | GameFeatures | `CarScoreInfo` 组件 | 赛车积分信息 | 4h |
| 14 | GameFeatures | `CrazyCar` 组件(10个方法) | 疯狂赛车完整功能 | 8h |
| 15 | GameFeatures | `DailyTaskStatus` 组件(7个方法) | 每日任务状态 | 6h |
| 16 | GameFeatures | `ClubInfo` 扩展(12个方法) | 俱乐部成员管理+申请审批 | 8h |
| 17 | GameFeatures | `IdentityCard` 扩展(30+物品) | 完整资源面板 | 6h |
| 18 | GameFeatures | `exportSaltFieldXlsx` + XLSX库 | 盐场匹配详情Excel导出 | 4h |
| 19 | GameFeatures | `BatchDailyTasks` 类 | 批量执行每日任务 | 4h |
| 20 | GameFeatures | 月赛系统(5个月赛类型) | 盐场月赛功能 | 4h |

**P1 小计: 20项任务，预估 91h**

### P2-中优先级（增强功能，提升用户体验）

| 序号 | 模块 | 函数名 | 功能描述 | 预估工时 |
|------|------|--------|---------|---------|
| 1 | BatchDailyTasks | `isTauri` / `isCapacitor` | 平台检测函数 | 1h |
| 2 | BatchDailyTasks | `isWeekResetNeeded` | 周重置检测 | 1h |
| 3 | BatchDailyTasks | `fetchCarStatus` / `fetchArenaRank` / `startArenaFight` / `claimLegacy` | TokenCard内单项功能 | 4h |
| 4 | imageExport | `delay` / `randomDelay` | 延时函数 | 0.5h |
| 5 | imageExport | `isDungeonOpenDay` / `getNestedValue` / `compareByPower` | 辅助判断函数 | 1.5h |
| 6 | imageExport | `DailyTaskRunner.getCurrentFormation` / `switchFormation` / `restoreFormation` | 阵容管理独立方法 | 2h |
| 7 | imageExport | `DailyTaskRunner.tryOpenBox` / `formatTime` / `checkActivity` | 任务辅助方法 | 2h |
| 8 | imageExport | `ARENA_CONFIG` 常量 | 竞技场配置 | 0.5h |
| 9 | Profile | `getStatusType` / `getStatusText` / `getStatusIcon` / `getImportMethodLabel` | 状态映射函数 | 2h |
| 10 | Profile | `refreshGameToken` / `refreshFromUrl` | Token刷新(含CORS处理) | 3h |
| 11 | Profile | `exportTokens` / `importTokens` / `cleanExpired` | Token导入导出 | 2h |
| 12 | Profile | `copyToken` / `getTokenMenuOptions` / `handleMenuSelect` | Token操作菜单 | 2h |
| 13 | Profile | `Schema` + 验证器类(9个) | 表单验证体系 | 4h |
| 14 | Profile | `bulkOptions` / `handleBulkAction` | 批量操作 | 1h |
| 15 | GameFeatures | `ClubWarHistory` xlsx导出扩展 | 战绩Excel导出 | 2h |
| 16 | GameFeatures | `ClubWeirdTowerInfo` 导出图片扩展 | 怪异塔图片导出 | 1h |
| 17 | GameFeatures | `LegionWarStatistics` 视图模式切换 | 战况视图切换 | 2h |
| 18 | GameFeatures | `IdentityCard` 活动周/物品格式化 | 资源面板增强 | 2h |
| 19 | GameFeatures | `CrazyCar` 辅助方法(5个) | 赛车辅助功能 | 2h |
| 20 | GameFeatures | `ClubInfo` 辅助方法(6个) | 俱乐部辅助功能 | 2h |
| 21 | GameFeatures | `DailyTaskStatus` 辅助方法(3个) | 每日任务辅助 | 1h |
| 22 | GameFeatures | 碎片系统(6种碎片) | IdentityCard碎片展示 | 1h |

**P2 小计: 22项任务，预估 38.5h**

### P3-低优先级（常量/工具/图标，不影响核心功能）

| 序号 | 模块 | 函数名 | 功能描述 | 预估工时 |
|------|------|--------|---------|---------|
| 1 | imageExport | 游戏配置常量(10个) | RECRUIT_TYPE/BOX_TYPE/CARD_TYPE等 | 1h |
| 2 | imageExport | `DailyTaskRunner.success/warn/error/info` | 日志快捷方法 | 0.5h |
| 3 | Profile | `IconQuestionCircle` | 问号圆圈图标 | 0.5h |
| 4 | Profile | 滚动辅助函数(9个) | scroll-into-view polyfill | 1h |
| 5 | Profile | 类型判断工具函数(13个) | isArray/isObject/isString等 | 1h |
| 6 | Profile | `editToken` | 编辑Token(开发中) | 0.5h |
| 7 | GameFeatures | `getCarIcon` | 车辆图标映射 | 0.5h |
| 8 | GameFeatures | `MAX_LOGS` / `showToolsTab` | 常量 | 0.5h |
| 9 | GameFeatures | `getJobName` / `formatRedCount` / `formatNumber` | 格式化辅助 | 0.5h |
| 10 | GameFeatures | `showExpand` | 展开按钮控制 | 0.5h |

**P3 小计: 10项任务，预估 6.5h**

---

## 三、预估工作量汇总

| 优先级 | 任务数 | 预估工时 | 占比 |
|--------|--------|---------|------|
| P1-高 | 20 | 91h | 67% |
| P2-中 | 22 | 38.5h | 28% |
| P3-低 | 10 | 6.5h | 5% |
| **合计** | **52** | **136h** | **100%** |

### 按模块工作量分布

| 模块 | P1工时 | P2工时 | P3工时 | 合计 |
|------|--------|--------|--------|------|
| BatchDailyTasks | 13h | 6h | 0h | 19h |
| imageExport | 28h | 6h | 1.5h | 35.5h |
| Profile | 12h | 16h | 3h | 31h |
| GameFeatures | 38h | 10.5h | 2h | 50.5h |

### 移植建议

1. **先基础设施**: 优先移植 `CrossPlatformStorage` 和错误处理体系，它们是其他功能的基础依赖
2. **再核心业务**: 移植 DailyTaskRunner 重构方法（build*Tasks系列），这是每日任务的核心
3. **然后UI组件**: 移植 TokenManager、CrazyCar、DailyTaskStatus 等UI组件
4. **最后增强功能**: 移植导出xlsx、月赛系统等增强功能
5. **Capacitor替换**: `downloadInApk`/`downloadFile` 中的 Capacitor 代码需替换为纯Web方案
6. **共享函数直接复用**: 99个共享函数可直接从开源代码复用，无需修改

### 风险提示

- `CrossPlatformStorage` 是新增的跨平台存储层，开源中无对应实现，需完整实现
- `DailyTaskRunner` 从单一run()方法拆分为11个build*方法，重构幅度大，需仔细验证
- `Capacitor` 相关代码（downloadInApk/downloadFile/isCapacitor）在Web环境中不可用，必须替换
- Profile模块内联了完整的TokenManager组件，需确认与开源独立组件的接口兼容性
- GameFeatures模块体量最大(61988行)，包含10+子组件，建议按组件分批移植

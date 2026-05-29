# GameFeatures 增量标记

> 目标文件: `/workspace/formatted_528/GameFeatures-Dixlrubn.js` (61988行)
> 开源源码: `/workspace/opensource/src/views/GameFeatures.vue`, `/workspace/opensource/src/components/`
> 生成时间: 2026-05-28

---

## [新增] 函数列表

| 函数名 | 行号 | 功能描述 | 移植优先级 |
|--------|------|---------|-----------|
| `CarScoreInfo` 组件 (`th`/`Ah`) | ~11161-11657 | 赛车积分信息组件，开源中无对应 | P1-高 |
| `fetchCarScoreInfo` (`G`) | ~11348 | 获取赛车积分数据，API: `car_getmemberrank` | P1-高 |
| `CrazyCar` 组件 | ~1200-1700 | 疯狂赛车组件，开源中无对应 | P1-高 |
| `parseCarList` (`G`) | ~1209 | 解析车辆列表 | P1-高 |
| `fetchCarData` (`fe`) | ~1238 | 获取赛车数据，API: `car_getrolecar` | P1-高 |
| `refreshCarGrade` (`w`) | ~1298 | 刷新赛车品阶，API: `car_refresh` | P2-中 |
| `sendCar` (`C`) | ~1371 | 发车，API: `car_send` | P1-高 |
| `canCollect` (`P`) | ~1446 | 判断是否可收车（需超过4小时） | P1-高 |
| `formatRemainingTime` (`z`) | ~1475 | 格式化剩余时间 | P2-中 |
| `getCarActionText` (`ve`) | ~1484 | 获取操作按钮文本(收车/发车) | P2-中 |
| `collectCar` (`N`) | ~1497 | 一键收车 | P1-高 |
| `smartSendCar` (`X`) | ~1518 | 智能发车 | P1-高 |
| `getGuardStatus` (`R`) | ~1653 | 护卫状态(未携带/可携带) | P2-中 |
| `setGuard` (`M`) | ~1662 | 设置护卫 | P2-中 |
| `getColorName` (`I`) | ~1062 | 品阶名称(绿·普通/蓝·稀有/紫·史诗/橙·传说/红·神话/金·传奇) | P2-中 |
| `getCarIcon` (`x`) | ~1068 | 车辆图标(大众/特斯拉/奥迪/奔驰/保时捷/兰博基尼) | P3-低 |
| `isActivityTime` (`m`) | ~1208 | 是否活动时间（周一至周三） | P2-中 |
| `exportSaltFieldXlsx` (`hu`) | ~10543 | 导出盐场匹配详情xlsx | P1-高 |
| `XLSX` (`VA`) | ~10596 | XLSX库，用于Excel导出 | P1-高 |
| `formatPowerForExport` (`Sp`) | ~10628 | 导出时格式化战力 | P2-中 |
| `formatScore` (`Tp`) | ~10636 | 格式化积分 | P2-中 |
| `formatTop3Red` (`Dp`) | ~10637 | 格式化前三红淬 | P2-中 |
| `ALLIANCE_KEYWORDS` (`xp`) | ~10638 | 联盟关键词匹配规则 | P2-中 |
| `detectAlliance` (`BA`) | ~10644 | 检测联盟归属 | P2-中 |
| `getCurrentDate` (`Ms`) | ~10536 | 获取当前日期字符串 `YYYY/MM/DD` | P3-低 |
| `DailyTaskStatus` 组件 (`ew`) | ~14724-15549 | 每日任务状态组件，开源中部分功能在MonthlyTasksCard | P1-高 |
| `syncTaskStatus` (`R`) | ~14801 | 同步任务完成状态 | P1-高 |
| `fetchRoleInfo` (`M`) | ~14841 | 获取角色信息 | P1-高 |
| `runDailyTasks` (`V`) | ~14852 | 执行一键补差任务 | P1-高 |
| `refreshStatus` (`F`) | ~14894 | 刷新任务状态 | P1-高 |
| `getTokenIdentifier` (`y`) | ~14908 | 获取Token标识 | P2-中 |
| `loadSettings` (`Ce`) | ~14910 | 从localStorage加载设置 | P2-中 |
| `saveSettings` (`re`) | ~14917 | 保存设置到localStorage | P2-中 |
| `BatchDailyTasks` (`dc`) | ~14864 | 批量执行每日任务的类 | P1-高 |
| `MAX_LOGS` (`Pr`) | ~14723 | `500` 最大日志数 | P3-低 |
| `IdentityCard` 扩展字段 | ~16097-16168 | 新增大量物品computed(蓝玉/红玉/四圣碎片/盐靛/晶石/皮肤币/扫荡魔毯/贝壳/金盐靛/竞技场门票/各类宝箱/刷新券/零件/火把/军团币/扳手/助威币等) | P1-高 |
| `getCurrentActivityWeek` (`xe`) | ~16169 | 当前活动周（黑市周/招募周/宝箱周） | P2-中 |
| `normalRodCount` (`me`) | ~16179 | 普通鱼竿数量(含fishing字段兼容) | P2-中 |
| `goldRodCount` (`se`) | ~16193 | 金鱼竿数量 | P2-中 |
| `formatItemCount` (`we`) | ~16207 | 格式化物品数量 | P2-中 |
| `getRawCount` (`ke`) | ~16208 | 获取原始数量 | P2-中 |
| `resList` (`Le`) | ~16209 | 资源列表(含所有物品label/value/raw) | P1-高 |
| `showExpand` (`Pe`) | ~16264 | 是否显示展开按钮 | P3-低 |
| `updateAvatar` (`ot`) | ~16265 | 更新角色头像 | P2-中 |
| `handleAvatarError` (`Ve`) | ~16279 | 头像加载失败处理 | P2-中 |
| `rankConfig` (`Q`) | ~16058 | 段位配置(🌱初出茅庐/⚔️/🗡️/🏹/⚡/👑/🔱) | P2-中 |
| `rankInfo` (`G`) | ~16068 | 段位信息computed | P2-中 |
| `formatPower` (`_`) | ~16077 | 格式化战力(亿/万) | P2-中 |
| `formatNumber` (`N`) | ~16087 | 格式化数字 | P3-低 |
| `getItemCount` (`b`) | ~16099 | 获取物品数量 | P1-高 |
| `ClubInfo` 扩展方法 | ~11754-14688 | 俱乐部信息组件大幅扩展 | P1-高 |
| `getHeroInfo` (`U`) | ~11812 | 处理英雄数据，计算红数/开孔 | P1-高 |
| `countRedHoles` (`x`) | ~11868 | 统计装备红孔数 | P1-高 |
| `fetchAllLineups` (`M`) | ~11883 | 批量获取成员阵容，API: `rank_getroleinfo` | P1-高 |
| `handleExportImage` (`V`) | ~11942 | 导出成员列表图片 | P2-中 |
| `handleExportCSV` (`F`) | ~11997 | 导出CSV表格 | P2-中 |
| `showPlayerInfo` (`y`) | ~12045 | 查询玩家详情 | P2-中 |
| `memberColumns` (`Ce`) | ~12148 | 成员表格列定义 | P2-中 |
| `currentUserJob` (`re`) | ~12409 | 当前用户职位 | P2-中 |
| `isManager` (`ae`) | ~12422 | 是否管理员 | P3-低 |
| `kickMember` (`L`) | ~12423 | 踢出成员，API: `legion_kickout` | P1-高 |
| `fetchApplyList` (`oe`) | ~12448 | 获取申请列表，API: `legion_applylist` | P1-高 |
| `approveApply` (`fe`) | ~12468 | 通过申请，API: `legion_agree` | P1-高 |
| `rejectApply` (`w`) | ~12478 | 拒绝申请，API: `legion_ignore` | P1-高 |
| `approveAll` (`C`) | ~12485 | 一键通过所有申请 | P1-高 |
| `rejectAll` (`P`) | ~12501 | 一键拒绝所有申请 | P1-高 |
| `processApplyList` (`q`) | ~12519 | 处理申请列表响应 | P2-中 |
| `isSignedIn` (`h`) | ~12614 | 是否已签到 | P2-中 |
| `signInLegion` (`B`) | ~12632 | 俱乐部签到，API: `legion_signin` | P2-中 |
| `overviewInfo` (`k`) | ~12640 | 俱乐部概览统计 | P2-中 |
| `refreshClubInfo` (`ge`) | ~12682 | 刷新俱乐部信息，API: `legion_getinfo` | P2-中 |
| `getJobName` (`J`) | ~12688 | 职位名称映射(会长/副会长/成员) | P3-低 |
| `formatRedCount` (`W`) | ~12689 | 格式化红数 | P3-低 |
| `formatPower` (`Qe`) | ~12690 | 格式化战力(兆/亿/万) | P2-中 |
| `月赛系统` | ~10370-10386 | 新增月赛类型(进阶月赛/青铜月赛/秘蓝月赛/月宫月赛/天宫月赛) | P1-高 |
| `legionwar_getgoldmonthwarrank` | ~44679 | 获取金月赛排名数据API | P1-高 |
| `碎片系统` | ~16134-16237 | IdentityCard新增碎片物品(四圣宝珠碎片/紫色随机碎片/橙色随机碎片/红色随机碎片/红色万能碎片/橙色万能碎片) | P2-中 |
| `showToolsTab` (`Bj`) | ~61278 | `!0` 是否显示工具Tab | P3-低 |

## [修改] 函数列表

| 函数名 | 行号 | 修改内容 | 开源版本 | 目标版本 |
|--------|------|---------|---------|---------|
| `GameStatus` 主视图 | ~61279-61988 | 大幅重构，从简单功能卡片网格变为Tab式布局 | 功能卡片网格 | Tab式布局(日常/俱乐部/活动/工具/盐场/蟠桃园/排行榜/切磋) |
| `ClubWarHistory` (`Hp`) | ~10200-10535 | 从GreatRouteRankListPageCard迁移，新增导出xlsx功能 | 基础战绩展示 | 新增xlsx导出+联盟检测 |
| `ClubWeirdTowerInfo` (`Wp`) | ~10656-11152 | 从WeirdTowerStatus.vue迁移，新增导出图片功能 | 基础怪异塔状态 | 新增Modal+导出图片 |
| `ClubInfo` (`hB`) | ~11754-14688 | 从ClubInfo.vue大幅扩展，新增成员管理/申请管理/导出功能 | 基础俱乐部信息展示 | 完整成员管理+申请审批+导出 |
| `TeamFormation` (`bw`) | ~15550-15979 | 从TeamFormation.vue迁移，逻辑基本一致 | 独立组件 | 内联组件 |
| `IdentityCard` (`Zw`) | ~16007-16450 | 大幅扩展物品展示，从基础角色信息变为完整资源面板 | 基础角色信息 | 完整资源面板(30+物品) |
| `PeachBattleRecords` (`JT`) | ~33820-56556 | 从PeachBattleRecords.vue迁移，功能基本一致 | 独立组件 | 内联组件 |
| `LegionWarMap` (`Wq`) | ~56557-57336 | 从LegionWarMap.vue迁移，功能基本一致 | 独立组件 | 内联组件 |
| `LegionWarStatistics` (`rz`) | ~57353-61278 | 从LegionWarStatistics.vue迁移，新增视图模式切换 | 基础战况展示 | 新增legion/individual视图模式 |
| `convertTowerCount` (`G`) | ~10843 | 层数转换逻辑 | 无独立函数 | 新增层数转换(如15→1-5) |
| `fetchWeirdTowerInfo` (`_`) | ~10851 | 获取怪异塔数据 | 无独立函数 | API: `evotower_getlegionjoinmembers` |
| `GameFeatures.vue` 整体 | - | 从简单路由页面变为GameStatus子组件容器 | 独立路由页面 | GameStatus内联为子组件 |

## [共享] 函数列表（跳过，无需移植）

| 函数名 | 行号 | 说明 |
|--------|------|------|
| `HERO_DICT` (`jt`) | 全局 | 英雄字典，数据与开源HeroList.js一致 |
| `LINEUP_RULES` (`ei`) | 全局 | 阵容规则，数据与开源一致 |
| `getLineupType` (`Po`) | 全局 | 阵容识别函数，逻辑与开源一致 |
| `legacycolor` (`Jt`) | 全局 | 传承颜色，数据与开源一致 |
| `HeroFillInfo` (`ls`) | 全局 | 处理鱼灵/鱼珠信息，逻辑与开源一致 |
| `useTokenStore` (`_t`) | 全局 | Pinia Store，与开源一致 |
| `useMessage` (`It`) | 全局 | Naive UI消息，与开源一致 |
| `useDialog` (`zr`) | 全局 | Naive UI对话框，与开源一致 |
| `useLegionWarStore` (`zu`) | 全局 | 盐场Store，与开源一致 |
| `getCurrentBattlefieldId` (`Jr`) | 全局 | 获取当前战场ID，与开源一致 |
| `formatDateTime` (`hl`) | 全局 | 日期时间格式化，与开源一致 |
| `getLastSunday` (`s`) | ~33822 | 获取上周日日期，逻辑与开源PeachBattleRecords一致 |
| `formatPower` (`p`) | ~33856 | 格式化战力，逻辑与开源一致 |
| `formatDateToShort` (`Q`) | ~33864 | 日期格式化，逻辑与开源一致 |
| `getMaxKills` (`G`) | ~33871 | 获取最大击杀数，逻辑与开源一致 |
| `getPercent` (`_`) | ~33875 | 计算百分比，逻辑与开源一致 |
| `getKillColor` (`N`) | ~33876 | 击杀颜色，逻辑与开源一致 |
| `getReviveColor` (`X`) | ~33882 | 复活颜色，逻辑与开源一致 |
| `handleImageError` (`I`) | ~33883 | 图片错误处理，逻辑与开源一致 |
| `disabledDate` (`b`) | ~33886 | 禁用日期，逻辑与开源一致 |
| `handleDateChange` (`U`) | ~33887 | 日期变更处理，逻辑与开源一致 |
| `fetchBattleRecords` (`x`) | ~33890 | 获取蟠桃战绩，API与开源一致 |
| `parsePresetTeam` (`f`) | ~15606 | 解析阵容数据，逻辑与开源一致 |
| `fetchTeamInfo` (`G`) | ~15689 | 获取阵容信息，API与开源一致 |
| `selectTeam` (`X`) | ~15725 | 切换阵容，API与开源一致 |
| `refreshTeamData` (`I`) | ~15749 | 刷新阵容数据，逻辑与开源一致 |
| `hexGrid` / `gridData` (`R`) | ~56675 | 六边形网格数据，逻辑与开源一致 |
| `typeBg` (`M`) | ~56678 | 类型背景色映射，与开源一致 |
| `typeLabel` (`V`) | ~56698 | 类型标签映射，与开源一致 |
| `toggleBattlefieldEntry` (`R`) | ~57528 | 连接/断开盐场，逻辑与开源一致 |
| `refreshData` (`M`) | ~57537 | 刷新数据，逻辑与开源一致 |
| `rowClassName` (`x`) | ~57517 | 行样式，逻辑与开源一致 |

## [删除] 函数列表

| 函数名 | 行号 | 说明 |
|--------|------|------|
| `FightPvp` 独立Tab | ~61465 | 切磋系统在GameStatus中仍有入口但功能已简化/部分删除，源码中为完整独立组件 |
| `handleFeatureAction` | GameFeatures.vue:118 | 源码GameFeatures.vue中的功能卡片操作分发，目标中已重构为Tab式布局 |
| `connectWebSocket` | GameFeatures.vue:207 | 源码GameFeatures.vue中的WebSocket连接，目标中由tokenStore统一管理 |
| `disconnectWebSocket` | GameFeatures.vue:237 | 源码GameFeatures.vue中的WebSocket断开，目标中由tokenStore统一管理 |
| `toggleConnection` | GameFeatures.vue:245 | 源码GameFeatures.vue中的连接切换，目标中移至GameStatus |
| `initializeGameData` | GameFeatures.vue:300 | 源码GameFeatures.vue中的数据初始化，目标中移至GameStatus |
| `pickArenaTargetId` | GameFeatures.vue:104 | 源码GameFeatures.vue中的竞技场目标选择，目标中移至DailyTaskRunner |

# GameFeatures 模块 Minified→源码 变量名映射表

> 目标文件: `/workspace/formatted_528/GameFeatures-Dixlrubn.js` (61988行)
> 生成日期: 2026-05-28
> 映射方法: 中文字符串锚点匹配 + 代码结构对比

---

## 1. 组件名映射

| minified名 | 源码名 | 类型 | 位置(行号) | 说明 |
|---|---|---|---|---|
| `Hp` (组件对象) | `ClubWarHistory` | 组件 | ~10200 | 俱乐部历史盐场战绩组件，`__name`未直接标注，通过"俱乐部历史盐场战绩"字符串定位 |
| `Ep` | `ClubWarHistory` (SFC编译结果) | 组件 | ~10535 | `Ft(Hp, [["__scopeId", "data-v-bbaa654a"]])` |
| `Wp` (组件对象) | `ClubWeirdTowerInfo` | 组件 | ~10656 | `__name: "ClubWeirdTowerInfo"`，俱乐部怪异塔信息 |
| `Gp` | `ClubWeirdTowerInfo` (SFC编译结果) | 组件 | ~11152 | `Ft(Wp, [["__scopeId", "data-v-a24d70b5"]])` |
| `th` (组件对象) | `CarScoreInfo` | 组件 | ~11161 | `__name: "CarScoreInfo"`，赛车积分信息 |
| `Ah` | `CarScoreInfo` (SFC编译结果) | 组件 | ~11657 | `Ft(th, [["__scopeId", "data-v-4fbde264"]])` |
| `hB` (组件对象) | `ClubInfo` | 组件 | ~11754 | `__name: "ClubInfo"`，俱乐部信息主组件 |
| `BB` | `ClubInfo` (SFC编译结果) | 组件 | ~14688 | `Ft(hB, [["__scopeId", "data-v-60d500e9"]])` |
| `ew` (组件对象) | `DailyTaskStatus` | 组件 | ~14724 | `__name: "DailyTaskStatus"`，每日任务 |
| `bw` (组件对象) | `TeamFormation` | 组件 | ~15550 | 阵容管理组件，通过"阵容"/"当前使用的战斗阵容"定位 |
| `kw` | `TeamFormation` (SFC编译结果) | 组件 | ~15979 | `Ft(bw, [["__scopeId", "data-v-b6784b87"]])` |
| `Zw` (组件对象) | `IdentityCard` | 组件 | ~16007 | `__name: "IdentityCard"`，身份牌 |
| `JT` (组件对象) | `PeachBattleRecords` | 组件 | ~33820 | `__name: "PeachBattleRecords"`，蟠桃园战绩 |
| `Wq` (组件对象) | `LegionWarMap` | 组件 | ~56557 | `__name: "LegionWarMap"`，盐场地图 |
| `Gq` | `LegionWarMap` (SFC编译结果) | 组件 | ~57336 | `Ft(Wq, [["__scopeId", "data-v-b59454d0"]])` |
| `rz` (组件对象) | `LegionWarStatistics` | 组件 | ~57353 | `__name: "LegionWarStatistics"`，盐场实时战况 |
| `wj` (组件对象) | `GameStatus` | 组件 | ~61279 | `__name: "GameStatus"`，GameFeatures主视图 |

---

## 2. ClubWarHistory (俱乐部历史盐场战绩) 变量映射

源码文件: `Club/GreatRouteRankListPageCard.vue` (部分功能迁移)

| minified名 | 源码名 | 类型 | 位置(行号) | 说明 |
|---|---|---|---|---|
| `f` | `battleRecords1` / `warData` | ref | ~10201 | `f.value.warMap` / `f.value.warRank` 对应战绩数据 |
| `c` | `loading1` | ref(bool) | ~10403 | `c.value = !0` 加载状态 |
| `p` | `currentPage` / `queryDate` | ref | ~10403 | `p.value = Ms()` 当前查询日期 |
| `v` | `showModal` / `visible` | ref(bool) | ~10476 | `v.value` 控制Modal显示 |
| `_` | `exportDom` | ref(DOM) | ~10210 | `ref_key: "exportDom"`, `ref: _` |
| `N` | `exporting` | ref(bool) | ~10211 | `N.value` 导出中状态 |
| `X` | `columns` / `rankColumns` | computed | ~10212 | 表格列定义 |
| `G` | `rankList` / `tableData` | computed | ~10200 | `G = O(() => ...)` 表格数据 |
| `Q` | `pagination` | computed/ref | ~10457 | 分页配置 |
| `I` | `handleExport1` / `exportImage` | async function | ~10310 | 导出图片函数 |
| `b` | `typeLabel` / `getWarTypeName` | function | ~10363 | 战斗类型名称映射 (灰岩岛/进阶周赛/进阶月赛/...) |
| `U` | `fetchBattleRecords1` / `fetchWarHistory` | async function | ~10393 | 获取盐场战绩数据 |
| `x` | `handleRefresh1` | function | ~10423 | `x = () => U()` 刷新按钮回调 |
| `R` | `resetState` / `onAfterLeave` | function | ~10426 | `R = () => m.value.clear()` Modal关闭后重置 |
| `mt` | `NButton` | component | ~10241 | Naive UI 按钮组件 |
| `ys` | `NDataTable` | component | ~10452 | Naive UI 数据表格 |
| `Ot` | `NTag` | component | ~10300 | Naive UI 标签 |
| `St` | `NIcon` | component | ~10253 | Naive UI 图标 |
| `Zt` | `RefreshIcon` | component | ~10253 | 刷新图标 |
| `fA` | `ImageExportIcon` | component | ~10269 | 导出图片图标 |

---

## 3. ClubWeirdTowerInfo (俱乐部怪异塔信息) 变量映射

源码文件: `Tower/WeirdTowerStatus.vue` (功能迁移)

| minified名 | 源码名 | 类型 | 位置(行号) | 说明 |
|---|---|---|---|---|
| `o` | `exportDom` | ref(DOM) | ~10665 | `ref_key: "exportDom"`, `ref: o` |
| `i` | `emit` | function | ~10666 | `emit` 函数 |
| `r` | `message` / `useMessage()` | function | ~10667 | `It()` = `useMessage()` |
| `v` | `tokenStore` / `useTokenStore()` | store | ~10668 | `_t()` = `useTokenStore()` |
| `c` | `exporting` | ref(bool) | ~10669 | `c = Y(!1)` 导出中 |
| `f` | `visible` | computed | ~10670 | `O({ get: () => n.visible, set: ... })` |
| `m` | `loading` | ref(bool) | ~10671 | `m = Y(!1)` 加载状态 |
| `p` | `towerData` / `memberList` | ref(array) | ~10672 | `p = Y([])` 怪异塔成员数据 |
| `Q` | `columns` | computed | ~10673 | 表格列定义 |
| `G` | `convertTowerCount` / `towerCountconvert` | function | ~10843 | 层数转换 `G(U)` → `${x}-${R}` |
| `_` | `fetchWeirdTowerInfo` | async function | ~10851 | 获取怪异塔数据，API: `evotower_getlegionjoinmembers` |
| `N` | `handleRefresh` | function | ~10924 | `N = () => _()` |
| `X` | `exportImage` | async function | ~10927 | 导出图片（含loading） |
| `I` | `doExport` / `captureImage` | async function | ~10944 | 实际截图导出逻辑 |
| `b` | `onAfterLeave` | function | ~10957 | Modal关闭回调 |

---

## 4. CarScoreInfo (赛车积分信息) 变量映射

源码文件: 新增组件（无直接开源对应）

| minified名 | 源码名 | 类型 | 位置(行号) | 说明 |
|---|---|---|---|---|
| `o` | `exportDom` | ref(DOM) | ~11170 | `ref_key: "exportDom"` |
| `i` | `emit` | function | ~11171 | |
| `r` | `message` | function | ~11172 | `It()` |
| `v` | `tokenStore` | store | ~11173 | `_t()` |
| `c` | `exporting` | ref(bool) | ~11174 | |
| `f` | `visible` | computed | ~11175 | |
| `m` | `loading` | ref(bool) | ~11176 | |
| `p` | `carScoreData` / `memberList` | ref(array) | ~11177 | 赛车积分数据 |
| `Q` | `columns` | computed | ~11178 | 表格列定义 |
| `G` | `fetchCarScoreInfo` | async function | ~11348 | API: `car_getmemberrank` |
| `_` | `handleRefresh` | function | ~11429 | `_= () => G()` |
| `N` | `exportImage` | async function | ~11432 | |
| `X` | `doExport` / `captureImage` | async function | ~11449 | |

---

## 5. ClubInfo (俱乐部信息) 变量映射

源码文件: `Club/ClubInfo.vue` (综合组件)

| minified名 | 源码名 | 类型 | 位置(行号) | 说明 |
|---|---|---|---|---|
| `A` | `tokenStore` | store | ~11757 | `_t()` = `useTokenStore()` |
| `s` | `message` | function | ~11758 | `It()` = `useMessage()` |
| `n` | `dialog` / `useDialog()` | function | ~11759 | `zr()` = `useDialog()` |
| `o` | `legionInfo` | computed | ~11760 | `O(() => gameData?.legionInfo)` |
| `i` | `clubInfo` / `info` | computed | ~11764 | `O(() => o.value?.info)` |
| `r` | `members` | computed | ~11768 | `O(() => i.value?.members)` |
| `v` | `memberList` | computed | ~11772 | `O(() => Object.values(r.value))` |
| `c` | `memberCount` | computed | ~11773 | `O(() => v.value.length)` |
| `f` | `leader` / `president` | computed | ~11774 | 会长信息 |
| `m` | `sortedMembers` | computed | ~11781 | 按 job/red/power 排序的成员列表 |
| `p` | `showPlayerInfoModal` | ref(bool) | ~11804 | `p = Y(!1)` |
| `Q` | `playerInfo` | ref(object) | ~11805 | `Q = Y(null)` 玩家详情 |
| `G` | `loading` / `fetchingInfo` | ref(bool) | ~11806 | `G = Y(!1)` |
| `_` | `showHeroModal` | ref(bool) | ~11807 | `_.value` 武将详情弹窗 |
| `N` | `heroModealTemp` | ref(object) | ~11808 | `N = Y(null)` 当前查看的武将 |
| `X` | `fetchingLineup` | ref(bool) | ~11809 | `X = Y(!1)` 获取阵容中 |
| `I` | `exporting` | ref(bool) | ~11810 | `I = Y(!1)` 导出中 |
| `b` | `exportDom` | ref(DOM) | ~11811 | `b = Y(null)` |
| `U` | `getHeroInfo` / `processHeroes` | function | ~11812 | 处理英雄数据，计算红数/开孔 |
| `x` | `getEquipment` / `countRedHoles` | function | ~11868 | 统计装备红孔数 |
| `R` | `handleHeroClick` / `selectHeroInfo` | function | ~11880 | `R = (Ae) => { _.value = !0; N.value = Ae }` |
| `M` | `fetchLineupInfo` / `fetchAllLineups` | async function | ~11883 | 批量获取成员阵容，API: `rank_getroleinfo` |
| `V` | `exportImage` / `handleExportImage` | async function | ~11942 | 导出成员列表图片 |
| `F` | `exportCSV` / `handleExportCSV` | function | ~11997 | 导出CSV表格 |
| `y` | `fetchTargetInfo` / `showPlayerInfo` | async function | ~12045 | 查询玩家详情 |
| `Ce` | `memberColumns` | computed | ~12148 | 成员表格列定义 |
| `re` | `myJob` / `currentUserJob` | computed | ~12409 | 当前用户职位 |
| `ae` | `canManage` / `isManager` | computed | ~12422 | `O(() => [1,2].includes(re.value))` |
| `L` | `kickMember` | function | ~12423 | 踢出成员，API: `legion_kickout` |
| `oe` | `fetchApplyList` | async function | ~12448 | 获取申请列表，API: `legion_applylist` |
| `fe` | `approveApply` | function | ~12468 | 通过申请，API: `legion_agree` |
| `w` | `rejectApply` | function | ~12478 | 拒绝申请，API: `legion_ignore` |
| `C` | `approveAll` | function | ~12485 | 一键通过所有申请 |
| `P` | `rejectAll` | function | ~12501 | 一键拒绝所有申请 |
| `ue` | `activeTab` | ref(string) | ~12514 | `ue = Y("overview")` |
| `ve` | `showApplyModal` | ref(bool) | ~12515 | `ve = Y(!1)` |
| `z` | `applyLoading` | ref(bool) | ~12516 | `z = Y(!1)` |
| `ne` | `applyList` | ref(array) | ~12517 | `ne = Y([])` |
| `Be` | `hoveredApplyId` | ref | ~12518 | `Be = Y(null)` |
| `q` | `processApplyList` | function | ~12519 | 处理申请列表响应 |
| `h` | `isSignedIn` | computed | ~12614 | 是否已签到 |
| `B` | `signInLegion` | function | ~12632 | 俱乐部签到，API: `legion_signin` |
| `k` | `clubStats` / `overviewInfo` | computed | ~12640 | 俱乐部概览统计 |
| `ge` | `refreshClubInfo` | function | ~12682 | 刷新俱乐部信息，API: `legion_getinfo` |
| `J` | `getJobName` | function | ~12688 | `J = (Ae) => Ae===1?"会长":Ae===2?"副会长":"成员"` |
| `W` | `formatRedCount` | function | ~12689 | `W = (Ae) => Ae + "红"` |
| `Qe` | `formatPower` | function | ~12690 | 格式化战力（兆/亿/万） |
| `jt` | `HERO_DICT` | object | ~11830 | 英雄字典/配置 |
| `Po` | `getLineupType` | function | ~11918 | 获取阵容类型 |
| `ls` | `HeroFillInfo` / `processPearlInfo` | function | ~12076 | 处理鱼灵/鱼珠信息 |
| `ei` | `LINEUP_RULES` | array | ~12274 | 阵容规则配置 |
| `Jt` | `legacycolor` | array | ~12612 | 传承颜色配置 |
| `xa` | 俱乐部图标路径 | string | ~12719 | `src: xa, alt: "俱乐部图标"` |
| `iA` | `NModal` | component | ~10472 | Naive UI 弹窗 |
| `ss` | `NButtonGroup` | component | ~12738 | 按钮组 |
| `Qt` | `NAvatar` | component | ~10690 | 头像组件 |
| `Wr` | `NThing` | component | ~13076 | Naive UI Thing |
| `fa` | `NGrid` | component | ~13053 | 网格布局 |
| `IA` | `NGi` | component | ~13063 | 网格项 |
| `As` | `NCard` | component | ~13068 | 卡片 |
| `Kn` | `NStatistic` | component | ~13286 | 统计 |
| `ju` | `NAlert` | component | ~13501 | 警告 |
| `Xu` | `NCollapse` | component | ~13561 | 折叠面板 |
| `Ju` | `NCollapseItem` | component | ~13574 | 折叠项 |
| `Ls` | `NEmpty` | component | ~11019 | 空状态 |
| `Ea` | `NDescriptions` | component | ~14275 | 描述列表 |
| `kt` | `NDescriptionsItem` | component | ~14284 | 描述项 |
| `_A` | `MyCard` | component | ~12705 | 自定义卡片组件 |

---

## 6. DailyTaskStatus (每日任务) 变量映射

源码文件: `cards/MonthlyTasksCard.vue` (部分功能) + 新增每日任务组件

| minified名 | 源码名 | 类型 | 位置(行号) | 说明 |
|---|---|---|---|---|
| `A` | `tokenStore` | store | ~14727 | `_t()` |
| `s` | `message` | function | ~14728 | `It()` |
| `n` | `showSettings` | ref(bool) | ~14729 | `n = Y(!1)` |
| `o` | `showLog` | ref(bool) | ~14730 | `o = Y(!1)` |
| `i` | `isExpanded` | ref(bool) | ~14731 | `i = Y(!1)` |
| `r` | `isRunning` | ref(bool) | ~14732 | `r = Y(!1)` 任务执行中 |
| `v` | `logContainer` | ref(DOM) | ~14733 | `v = Y(null)` 日志容器 |
| `c` | `settings` / `taskSettings` | reactive | ~14734 | `ft({ arenaFormation, bossFormation, bossTimes, ... })` |
| `f` | `tasks` / `taskList` | ref(array) | ~14748 | 任务列表 (登录/分享/赠送/招募/挂机/点金/宝箱/黑市/竞技场/盐罐) |
| `m` | `formationOptions` | array | ~14765 | `[1,2,3,4,5,6].map(ae => ({label: "阵容"+ae, value: ae}))` |
| `p` | `bossTimesOptions` | array | ~14766 | `[0,1,2,3,4].map(ae => ({label: ae+"次", value: ae}))` |
| `Q` | `roleInfo` | computed | ~14767 | `O(() => A.selectedTokenRoleInfo)` |
| `G` | `dailyPoints` | computed | ~14768 | 每日任务积分 |
| `_` | `progress` | computed | ~14779 | `O(() => Math.min(G.value, 100))` |
| `N` | `isComplete` | computed | ~14780 | `O(() => _.value >= 100)` |
| `X` | `progressColor` | computed | ~14781 | 进度条颜色 |
| `I` | `isConnected` | computed | ~14782 | WebSocket连接状态 |
| `b` | `isConnecting` | computed | ~14787 | WebSocket连接中 |
| `U` | `logs` | ref(array) | ~14792 | `U = Y([])` 日志列表 |
| `x` | `addLog` | function | ~14793 | 添加日志 |
| `R` | `syncTaskStatus` | function | ~14801 | 同步任务完成状态 |
| `M` | `fetchRoleInfo` | async function | ~14841 | 获取角色信息 |
| `V` | `runDailyTasks` / `executeTasks` | async function | ~14852 | 执行一键补差任务 |
| `F` | `refreshStatus` | async function | ~14894 | 刷新任务状态 |
| `y` | `getTokenIdentifier` | function | ~14908 | 获取Token标识 |
| `Ce` | `loadSettings` | function | ~14910 | 从localStorage加载设置 |
| `re` | `saveSettings` | function | ~14917 | 保存设置到localStorage |
| `dc` | `BatchDailyTasks` | class | ~14864 | 批量执行每日任务的类 |
| `Pr` | `MAX_LOGS` | constant | ~14723 | `Pr = 500` 最大日志数 |
| `wB` | 每日任务图标路径 | string | ~14689 | `/icons/174023274867420.png` |

---

## 7. TeamFormation (阵容管理) 变量映射

源码文件: `Team/TeamFormation.vue`

| minified名 | 源码名 | 类型 | 位置(行号) | 说明 |
|---|---|---|---|---|
| `A` | `tokenStore` | store | ~15550 | `_t()` |
| `s` | `message` | function | ~15551 | `It()` |
| `n` | `loading` | ref(bool) | ~15552 | `n = Y(!1)` |
| `o` | `switching` | ref(bool) | ~15553 | `o = Y(!1)` 切换阵容中 |
| `i` | `currentTeam` | ref(number) | ~15554 | `i = Y(1)` 当前阵容编号 |
| `r` | `availableTeams` | ref(array) | ~15555 | `r = Y([1,2,3,4])` 可用阵容列表 |
| `v` | `wsStatus` | computed | ~15599 | WebSocket连接状态 |
| `c` | `presetTeamData` | computed | ~15602 | `O(() => gameData?.presetTeam)` |
| `f` | `parsePresetTeam` | function | ~15606 | 解析阵容数据 |
| `m` | `teamData` | computed | ~15650 | `O(() => f(c.value))` |
| `p` | `currentTeamHeroes` | computed | ~15651 | 当前阵容英雄列表 |
| `Q` | `sendCommand` | async function | ~15678 | 发送WebSocket命令 |
| `G` | `fetchTeamInfo` | async function | ~15689 | 获取阵容信息，API: `presetteam_getinfo` |
| `_` | `updateAvailableTeams` | function | ~15715 | 更新可用阵容列表 |
| `N` | `syncCurrentTeam` | function | ~15722 | 同步当前阵容 |
| `X` | `selectTeam` | async function | ~15725 | 切换阵容，API: `presetteam_saveteam` |
| `I` | `refreshTeamData` | async function | ~15749 | 刷新阵容数据 |
| `ks` | 阵容图标路径 | string | ~15789 | `/icons/Ob7pyorzmHiJcbab2c25af264d0758b527bc1b61cc3b.png` |
| `jt` | `HERO_DICT` | object | ~15660 | 英雄字典 |

---

## 8. IdentityCard (身份牌) 变量映射

源码文件: `Common/IdentityCard.vue`

| minified名 | 源码名 | 类型 | 位置(行号) | 说明 |
|---|---|---|---|---|
| `s` | `legacycolor` | array | ~16012 | `const s = Jt` 传承颜色配置 |
| `n` | `tokenStore` | store | ~16013 | `_t()` |
| `o` | `emit` | function | ~16014 | |
| `i` | `isExpanded` | ref(bool) | ~16015 | `i = Y(!1)` |
| `r` | `wsStatus` | computed | ~16016 | WebSocket状态 |
| `v` | `roleInfo` | computed | ~16021 | 角色信息（含roleId/name/headImg/level/power/gold/legacy/diamond/fishing/items） |
| `c` | `hasRole` | computed | ~16048 | `O(() => Object.keys(v.value).length > 0)` |
| `f` | `fallbackAvatars` | array | ~16049 | 备用头像列表 |
| `m` | `roleAvatar` | ref(string) | ~16056 | `m = Y("")` |
| `p` | `fallbackAvatar` | ref(string) | ~16057 | `p = Y("")` |
| `Q` | `rankConfig` | object | ~16058 | 段位配置 (🌱初出茅庐/⚔️/🗡️/🏹/⚡/👑/🔱) |
| `G` | `rankInfo` | computed | ~16068 | 段位信息 |
| `_` | `formatPower` | function | ~16077 | 格式化战力（亿/万） |
| `N` | `formatNumber` | function | ~16087 | 格式化数字 |
| `X` | `gold` | computed | ~16097 | `O(() => v.value.gold ?? 0)` |
| `I` | `diamond` | computed | ~16098 | `O(() => v.value.diamond ?? 0)` |
| `b` | `getItemCount` | function | ~16099 | 获取物品数量 |
| `U` | `items` | computed | ~16122 | `O(() => v.value.items)` |
| `x` | `normalRod` | computed | ~16123 | `O(() => b(U.value, 1011))` 普通鱼竿 |
| `R` | `goldRod` | computed | ~16124 | `O(() => b(U.value, 1012))` 金鱼竿 |
| `M` | `pearl` | computed | ~16125 | `O(() => b(U.value, 1013))` 珍珠 |
| `V` | `recruitOrder` | computed | ~16126 | `O(() => b(U.value, 1001))` 招募令 |
| `F` | `iron` | computed | ~16127 | `O(() => b(U.value, 1006))` 精铁 |
| `y` | `colorJade` | computed | ~16128 | `O(() => b(U.value, 1023))` 彩玉 |
| `Ce` | `whiteJade` | computed | ~16129 | `O(() => b(U.value, 1022))` 白玉 |
| `re` | `advanceStone` | computed | ~16130 | `O(() => b(U.value, 1003))` 进阶石 |
| `ae` | `revivePill` | computed | ~16131 | `O(() => b(U.value, 1017))` 复活丹 |
| `L` | `blueJade` | computed | ~16132 | `O(() => b(U.value, 10002))` 蓝玉 |
| `oe` | `redJade` | computed | ~16133 | `O(() => b(U.value, 10003))` 红玉 |
| `fe` | `fourSaintFragment` | computed | ~16134 | `O(() => b(U.value, 10101))` 四圣碎片 |
| `W` | `saltIndigo` | computed | ~16149 | `O(() => b(U.value, 1019))` 盐靛 |
| `Qe` | `crystal` | computed | ~16150 | `O(() => b(U.value, 1016))` 晶石 |
| `Ae` | `skinCoin` | computed | ~16151 | `O(() => b(U.value, 1020))` 皮肤币 |
| `j` | `sweepCarpet` | computed | ~16152 | `O(() => b(U.value, 1021))` 扫荡魔毯 |
| `$` | `shell` | computed | ~16153 | `O(() => b(U.value, 1033))` 贝壳 |
| `T` | `goldSaltIndigo` | computed | ~16154 | `O(() => b(U.value, 1035))` 金盐靛 |
| `S` | `arenaTicket` | computed | ~16155 | `O(() => b(U.value, 1007))` 竞技场门票 |
| `H` | `woodBox` | computed | ~16156 | `O(() => b(U.value, 2001))` 木制宝箱 |
| `Z` | `bronzeBox` | computed | ~16157 | `O(() => b(U.value, 2002))` 青铜宝箱 |
| `be` | `goldBox` | computed | ~16158 | `O(() => b(U.value, 2003))` 黄金宝箱 |
| `ce` | `platinumBox` | computed | ~16159 | `O(() => b(U.value, 2004))` 铂金宝箱 |
| `ye` | `diamondBox` | computed | ~16160 | `O(() => b(U.value, 2005))` 钻石宝箱 |
| `K` | `refreshTicket` | computed | ~16161 | `O(() => b(U.value, 35002))` 刷新券 |
| `te` | `parts` | computed | ~16162 | `O(() => b(U.value, 35009))` 零件 |
| `ee` | `woodTorch` | computed | ~16163 | `O(() => b(U.value, 1008))` 木柴火把 |
| `ie` | `bronzeTorch` | computed | ~16164 | `O(() => b(U.value, 1009))` 青铜火把 |
| `le` | `saltGodTorch` | computed | ~16165 | `O(() => b(U.value, 1010))` 咸神火把 |
| `_e` | `legionCoin` | computed | ~16166 | `O(() => b(U.value, 1014))` 军团币 |
| `pe` | `wrench` | computed | ~16167 | `O(() => b(U.value, 1026))` 扳手 |
| `Ie` | `cheerCoin` | computed | ~16168 | `O(() => b(U.value, 2101))` 助威币 |
| `xe` | `getCurrentActivityWeek` | computed | ~16169 | 当前活动周（黑市周/招募周/宝箱周） |
| `me` | `normalRodCount` | computed | ~16179 | 普通鱼竿数量（含fishing字段兼容） |
| `se` | `goldRodCount` | computed | ~16193 | 金鱼竿数量 |
| `we` | `formatItemCount` | function | ~16207 | 格式化物品数量 |
| `ke` | `getRawCount` | function | ~16208 | 获取原始数量 |
| `Le` | `resList` | computed | ~16209 | 资源列表（含所有物品label/value/raw） |
| `Pe` | `showExpand` | computed | ~16264 | `O(() => Le.value.length > 6)` |
| `ot` | `updateAvatar` | function | ~16265 | 更新角色头像 |
| `Ve` | `handleAvatarError` | function | ~16279 | 头像加载失败处理 |
| `ec` | `Transition` | component | ~16450 | Vue Transition |
| `ks` | 身份牌图标路径 | string | ~16307 | `/icons/Ob7pyorzmHiJcbab2c25af264d0758b527bc1b61cc3b.png` |

---

## 9. PeachBattleRecords (蟠桃园战绩) 变量映射

源码文件: `Club/PeachBattleRecords.vue`

| minified名 | 源码名 | 类型 | 位置(行号) | 说明 |
|---|---|---|---|---|
| `s` | `getLastSunday` | function | ~33822 | 获取上周日日期 |
| `n` | `currentStyle` | ref(string) | ~33835 | `Y(localStorage.getItem("peach_battle_records_style") \|\| "default")` |
| `o` | `exportDom` | ref(DOM) | ~33840 | |
| `i` | `message` | function | ~33841 | `It()` |
| `r` | `tokenStore` | store | ~33842 | `_t()` |
| `v` | `legionInfo` | computed | ~33843 | |
| `c` | `loading` | ref(bool) | ~33851 | |
| `f` | `battleRecords` | ref(object) | ~33852 | 蟠桃战绩数据 |
| `m` | `queryDate` | ref(string) | ~33854 | `Y(s())` |
| `p` | `formatPower` | function | ~33856 | 格式化战力 |
| `Q` | `formatDateToShort` | function | ~33864 | 日期格式化 |
| `G` | `getMaxKills` | function | ~33871 | 获取最大击杀数 |
| `_` | `getPercent` | function | ~33875 | 计算百分比 |
| `N` | `getKillColor` | function | ~33876 | 击杀颜色 |
| `X` | `getReviveColor` | function | ~33882 | 复活颜色 |
| `I` | `handleImageError` | function | ~33883 | 图片错误处理 |
| `b` | `disabledDate` | function | ~33886 | 禁用日期 |
| `U` | `handleDateChange` | function | ~33887 | 日期变更处理 |
| `x` | `fetchBattleRecords` | async function | ~33890 | 获取蟠桃战绩，API: `legion_getpayloadtask` + `legion_getpayloadrecord` + `legion_getinfobyid` + `legion_getpayloadkillrecord` |

---

## 10. LegionWarMap (盐场地图) 变量映射

源码文件: `Club/LegionWarMap.vue`

| minified名 | 源码名 | 类型 | 位置(行号) | 说明 |
|---|---|---|---|---|
| `A` | `message` | function | ~56559 | `It()` |
| `s` | `legionWarStore` | store | ~56561 | `zu()` = `useLegionWarStore()` |
| `n` | `battlefieldId` | ref | ~56562 | `Y(Jr())` |
| `o` | `isConnected` | ref(bool) | ~56564 | 从store解构 |
| `i` | `connecting` | ref(bool) | ~56565 | |
| `r` | `validData` | ref | ~56566 | |
| `v` | `battlefieldId` (from store) | ref | ~56567 | |
| `c` | `legionDetails` | ref | ~56568 | |
| `f` | `isJoined` | ref | ~56569 | |
| `m` | `legionWarMapDom` / `canvasContainer` | ref(DOM) | ~56571 | |
| `G` | `exporting` | ref(bool) | ~56574 | |
| `_` | `exportImage` | async function | ~56575 | 导出地图图片 |
| `N` | `sortedLegions` | computed | ~56610 | 排序后的俱乐部列表 |
| `X` | `allianceGroups` | computed | ~56658 | 联盟分组 |
| `M` | `typeBg` | function | ~56678 | 类型背景色映射 |
| `V` | `typeLabel` | function | ~56698 | 类型标签映射 |
| `R` | `hexGrid` / `gridData` | array | ~56675 | 六边形网格数据 |
| `Zr` | `useLegionWarStore` 解构函数 | function | ~56570 | 从store解构连接状态 |
| `Os` | 盐场图标路径 | string | ~57583 | |
| `DA` | `HEX_SIZE` | constant | ~56555 | `DA = 3` 六边形大小 |

---

## 11. LegionWarStatistics (盐场实时战况) 变量映射

源码文件: `Club/LegionWarStatistics.vue`

| minified名 | 源码名 | 类型 | 位置(行号) | 说明 |
|---|---|---|---|---|
| `A` | `message` | function | ~57355 | `It()` |
| `s` | `tokenStore` | store | ~57356 | `_t()` |
| `n` | `legionWarStore` | store | ~57357 | `zu()` |
| `o` | `battlefieldId` | ref | ~57358 | |
| `i` | `isConnected` | ref(bool) | ~57359 | |
| `r` | `connecting` | ref(bool) | ~57360 | |
| `v` | `validData` | ref | ~57361 | |
| `c` | `battlefieldId` (from store) | ref | ~57362 | |
| `f` | `lastUpdateTime` | ref | ~57363 | |
| `m` | `legionDetails` | ref | ~57364 | |
| `p` | `isJoined` | ref | ~57365 | |
| `Q` | `viewMode` | ref(string) | ~57368 | `Q = Y("legion")` 视图模式 |
| `G` | `exporting` | ref(bool) | ~57369 | |
| `_` | `tableMaxHeight` | ref(number) | ~57370 | `_= Y(600)` |
| `N` | `exportImage` | async function | ~57371 | 导出图片 |
| `X` | `legionData` | computed | ~57409 | 俱乐部战况数据 |
| `I` | `individualData` | computed | ~57428 | 个人战况数据 |
| `b` | `legionColumns` | array | ~57448 | 俱乐部表格列 |
| `U` | `individualColumns` | array | ~57494 | 个人表格列 |
| `x` | `rowClassName` | function | ~57517 | 行样式 |
| `R` | `toggleBattlefieldEntry` | async function | ~57528 | 连接/断开盐场 |
| `M` | `refreshData` | function | ~57537 | 刷新数据 |
| `Uc` | `formatPower` (通用) | function | ~57475 | 格式化战力 |

---

## 12. GameStatus (主视图) 变量映射

源码文件: `views/GameFeatures.vue`

| minified名 | 源码名 | 类型 | 位置(行号) | 说明 |
|---|---|---|---|---|
| `A` | `tokenStore` | store | ~61282 | `_t()` |
| `s` | `legionMatch` | ref(object) | ~61284 | `Y({ isRegistered: !1 })` |
| `n` | `activeSection` | ref(string) | ~61286 | `n = Y("daily")` 当前Tab |
| `o` | `saltFieldTab` | ref(string) | ~61287 | `o = Y("warrank")` 盐场子Tab |
| `i` | `peachTab` | ref(string) | ~61288 | `i = Y("peach")` 蟠桃子Tab |
| `r` | `rankTab` | ref(string) | ~61289 | `r = Y("serverrank")` 排行榜子Tab |
| `v` | `bottleHelperStatus` | ref(object) | ~61294 | 炼丹炉状态 |
| `c` | `hangUpStatus` | ref(object) | ~61295 | 挂机状态 |
| `f` | `signInStatus` | ref(object) | ~61304 | `f = Y({ isSignedIn: !1, clubName: "" })` |
| `m` | `roleInfo` | computed | ~61306 | `O(() => A.gameData.roleInfo)` |
| `p` | `canChallengeBoss` | computed | ~61310 | 是否可挑战Boss |
| `Q` | `updateTimers` | function | ~61324 | 更新计时器 |
| `G` | `timerInterval` | ref | ~61363 | `G = null` 定时器ID |
| `_` | `startTimer` | function | ~61364 | 启动计时器 |
| `N` | `hasInitialized` | ref(bool) | ~61388 | `N = Y(!1)` |
| `b` | `MyCard` / `StatusCard` | component | ~61418 | `eC` |
| `R` | `TeamFormation` | component | ~61421 | `kw` |
| `M` | `HangUpStatus` | component | ~61422 | `tw` |
| `V` | `ClubInfo` | component | ~61423 | `BB` |
| `F` | `FightPvp` | component | ~61424 | `Xv` |
| `Bj` | `showToolsTab` | constant | ~61278 | `Bj = !0` 是否显示工具Tab |
| `eC` | `IdentityCard` (embedded) | component | ~61443 | 嵌入式身份牌 |
| `gQ` | `GreatRouteRankListPageCard` / 盐场匹配 | component | ~61536 | `d(gQ)` |
| `E$` | `SaltFieldWeeklyBattle` / 本周盐场战绩 | component | ~61533 | `d(E$)` |
| `PF` | `SaltFieldMonthlyBattle` / 本月盐场战绩 | component | ~61539 | `d(PF)` |
| `Gq` | `LegionWarMap` | component | ~61542 | `d(Gq)` |
| `iz` | `LegionWarStatistics` | component | ~61545 | `d(iz)` |
| `ZT` | `PeachBattleRecords` | component | ~61575 | `d(ZT)` |
| `FW` | `PeachInfo` | component | ~61578 | `d(FW)` |

---

## 13. 盐场匹配详情导出 xlsx (新增功能) 变量映射

源码文件: 新增功能（无直接开源对应）

| minified名 | 源码名 | 类型 | 位置(行号) | 说明 |
|---|---|---|---|---|
| `hu` | `exportSaltFieldXlsx` / `exportMatchDetail` | function | ~10543 | 导出盐场匹配详情xlsx |
| `VA` | `XLSX` | library | ~10596 | XLSX库，用于Excel导出 |
| `qr` | `XLSX.writeFile` | function | ~10626 | `qr(c, m)` 写入xlsx文件 |
| `Sp` | `formatPowerForExport` | function | ~10628 | 导出时格式化战力 |
| `Tp` | `formatScore` | function | ~10636 | 格式化积分 |
| `Dp` | `formatTop3Red` | function | ~10637 | 格式化前三红淬 |
| `xp` | `ALLIANCE_KEYWORDS` | array | ~10638 | 联盟关键词匹配规则 |
| `BA` | `allianceincludes` / `detectAlliance` | function | ~10644 | 检测联盟归属 |
| `Ms` | `getCurrentDate` | function | ~10536 | 获取当前日期字符串 `YYYY/MM/DD` |
| `Fn` | `formatDate` | function | ~26491 | 日期格式化 |

---

## 14. 疯狂赛车 (CrazyCar) 变量映射

源码文件: 新增组件（无直接开源对应）

| minified名 | 源码名 | 类型 | 位置(行号) | 说明 |
|---|---|---|---|---|
| `A` | `tokenStore` | store | ~1200 | `_t()` |
| `s` | `message` | function | ~1201 | `It()` |
| `n` | `loading` | ref(bool) | ~1202 | |
| `o` | `carData` | ref | ~1203 | 车辆数据 |
| `i` | `dataLoaded` | ref(bool) | ~1204 | 数据已加载 |
| `r` | `ticketCount` | ref(number) | ~1205 | 车票数量 |
| `p` | `isConnected` | computed | ~1206 | |
| `Q` | `isConnecting` | computed | ~1207 | |
| `m` | `isActivityTime` | computed | ~1208 | 是否活动时间（周一至周三） |
| `I` | `getColorName` | function | ~1062 | 品阶名称 (绿·普通/蓝·稀有/紫·史诗/橙·传说/红·神话/金·传奇) |
| `x` | `getCarIcon` | function | ~1068 | 车辆图标 (大众/特斯拉/奥迪/奔驰/保时捷/兰博基尼) |
| `G` | `parseCarList` | function | ~1209 | 解析车辆列表 |
| `fe` | `fetchCarData` | async function | ~1238 | 获取赛车数据，API: `car_getrolecar` |
| `w` | `refreshCarGrade` | async function | ~1298 | 刷新品阶，API: `car_refresh` |
| `C` | `sendCar` | async function | ~1371 | 发车，API: `car_send` |
| `P` | `canCollect` | function | ~1446 | 判断是否可收车（需超过4小时） |
| `z` | `formatRemainingTime` | function | ~1475 | 格式化剩余时间 |
| `ve` | `getCarActionText` | function | ~1484 | 获取操作按钮文本 (收车/发车) |
| `N` | `collectCar` | async function | ~1497 | 一键收车 |
| `X` | `smartSendCar` | async function | ~1518 | 智能发车 |
| `R` | `getGuardStatus` | function | ~1653 | 护卫状态 (未携带/可携带) |
| `M` | `setGuard` | async function | ~1662 | 设置护卫 |

---

## 15. 通用工具函数映射

| minified名 | 源码名 | 类型 | 位置(行号) | 说明 |
|---|---|---|---|---|
| `Y` | `ref` | function | 全局 | Vue `ref()` |
| `O` | `computed` | function | 全局 | Vue `computed()` |
| `ft` | `reactive` | function | 全局 | Vue `reactive()` |
| `It` | `useMessage` | function | 全局 | Naive UI `useMessage()` |
| `_t` | `useTokenStore` | function | 全局 | Pinia `useTokenStore()` |
| `zr` | `useDialog` | function | 全局 | Naive UI `useDialog()` |
| `zu` | `useLegionWarStore` | function | 全局 | Pinia `useLegionWarStore()` |
| `xt` | `onMounted` | function | 全局 | Vue `onMounted()` |
| `jA` | `onUnmounted` | function | 全局 | Vue `onUnmounted()` |
| `wt` | `watch` | function | 全局 | Vue `watch()` |
| `EA` | `nextTick` | function | 全局 | Vue `nextTick()` |
| `gA` | `html2canvas` | function | 全局 | html2canvas库 |
| `yA` | `downloadImage` / `saveAs` | function | 全局 | 下载图片/文件 |
| `g` | `withCtx` | function | 全局 | Vue `withCtx()` |
| `d` | `createVNode` / `h` | function | 全局 | Vue渲染函数 |
| `D` | `createTextVNode` | function | 全局 | Vue文本节点 |
| `a` | `toDisplayString` | function | 全局 | Vue显示字符串 |
| `l` | `openBlock` | function | 全局 | Vue编译辅助 |
| `u` | `createElementBlock` | function | 全局 | Vue编译辅助 |
| `Re` | `createBlock` | function | 全局 | Vue编译辅助 |
| `de` | `createCommentVNode` | function | 全局 | Vue注释节点 |
| `Se` | `renderList` | function | 全局 | Vue列表渲染 |
| `Te` | `normalizeClass` | function | 全局 | Vue类名规范化 |
| `pt` | `normalizeStyle` | function | 全局 | Vue样式规范化 |
| `$e` | `resolveComponent` | function | 全局 | Vue组件解析 |
| `E` | `unref` | function | 全局 | Vue `unref()` |
| `it` | `h` (render function) | function | 全局 | Vue渲染函数 |
| `Ft` | `_defineComponent` + scopeId | function | 全局 | SFC组件定义+样式隔离 |
| `Jr` | `getCurrentBattlefieldId` | function | 全局 | 获取当前战场ID |
| `hl` | `formatDateTime` | function | 全局 | 日期时间格式化 |
| `ls` | `HeroFillInfo` / `processPearlInfo` | function | 全局 | 处理鱼灵信息 |
| `Po` | `getLineupType` | function | 全局 | 获取阵容类型 |
| `ei` | `LINEUP_RULES` | array | 全局 | 阵容规则 |
| `Jt` | `legacycolor` | array | 全局 | 传承颜色 |
| `jt` | `HERO_DICT` | object | 全局 | 英雄字典 |
| `Zr` | `useLegionWarStore` 解构 | function | 全局 | store解构辅助 |

---

## 16. 物品ID映射表 (ItemId → 物品名)

| minified代码中的itemId | 物品名 | 位置(行号) |
|---|---|---|
| 1001 | 招募令 | ~1086 |
| 1003 | 进阶石 | ~1087 |
| 1006 | 精铁 | ~1088 |
| 1007 | 竞技场门票 | ~1089 |
| 1008 | 木柴火把 | ~1090 |
| 1009 | 青铜火把 | ~1091 |
| 1010 | 咸神火把 | ~1092 |
| 1011 | 普通鱼竿 | ~1093 |
| 1012 | 黄金鱼竿 | ~1094 |
| 1013 | 珍珠 | ~1095 |
| 1014 | 军团币 | ~1096 |
| 1016 | 晶石 | ~1097 |
| 1017 | 复活丹 | ~1098 |
| 1019 | 盐靛 | ~1099 |
| 1020 | 皮肤币 | ~1100 |
| 1021 | 扫荡魔毯 | ~1101 |
| 1022 | 白玉 | ~1102 |
| 1023 | 彩玉 | ~1103 |
| 1026 | 扳手 | ~1104 |
| 1033 | 贝壳 | ~1105 |
| 1035 | 金盐靛 | ~1106 |
| 10002 | 蓝玉 | ~1107 |
| 10003 | 红玉 | ~1108 |
| 10101 | 四圣碎片 | ~1109 |
| 2001 | 木制宝箱 | ~1110 |
| 2002 | 青铜宝箱 | ~1111 |
| 2003 | 黄金宝箱 | ~1112 |
| 2004 | 铂金宝箱 | ~1113 |
| 2005 | 钻石宝箱 | ~1114 |
| 2101 | 助威币 | ~1115 |
| 3001 | 金币袋子 | ~1116 |
| 3002 | 金砖袋子 | ~1117 |
| 3005 | 紫色随机碎片 | ~1118 |
| 3006 | 橙色随机碎片 | ~1119 |
| 3007 | 红色随机碎片 | ~1120 |
| 3008 | 精铁袋子 | ~1121 |
| 3009 | 进阶袋子 | ~1122 |
| 3010 | 梦魇袋子 | ~1123 |
| 3011 | 白玉袋子 | ~1124 |
| 3012 | 扳手袋子 | ~1125 |
| 3020 | 聚宝盆 | ~1126 |
| 3021 | 豪华聚宝盆 | ~1127 |
| 3201 | 红色万能碎片 | ~1128 |
| 3302 | 橙色万能碎片 | ~1129 |
| 35002 | 刷新券 | ~1130 |
| 35009 | 零件 | ~1131 |

---

## 17. API命令映射

| minified代码中的API字符串 | 源码对应 | 用途 | 位置(行号) |
|---|---|---|---|
| `legion_getinfo` | `legion_getinfo` | 获取俱乐部信息 | ~10405, ~12685 |
| `legion_getinfobyid` | `legion_getinfobyid` | 按ID获取俱乐部信息 | ~26538, ~33936 |
| `legion_getbattlefield` | `legion_getbattlefield` | 获取盐场战场信息 | ~26501 |
| `legion_getopponent` | `legion_getopponent` | 获取盐场对手 | ~26506 |
| `league_getbattlefield` | `league_getbattlefield` | 联赛获取战场(2026年3月特殊) | ~26500 |
| `league_getgroupopponent` | `league_getgroupopponent` | 联赛获取对手 | ~26506 |
| `legion_getpayloadtask` | `legion_getpayloadtask` | 获取蟠桃对战任务 | ~33905 |
| `legion_getpayloadrecord` | `legion_getpayloadrecord` | 获取蟠桃对战记录 | ~33916 |
| `legion_getpayloadkillrecord` | `legion_getpayloadkillrecord` | 获取蟠桃击杀记录 | ~33948 |
| `rank_getroleinfo` | `rank_getroleinfo` | 获取角色信息 | ~11903, ~12060, ~26566 |
| `legion_signin` | `legion_signin` | 俱乐部签到 | ~12636 |
| `legion_applylist` | `legion_applylist` | 获取申请列表 | ~12456 |
| `legion_agree` | `legion_agree` | 通过申请 | ~12471 |
| `legion_ignore` | `legion_ignore` | 拒绝申请 | ~12481 |
| `legion_kickout` | `legion_kickout` | 踢出成员 | ~12433 |
| `legionwar_getdetails` | `legionwar_getdetails` | 获取盐场详情 | ~29375, ~31856 |
| `legionwar_getgoldmonthwarrank` | `legionwar_getgoldmonthwarrank` | 获取金月赛排名 | ~44679, ~44823 |
| `car_getrolecar` | `car_getrolecar` | 获取赛车数据 | ~1249 |
| `car_refresh` | `car_refresh` | 刷新赛车品阶 | ~1317 |
| `car_send` | `car_send` | 发车 | ~1398 |
| `car_getmemberrank` | `car_getmemberrank` | 获取赛车积分排名 | ~11363 |
| `evotower_getlegionjoinmembers` | `evotower_getlegionjoinmembers` | 获取怪异塔成员 | ~10866 |
| `presetteam_getinfo` | `presetteam_getinfo` | 获取阵容信息 | ~15702 |
| `presetteam_saveteam` | `presetteam_saveteam` | 保存/切换阵容 | ~15736 |
| `role_getroleinfo` | `role_getroleinfo` | 获取角色基础信息 | ~1256, ~12637, ~16290 |
| `fight_startpvp` | `fight_startpvp` | 开始切磋 | 源码中有 |
| `legionmatch_rolesignup` | `legionmatch_rolesignup` | 俱乐部排位报名 | 源码中有 |

---

## 18. 战斗类型映射 (legionWarType)

| 值 | minified中的中文名 | 位置(行号) |
|---|---|---|
| 6 | 夺旗赛 | ~10388 |
| 15 | 灰岩岛 | ~10366 |
| 16 | 进阶周赛 | ~10368 |
| 17 | 进阶月赛 | ~10370 |
| 18 | 青铜周赛 | ~10372 |
| 19 | 青铜月赛 | ~10374 |
| 20 | 秘蓝周赛 | ~10376 |
| 21 | 秘蓝月赛 | ~10378 |
| 22 | 月宫周赛 | ~10380 |
| 23 | 月宫月赛 | ~10382 |
| 24 | 天宫周赛 | ~10384 |
| 25 | 天宫月赛 | ~10386 |
| default | 伟大航路 | ~10390 |

---

## 19. 切磋相关 (已删除功能)

源码文件: `cards/FightPvp.vue` (在minified中仍有残留)

| minified名 | 源码名 | 类型 | 说明 |
|---|---|---|---|
| `Xv` | `FightPvp` | component | 切磋系统组件，在GameStatus中通过 `n.value === "fightPvp"` 条件渲染 |
| `targetId` | `targetId` | ref | 对手ID输入 |
| `fightNum` | `fightNum` / `fightCount` | ref | 切磋次数 |
| `loading1` | `loading1` | ref | 加载状态 |
| `memberData` | `memberData` | ref | 对手信息 |
| `fightProgress` | `fightProgress` | ref | 切磋进度 |
| `fightResult` | `fightResult` | ref | 切磋结果 |

> 注：切磋Tab在GameStatus中仍有入口 `d(U, { name: "fightPvp", tab: "切磋" })` (行~61465)，但功能可能已部分删除或简化。

---

## 20. 碎片系统 (新增)

在IdentityCard的资源列表中新增了以下碎片相关物品：

| minified变量 | 物品名 | itemId | 位置(行号) |
|---|---|---|---|
| `fe` | 四圣宝珠碎片 | 10101 | ~16134, ~16223 |
| `P` | 紫色随机碎片 | 3005 | ~16137, ~16226 |
| `ue` | 橙色随机碎片 | 3006 | ~16138, ~16227 |
| `ve` | 红色随机碎片 | 3007 | ~16139, ~16228 |
| `ge` | 红色万能碎片 | 3201 | ~16147, ~16236 |
| `J` | 橙色万能碎片 | 3302 | ~16148, ~16237 |

---

## 21. 月赛系统 (新增)

盐场匹配中新增了月赛相关类型：

| legionWarType | 名称 | 位置(行号) | 说明 |
|---|---|---|---|
| 17 | 进阶月赛 | ~10370 | 新增月赛类型 |
| 19 | 青铜月赛 | ~10374 | 新增月赛类型 |
| 21 | 秘蓝月赛 | ~10378 | 新增月赛类型 |
| 23 | 月宫月赛 | ~10382 | 新增月赛类型 |
| 25 | 天宫月赛 | ~10386 | 新增月赛类型 |

API: `legionwar_getgoldmonthwarrank` (行~44679) 用于获取金月赛排名数据。

---

## 备注

1. **映射方法**: 主要通过中文字符串锚点（如"俱乐部历史盐场战绩"、"怪异塔"、"蟠桃园"等）在minified代码中定位对应代码段，然后通过代码结构（变量声明顺序、函数调用关系、API命令名）与源码进行交叉匹配。

2. **Vue编译模式**: SFC组件编译后，`<script setup>` 中的变量按声明顺序排列，`ref()` → `Y()`, `computed()` → `O()`, `reactive()` → `ft()`, `onMounted()` → `xt()`, `watch()` → `wt()` 等。

3. **组件编译**: 每个SFC组件编译为两个变量：原始组件对象（如 `Hp`）和添加了 `__scopeId` 的最终组件（如 `Ep = Ft(Hp, ...)`）。

4. **不确定性标记**: 部分映射可能存在一对多的情况（如同一minified名在不同组件中对应不同源码名），这是因为不同组件的setup函数作用域独立，变量名会重复使用。

# BatchDailyTasks 增量标记

> 目标文件: `/workspace/formatted_528/BatchDailyTasks-CDlX_GQ6.js`
> 开源源码: `/workspace/opensource/src/`
> 生成时间: 2026-05-28

---

## [新增] 函数列表

| 函数名 | 行号 | 功能描述 | 移植优先级 |
|--------|------|---------|-----------|
| `CrossPlatformStorage` | L752-794 | 跨平台存储管理器，支持 Tauri/Capacitor/Browser | P1-高 |
| `CrossPlatformStorage.set` | L753-759 | 异步设置存储项 | P1-高 |
| `CrossPlatformStorage.get` | L761-776 | 异步获取存储项 | P1-高 |
| `CrossPlatformStorage.remove` | L777-783 | 异步删除存储项 | P1-高 |
| `CrossPlatformStorage.clear` | L784-790 | 异步清空存储 | P1-高 |
| `CrossPlatformStorage.getEnvironment` | L791-793 | 获取运行环境类型 | P1-高 |
| `storage` | L795 | CrossPlatformStorage 单例实例 | P1-高 |
| `isTauri` | L750 | 检测是否为 Tauri 桌面环境 | P2-中 |
| `isCapacitor` | L751 | 检测是否为 Capacitor 移动环境 | P2-中 |
| `isWeekResetNeeded` (`re`) | L1212-1237 | 检查是否需要周重置（TokenCard内） | P2-中 |
| `startStarChallenge` (`le`) | L1635-1849 | 十殿星级挑战一键挑战（TokenCard内） | P1-高 |
| `loadStarChallengeData` (`He`) | L2193-2274 | 加载星级挑战数据（TokenCard内） | P1-高 |
| `fetchCarStatus` (`be`) | L1884-1903 | 获取赛车状态（TokenCard内） | P2-中 |
| `fetchArenaRank` (`_e`) | L1904-1942 | 获取竞技场排名（TokenCard内） | P2-中 |
| `startArenaFight` (`Oe`) | L1943-2079 | 竞技场单卡战斗（TokenCard内） | P2-中 |
| `claimLegacy` (`De`) | L2134-2192 | 领取功法残卷（TokenCard内） | P2-中 |
| `saveCardStatus` (`Y`) | L1131-1153 | 保存卡片状态到 CrossPlatformStorage | P1-高 |
| `restoreCardStatus` (`Z`) | L1154-1211 | 从 CrossPlatformStorage 恢复卡片状态 | P1-高 |
| `getStorageKey` (`z`) | L1130 | 生成存储键名 | P1-高 |

## [修改] 函数列表

| 函数名 | 行号 | 修改内容 | 开源版本 | 目标版本 |
|--------|------|---------|---------|---------|
| `createCarManager` | L250-666 | 新增 smartSendCar/claimCars 方法，内部逻辑增强 | 简单车辆操作管理 | 含智能发车、一键收车完整逻辑 |
| `smartSendCar` | L258-509 | 从开源简单发车逻辑重构为智能发车 | 基础发车 | 智能选择车辆+护卫+刷新策略 |
| `claimCars` | L510-665 | 新增一键收车功能 | 无独立收车方法 | 完整收车逻辑含4小时判断 |
| `pickArenaTargetId` | L679-749 | 增强目标选择逻辑 | 简单取第一个目标 | 按战力排序选择最弱目标 |
| `updateCardFromGameData` (`ue`) | L1324-1578 | 大幅扩展卡片状态更新逻辑 | 基础游戏数据更新 | 新增赛车/爬塔/怪异塔/宝库/星级挑战等状态 |
| `runDailyTaskCompletion` (`Ve`) | L2292-2426 | 补齐每日任务逻辑增强 | 基础补差 | 支持更多任务类型 |
| `resetBottle` (`Ie`) | L2427-2477 | 盐罐重置逻辑增强 | 基础重置 | 增加状态判断 |
| `batchStudy` (`xe`) | L2478- | 答题逻辑增强 | 基础答题 | 支持更多答题场景 |
| `connectionText` (`J`) | L986 | 连接状态文本映射 | 简单文本 | "已连接"/"未连接" 中文映射 |
| `GENIE_DAY_MAP` (`ae`) | L1257-1265 | 灯神开放日映射 | 内联判断 | 独立常量映射表 |
| `availableGenieIds` (`G`) | L1266 | 可用灯神ID列表 | 无独立计算 | 基于GENIE_DAY_MAP计算 |
| `isTowerActivityValid` (`L`) | L1267-1279 | 宝库活动有效性判断 | 无独立判断 | 新增活动有效期判断 |
| `isGenieAvailable` (`m`) | L1280 | 灯神可用判断 | 无独立判断 | 新增灯神可用性判断 |
| `isFloorCleared` (`u`) | L1281-1284 | 宝库楼层通关判断 | 无独立判断 | 新增楼层通关判断 |
| `getMaxClearedFloor` (`l`) | L1286-1294 | 获取最大通关楼层 | 无独立方法 | 新增最大通关楼层获取 |
| `weirdTowerData` (`$`) | L1099-1106 | 怪异塔数据结构 | 无 | 新增怪异塔数据含lotteryLeftCnt |
| `towerInfo` (`T`) | L1113-1120 | 宝库信息结构 | 无 | 新增宝库信息含actId/levelRewardMap |
| `studyStatus` (`M`) | L1121-1129 | 答题状态结构 | 无 | 新增答题状态含isAnswering/questionCount |
| `carStatus` (`p`) | L1070-1079 | 车辆状态结构 | 无 | 新增车辆状态含freeRaidCnt/successRaidCnt |
| `legacyStatus` (`g`) | L1080 | 功法状态结构 | 无 | 新增功法状态 |
| `starChallengeTotalStars` (`n`) | L1081 | 星级挑战总星数 | 无 | 新增星级挑战数据 |
| `isStarChallengeRunning` (`S`) | L1082 | 星级挑战运行状态 | 无 | 新增星级挑战运行状态 |
| `arenaRank` (`v`) | L1083 | 竞技场排名 | 无 | 新增竞技场排名数据 |
| `isArenaFighting` (`C`) | L1084 | 竞技场战斗状态 | 无 | 新增竞技场战斗状态 |
| `towerData` (`V`) | L1085-1092 | 爬塔数据结构 | 无 | 新增爬塔数据含maxFloor/energy |
| `monthlyTask` (`ie`) | L1049-1055 | 月度任务数据 | 无 | 新增月度任务含fish/arena目标 |

## [共享] 函数列表（跳过，无需移植）

| 函数名 | 行号 | 说明 |
|--------|------|------|
| `normalizeCars` | L149-171 | 标准化车辆数据，逻辑与开源 carUtils.js 一致 |
| `gradeLabel` | L172-180 | 获取品质标签，逻辑与开源一致 |
| `bigPrizes` | L181-189 | 大奖配置，与开源一致 |
| `isBigPrize` | L190-200 | 判断是否大奖，与开源一致 |
| `countRacingRefreshTickets` | L201-208 | 计算赛车刷新票数量，与开源一致 |
| `checkRewardConditions` | L209-232 | 检查奖励条件，与开源一致 |
| `shouldSendCar` | L233-243 | 判断是否应发车，与开源一致 |
| `canClaim` | L244-249 | 判断是否可收取，与开源一致 |
| `FOUR_HOURS_MS` | L148 | 4小时毫秒数常量，与开源一致 |
| `getTodayStartSec` | L667-670 | 获取今日开始时间戳，与开源一致 |
| `isTodayAvailable` | L671-672 | 检查今日是否可用，与开源一致 |
| `calculateMonthProgress` | L673-678 | 计算月度任务进度，与开源一致 |
| `Link` (SVG) | L98-106 | 链接图标组件，标准SVG |
| `Unlink` (SVG) | L139-147 | 断开链接图标组件，标准SVG |
| `formatTime` (`We`) | L2124-2133 | 格式化时间显示，基础逻辑一致 |
| `getProgressColor` (`Ee`) | L2275-2282 | 获取进度条颜色，逻辑一致 |
| `handleSelect` (`Pe`) | L2283-2285 | 处理选择事件，逻辑一致 |
| `handleSettings` (`fe`) | L2286-2288 | 处理设置事件，逻辑一致 |
| `handleToggleConnection` (`Ne`) | L2289-2291 | 处理连接切换，逻辑一致 |
| `clearLogs` (`E`) | L1299-1301 | 清空日志，逻辑一致 |
| `scrollToBottom` (`O`) | L1302-1304 | 滚动到底部，逻辑一致 |
| `handleScroll` (`oe`) | L1305-1312 | 处理滚动事件，逻辑一致 |
| `addLog` (`R`) | L1313-1323 | 添加日志，逻辑一致 |
| `STORAGE_KEY_PREFIX` | L897 | 存储键前缀常量 |
| `gameData` (`P`) | L970 | 游戏数据 computed，逻辑一致 |
| `isConnected` (`A`) | L971-973 | WebSocket 连接状态，逻辑一致 |
| `isConnecting` (`K`) | L975-981 | WebSocket 连接中状态，逻辑一致 |
| `statusClasses` (`ee`) | L982-985 | 状态CSS类名，逻辑一致 |
| `isRunning` (`F`) | L987 | Token运行状态，逻辑一致 |
| `lastRefreshTime` (`H`) | L988-992 | 最后刷新时间，逻辑一致 |
| `studyInfo` (`W`) | L993-1008 | 答题信息，逻辑一致 |
| `mergedStudyStatus` (`te`) | L1010-1040 | 合并答题状态，逻辑一致 |
| `saltJar` (`Q`) | L1041 | 盐罐状态，逻辑一致 |
| `hangUp` (`I`) | L1042-1047 | 挂机状态，逻辑一致 |
| `dailyTask` (`j`) | L1048 | 每日任务进度，逻辑一致 |
| `isTowerExpanded` (`q`) | L1056 | 爬塔展开状态，逻辑一致 |
| `isCarExpanded` (`U`) | L1057 | 车辆展开状态，逻辑一致 |
| `tokenGroups` (`X`) | L1249-1255 | Token分组，逻辑一致 |
| `logs` (`f`) | L1295 | 日志列表，逻辑一致 |
| `logContainer` (`_`) | L1296 | 日志容器DOM，逻辑一致 |
| `isLogExpanded` (`k`) | L1297 | 日志展开状态，逻辑一致 |
| `autoScrollLog` (`x`) | L1298 | 自动滚动日志标志，逻辑一致 |
| `isDragging` (`d`) | L930 | 拖拽状态，逻辑一致 |

## [删除] 函数列表

| 函数名 | 行号 | 说明 |
|--------|------|------|
| 无 | - | 开源源码中的函数在目标中均有对应（部分被重构合并） |

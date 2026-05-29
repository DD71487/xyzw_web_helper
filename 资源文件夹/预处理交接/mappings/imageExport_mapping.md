# imageExport 模块 Minified→源码 变量名映射表

> 源码文件：
> - `/workspace/opensource/src/utils/imageExport.js` — 图片导出
> - `/workspace/opensource/src/utils/dailyTaskRunner.js` — 每日任务
> - `/workspace/opensource/src/utils/HeroList.js` — 武将/鱼灵/鱼珠数据
> - `/workspace/opensource/src/utils/dreamConstants.js` — 商人/梦境配置
>
> 目标文件：`/workspace/formatted_528/imageExport-BfNAYNiL.js`

---

## 一、导出映射（export 语句）

| minified名 | 源码名 | 类型 | 位置 | 说明 |
|---|---|---|---|---|
| `ne` (export as `D`) | `DailyTaskRunner` | class | dailyTaskRunner.js:46 | 每日任务执行器类 |
| `V` (export as `F`) | `FishMap` | object | HeroList.js:173 | 鱼灵名称字典 |
| `ce` (export as `H`) | `HeroFillInfo` | function | HeroList.js:294 | 提取鱼灵和鱼珠信息 |
| `J` (export as `L`) | `LINEUP_RULES` | array | HeroList.js:68 | 阵容预设规则 |
| `B` (export as `P`) | `PearlMap` | object | HeroList.js:159 | 鱼珠技能字典 |
| `se` (export as `a`) | `HERO_DICT` | object | HeroList.js:2 | 武将字典 |
| `fe` (export as `b`) | `goldItemsConfig` | object | dreamConstants.js:44 | 金币购买商品配置 |
| `he` (export as `c`) | `LEGION_TECH_TYPE_NAME` | object | HeroList.js:436 | 军团科技职业名称 |
| `ye` (export as `d`) | `downloadCanvasAsImage` | function | imageExport.js:7 | Canvas导出为图片 |
| `le` (export as `e`) | `LEGION_TECH_TYPE_MAP` | object | HeroList.js:418 | 军团科技按职业分组 |
| `oe` (export as `f`) | `formatWeapon` | function | HeroList.js:285 | 根据ID获取道具名称 |
| `re` (export as `g`) | `getLineupType` | function | HeroList.js:127 | 阵容类型识别 |
| `ue` (export as `h`) | `LEGION_TECH_NAME` | object | HeroList.js:445 | 军团科技技能名称 |
| `ge` (export as `i`) | `isDungeonOpen` | function | dreamConstants.js:51 | 咸王梦境开放判断 |
| `me` (export as `j`) | `LEGION_TECH_MAX_LEVEL` | object | HeroList.js:331 | 军团科技最大等级 |
| `Q` (export as `k`) | `color` | object | HeroList.js:252 | 洗练颜色定义 |
| `ie` (export as `l`) | `legacycolor` | object | HeroList.js:275 | 段位定义 |
| `pe` (export as `m`) | `merchantConfig` | object | dreamConstants.js:2 | 商人配置 |
| `de` (export as `n`) | `LEGION_TECH_RESET_TYPE_MAP` | object | HeroList.js:427 | 军团科技重置分组 |
| `we` (export as `o`) | `downloadFile` | function | imageExport.js(新增) | 通用文件下载（新增） |
| `ee` (export as `w`) | `weapon` | object | HeroList.js:261 | 道具名称字典 |

---

## 二、模块级常量与辅助函数

### 2.1 游戏配置常量

| minified名 | 源码名 | 类型 | 位置 | 说明 |
|---|---|---|---|---|
| `R` | `RECRUIT_TYPE` (推断) | object | 新增常量 | `{ FREE: 3, PAID: 1 }` 招募类型，源码中为内联字面量 |
| `_` | `BOX_TYPE` (推断) | object | 新增常量 | `{ DIAMOND: {id:2005,name:"钻石宝箱"}, WOODEN: {id:2001,name:"木质宝箱"}, BRONZE: {id:1,name:"青铜宝箱"} }` |
| `y` | `ARENA_CONFIG` (推断) | object | 新增常量 | `{ START_HOUR: 6, END_HOUR: 22, MAX_FIGHTS: 3 }` 竞技场配置 |
| `b` | `CARD_TYPE` (推断) | object | 新增常量 | `{ WEEKLY: 4001, MONTHLY: 4002, PERMANENT: 4003 }` 卡片类型 |
| `G` | `GENIE_COUNT` (推断) | number | 新增常量 | `4` — 灯神国家数量(魏蜀吴群) |
| `A` | `FREE_FISH_COUNT` (推断) | number | 新增常量 | `3` — 免费钓鱼次数 |
| `O` | `FREE_SWEEP_COUNT` (推断) | number | 新增常量 | `3` — 免费扫荡卷次数 |
| `F` | `FREE_GOLD_COUNT` (推断) | number | 新增常量 | `3` — 免费点金次数 |
| `S` | `ADD_TIME_COUNT` (推断) | number | 新增常量 | `4` — 挂机加钟次数 |
| `q` | `DAILY_TASK_COUNT` (推断) | number | 新增常量 | `10` — 每日任务奖励数量 |
| `X` | `DUNGEON_OPEN_DAYS` (推断) | array | 新增常量 | `[0, 1, 3, 4]` — 咸王梦境开放日(周日/一/三/四) |

### 2.2 错误处理相关（新增，源码中无对应）

| minified名 | 源码名 | 类型 | 位置 | 说明 |
|---|---|---|---|---|
| `D` | `ERROR_CODE_MAP` (推断) | Map | 新增 | 错误码→中文消息映射，如 "400010"→"数量不足" |
| `P` | `CONTEXT_ERROR_MAP` (推断) | object | 新增 | 按模块分类的错误消息，如 dreamWorld/arena/blackMarket 等 |
| `C` | `extractErrorCode` (推断) | function | 新增 | 从错误对象中提取6-7位数字错误码 |
| `$` | `getErrorMessage` (推断) | function | 新增 | 获取友好的错误消息，优先查上下文映射再查通用映射 |
| `N` | `isKnownError` (推断) | function | 新增 | 判断错误是否为已知业务错误(可静默处理) |
| `U` | `isConnectionError` (推断) | function | 新增 | 判断是否为连接错误(含"连接"或"WebSocket") |

### 2.3 辅助函数

| minified名 | 源码名 | 类型 | 位置 | 说明 |
|---|---|---|---|---|
| `p` | `delay` (推断) | function | 新增 | `(s) => new Promise(e => setTimeout(e, s))` 延时函数 |
| `x` | `randomDelay` (推断) | function | 新增 | `(s, e) => p(s + Math.random() * (e - s))` 随机延时 |
| `v` | `isTodayAvailable` | function | dailyTaskRunner.js:29 | 判断时间戳是否为今天（已重置） |
| `Y` | `getTodayBossId` | function | dailyTaskRunner.js:40 | 获取今日BOSS ID |
| `j` | `isDungeonOpenDay` (推断) | function | 新增 | 判断今天是否为梦境开放日，等价于 `X.includes(new Date().getDay())` |
| `f` | `getNestedValue` (推断) | function | 新增 | 深层属性访问器，如 `f(obj, "info.roleId")` |
| `z` | `extractTargetList` (推断) | function | 新增 | 从目标数据中提取列表，兼容 rankList/roleList/targets/targetList/list |
| `L` | `normalizeTarget` (推断) | function | 新增 | 标准化目标对象 `{targetId, targetName, targetRank, targetPower}` |
| `K` | `compareByPower` (推断) | function | 新增 | 按战力排序比较函数 |

### 2.4 默认设置

| minified名 | 源码名 | 类型 | 位置 | 说明 |
|---|---|---|---|---|
| `I` | `defaultSettings` | object | dailyTaskRunner.js:155-167 | 默认任务设置，新增 `blackMarketStandalonePurchase: false` |

---

## 三、DailyTaskRunner 类（`ne`）方法映射

### 3.1 类属性

| minified名 | 源码名 | 类型 | 位置 | 说明 |
|---|---|---|---|---|
| `this.tokenStore` | `this.tokenStore` | property | dailyTaskRunner.js:48 | Token存储 |
| `this.delaySettings` | `this.delaySettings` | property | dailyTaskRunner.js:49 | 延时设置 |
| `this.callbacks` | `this.callbacks` | property | dailyTaskRunner.js:56 | 回调函数集合 |
| `this.settings` | `this.settings` | property | 新增 | 当前运行设置 |
| `this.tokenId` | `this.tokenId` | property | 新增 | 当前Token ID |
| `this.originalFormation` | `originalFormation` | local var | dailyTaskRunner.js:203 | 原始阵容ID |

### 3.2 日志方法

| minified名 | 源码名 | 类型 | 位置 | 说明 |
|---|---|---|---|---|
| `log(e, t)` | `log(message, type)` | method | dailyTaskRunner.js:55 | 通用日志，参数 `e`=message, `t`=type |
| `success(e)` | — (新增) | method | 新增 | `this.log(e, "success")` |
| `warn(e)` | — (新增) | method | 新增 | `this.log(e, "warning")` |
| `error(e)` | — (新增) | method | 新增 | `this.log(e, "error")` |
| `info(e)` | — (新增) | method | 新增 | `this.log(e, "info")` |

### 3.3 连接管理方法（新增）

| minified名 | 源码名 | 类型 | 位置 | 说明 |
|---|---|---|---|---|
| `isConnected()` | — (新增) | method | 新增 | 检查WebSocket连接状态 |
| `ensureConnection(e)` | — (新增) | method | 新增 | 确保连接可用，最多重试3次，参数 `e`=retryCount |

### 3.4 命令发送方法

| minified名 | 源码名 | 类型 | 位置 | 说明 |
|---|---|---|---|---|
| `sendCommand(e, t, a)` | `executeGameCommand` (增强版) | method | dailyTaskRunner.js:65 | 发送游戏命令，参数 `e`=cmd, `t`=params, `a`={description,timeout,context,silentErrors,retryCount} |
| `sendCommandSafe(e, t, a)` | — (新增) | method | 新增 | 静默错误版 sendCommand，已知业务错误不抛异常 |

### 3.5 阵容管理方法

| minified名 | 源码名 | 类型 | 位置 | 说明 |
|---|---|---|---|---|
| `getCurrentFormation()` | — (从run中提取) | method | 新增 | 获取当前阵容ID，调用 `presetteam_getinfo` |
| `switchFormation(e)` | — (从switchToFormationIfNeeded中提取) | method | 新增 | 切换阵容，参数 `e`=teamId，调用 `presetteam_saveteam` |
| `switchFormationIfNeeded(e, t)` | `switchToFormationIfNeeded(tokenId, formationName)` | method | dailyTaskRunner.js:93 | 条件切换阵容，参数 `e`=targetFormation, `t`=formationName |
| `restoreFormation()` | — (新增) | method | 新增 | 恢复原始阵容 |

### 3.6 任务构建方法（从 run() 中提取）

| minified名 | 源码名 | 类型 | 位置 | 说明 |
|---|---|---|---|---|
| `buildBasicTasks(e, t, a)` | — (从run中提取) | method | 新增 | 基础任务(分享/招募/点金/挂机/开箱)，参数 `e`=completedTasks, `t`=statistics, `a`=statisticsTime |
| `buildSaltBottleTasks(e)` | — (从run中提取) | method | 新增 | 盐罐任务，参数 `e`=completedTasks |
| `buildArenaTask()` | — (从run中提取) | method | 新增 | 竞技场任务 |
| `executeArenaFight(e)` | — (从run中提取) | method | 新增 | 执行单次竞技场战斗，参数 `e`=fightIndex |
| `buildBossTasks(e, t)` | — (从run中提取) | method | 新增 | BOSS任务(军团BOSS+每日BOSS)，参数 `e`=statistics, `t`=statisticsTime |
| `buildFixedRewardTasks()` | — (从run中提取) | method | 新增 | 固定奖励(签到/礼包/珍宝阁等) |
| `buildActivityTasks(e, t)` | — (从run中提取) | method | 新增 | 活动任务(钓鱼/灯神/扫荡卷)，参数 `e`=statistics, `t`=statisticsTime |
| `buildBlackMarketTask()` | — (从run中提取) | method | 新增 | 黑市购买任务 |
| `buildDreamWorldTask()` | — (从run中提取) | method | 新增 | 咸王梦境任务 |
| `buildDeepSeaLampTask(e)` | — (从run中提取) | method | 新增 | 深海灯神任务，参数 `e`=statisticsTime |
| `buildRewardTasks()` | — (从run中提取) | method | 新增 | 任务奖励(日常/周常/通行证) |

### 3.7 其他方法

| minified名 | 源码名 | 类型 | 位置 | 说明 |
|---|---|---|---|---|
| `tryOpenBox(e, t)` | — (新增) | method | 新增 | 尝试开箱，参数 `e`=itemId, `t`=boxName |
| `fetchRoleData()` | — (从run中提取) | method | 新增 | 获取角色数据，含连接重试逻辑 |
| `getHangUpStatus(e)` | — (新增) | method | 新增 | 获取挂机状态详情，参数 `e`={checkAddTime,thresholdSeconds,maxHangUpTime} |
| `formatTime(e)` | — (新增) | method | 新增 | 格式化秒数为中文时间，如 "1小时30分钟15秒"，参数 `e`=seconds |
| `checkActivity(e)` | — (新增) | method | 新增 | 检查活跃度是否已满，参数 `e`=roleData |
| `loadSettings(e)` | `loadSettings(roleId)` | method | dailyTaskRunner.js:152 | 加载设置，参数 `e`=roleId |

### 3.8 主运行方法

| minified名 | 源码名 | 类型 | 位置 | 说明 |
|---|---|---|---|---|
| `run(e, t, a)` | `run(tokenId, callbacks, customSettings)` | method | dailyTaskRunner.js:175 | 主运行方法，参数 `e`=tokenId, `t`=callbacks, `a`=customSettings |

---

## 四、DailyTaskRunner 类方法内部变量映射

### 4.1 run() 方法内部变量

| minified名 | 源码名 | 类型 | 位置 | 说明 |
|---|---|---|---|---|
| `r` | `roleData` | local var | dailyTaskRunner.js:190 | 角色数据 |
| `n` | `completedTasks` | local var | dailyTaskRunner.js:218 | 已完成任务 `roleData.dailyTask?.complete` |
| `i` | `statistics` | local var | dailyTaskRunner.js:220 | 统计数据 `roleData.statistics` |
| `o` | `statisticsTime` | local var | dailyTaskRunner.js:221 | 统计时间 `roleData.statisticsTime` |
| `m` | `taskList` | local var | dailyTaskRunner.js:223 | 任务列表 |
| `l` | `totalTasks` | local var | dailyTaskRunner.js:718 | 任务总数 |

### 4.2 sendCommand() 方法内部变量

| minified名 | 源码名 | 类型 | 位置 | 说明 |
|---|---|---|---|---|
| `r` | `description` | local var | — | 命令描述 |
| `n` | `timeout` | local var | — | 超时时间 |
| `i` | `context` | local var | — | 上下文(模块名) |
| `o` | `silentErrors` | local var | — | 是否静默错误 |
| `c` | `retryCount` | local var | — | 重试次数 |
| `m` | `MAX_RETRIES` | const | — | 最大重试次数 `3` |

### 4.3 buildBasicTasks() 方法内部变量

| minified名 | 源码名 | 类型 | 位置 | 说明 |
|---|---|---|---|---|
| `r` | `tasks` | local var | — | 任务数组 |
| `n` | `isTaskCompleted` | function | dailyTaskRunner.js:219 | `(o) => e[o] === -1` |
| `i` | `isTodayAvailable` | function | — | `(o) => v(a[o])` |

### 4.4 buildBossTasks() 方法内部变量

| minified名 | 源码名 | 类型 | 位置 | 说明 |
|---|---|---|---|---|
| `r` | `alreadyLegionBoss` | local var | dailyTaskRunner.js:429 | 军团BOSS已完成次数 |
| `n` | `remainingLegionBoss` | local var | dailyTaskRunner.js:433 | 军团BOSS剩余次数 |
| `i` | `dailyBossCount` | local var | — | 每日BOSS已完成次数 |
| `o` | `formationSwitched` | local var | — | 是否切换了阵容 |

### 4.5 executeArenaFight() 方法内部变量

| minified名 | 源码名 | 类型 | 位置 | 说明 |
|---|---|---|---|---|
| `t` | `targets` | local var | dailyTaskRunner.js:391 | 竞技场目标数据 |
| `a` | `roleInfo` | local var | — | 角色阵容信息 |
| `r` | `bestTarget` | local var | — | 最优目标(战力最低) |

### 4.6 getHangUpStatus() 方法内部变量

| minified名 | 源码名 | 类型 | 位置 | 说明 |
|---|---|---|---|---|
| `t` | `checkAddTime` | param | — | 是否检查加钟 |
| `a` | `thresholdSeconds` | param | — | 阈值秒数 |
| `r` | `maxHangUpTime` | param | — | 最大挂机时间 |
| `n` | `roleData` | local var | — | 角色数据 |
| `i` | `hangUp` | local var | — | 挂机数据 |
| `o` | `now` | local var | — | 当前时间戳(秒) |
| `c` | `lastTime` | local var | — | 上次领取时间 |
| `m` | `hangUpTime` | local var | — | 挂机总时长 |
| `l` | `elapsed` | local var | — | 已经过时间 |
| `d` | `isActive` | local var | — | 挂机是否进行中 |
| `u` | `remainingTime` | local var | — | 剩余时间 |
| `w` | `elapsedTime` | local var | — | 已挂机时长 |
| `k` | `progress` | local var | — | 进度百分比 |
| `g` | `needAddTime` | local var | — | 是否需要加钟 |
| `h` | `addTimeMessage` | local var | — | 加钟提示消息 |

### 4.7 buildBlackMarketTask() 方法内部变量

| minified名 | 源码名 | 类型 | 位置 | 说明 |
|---|---|---|---|---|
| `i` | `result` | local var | — | 购买结果 |
| `e,t,a,r,n` | `buyList,goodsList,items,reward,rewards` | local var | — | 结果中的各列表字段 |

---

## 五、图片导出函数映射

| minified名 | 源码名 | 类型 | 位置 | 说明 |
|---|---|---|---|---|
| `ye` | `downloadCanvasAsImage` | function | imageExport.js:7 | 主导出函数，改为Promise风格 |
| `H` | `downloadBlob` | function | imageExport.js:44 | Blob下载，增加了MouseEvents兼容 |
| `M` | `fallbackToDataURL` | function | imageExport.js:64 | DataURL回退下载，增加了MouseEvents兼容 |
| `W` | `downloadInApk` (推断) | function | 新增 | ⚠️ Capacitor APK环境下载，需替换 |
| `we` | `downloadFile` | function | 新增 | 通用文件下载，自动判断Capacitor/Web环境 |

### 5.1 Capacitor 相关代码（标记为需替换）

| 位置 | 代码 | 说明 |
|---|---|---|
| `ye` 函数内 | `window.Capacitor !== void 0` | 判断是否为APK环境 |
| `W` 函数 | `window.Capacitor.getPlatform()` | 获取平台类型 |
| `W` 函数 | `window.Capacitor.Plugins.Filesystem` | 文件系统插件 |
| `W` 函数 | `window.Capacitor.Plugins.Share` | 分享插件 |
| `W` 函数 | `n.writeFile({directory: "EXTERNAL"})` | 写入外部存储 |
| `W` 函数 | `n.writeFile({directory: "DOCUMENTS"})` | 写入文档目录 |
| `we` 函数内 | `window.Capacitor !== void 0` | 判断APK环境 |

---

## 六、游戏数据定义映射

### 6.1 武将数据

| minified名 | 源码名 | 类型 | 源码位置 | 说明 |
|---|---|---|---|---|
| `se` | `HERO_DICT` | object | HeroList.js:2 | 武将字典，101-314共60+武将 |

### 6.2 阵容预设

| minified名 | 源码名 | 类型 | 源码位置 | 说明 |
|---|---|---|---|---|
| `J` | `LINEUP_RULES` | array | HeroList.js:68 | 11条阵容规则(吴国/姜维/毒爆/吕赵/三蜀/典韦/司马懿/关羽/吕布/控制毒/控制吴) |
| `re` | `getLineupType` | function | HeroList.js:127 | 阵容识别函数 |

### 6.3 鱼灵数据

| minified名 | 源码名 | 类型 | 源码位置 | 说明 |
|---|---|---|---|---|
| `V` | `FishMap` | object | HeroList.js:173 | 鱼灵名称字典，含龙鱼/月尾/焰神/赤羽等 |

### 6.4 鱼珠数据

| minified名 | 源码名 | 类型 | 源码位置 | 说明 |
|---|---|---|---|---|
| `B` | `PearlMap` | object | HeroList.js:159 | 鱼珠技能字典(碎盾/冥想/定心/冰清/攻心/强权/盾击/合力/仁心/游龙/回元) |

### 6.5 颜色与段位

| minified名 | 源码名 | 类型 | 源码位置 | 说明 |
|---|---|---|---|---|
| `Q` | `color` | object | HeroList.js:252 | 洗练颜色(白/绿/蓝/紫/橙/红) |
| `ie` | `legacycolor` | object | HeroList.js:275 | 段位(虾米/入门/高手/宗师/泰斗/至尊/珍·至尊) |

### 6.6 道具数据

| minified名 | 源码名 | 类型 | 源码位置 | 说明 |
|---|---|---|---|---|
| `ee` | `weapon` | object | HeroList.js:261 | 道具名称(一支穿云箭/皮鞋手机/懦弱百合/正义喇叭/祖传大饼/冰镇啤酒/导演话筒/驱蚊花露水/止痒花露水) |
| `oe` | `formatWeapon` | function | HeroList.js:285 | 根据ID获取道具名称 |

### 6.7 军团科技数据

| minified名 | 源码名 | 类型 | 源码位置 | 说明 |
|---|---|---|---|---|
| `me` | `LEGION_TECH_MAX_LEVEL` | object | HeroList.js:331 | 军团科技最大等级 |
| `le` | `LEGION_TECH_TYPE_MAP` | object | HeroList.js:418 | 军团科技按职业分组(6个职业×14个技能) |
| `de` | `LEGION_TECH_RESET_TYPE_MAP` | object | HeroList.js:427 | 军团科技重置分组(与TYPE_MAP顺序不同) |
| `he` | `LEGION_TECH_TYPE_NAME` | object | HeroList.js:436 | 职业名称(战士/法师/射手/刺客/辅助/肉盾) |
| `ue` | `LEGION_TECH_NAME` | object | HeroList.js:445 | 军团科技技能名称(84条) |

### 6.8 商人数据

| minified名 | 源码名 | 类型 | 源码位置 | 说明 |
|---|---|---|---|---|
| `pe` | `merchantConfig` | object | dreamConstants.js:2 | 商人配置(初级/中级/高级) |
| `fe` | `goldItemsConfig` | object | dreamConstants.js:44 | 金币购买商品配置 |

### 6.9 梦境函数

| minified名 | 源码名 | 类型 | 源码位置 | 说明 |
|---|---|---|---|---|
| `ge` | `isDungeonOpen` | function | dreamConstants.js:51 | 咸王梦境开放判断(周日/一/三/四) |

---

## 七、游戏命令字符串对照表

| 命令字符串 | 用途 | 源码位置 |
|---|---|---|
| `system_mysharecallback` | 分享游戏/挂机加钟 | dailyTaskRunner.js:230 |
| `friend_batch` | 赠送好友金币 | dailyTaskRunner.js:242 |
| `hero_recruit` | 招募(免费/付费) | dailyTaskRunner.js:252 |
| `system_buygold` | 免费点金 | dailyTaskRunner.js:278 |
| `system_claimhangupreward` | 领取挂机奖励 | dailyTaskRunner.js:293 |
| `item_openbox` | 开启宝箱 | dailyTaskRunner.js:319 |
| `bottlehelper_stop` | 停止盐罐计时 | dailyTaskRunner.js:329 |
| `bottlehelper_start` | 开始盐罐计时 | dailyTaskRunner.js:339 |
| `bottlehelper_claim` | 领取盐罐奖励 | dailyTaskRunner.js:352 |
| `presetteam_getinfo` | 获取阵容信息 | dailyTaskRunner.js:103 |
| `presetteam_saveteam` | 保存/切换阵容 | dailyTaskRunner.js:128 |
| `arena_startarea` | 开始竞技场 | dailyTaskRunner.js:382 |
| `arena_getareatarget` | 获取竞技场目标 | dailyTaskRunner.js:393 |
| `fight_startareaarena` | 竞技场战斗 | dailyTaskRunner.js:409 |
| `fight_startlegionboss` | 军团BOSS战斗 | dailyTaskRunner.js:453 |
| `fight_startboss` | 每日BOSS战斗 | dailyTaskRunner.js:480 |
| `system_signinreward` | 福利签到 | dailyTaskRunner.js:490 |
| `legion_signin` | 俱乐部签到 | dailyTaskRunner.js:491 |
| `discount_claimreward` | 每日礼包 | dailyTaskRunner.js:492 |
| `collection_claimfreereward` | 每日免费奖励/珍宝阁 | dailyTaskRunner.js:493 |
| `card_claimreward` | 卡片奖励(免费/周/月/永久) | dailyTaskRunner.js:494 |
| `mail_claimallattachment` | 邮件奖励 | dailyTaskRunner.js:505 |
| `collection_goodslist` | 珍宝阁列表 | dailyTaskRunner.js:524 |
| `artifact_lottery` | 免费钓鱼 | dailyTaskRunner.js:566 |
| `genie_sweep` | 灯神扫荡 | dailyTaskRunner.js:582 |
| `genie_buysweep` | 免费扫荡卷 | dailyTaskRunner.js:596 |
| `store_purchase` | 黑市购买 | dailyTaskRunner.js:610 |
| `dungeon_selecthero` | 咸王梦境 | dailyTaskRunner.js:630 |
| `task_claimdailypoint` | 任务奖励 | dailyTaskRunner.js:675 |
| `task_claimdailyreward` | 日常奖励 | dailyTaskRunner.js:688 |
| `task_claimweekreward` | 周常奖励 | dailyTaskRunner.js:698 |
| `activity_recyclewarorderrewardclaim` | 通行证奖励 | dailyTaskRunner.js:710 |
| `role_getroleinfo` | 获取角色信息 | 新增 |

---

## 八、中文字符串索引

用于快速定位 minified 代码中的功能点：

| 中文字符串 | minified中位置 | 对应功能 |
|---|---|---|
| `"钻石宝箱"` | 行4 | `_.DIAMOND.name` |
| `"木质宝箱"` | 行5 | `_.WOODEN.name` |
| `"青铜宝箱"` | 行6 | `_.BRONZE.name` |
| `"没有可领取的签到奖励"` | 行18 | `D.get("400190")` |
| `"今日已完成签到"` | 行19 | `D.get("2300190")` |
| `"该奖励今日已领取"` | 行20 | `D.get("1000020")` |
| `"该账号未达到关卡无法解锁梦境"` | 行43 | `P.dreamWorld[200160]` |
| `"推关关卡未达标无法解锁竞技场"` | 行44 | `P.arena[200020]` |
| `"设置加载失败:"` | 行157 | loadSettings catch |
| `"连接失败次数已达上限"` | 行175 | ensureConnection |
| `"分享游戏"` | 行309 | buildBasicTasks |
| `"赠送好友金币"` | 行314 | buildBasicTasks |
| `"免费招募"` | 行320 | buildBasicTasks |
| `"付费招募"` | 行328 | buildBasicTasks |
| `"免费点金"` | 行339 | buildBasicTasks |
| `"领取挂机奖励"` | 行376 | buildBasicTasks |
| `"挂机加钟"` | 行387 | buildBasicTasks |
| `"停止盐罐计时"` | 行435 | buildSaltBottleTasks |
| `"开始盐罐计时"` | 行441 | buildSaltBottleTasks |
| `"领取盐罐奖励"` | 行449 | buildSaltBottleTasks |
| `"竞技场未开放"` | 行462 | buildArenaTask |
| `"开始竞技场战斗流程"` | 行465 | buildArenaTask |
| `"军团BOSS"` | 行552 | buildBossTasks |
| `"每日BOSS"` | 行571 | buildBossTasks |
| `"福利签到"` | 行583 | buildFixedRewardTasks |
| `"每日礼包"` | 行584 | buildFixedRewardTasks |
| `"周卡礼包"` | 行588 | buildFixedRewardTasks |
| `"月卡礼包"` | 行593 | buildFixedRewardTasks |
| `"永久卡礼包"` | 行598 | buildFixedRewardTasks |
| `"邮件奖励"` | 行605 | buildFixedRewardTasks |
| `"珍宝阁列表"` | 行612 | buildFixedRewardTasks |
| `"珍宝阁免费礼包"` | 行619 | buildFixedRewardTasks |
| `"免费钓鱼"` | 行633 | buildActivityTasks |
| `"魏国"/"蜀国"/"吴国"/"群雄"` | 行637 | buildActivityTasks |
| `"灯神扫荡"` | 行645 | buildActivityTasks |
| `"免费扫荡卷"` | 行653 | buildActivityTasks |
| `"黑市购买成功"` | 行681 | buildBlackMarketTask |
| `"青铜宝箱(兜底)"` | 行691 | buildBlackMarketTask |
| `"咸王梦境"` | 行710 | buildDreamWorldTask |
| `"深海灯神"` | 行723 | buildDeepSeaLampTask |
| `"任务奖励"` | 行733 | buildRewardTasks |
| `"日常奖励"` | 行742 | buildRewardTasks |
| `"周常奖励"` | 行750 | buildRewardTasks |
| `"通行证奖励"` | 行758 | buildRewardTasks |
| `"角色信息获取成功"` | 行768 | fetchRoleData |
| `"无挂机数据"` | 行799 | getHangUpStatus |
| `"0秒"` | 行859 | formatTime |
| `"小时"` | 行865 | formatTime |
| `"分钟"` | 行866 | formatTime |
| `"秒"` | 行867 | formatTime |
| `"活跃度"` | 行876 | checkActivity |
| `"Canvas转换Blob失败"` | 行1455 | ye (downloadCanvasAsImage) |
| `"导出图片出错:"` | 行1468 | ye catch |
| `"DataURL导出失败:"` | 行1546 | M (fallbackToDataURL) |
| `"导出文件"` | 行1592 | W (Capacitor分享标题) |
| `"保存或分享文件"` | 行1594 | W (Capacitor分享对话框) |
| `"司马懿"` | 行938 | se (HERO_DICT) |
| `"龙鱼·幽影"` | 行1086 | V (FishMap) |
| `"碎盾"` | 行1073 | B (PearlMap) |
| `"一支穿云箭"` | 行1164 | ee (weapon) |
| `"虾米"` | 行1175 | ie (legacycolor) |
| `"初级商人"` | 行1407 | pe (merchantConfig) |
| `"战士"` | 行1317 | he (LEGION_TECH_TYPE_NAME) |
| `"战士生命"` | 行1319 | ue (LEGION_TECH_NAME) |

---

## 九、源码→目标 差异摘要

### 9.1 新增功能（源码中不存在）

1. **错误处理体系**：`D`(ERROR_CODE_MAP)、`P`(CONTEXT_ERROR_MAP)、`C`(extractErrorCode)、`$`(getErrorMessage)、`N`(isKnownError)、`U`(isConnectionError)
2. **连接管理**：`isConnected()`、`ensureConnection()` — 自动重连和Token刷新
3. **命令发送增强**：`sendCommand()` 支持静默错误、上下文错误映射、自动重试
4. **阵容管理**：`getCurrentFormation()`、`switchFormation()`、`restoreFormation()` — 独立方法
5. **挂机智能领取**：`getHangUpStatus()` — 判断是否需要加钟、挂机时长是否达标
6. **竞技场目标选择**：`Z`(pickBestTarget) — 按战力排序选择最弱目标
7. **时间格式化**：`formatTime()` — 秒数转中文时间
8. **活跃度检查**：`checkActivity()` — 活跃度满则跳过任务
9. **Capacitor下载**：`W`(downloadInApk)、`we`(downloadFile) — APK环境文件保存与分享
10. **延时函数**：`p`(delay)、`x`(randomDelay) — Promise化延时

### 9.2 结构变化

1. `DailyTaskRunner.run()` 从单一方法拆分为多个 `build*Tasks()` 方法
2. `executeGameCommand()` 重构为 `sendCommand()` + `sendCommandSafe()`
3. `downloadCanvasAsImage()` 从回调风格改为 Promise 风格
4. `downloadBlob()` / `fallbackToDataURL()` 增加了 `MouseEvents` 兼容处理
5. `pickArenaTargetId()` 重构为 `z`(extractTargetList) + `L`(normalizeTarget) + `Z`(pickBestTarget)
6. 新增 `blackMarketStandalonePurchase` 设置项（默认 false）
7. 每日BOSS从固定3次改为条件判断（`i < 1`）

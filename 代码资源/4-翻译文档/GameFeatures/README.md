# GameFeatures 模块翻译文档

## 目录

| 序号 | 文件 | 组件 | 说明 |
|------|------|------|------|
| 01 | [01-GameStatus.md](01-GameStatus.md) | GameStatus | 主容器，Tab布局管理 |
| 02 | [02-DailyTaskStatus.md](02-DailyTaskStatus.md) | DailyTaskStatus | 每日任务状态 |
| 03 | [03-IdentityCard.md](03-IdentityCard.md) | IdentityCard | 身份牌/资源面板 |
| 04 | [04-ClubInfo.md](04-ClubInfo.md) | ClubInfo | 俱乐部信息 |
| 05 | [05-RankListComponents.md](05-RankListComponents.md) | 排行榜组件组 | 4个排行榜组件 |
| 06 | [06-OtherSubComponents.md](06-OtherSubComponents.md) | 其他子组件 | 7个子组件 |

## 组件依赖关系图

```
GameStatus (主容器)
├── 日常 Tab
│   ├── DailyTaskStatus      每日任务进度 + 一键补差
│   ├── IdentityCard         身份牌 + 资源面板
│   ├── TowerStatus          咸将塔爬塔
│   ├── WeirdTowerStatus     进化塔/梦魇塔
│   ├── CarScoreInfo         俱乐部赛车积分
│   └── ...其他日常组件
│
├── 俱乐部 Tab
│   ├── IdentityCard (embedded)
│   └── ClubInfo             成员列表 + 阵容 + 导出
│
├── 活动 Tab
│   └── ...活动相关组件
│
├── 盐场 Tab (子Tab)
│   ├── SaltFieldRank        盐场排行
│   ├── WeekBattle           本周盐场战绩
│   ├── MonthBattle          本月盐场战绩
│   ├── LegionWarMap         盐场地图 (Canvas)
│   └── LegionWarStatistics  盐场战况统计
│
├── 蟠桃园 Tab (子Tab)
│   ├── PeachInfo            蟠桃园信息 + 切磋
│   └── PeachBattle          蟠桃园战绩
│
├── 排行榜 Tab (子Tab)
│   ├── ServerRankListPageCard    区服榜
│   ├── TopRankListPageCard       巅峰榜
│   ├── TopClubRankListPageCard   俱乐部榜
│   ├── GoldRankListPageCard      黄金积分榜
│   └── GreatRouteRankListPageCard 伟大航路积分榜
│
└── 切磋 Tab
    └── FightPvp             独立切磋模块
```

## 共同依赖

### 外部工具/库
- **Vue 3**: `ref`, `computed`, `watch`, `onMounted`, `onUnmounted`, `defineComponent`
- **Naive UI**: `n-tabs`, `n-tab-pane`, `n-data-table`, `n-modal`, `n-button`, `n-tag`, `n-progress`, `n-input`, `n-input-number`, `n-select`, `n-switch`, `n-radio-group`, `n-radio-button`, `n-avatar`, `n-date-picker`
- **Pinia Store**: `_t()` - 游戏数据状态管理
- **html2canvas**: 导出图片功能

### 通用工具函数
| 函数 | 来源 | 用途 |
|------|------|------|
| `formatNumber()` | 自定义 | 大数字格式化（亿/万） |
| `processHeroes()` | 自定义 | 解析英雄数据，计算红淬/开孔 |
| `calcEquipment()` | 自定义 | 计算装备红淬数和开孔数 |
| `identifyLineup()` | 自定义 | 根据英雄列表识别阵容类型 |
| `processPearlInfo()` | 自定义 | 处理鱼灵信息 |
| `getHeroConfig()` | 配置表 | 获取英雄配置（jt） |

### WebSocket 通信协议
| 命令 | 用途 |
|------|------|
| `role_getroleinfo` | 获取角色信息 |
| `tower_getinfo` | 获取爬塔信息 |
| `fight_starttower` | 开始爬塔 |
| `fight_startpvp` | 开始切磋 |
| `rank_getroleinfo` | 查询玩家详情 |
| `rank_getserverrank` | 区服排行榜 |
| `rank_gettoprank` | 巅峰排行榜 |
| `rank_getgoldrank` | 黄金积分排行榜 |
| `rank_getgreatrouterank` | 伟大航路排行榜 |
| `car_getmemberrank` | 赛车积分 |
| `legion_getinfo` | 俱乐部信息 |
| `mergebox_getinfo` | 合成活动信息 |
| `mergebox_openbox` | 开合成宝箱 |
| `evotower_getinfo` | 进化塔信息 |

## 文件说明

- **原始文件**: `/workspace/target_formatted/GameFeatures-CknTKSSq.js` (45,365行，899KB)
- **输出目录**: `/workspace/translations/GameFeatures/`
- 每个组件文档包含：
  - 原始代码位置（行号）
  - 组件概述
  - 依赖关系图
  - 原始编译后代码（核心逻辑）
  - 翻译后的 Vue 3 + Naive UI 代码
  - 关键逻辑说明表格

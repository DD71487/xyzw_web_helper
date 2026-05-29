# BatchDailyTasks 模块翻译文档

## 概述

本文档是对 `BatchDailyTasks-XgqKel1u.js` (24,806行，554KB) 核心功能的翻译和分析。该模块是一个游戏自动化批量任务管理系统的 Vue 组件，支持多账号同时执行各类日常/副本/福利任务。

---

## 文件结构

| 文件 | 内容 |
|------|------|
| [01_CrossPlatformStorage.md](01_CrossPlatformStorage.md) | 跨平台存储集成 (CrossPlatformStorage → storage.js) |
| [02_WakeLockManager.md](02_WakeLockManager.md) | 防休眠系统集成 (WakeLockManager → wakeLock.js) |
| [03_ScheduledTasks.md](03_ScheduledTasks.md) | 定时任务系统 (Cron解析 + 任务调度) |
| [04_TaskTemplates.md](04_TaskTemplates.md) | 任务模板系统 (预设阵容管理) |
| [05_BatchFeatures.md](05_BatchFeatures.md) | 批量功能模块 (11个核心功能) |

---

## 核心架构

```
BatchDailyTasks
├── 基础设施层
│   ├── CrossPlatformStorage    (跨平台存储)
│   └── WakeLockManager         (防休眠管理)
│
├── 任务调度层
│   ├── Scheduled Tasks         (定时任务系统)
│   │   ├── Cron表达式解析
│   │   ├── 每日固定时间执行
│   │   └── 不上线时段检查
│   └── Task Templates          (任务模板/预设阵容)
│
├── 业务功能层
│   ├── 日常任务 (DailyTaskRunner)
│   ├── 副本挑战 (咸王梦境)
│   ├── 宝库挑战 (1-3层 / 4-5层)
│   ├── 爬塔挑战 (普通塔)
│   ├── 怪塔挑战 (怪异塔)
│   ├── 资源收集 (挂机奖励)
│   ├── 功法升级 (残卷领取)
│   ├── 月度任务 (钓鱼/竞技场补齐)
│   ├── 福利领取 (珍宝阁/扭蛋等)
│   ├── 图鉴升星 (英雄图鉴)
│   └── 十殿星级 (星级挑战)
│
└── UI展示层
    ├── Token卡片状态
    ├── 任务执行日志
    ├── 定时任务配置面板
    └── 批量操作按钮
```

---

## 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **跨平台**: Tauri (桌面) / Capacitor (Android) / Web (浏览器)
- **通信**: WebSocket 游戏协议
- **存储**: localStorage (跨平台统一封装)

---

## 关键设计模式

### 1. 批量并行执行
所有批量功能都使用 `Promise.all()` 对选中账号并行执行，提高执行效率。

### 2. 状态机管理
每个账号的任务状态使用 `"waiting" | "running" | "completed" | "failed"` 四态管理。

### 3. 阵容切换保护
执行特定任务前自动切换阵容，任务完成后在 `finally` 块中恢复原始阵容。

### 4. 错误降级处理
- Tauri 防休眠失败时降级为心跳方案
- Capacitor KeepAwake 未安装时降级为 Web WakeLock
- 各种游戏错误码都有对应的降级处理

### 5. 活动开放时间检查
不同任务有各自的开放时间限制：
- 宝库: 特定时间段开放
- 梦境: 周日/周一/周三/周四
- 竞技场: 6:00-22:00
- 怪塔: 黑市周开放

---

## 翻译约定

- 原始代码保持压缩格式（单字母变量名）
- 翻译后代码使用语义化命名
- 添加 JSDoc 类型注释
- 保留原始错误码和协议命令
- 中文注释说明业务逻辑

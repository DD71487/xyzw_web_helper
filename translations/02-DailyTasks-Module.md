# DailyTasks Module Translation

## Overview

The `DailyTasks-OePNIteH.js` file implements a daily task management system for tracking and executing routine in-game tasks. It provides a Vue 3 component-based interface for viewing task progress, executing tasks, and managing task settings.

---

## Module Structure

### Imports (Lines 1-35)

```javascript
import {
  k as createComponent,
  c as createElement,
  h as render,
  a as createVNode,
  s as ref,
  r as reactive,
  y as watch,
  d as resolveComponent,
  A as withDirectives,
  b as createBlock,
  t as toDisplayString,
  E as withModifiers,
  w as withCtx,
  u as unref,
  i as isRef,
  F as Fragment,
  g as renderList,
  e as openBlock,
  v as createTextVNode,
  x as toHandlerKey,
  p as computed,
  o as onMounted,
  f as onUnmounted,
} from "./index-UoU16364.js";
import { _ as pluginExportHelper } from "./_plugin-vue_export-helper-DlAUqK2U.js";
import { S as SettingsIcon } from "./Settings-BMY43FOw.js";
import { T as TimeIcon } from "./Time-Buls15_H.js";
import { u as useGameRoles } from "./gameRoles-DtpzXQTv.js";
import { u as useLocalTokenManager } from "./localTokenManager-BQJEcmfy.js";
import { u as useAuth } from "./auth-BYvggjsB.js";
import { R as RefreshIcon } from "./Refresh-DWYLAev-.js";
import { C as ChevronDownIcon } from "./ChevronDown-CJ0-FHvp.js";
import { S as SearchIcon } from "./Search-D4B4lpJB.js";
import { C as CubeIcon } from "./Cube-CwoBO7fL.js";
```

---

## Component: DailyTaskCard

### Original Code Location: Lines 91-379

### Description
A card component that displays individual daily task information including progress, rewards, and execution controls.

### Translated Code

```javascript
const DailyTaskCard = {
  __name: "DailyTaskCard",
  props: { task: { type: Object, required: true } },
  emits: ["update:task", "execute", "toggle-status"],
  setup(props, { emit }) {
    var settingsAuto, settingsDelay, settingsNotification;
    const task = props,
      emitEvent = emit,
      message = useMessage(),
      showSettings = ref(false),
      isExecuting = ref(false),
      settings = ref({
        autoExecute: ((settingsAuto = task.task.settings) == null ? void 0 : settingsAuto.autoExecute) || false,
        delay: ((settingsDelay = task.task.settings) == null ? void 0 : settingsDelay.delay) || 0,
        notification: ((settingsNotification = task.task.settings) == null ? void 0 : settingsNotification.notification) || true,
      }),
      getButtonText = () => (isExecuting.value ? "Executing..." : task.task.canExecute ? "Execute Now" : "Cannot Execute"),
      toggleStatus = () => {
        emitEvent("toggle-status", task.task.id);
      },
      executeTask = async () => {
        if (!(isExecuting.value || !task.task.canExecute))
          try {
            ((isExecuting.value = true),
              await emitEvent("execute", task.task.id),
              settings.value.notification && message.success(`Task "${task.task.title}" executed successfully`));
          } catch (err) {
            message.error(`Task execution failed: ${err.message}`);
          } finally {
            isExecuting.value = false;
          }
      },
      updateSetting = (key, value) => {
        ((settings.value[key] = value), emitEvent("update:task", { ...task.task, settings: { ...settings.value } }));
      },
      formatDate = (date) =>
        new Date(date).toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }),
      formatTime = (date) => new Date(date).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    return (
      watch(
        () => task.task.settings,
        (newSettings) => {
          newSettings && (settings.value = { ...settings.value, ...newSettings });
        },
        { immediate: true }
      ),
      // ... render function
    );
  },
};
```

### Key Features

| Feature | Description |
|---------|-------------|
| **Task Display** | Shows task title, subtitle, icon, and completion status |
| **Progress Tracking** | Displays current/total progress with visual indicator |
| **Reward Info** | Shows task rewards and next reset time |
| **Auto-Execute** | Optional automatic execution setting |
| **Execution Delay** | Configurable delay before execution (0-300 seconds) |
| **Notifications** | Toggle success/error notifications |
| **Settings Modal** | Popup for configuring task behavior |
| **Execution Log** | Last 5 execution attempts with timestamps |

---

## Component: DailyTasks (Main Page)

### Original Code Location: Lines 406-800+

### Description
The main daily tasks page that manages the task list, role selection, filtering, and batch operations.

### Translated Code

```javascript
const DailyTasks = {
  __name: "DailyTasks",
  setup(props) {
    const router = useRouter(),
      tokenStore = useTokenStore(),
      dialog = useDialog(),
      message = useMessage(),
      gameRoles = useGameRoles(),
      auth = useAuth(),
      isLoading = ref(false),
      isRefreshing = ref(false),
      selectedRoleId = ref(null),
      filterStatus = ref("all"),
      searchQuery = ref(""),
      tasks = ref([]),
      selectedRole = computed(() => gameRoles.gameRoles.find((role) => role.id === selectedRoleId.value)),
      roleOptions = computed(() => gameRoles.gameRoles.map((role) => ({ label: `${role.name} (${role.server})`, value: role.id }))),
      taskStats = computed(() => {
        const total = tasks.value.length,
          completed = tasks.value.filter((task) => task.completed).length,
          percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        return { total, completed, percentage };
      }),
      filteredTasks = computed(() => {
        let result = tasks.value;
        switch (filterStatus.value) {
          case "pending":
            result = result.filter((task) => !task.completed);
            break;
          case "completed":
            result = result.filter((task) => task.completed);
            break;
          case "auto":
            result = result.filter((task) => {
              var settings;
              return (settings = task.settings) == null ? void 0 : settings.autoExecute;
            });
            break;
        }
        if (searchQuery.value) {
          const query = searchQuery.value.toLowerCase();
          result = result.filter((task) => {
            var subtitle;
            return (
              task.title.toLowerCase().includes(query) || (subtitle = task.subtitle) == null ? void 0 : subtitle.toLowerCase().includes(query)
            );
          });
        }
        return result;
      }),
      batchActions = [
        { label: "Execute All Pending Tasks", key: "execute-all-pending" },
        { label: "Mark All as Completed", key: "mark-all-completed" },
        { label: "Reset All Task Status", key: "reset-all-tasks" },
      ],
      ensureConnectionWithRetry = async (tokenId, maxRetries = 3, retryDelay = 2000) => {
        for (let attempt = 1; attempt <= maxRetries; attempt++)
          try {
            if (tokenStore.getWebSocketStatus(tokenId) !== "connected") {
              const token = tokenStore.gameTokens.find((t) => t.id === tokenId);
              if (token && token.token) {
                if (
                  (tokenStore.createWebSocketConnection(tokenId, token.token, token.wsUrl),
                  await wait(retryDelay),
                  tokenStore.getWebSocketStatus(tokenId) !== "connected")
                ) {
                  if (attempt < maxRetries) continue;
                  throw new Error("WebSocket connection timeout");
                }
              } else throw new Error("No valid token data or WebSocket URL found");
            }
            const presetTeam = await tokenStore.sendMessageWithPromise(tokenId, "presetteam_getinfo", {}, 8000);
            if (presetTeam)
              return (
                tokenStore.$patch((state) => {
                  state.gameData = { ...(state.gameData ?? {}), presetTeam: presetTeam };
                }),
                message.success("Team data updated"),
                presetTeam
              );
          } catch (err) {
            if ((console.error(`Attempt ${attempt} failed:`, err), attempt < maxRetries)) await wait(retryDelay);
            else
              return (
                console.error("All retries failed, team data loading failed"),
                message.warning(`Team data loading failed: ${err.message || "Unknown error"}`),
                null
              );
          }
      },
      refreshTasks = async () => {
        if (!selectedRoleId.value) {
          message.warning("Please select a game role first");
          return;
        }
        try {
          ((isLoading.value = true), (isRefreshing.value = true));
          const taskData = generateTasks(selectedRoleId.value);
          ((tasks.value = taskData),
            localStorage.setItem(`dailyTasks_${selectedRoleId.value}`, JSON.stringify(taskData)),
            message.success("Task data refreshed successfully"));
        } catch (err) {
          (console.error("Refresh tasks failed:", err), message.error("Local data generation failed"));
        } finally {
          ((isLoading.value = false), (isRefreshing.value = false));
        }
      },
      generateTasks = (roleId) => {
        const role = gameRoles.gameRoles.find((r) => r.id === roleId);
        return (
          role != null && role.name,
          [
            {
              id: `task_${roleId}_daily_signin`,
              title: "Daily Sign-in",
              subtitle: "Login to game to get sign-in rewards",
              icon: "/icons/ta.png",
              completed: false,
              canExecute: true,
              progress: { current: 0, total: 1 },
              reward: "Gold x100, EXP x50",
              nextReset: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
              settings: { autoExecute: false, delay: 0, notification: true },
              details: [
                { id: 1, name: "Open game client", completed: false },
                { id: 2, name: "Click sign-in button", completed: false },
              ],
              logs: [],
            },
            {
              id: `task_${roleId}_black_market_purchase`,
              title: "Black Market Purchase",
              subtitle: "Purchase 1 item in black market, fallback to bronze box if nothing purchased",
              icon: "/icons/ta.png",
              completed: false,
              canExecute: true,
              progress: { current: 0, total: 1 },
              reward: "Random item or bronze box",
              nextReset: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
              settings: { autoExecute: true, delay: 0, notification: true },
              details: [
                { id: 1, name: "Try to purchase 1 item in black market", completed: false },
                { id: 2, name: "Check purchase result", completed: false },
                { id: 3, name: "If nothing purchased, buy bronze box (fallback)", completed: false },
              ],
              logs: [],
            },
            {
              id: `task_${roleId}_daily_quest`,
              title: "Complete Daily Quests",
              subtitle: "Complete 5 daily quests to get rewards",
              icon: "/icons/ta.png",
              completed: false,
              canExecute: true,
              progress: { current: 2, total: 5 },
              reward: "Gold x500, Equipment Fragments x10",
              nextReset: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
              settings: { autoExecute: true, delay: 5, notification: true },
              details: [
                { id: 1, name: "Defeat 10 monsters", completed: true },
                { id: 2, name: "Collect 20 materials", completed: true },
                { id: 3, name: "Complete one dungeon", completed: false },
                { id: 4, name: "Participate in guild activity", completed: false },
                { id: 5, name: "Enhance equipment", completed: false },
              ],
              logs: [
                { id: 1, timestamp: Date.now() - 30 * 60 * 1000, type: "success", message: "Completed defeat monster task" },
                { id: 2, timestamp: Date.now() - 60 * 60 * 1000, type: "success", message: "Completed material collection task" },
              ],
            },
            {
              id: `task_${roleId}_guild_contribution`,
              title: "Guild Contribution",
              subtitle: "Contribute resources to guild for contribution points",
              icon: "/icons/ta.png",
              completed: true,
              canExecute: false,
              progress: { current: 1, total: 1 },
              reward: "Guild Contribution Points x100",
              nextReset: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
              settings: { autoExecute: true, delay: 0, notification: true },
              details: [{ id: 1, name: "Donate gold", completed: true }],
              logs: [
                { id: 1, timestamp: Date.now() - 2 * 60 * 60 * 1000, type: "success", message: "Completed guild contribution" },
              ],
            },
          ]
        );
      },
      selectRole = (roleId) => {
        ((selectedRoleId.value = roleId), gameRoles.selectRole(gameRoles.gameRoles.find((role) => role.id === roleId)), roleId && refreshTasks());
      },
      setFilter = (status) => {
        filterStatus.value = status;
      },
      setSearch = (query) => {
        searchQuery.value = query;
      },
      executeTask = async (taskId) => {
        if (!selectedRoleId.value) {
          message.error("Please select a game role first");
          return;
        }
        try {
          if (tokenStore.getWebSocketStatus(selectedRoleId.value) !== "connected") {
            const gameToken = tokenStore.getGameToken(selectedRoleId.value);
            if (gameToken)
              (tokenStore.createWebSocketConnection(selectedRoleId.value, gameToken.token, gameToken.wsUrl),
              await wait(1000));
            else throw new Error("Game token not found, please re-add role");
          }
          const taskIndex = tasks.value.findIndex((task) => task.id === taskId);
          (taskIndex !== -1 &&
            ((tasks.value[taskIndex] = { ...tasks.value[taskIndex], completed: true, completedAt: new Date().toISOString() }),
            tasks.value[taskIndex].logs || (tasks.value[taskIndex].logs = []),
            tasks.value[taskIndex].logs.push({
              id: Date.now(),
              timestamp: Date.now(),
              type: "success",
              message: `Task "${tasks.value[taskIndex].title}" executed successfully`,
            }),
            localStorage.setItem(`dailyTasks_${selectedRoleId.value}`, JSON.stringify(tasks.value))),
            message.success("Task executed successfully"));
        } catch (err) {
          console.error("Execute task failed:", err);
          const taskIndex = tasks.value.findIndex((task) => task.id === taskId);
          throw (
            taskIndex !== -1 &&
              (tasks.value[taskIndex].logs || (tasks.value[taskIndex].logs = []),
              tasks.value[taskIndex].logs.push({
                id: Date.now(),
                timestamp: Date.now(),
                type: "error",
                message: `Task execution failed: ${err.message}`,
              })),
            err
          );
        }
      },
      toggleTaskStatus = (taskId) => {
        const taskIndex = tasks.value.findIndex((task) => task.id === taskId);
        taskIndex !== -1 && ((tasks.value[taskIndex].completed = !tasks.value[taskIndex].completed), message.info("Task status updated"));
      },
      updateTask = (task) => {
        const taskIndex = tasks.value.findIndex((t) => t.id === task.id);
        taskIndex !== -1 && (tasks.value[taskIndex] = task);
      },
      handleBatchAction = (action) => {
        switch (action) {
          case "execute-all-pending":
            executeAllPending();
            break;
          case "mark-all-completed":
            markAllCompleted();
            break;
          case "reset-all-tasks":
            resetAllTasks();
            break;
        }
      },
      executeAllPending = async () => {
        const pendingTasks = tasks.value.filter((task) => !task.completed && task.canExecute);
        if (pendingTasks.length === 0) {
          message.info("No pending tasks to execute");
          return;
        }
        dialog.confirm({
          title: "Batch Execute Tasks",
          content: `Are you sure you want to execute ${pendingTasks.length} pending tasks?`,
          positiveText: "Confirm",
          negativeText: "Cancel",
          onPositiveClick: async () => {
            let success = 0,
              failed = 0;
            for (const task of pendingTasks)
              try {
                (await executeTask(task.id), success++);
              } catch {
                failed++;
              }
            message.info(`Batch execution complete: ${success} success, ${failed} failed`);
          },
        });
      },
      markAllCompleted = () => {
        const pendingTasks = tasks.value.filter((task) => !task.completed);
        if (pendingTasks.length === 0) {
          message.info("All tasks are already completed");
          return;
        }
        dialog.confirm({
          title: "Mark All Tasks as Completed",
          content: `Are you sure you want to mark ${pendingTasks.length} pending tasks as completed?`,
          positiveText: "Confirm",
          negativeText: "Cancel",
          onPositiveClick: () => {
            (pendingTasks.forEach((task) => {
              ((task.completed = true), (task.completedAt = new Date().toISOString()));
            }),
              message.success("All tasks marked as completed"));
          },
        });
      },
      resetAllTasks = () => {
        dialog.confirm({
          title: "Reset All Task Status",
          content: "Are you sure you want to reset all task status? This will clear all completion records.",
          positiveText: "Confirm",
          negativeText: "Cancel",
          onPositiveClick: () => {
            (tasks.value.forEach((task) => {
              ((task.completed = false), (task.completedAt = null));
            }),
              message.success("All task status reset"));
          },
        });
      };
    return (
      onMounted(async () => {
        if (!auth.isAuthenticated) {
          router.push("/login");
          return;
        }
        if (
          (gameRoles.gameRoles.length === 0 && (await gameRoles.fetchGameRoles()),
          tokenStore.selectedToken && (await ensureConnectionWithRetry(tokenStore.selectedToken.id)),
          gameRoles.selectedRole)
        ) {
          selectedRoleId.value = gameRoles.selectedRole.id;
          const savedTasks = localStorage.getItem(`dailyTasks_${selectedRoleId.value}`);
          if (savedTasks)
            try {
              tasks.value = JSON.parse(savedTasks);
            } catch (err) {
              (console.error("Parse task data failed:", err), refreshTasks());
            }
          else refreshTasks();
        } else gameRoles.gameRoles.length > 0 && ((selectedRoleId.value = gameRoles.gameRoles[0].id), selectRole(selectedRoleId.value));
      }),
      watch(
        () => gameRoles.selectedRole,
        (role) => {
          role && role.id !== selectedRoleId.value && (selectedRoleId.value = role.id);
        }
      ),
      // ... render function
    );
  },
};
```

---

## Task Execution Flow

```
┌─────────────────┐
│  User Selects   │
│   Game Role     │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Load Saved Tasks│
│ from localStorage│
└────────┬────────┘
         ▼
┌─────────────────┐     ┌─────────────────┐
│  Tasks Exist?   │──No─┤ Generate Default │
└────────┬────────┘     │    Task List     │
        Yes            └─────────────────┘
         ▼
┌─────────────────┐
│ Display Tasks   │
│ with Progress   │
└────────┬────────┘
         ▼
┌─────────────────┐
│ User Executes   │
│  Single Task    │
└────────┬────────┘
         ▼
┌─────────────────┐     ┌─────────────────┐
│ Ensure WebSocket│────▶│  Send Game      │
│   Connection    │     │    Command      │
└─────────────────┘     └────────┬────────┘
                                 ▼
                        ┌─────────────────┐
                        │  Update Task    │
                        │  Status & Logs  │
                        └────────┬────────┘
                                 ▼
                        ┌─────────────────┐
                        │ Save to         │
                        │ localStorage    │
                        └─────────────────┘
```

---

## Task State Management

### Task Object Structure

```javascript
{
  id: "task_{roleId}_{taskType}",      // Unique task identifier
  title: "Task Name",                   // Display title
  subtitle: "Task description",         // Detailed description
  icon: "/icons/ta.png",                // Task icon path
  completed: false,                     // Completion status
  canExecute: true,                     // Whether task can be executed
  progress: {                           // Progress tracking
    current: 0,
    total: 1
  },
  reward: "Gold x100",                  // Reward description
  nextReset: "ISO Date",                // Next reset time
  settings: {                           // User settings
    autoExecute: false,                 // Auto-execute flag
    delay: 0,                           // Execution delay (seconds)
    notification: true                  // Show notifications
  },
  details: [                            // Sub-task details
    { id: 1, name: "Step 1", completed: false }
  ],
  logs: [                               // Execution history
    { id: 1, timestamp: 1234567890, type: "success", message: "Done" }
  ]
}
```

### Status Transitions

```
Pending ──Execute──▶ Running ──Success──▶ Completed
   │                    │
   │                    └──Error──▶ Failed
   │
   └──Toggle──▶ Completed (manual)
```

---

## Error Handling

### Connection Errors
- **WebSocket Timeout**: Retries up to 3 times with 2-second delays
- **Invalid Token**: Prompts user to re-add role
- **Connection Lost**: Attempts to reconnect before executing tasks

### Task Execution Errors
- **Task-level errors**: Logged in task.logs with error type
- **Non-blocking**: Failed tasks don't stop other tasks
- **User notification**: Error messages displayed via toast notifications

### Data Persistence Errors
- **localStorage failures**: Falls back to in-memory state
- **Parse errors**: Regenerates default task list

---

## Filter and Search

### Filter Options

| Filter | Description |
|--------|-------------|
| `"all"` | Show all tasks |
| `"pending"` | Show only incomplete tasks |
| `"completed"` | Show only completed tasks |
| `"auto"` | Show tasks with auto-execute enabled |

### Search
- Case-insensitive search on task title and subtitle
- Real-time filtering as user types

---

## Batch Operations

| Operation | Description | Confirmation |
|-----------|-------------|--------------|
| Execute All Pending | Executes all incomplete, executable tasks | Yes |
| Mark All Completed | Manually marks all tasks as done | Yes |
| Reset All Tasks | Clears all completion status | Yes |

---

## LocalStorage Schema

```
Key: dailyTasks_{roleId}
Value: JSON serialized array of task objects

Example:
dailyTasks_12345 = '[{"id":"task_12345_daily_signin","title":"Daily Sign-in",...}]'
```

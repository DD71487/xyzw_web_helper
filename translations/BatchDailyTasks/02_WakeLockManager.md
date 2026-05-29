# 防休眠系统集成 (WakeLockManager)

## 功能说明

WakeLockManager 是一个跨平台防休眠管理类，用于在批量任务执行期间防止设备进入休眠状态。支持三种环境：
- **Web浏览器**: 使用 Navigator WakeLock API
- **Tauri桌面应用**: 调用原生 `prevent_sleep` 命令，失败时降级为心跳方案
- **Capacitor Android应用**: 使用 `@capacitor-community/keep-awake` 插件

---

## 原始代码

```javascript
function getEnvironment() {
  return window.__TAURI_INTERNALS__
    ? (console.log("[WakeLock] 检测到Tauri环境"), "tauri")
    : window.Capacitor
      ? (console.log("[WakeLock] 检测到Capacitor环境"), "capacitor")
      : (console.log("[WakeLock] 未检测到特殊环境,使用Web模式"), "web");
}

class WakeLockManager {
  constructor() {
    ((this.env = getEnvironment()),
      (this.isActive = !1),
      (this.wakeLock = null),
      (this.keepAwakeInterval = null),
      (this.visibilityHandler = null),
      console.log(`WakeLockManager初始化, 当前环境: ${this.env}`));
  }
  async request() {
    if (this.isActive) return (console.log("防休眠已处于激活状态"), !0);
    try {
      switch ((console.log(`请求防休眠, 环境: ${this.env}`), this.env)) {
        case "web":
          return await this.requestWebWakeLock();
        case "tauri":
          return await this.requestTauriWakeLock();
        case "capacitor":
          return await this.requestCapacitorWakeLock();
        default:
          return (console.warn("未知环境类型"), !1);
      }
    } catch (e) {
      return (console.error("WakeLock请求失败:", e), !1);
    }
  }
  async release() {
    if (!this.isActive) {
      console.log("防休眠未激活,无需释放");
      return;
    }
    try {
      switch ((console.log(`释放防休眠, 环境: ${this.env}`), this.env)) {
        case "web":
          await this.releaseWebWakeLock();
          break;
        case "tauri":
          await this.releaseTauriWakeLock();
          break;
        case "capacitor":
          await this.releaseCapacitorWakeLock();
          break;
      }
      ((this.isActive = !1),
        this.visibilityHandler &&
          typeof document < "u" &&
          (document.removeEventListener("visibilitychange", this.visibilityHandler), (this.visibilityHandler = null)));
    } catch (e) {
      console.error("WakeLock释放失败:", e);
    }
  }
  async requestWebWakeLock() {
    if (typeof navigator > "u" || !("wakeLock" in navigator))
      return (
        console.warn("[WakeLock] 当前浏览器不支持WakeLock API"),
        console.warn("[WakeLock] 提示: 请使用Chrome/Edge浏览器,并确保是HTTPS或localhost环境"),
        !1
      );
    try {
      return (
        console.log("[WakeLock] 请求Web Screen WakeLock..."),
        (this.wakeLock = await navigator.wakeLock.request("screen")),
        (this.isActive = !0),
        console.log("[WakeLock] Web WakeLock已成功启用"),
        this.wakeLock.addEventListener("release", () => {
          console.log("[WakeLock] Web WakeLock已被系统释放");
        }),
        typeof document < "u" &&
          ((this.visibilityHandler = async () => {
            if (document.visibilityState === "visible" && this.isActive)
              try {
                (console.log("[WakeLock] 页面变为可见,重新请求WakeLock..."),
                  (this.wakeLock = await navigator.wakeLock.request("screen")),
                  console.log("[WakeLock] 重新请求WakeLock成功"));
              } catch (e) {
                console.error("[WakeLock] 重新请求WakeLock失败:", e.message);
              }
            else document.visibilityState === "hidden" && console.log("[WakeLock] 页面隐藏,WakeLock可能失效");
          }),
          document.addEventListener("visibilitychange", this.visibilityHandler)),
        !0
      );
    } catch (e) {
      return (
        console.error("[WakeLock] Web WakeLock请求失败:", e.message),
        e.name === "NotAllowedError"
          ? (console.error("[WakeLock] 权限被拒绝,请确保使用HTTPS或localhost且用户有交互操作"), !1)
          : e.name === "NotSupportedError" && console.error("[WakeLock] 浏览器不支持WakeLock API"),
        !1
      );
    }
  }
  async releaseWebWakeLock() {
    this.wakeLock && (await this.wakeLock.release(), (this.wakeLock = null), console.log("Web WakeLock已释放"));
  }
  async requestTauriWakeLock() {
    try {
      console.log("[WakeLock] 开始加载Tauri invoke模块...");
      const { invoke: e } = await __vitePreload(
        async () => {
          const { invoke: o } = await import("./index-UoU16364.js").then((a) => a.b5);
          return { invoke: o };
        },
        __vite__mapDeps([0, 1]),
      );
      console.log("[WakeLock] Tauri invoke模块加载成功");
      try {
        (console.log("[WakeLock] 调用 prevent_sleep 命令..."),
          await e("prevent_sleep"),
          console.log("[WakeLock] Tauri原生防休眠命令已成功启用"));
      } catch (o) {
        (console.error("[WakeLock] Tauri原生命令调用失败:", o.message),
          console.warn("[WakeLock] 降级使用心跳方案..."),
          (this.keepAwakeInterval = setInterval(async () => {
            try {
              await e("prevent_sleep").catch(() => {});
            } catch {}
          }, 3e4)),
          console.log("[WakeLock] 心跳方案已启动(每30秒)"));
      }
      return ((this.isActive = !0), console.log("[WakeLock] Tauri防休眠状态: 已激活"), !0);
    } catch (e) {
      return (console.error("[WakeLock] Tauri WakeLock完全失败:", e.message), !1);
    }
  }
  async releaseTauriWakeLock() {
    this.keepAwakeInterval &&
      (clearInterval(this.keepAwakeInterval), (this.keepAwakeInterval = null), console.log("Tauri防休眠心跳已停止"));
    try {
      const { invoke: e } = await __vitePreload(async () => {
        const { invoke: o } = await import("./index-UoU16364.js").then((a) => a.b5);
        return { invoke: o };
      });
      await e("allow_sleep").catch(() => {});
    } catch {}
  }
  async requestCapacitorWakeLock() {
    try {
      const e = "@capacitor-community/keep-awake";
      let o;
      try {
        o = (await Function(`return import('${e}')`)()).KeepAwake;
      } catch {
        return (
          console.warn("Capacitor KeepAwake插件未安装,降级使用Web WakeLock API"),
          await this.requestWebWakeLock()
        );
      }
      return (await o.keepAwake(), (this.isActive = !0), console.log("Android KeepAwake已启用"), !0);
    } catch (e) {
      return (console.error("Android KeepAwake失败:", e), await this.requestWebWakeLock());
    }
  }
  async releaseCapacitorWakeLock() {
    try {
      const e = "@capacitor-community/keep-awake";
      let o;
      try {
        o = (await Function(`return import('${e}')`)()).KeepAwake;
      } catch {
        await this.releaseWebWakeLock();
        return;
      }
      (await o.allowSleep(), console.log("Android KeepAwake已释放"));
    } catch (e) {
      (console.error("释放Android KeepAwake失败:", e), await this.releaseWebWakeLock());
    }
  }
  isSupported() {
    switch (this.env) {
      case "web":
        return typeof navigator < "u" && "wakeLock" in navigator;
      case "tauri":
        return !0;
      case "capacitor":
        return (typeof navigator < "u" && "wakeLock" in navigator, !0);
      default:
        return !1;
    }
  }
  getEnvironmentInfo() {
    const e = { web: "Web浏览器", tauri: "Tauri桌面应用", capacitor: "Android APK" };
    return { env: this.env, envName: e[this.env] || "未知环境", supported: this.isSupported() };
  }
}

const wakeLockManager = new WakeLockManager();
```

---

## 翻译后代码 (使用 wakeLock.js)

```javascript
// wakeLock.js - 跨平台防休眠管理模块

/**
 * 检测当前运行环境
 * @returns {'tauri' | 'capacitor' | 'web'}
 */
function getEnvironment() {
  if (window.__TAURI_INTERNALS__) {
    console.log("[WakeLock] 检测到Tauri环境");
    return "tauri";
  }
  if (window.Capacitor) {
    console.log("[WakeLock] 检测到Capacitor环境");
    return "capacitor";
  }
  console.log("[WakeLock] 未检测到特殊环境，使用Web模式");
  return "web";
}

/**
 * 防休眠管理类
 * 支持Web浏览器、Tauri桌面应用、Capacitor Android应用
 */
class WakeLockManager {
  constructor() {
    this.env = getEnvironment();
    this.isActive = false;
    this.wakeLock = null;           // Web WakeLock引用
    this.keepAwakeInterval = null;  // Tauri心跳定时器
    this.visibilityHandler = null;  // 页面可见性变化处理器
    console.log(`[WakeLock] 初始化完成，当前环境: ${this.env}`);
  }

  /**
   * 请求防休眠
   * @returns {Promise<boolean>} 是否成功激活
   */
  async request() {
    if (this.isActive) {
      console.log("[WakeLock] 防休眠已处于激活状态");
      return true;
    }
    try {
      console.log(`[WakeLock] 请求防休眠，环境: ${this.env}`);
      switch (this.env) {
        case "web":
          return await this.requestWebWakeLock();
        case "tauri":
          return await this.requestTauriWakeLock();
        case "capacitor":
          return await this.requestCapacitorWakeLock();
        default:
          console.warn("[WakeLock] 未知环境类型");
          return false;
      }
    } catch (error) {
      console.error("[WakeLock] 请求失败:", error);
      return false;
    }
  }

  /**
   * 释放防休眠
   */
  async release() {
    if (!this.isActive) {
      console.log("[WakeLock] 防休眠未激活，无需释放");
      return;
    }
    try {
      console.log(`[WakeLock] 释放防休眠，环境: ${this.env}`);
      switch (this.env) {
        case "web":
          await this.releaseWebWakeLock();
          break;
        case "tauri":
          await this.releaseTauriWakeLock();
          break;
        case "capacitor":
          await this.releaseCapacitorWakeLock();
          break;
      }
      this.isActive = false;
      // 清理页面可见性监听器
      if (this.visibilityHandler && typeof document !== "undefined") {
        document.removeEventListener("visibilitychange", this.visibilityHandler);
        this.visibilityHandler = null;
      }
    } catch (error) {
      console.error("[WakeLock] 释放失败:", error);
    }
  }

  /**
   * Web环境：使用 Navigator WakeLock API
   */
  async requestWebWakeLock() {
    if (typeof navigator === "undefined" || !("wakeLock" in navigator)) {
      console.warn("[WakeLock] 当前浏览器不支持 WakeLock API");
      console.warn("[WakeLock] 提示: 请使用 Chrome/Edge 浏览器，并确保是 HTTPS 或 localhost 环境");
      return false;
    }
    try {
      console.log("[WakeLock] 请求 Web Screen WakeLock...");
      this.wakeLock = await navigator.wakeLock.request("screen");
      this.isActive = true;
      console.log("[WakeLock] Web WakeLock 已成功启用");
      console.log("[WakeLock] 锁状态:", this.wakeLock.released ? "已释放" : "活跃中");

      // 监听系统释放事件
      this.wakeLock.addEventListener("release", () => {
        console.log("[WakeLock] Web WakeLock 已被系统释放");
      });

      // 页面可见性变化时重新请求
      if (typeof document !== "undefined") {
        this.visibilityHandler = async () => {
          if (document.visibilityState === "visible" && this.isActive) {
            try {
              console.log("[WakeLock] 页面变为可见，重新请求 WakeLock...");
              this.wakeLock = await navigator.wakeLock.request("screen");
              console.log("[WakeLock] 重新请求 WakeLock 成功");
            } catch (err) {
              console.error("[WakeLock] 重新请求 WakeLock 失败:", err.message);
            }
          } else if (document.visibilityState === "hidden") {
            console.log("[WakeLock] 页面隐藏，WakeLock 可能失效");
          }
        };
        document.addEventListener("visibilitychange", this.visibilityHandler);
      }
      return true;
    } catch (error) {
      console.error("[WakeLock] Web WakeLock 请求失败:", error.message);
      if (error.name === "NotAllowedError") {
        console.error("[WakeLock] 权限被拒绝，请确保:");
        console.error("[WakeLock]   1. 使用 HTTPS 或 localhost");
        console.error("[WakeLock]   2. 用户有交互操作(点击页面)");
      } else if (error.name === "NotSupportedError") {
        console.error("[WakeLock] 浏览器不支持 WakeLock API");
      }
      return false;
    }
  }

  async releaseWebWakeLock() {
    if (this.wakeLock) {
      await this.wakeLock.release();
      this.wakeLock = null;
      console.log("[WakeLock] Web WakeLock 已释放");
    }
  }

  /**
   * Tauri环境：调用原生 prevent_sleep 命令
   * 失败时降级为心跳方案（每30秒调用一次）
   */
  async requestTauriWakeLock() {
    try {
      console.log("[WakeLock] 开始加载 Tauri invoke 模块...");
      const { invoke } = await import("@tauri-apps/api/core");
      console.log("[WakeLock] Tauri invoke 模块加载成功");

      try {
        console.log("[WakeLock] 调用 prevent_sleep 命令...");
        await invoke("prevent_sleep");
        console.log("[WakeLock] Tauri 原生防休眠命令已成功启用");
      } catch (err) {
        console.error("[WakeLock] Tauri 原生命令调用失败:", err.message);
        console.warn("[WakeLock] 降级使用心跳方案...");
        this.keepAwakeInterval = setInterval(async () => {
          try {
            await invoke("prevent_sleep").catch(() => {});
          } catch {}
        }, 30000); // 每30秒心跳
        console.log("[WakeLock] 心跳方案已启动 (每30秒)");
      }
      this.isActive = true;
      console.log("[WakeLock] Tauri 防休眠状态: 已激活");
      return true;
    } catch (error) {
      console.error("[WakeLock] Tauri WakeLock 完全失败:", error.message);
      return false;
    }
  }

  async releaseTauriWakeLock() {
    if (this.keepAwakeInterval) {
      clearInterval(this.keepAwakeInterval);
      this.keepAwakeInterval = null;
      console.log("[WakeLock] Tauri 防休眠心跳已停止");
    }
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      await invoke("allow_sleep").catch(() => {});
    } catch {}
  }

  /**
   * Capacitor环境：使用 keep-awake 插件
   * 未安装时降级为 Web WakeLock
   */
  async requestCapacitorWakeLock() {
    try {
      const moduleName = "@capacitor-community/keep-awake";
      let KeepAwake;
      try {
        const module = await import(moduleName);
        KeepAwake = module.KeepAwake;
      } catch {
        console.warn("[WakeLock] Capacitor KeepAwake 插件未安装，降级使用 Web WakeLock API");
        return await this.requestWebWakeLock();
      }
      await KeepAwake.keepAwake();
      this.isActive = true;
      console.log("[WakeLock] Android KeepAwake 已启用");
      return true;
    } catch (error) {
      console.error("[WakeLock] Android KeepAwake 失败:", error);
      return await this.requestWebWakeLock();
    }
  }

  async releaseCapacitorWakeLock() {
    try {
      const moduleName = "@capacitor-community/keep-awake";
      let KeepAwake;
      try {
        const module = await import(moduleName);
        KeepAwake = module.KeepAwake;
      } catch {
        await this.releaseWebWakeLock();
        return;
      }
      await KeepAwake.allowSleep();
      console.log("[WakeLock] Android KeepAwake 已释放");
    } catch (error) {
      console.error("[WakeLock] 释放 Android KeepAwake 失败:", error);
      await this.releaseWebWakeLock();
    }
  }

  /**
   * 检查当前环境是否支持防休眠
   * @returns {boolean}
   */
  isSupported() {
    switch (this.env) {
      case "web":
        return typeof navigator !== "undefined" && "wakeLock" in navigator;
      case "tauri":
        return true;
      case "capacitor":
        return true;
      default:
        return false;
    }
  }

  /**
   * 获取环境信息
   * @returns {{env: string, envName: string, supported: boolean}}
   */
  getEnvironmentInfo() {
    const envNames = {
      web: "Web浏览器",
      tauri: "Tauri桌面应用",
      capacitor: "Android APK",
    };
    return {
      env: this.env,
      envName: envNames[this.env] || "未知环境",
      supported: this.isSupported(),
    };
  }
}

// 单例导出
export const wakeLockManager = new WakeLockManager();
export default wakeLockManager;
```

---

## 使用示例

```javascript
import { wakeLockManager } from "./wakeLock.js";

// 批量任务开始前请求防休眠
async function startBatchTasks() {
  const success = await wakeLockManager.request();
  if (success) {
    console.log("防休眠已激活，可以安全执行长时间任务");
  }
  // ... 执行批量任务
}

// 批量任务结束后释放
async function endBatchTasks() {
  await wakeLockManager.release();
  console.log("防休眠已释放");
}

// 获取环境信息
const info = wakeLockManager.getEnvironmentInfo();
console.log(info); // { env: 'web', envName: 'Web浏览器', supported: true }
```

---

## 关键参数说明

| 属性/方法 | 类型 | 说明 |
|-----------|------|------|
| `env` | string | 当前环境标识: 'web' / 'tauri' / 'capacitor' |
| `isActive` | boolean | 防休眠是否处于激活状态 |
| `wakeLock` | WakeLockSentinel | Web 环境的 WakeLock 引用 |
| `keepAwakeInterval` | number | Tauri 环境的心跳定时器 ID |
| `visibilityHandler` | function | 页面可见性变化回调 |
| `request()` | Promise<boolean> | 请求防休眠 |
| `release()` | Promise<void> | 释放防休眠 |
| `isSupported()` | boolean | 当前环境是否支持 |
| `getEnvironmentInfo()` | object | 获取环境详细信息 |

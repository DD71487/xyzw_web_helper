# 跨平台存储集成 (CrossPlatformStorage)

## 功能说明

CrossPlatformStorage 是一个跨平台本地存储管理类，支持浏览器、Tauri 桌面应用和 Capacitor Android 应用三种环境。它封装了 localStorage 操作，提供异步的 set/get/remove/clear 方法。

---

## 原始代码

```javascript
const isTauri = () => typeof window < "u" && "__TAURI_INTERNALS__" in window;
const isCapacitor = () => typeof window < "u" && "Capacitor" in window;

class CrossPlatformStorage {
  async set(e, o) {
    try {
      const a = typeof o == "string" ? o : JSON.stringify(o);
      return (isTauri() || isCapacitor(), localStorage.setItem(e, a), !0);
    } catch (a) {
      return (console.error(`[Storage] Failed to set ${e}:`, a), !1);
    }
  }
  async get(e, o = null) {
    try {
      let a;
      if ((isTauri() || isCapacitor(), (a = localStorage.getItem(e)), a == null)) return o;
      try {
        return JSON.parse(a);
      } catch {
        return a;
      }
    } catch (a) {
      return (console.error(`[Storage] Failed to get ${e}:`, a), o);
    }
  }
  async remove(e) {
    try {
      return (isTauri() || isCapacitor(), localStorage.removeItem(e), !0);
    } catch (o) {
      return (console.error(`[Storage] Failed to remove ${e}:`, o), !1);
    }
  }
  async clear() {
    try {
      return (localStorage.clear(), !0);
    } catch (e) {
      return (console.error("[Storage] Failed to clear:", e), !1);
    }
  }
  getEnvironment() {
    return isTauri() ? "tauri" : isCapacitor() ? "capacitor" : "browser";
  }
}

const storage = new CrossPlatformStorage();
```

---

## 翻译后代码 (使用 storage.js)

```javascript
// storage.js - 跨平台存储模块

const isTauri = () => typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
const isCapacitor = () => typeof window !== "undefined" && "Capacitor" in window;

/**
 * 跨平台存储管理类
 * 支持浏览器、Tauri桌面应用、Capacitor Android应用
 */
class CrossPlatformStorage {
  /**
   * 设置存储项
   * @param {string} key - 存储键名
   * @param {any} value - 存储值（对象会被自动JSON序列化）
   * @returns {Promise<boolean>} 是否成功
   */
  async set(key, value) {
    try {
      const serialized = typeof value === "string" ? value : JSON.stringify(value);
      // 检测环境（Tauri/Capacitor/Browser）
      const env = this.getEnvironment();
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error(`[Storage] 设置失败 ${key}:`, error);
      return false;
    }
  }

  /**
   * 获取存储项
   * @param {string} key - 存储键名
   * @param {any} defaultValue - 默认值（当键不存在时返回）
   * @returns {Promise<any>} 存储值
   */
  async get(key, defaultValue = null) {
    try {
      const raw = localStorage.getItem(key);
      if (raw == null) return defaultValue;
      try {
        return JSON.parse(raw);
      } catch {
        return raw; // 非JSON字符串直接返回
      }
    } catch (error) {
      console.error(`[Storage] 获取失败 ${key}:`, error);
      return defaultValue;
    }
  }

  /**
   * 移除存储项
   * @param {string} key - 存储键名
   * @returns {Promise<boolean>} 是否成功
   */
  async remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`[Storage] 移除失败 ${key}:`, error);
      return false;
    }
  }

  /**
   * 清空所有存储
   * @returns {Promise<boolean>} 是否成功
   */
  async clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("[Storage] 清空失败:", error);
      return false;
    }
  }

  /**
   * 获取当前运行环境
   * @returns {string} 'tauri' | 'capacitor' | 'browser'
   */
  getEnvironment() {
    if (isTauri()) return "tauri";
    if (isCapacitor()) return "capacitor";
    return "browser";
  }
}

// 单例导出
export const storage = new CrossPlatformStorage();
export default storage;
```

---

## 使用示例

```javascript
import { storage } from "./storage.js";

// 保存状态
await storage.set("batch_settings", { autoRun: true, delay: 500 });

// 读取状态
const settings = await storage.get("batch_settings", { autoRun: false });

// 移除状态
await storage.remove("batch_settings");

// 获取当前环境
const env = storage.getEnvironment(); // 'browser' | 'tauri' | 'capacitor'
```

---

## 关键参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| `key` | string | localStorage 键名 |
| `value` | any | 存储值，非字符串会自动 JSON.stringify |
| `defaultValue` | any | get 方法默认值 |
| 返回值 | boolean | set/remove/clear 返回是否成功 |

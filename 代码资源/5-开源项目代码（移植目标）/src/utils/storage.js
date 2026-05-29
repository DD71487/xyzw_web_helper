/**
 * 跨平台存储管理类
 * Web 环境专用版本（基于 localStorage）
 * 提供统一的异步存储接口
 */

/**
 * 跨平台存储管理类
 * 支持 localStorage 存储，自动序列化/反序列化 JSON
 */
class CrossPlatformStorage {
  /**
   * 设置存储项
   * @param {string} key - 存储键名
   * @param {any} value - 存储值（对象会被自动序列化为 JSON）
   * @returns {Promise<boolean>} 是否设置成功
   */
  async set(key, value) {
    try {
      // 如果值是字符串则直接存储，否则序列化为 JSON
      const serializedValue = typeof value === "string" ? value : JSON.stringify(value);

      // 使用 localStorage 存储
      localStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error(`[Storage] Failed to set ${key}:`, error);
      return false;
    }
  }

  /**
   * 获取存储项
   * @param {string} key - 存储键名
   * @param {any} defaultValue - 默认值（当键不存在时返回）
   * @returns {Promise<any>} 存储的值或默认值
   */
  async get(key, defaultValue = null) {
    try {
      // 从 localStorage 读取
      const storedValue = localStorage.getItem(key);

      // 如果键不存在，返回默认值
      if (storedValue == null) {
        return defaultValue;
      }

      // 尝试解析 JSON，如果失败则返回原始字符串
      try {
        return JSON.parse(storedValue);
      } catch {
        return storedValue;
      }
    } catch (error) {
      console.error(`[Storage] Failed to get ${key}:`, error);
      return defaultValue;
    }
  }

  /**
   * 移除存储项
   * @param {string} key - 要移除的键名
   * @returns {Promise<boolean>} 是否移除成功
   */
  async remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`[Storage] Failed to remove ${key}:`, error);
      return false;
    }
  }

  /**
   * 清空所有存储
   * @returns {Promise<boolean>} 是否清空成功
   */
  async clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("[Storage] Failed to clear:", error);
      return false;
    }
  }

  /**
   * 获取当前运行环境
   * @returns {string} 环境标识："web"
   */
  getEnvironment() {
    return "web";
  }
}

// 创建单例实例
const storage = new CrossPlatformStorage();

export { storage, CrossPlatformStorage };
export default storage;
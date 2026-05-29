/**
 * 跨平台屏幕唤醒锁管理器
 * Web 环境专用版本（基于 Navigator Wake Lock API）
 * 防止设备在运行任务时进入休眠状态
 */

/**
 * 屏幕唤醒锁管理器
 * 支持 Web 浏览器的 Wake Lock API
 */
class WakeLockManager {
  constructor() {
    // 当前运行环境
    this.env = "web";
    // 防休眠是否已激活
    this.isActive = false;
    // Web WakeLock 对象引用
    this.wakeLock = null;
    // 页面可见性变化监听器
    this.visibilityHandler = null;

    console.log(`[WakeLock] 初始化完成, 当前环境: ${this.env}`);
  }

  /**
   * 请求防休眠
   * Web 环境：使用 Navigator Wake Lock API
   * @returns {Promise<boolean>} 是否成功激活
   */
  async request() {
    // 如果已经激活，直接返回成功
    if (this.isActive) {
      console.log("[WakeLock] 防休眠已处于激活状态");
      return true;
    }

    try {
      console.log(`[WakeLock] 请求防休眠, 环境: ${this.env}`);
      return await this.requestWebWakeLock();
    } catch (error) {
      console.error("[WakeLock] 请求失败:", error);
      return false;
    }
  }

  /**
   * 释放防休眠
   * 清理 WakeLock 资源和事件监听器
   */
  async release() {
    // 如果未激活，无需释放
    if (!this.isActive) {
      console.log("[WakeLock] 防休眠未激活,无需释放");
      return;
    }

    try {
      console.log(`[WakeLock] 释放防休眠, 环境: ${this.env}`);
      await this.releaseWebWakeLock();

      // 重置激活状态
      this.isActive = false;

      // 移除页面可见性监听器
      if (this.visibilityHandler && typeof document !== "undefined") {
        document.removeEventListener("visibilitychange", this.visibilityHandler);
        this.visibilityHandler = null;
      }
    } catch (error) {
      console.error("[WakeLock] 释放失败:", error);
    }
  }

  /**
   * 请求 Web 平台屏幕唤醒锁
   * 使用 Navigator Wake Lock API
   * @returns {Promise<boolean>} 是否成功启用
   */
  async requestWebWakeLock() {
    // 检测浏览器是否支持 WakeLock API
    if (typeof navigator === "undefined" || !("wakeLock" in navigator)) {
      console.warn("[WakeLock] 当前浏览器不支持WakeLock API");
      console.warn("[WakeLock] 提示: 请使用Chrome/Edge浏览器,并确保是HTTPS或localhost环境");
      return false;
    }

    try {
      console.log("[WakeLock] 请求Web Screen WakeLock...");

      // 请求屏幕唤醒锁
      this.wakeLock = await navigator.wakeLock.request("screen");
      this.isActive = true;

      console.log("[WakeLock] Web WakeLock已成功启用");
      console.log("[WakeLock] 锁状态:", this.wakeLock.released ? "已释放" : "活跃中");

      // 监听锁被系统释放的事件
      this.wakeLock.addEventListener("release", () => {
        console.log("[WakeLock] WakeLock已被系统释放");
      });

      // 注册页面可见性变化监听器
      // 当页面从隐藏变为可见时，重新请求 WakeLock（因为页面隐藏时锁会自动释放）
      if (typeof document !== "undefined") {
        this.visibilityHandler = async () => {
          if (document.visibilityState === "visible" && this.isActive) {
            try {
              console.log("[WakeLock] 页面变为可见,重新请求WakeLock...");
              this.wakeLock = await navigator.wakeLock.request("screen");
              console.log("[WakeLock] 重新请求WakeLock成功");
            } catch (error) {
              console.error("[WakeLock] 重新请求WakeLock失败:", error.message);
            }
          } else if (document.visibilityState === "hidden") {
            console.log("[WakeLock] 页面隐藏,WakeLock可能失效");
          }
        };

        document.addEventListener("visibilitychange", this.visibilityHandler);
      }

      return true;
    } catch (error) {
      console.error("[WakeLock] Web WakeLock请求失败:", error.message);
      console.error("[WakeLock] 错误名称:", error.name);

      // 根据错误类型给出具体提示
      if (error.name === "NotAllowedError") {
        console.error("[WakeLock] 权限被拒绝,请确保:");
        console.error("[WakeLock]   1. 使用HTTPS或localhost");
        console.error("[WakeLock]   2. 用户有交互操作(点击页面)");
      } else if (error.name === "NotSupportedError") {
        console.error("[WakeLock] 浏览器不支持WakeLock API");
      }

      return false;
    }
  }

  /**
   * 释放 Web 平台屏幕唤醒锁
   */
  async releaseWebWakeLock() {
    if (this.wakeLock) {
      await this.wakeLock.release();
      this.wakeLock = null;
      console.log("[WakeLock] Web WakeLock已释放");
    }
  }

  /**
   * 获取当前状态
   * @returns {Object} 当前状态对象
   */
  getStatus() {
    return {
      isActive: this.isActive,
      env: this.env,
      hasWakeLock: this.wakeLock !== null,
      wakeLockReleased: this.wakeLock ? this.wakeLock.released : true,
    };
  }
}

// 创建单例实例
const wakeLockManager = new WakeLockManager();

export { WakeLockManager, wakeLockManager };
export default wakeLockManager;
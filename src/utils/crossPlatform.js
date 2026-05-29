/**
 * 跨平台工具函数
 * 提供环境检测、平台判断和跨平台兼容性处理
 * Web 环境专用版本（移除 Capacitor/Tauri 依赖）
 */

/**
 * 检测当前环境是否为 Tauri 桌面应用
 * @returns {boolean} 如果是 Tauri 环境返回 true，否则返回 false
 */
export const isTauri = () => {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
};

/**
 * 检测当前环境是否为 Capacitor 移动应用（Android/iOS）
 * @returns {boolean} 如果是 Capacitor 环境返回 true，否则返回 false
 */
export const isCapacitor = () => {
  return typeof window !== "undefined" && "Capacitor" in window;
};

/**
 * 检测当前环境是否为 Web 浏览器
 * @returns {boolean} 如果是 Web 环境返回 true
 */
export const isWeb = () => {
  return typeof window !== "undefined" && !isTauri() && !isCapacitor();
};

/**
 * 检测是否在 Android WebView 环境中
 * @returns {boolean} 是否为 Android WebView
 */
export const isAndroidWebView = () => {
  try {
    const userAgent = navigator.userAgent;
    return /Android/.test(userAgent) && /wv|WebView/.test(userAgent);
  } catch {
    return false;
  }
};

/**
 * 获取当前运行环境
 * @returns {string} 环境标识："web" | "tauri" | "capacitor"
 */
export const getEnvironment = () => {
  if (typeof window === "undefined") {
    return "web";
  }

  if (isTauri()) {
    console.log("[Environment] 检测到Tauri环境");
    return "tauri";
  }

  if (isCapacitor()) {
    console.log("[Environment] 检测到Capacitor环境");
    return "capacitor";
  }

  console.log("[Environment] 未检测到特殊环境,使用Web模式");
  return "web";
};

/**
 * 获取最优并发连接池大小
 * 根据浏览器类型返回推荐的并发数
 * @returns {number} 推荐的并发连接数
 */
export const getOptimalPoolSize = () => {
  const userAgent = navigator.userAgent;

  // 检测浏览器类型
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  const isFirefox = /Firefox/.test(userAgent);
  const isChromeOrEdge = /Chrome|Edge/.test(userAgent);

  // Web 环境固定返回 5
  return 5;
};

/**
 * 跨平台文件下载入口函数
 * Web 环境：使用 Blob URL 直接下载
 * @param {Blob} blob - 文件 Blob 对象
 * @param {string} filename - 文件名
 * @returns {Promise<boolean>} 是否下载成功
 */
export const downloadFile = async (blob, filename) => {
  try {
    console.log("[downloadFile] Web环境,使用直接下载");
    return await downloadWithBlob(blob, filename);
  } catch (error) {
    console.error("下载失败:", error);
    return false;
  }
};

/**
 * 使用 Blob URL 下载文件（Web 环境）
 * @param {Blob} blob - 文件 Blob 对象
 * @param {string} filename - 下载文件名
 * @returns {Promise<boolean>} 是否下载成功
 */
export const downloadWithBlob = (blob, filename) => {
  return new Promise((resolve, reject) => {
    try {
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = filename;
      link.style.display = "none";
      document.body.appendChild(link);

      // 触发点击事件
      if (document.createEvent) {
        const event = document.createEvent("MouseEvents");
        event.initMouseEvent(
          "click",
          true,
          true,
          window,
          1,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        );
        link.dispatchEvent(event);
      } else if (link.fireEvent) {
        link.fireEvent("onclick");
      } else {
        link.click();
      }

      // 延迟清理资源
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
        resolve(true);
      }, 100);
    } catch (error) {
      console.error("下载失败:", error);
      reject(error);
    }
  });
};

/**
 * 使用 DataURL 下载文件（降级方案）
 * @param {HTMLCanvasElement} canvas - 要导出的 Canvas 元素
 * @param {string} filename - 下载文件名
 * @returns {Promise<boolean>} 是否下载成功
 */
export const downloadWithDataURL = (canvas, filename) => {
  return new Promise((resolve, reject) => {
    try {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");

      link.href = dataUrl;
      link.download = filename;
      link.style.display = "none";
      document.body.appendChild(link);

      // 触发点击事件
      if (document.createEvent) {
        const event = document.createEvent("MouseEvents");
        event.initMouseEvent(
          "click",
          true,
          true,
          window,
          1,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        );
        link.dispatchEvent(event);
      } else if (link.fireEvent) {
        link.fireEvent("onclick");
      } else {
        link.click();
      }

      // 延迟清理资源
      setTimeout(() => {
        document.body.removeChild(link);
        resolve(true);
      }, 100);
    } catch (error) {
      console.error("DataURL导出失败:", error);
      reject(error);
    }
  });
};

/**
 * 导出 Canvas 为图片文件
 * 优先使用 Blob 方式，降级使用 DataURL
 * @param {HTMLCanvasElement} canvas - 要导出的 Canvas 元素
 * @param {string} filename - 下载文件名
 * @returns {Promise<boolean>} 是否导出成功
 */
export const exportCanvasToImage = (canvas, filename) => {
  return new Promise((resolve, reject) => {
    try {
      // 如果 Canvas 支持 toBlob 方法
      if (canvas.toBlob) {
        canvas.toBlob((blob) => {
          if (!blob) {
            // Blob 转换失败，降级使用 DataURL 方式
            console.error("Canvas转换Blob失败");
            downloadWithDataURL(canvas, filename).then(resolve).catch(reject);
            return;
          }

          // Web 环境：使用 Blob 下载
          downloadWithBlob(blob, filename).then(resolve).catch(reject);
        }, "image/png");
      } else {
        // 不支持 toBlob，使用 DataURL 方式
        downloadWithDataURL(canvas, filename).then(resolve).catch(reject);
      }
    } catch (error) {
      console.error("导出图片出错:", error);
      downloadWithDataURL(canvas, filename).then(resolve).catch(reject);
    }
  });
};
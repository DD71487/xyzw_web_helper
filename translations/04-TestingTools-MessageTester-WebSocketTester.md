# Testing Tools Translation - MessageTester & WebSocketTester

## Overview

This document provides translations for the testing utility modules:
- **MessageTester** (`MessageTester-Ceq9D2Es.js`) - Message encryption/decryption testing tool
- **WebSocketTester** (`WebSocketTester-DyA8ulah.js`) - WebSocket connection testing tool

---

## 1. MessageTester Module

### Original File: `MessageTester-Ceq9D2Es.js`

### Imports (Lines 1-31)

```javascript
import {
  x as useTokenStore,
  s as useMessage,
  r as ref,
  p as computed,
  G as gameMessage,
  y as watch,
  c as createElement,
  b as createBlock,
  w as withCtx,
  d as resolveComponent,
  h as render,
  A as withDirectives,
  a as createVNode,
  u as unref,
  e as openBlock,
  i as isRef,
  t as toDisplayString,
  F as Fragment,
  g as renderList,
  E as withModifiers,
  an as dynamicImport,
} from "./index-UoU16364.js";
import { _ as pluginExportHelper } from "./_plugin-vue_export-helper-DlAUqK2U.js";
import { A as AlertCircleIcon } from "./AlertCircleOutline-BnovXsGQ.js";
```

---

### Component: MessageTester

### Original Code Location: Lines 62-1195

### Description
A comprehensive message testing utility that allows users to test WebSocket connections, send custom game commands, decode BON (Binary Object Notation) messages, analyze binary files, and monitor message traffic in real-time.

### Translated Code

```javascript
const MessageTester = {
  __name: "MessageTester",
  setup(props) {
    const tokenStore = useTokenStore(),
      message = useMessage(),
      selectedCommand = ref(""),
      messageBody = ref("{}"),
      messageHistory = ref([]);
    ref(0);
    const lastMessage = ref(null),
      extractMeta = (data) => {
        if (!data || typeof data != "object") return {};
        const raw = data._raw || data,
          meta = {};
        return (
          typeof raw.seq == "number" && (meta.seq = raw.seq),
          typeof raw.ack == "number" && (meta.ack = raw.ack),
          typeof raw.resp == "number" && (meta.resp = raw.resp),
          typeof raw.time == "number" && (meta.time = raw.time),
          meta
        );
      },
      tokenOptions = computed(() => tokenStore.gameTokens.map((token) => ({ label: token.name, value: token.id }))),
      connectionStatus = computed(() => (selectedToken.value ? tokenStore.getWebSocketStatus(selectedToken.value) : "disconnected")),
      statusTagType = computed(() => {
        switch (connectionStatus.value) {
          case "connected":
            return "success";
          case "connecting":
            return "warning";
          case "error":
            return "error";
          default:
            return "default";
        }
      }),
      statusDisplayText = computed(() => {
        switch (connectionStatus.value) {
          case "connected":
            return "🟢 Connected";
          case "connecting":
            return "🟡 Connecting";
          case "error":
            return "🔴 Connection Error";
          default:
            return "⚪ Disconnected";
        }
      }),
      isConnected = computed(() => selectedToken.value && connectionStatus.value === "connected"),
      connectWebSocket = () => {
        if (!selectedToken.value) {
          message.error("Please select a token first");
          return;
        }
        const token = tokenStore.gameTokens.find((t) => t.id === selectedToken.value);
        if (token) {
          console.log("🔧 MessageTester: Starting WebSocket connection", {
            tokenId: selectedToken.value,
            tokenName: token.name,
            hasToken: !!token.token,
          });
          try {
            (tokenStore.selectToken(selectedToken.value), message.success("Establishing WebSocket connection..."));
          } catch (err) {
            (console.error("❌ MessageTester: WebSocket connection failed", err), message.error("WebSocket connection failed: " + err.message));
          }
        } else message.error("Selected token not found");
      },
      handleBinFileUpload = async (event) => {
        const { g_utils } = await dynamicImport(
            async () => {
              const { g_utils } = await import("./index-UoU16364.js").then((mod) => mod.b4);
              return { g_utils };
            },
            __vite__mapDeps([0, 1])
          ),
          file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        (reader.readAsArrayBuffer(file),
          (reader.onload = (e) => {
            const result = event.target.result,
              uint8Array = new Uint8Array(result);
            g_utils.bon.decode(uint8Array);
            const parsed = g_utils.parse(uint8Array),
              decoded = g_utils.bon.decode(parsed.body);
            (console.log(parsed, decoded),
              addMessage("test", { testType: "BIN File Decode", input: Array.from(decoded), output: decoded, status: "success" }, parsed.cmd));
          }),
          (reader.onerror = () => {
            message.error("File read failed, please retry");
          }));
      },
      testBonDecode = async () => {
        try {
          const { g_utils } = await dynamicImport(
              async () => {
                const { g_utils } = await import("./index-UoU16364.js").then((mod) => mod.b4);
                return { g_utils };
              },
              __vite__mapDeps([0, 1])
            ),
            testData = new Uint8Array([8, 2, 5, 4, 114, 111, 108, 101]);
          if (
            (console.log("🧪 BON decode test starting"),
            console.log("🔍 g_utils availability check:", {
              hasGUtils: !!g_utils,
              hasBon: !!(g_utils && g_utils.bon),
              hasBonDecode: !!(g_utils && g_utils.bon && g_utils.bon.decode),
            }),
            g_utils && g_utils.bon && g_utils.bon.decode)
          ) {
            console.log("📥 Test data:", testData);
            const decoded = g_utils.bon.decode(testData);
            (console.log("✅ BON decode successful:", decoded),
              message.success(`BON decoder working normally: ${JSON.stringify(decoded)}`),
              addMessage(
                "test",
                { testType: "BON Decode Test", input: Array.from(testData), output: decoded, status: "success" },
                "bon_decode_test"
              ));
          } else
            (console.error("❌ BON decoder not available"),
              message.error("BON decoder not available"),
              addMessage("test", { testType: "BON Decode Test", error: "BON decoder not available", status: "error" }, "bon_decode_test"));
        } catch (err) {
          (console.error("❌ BON decode test failed:", err),
            message.error("BON decode test failed: " + err.message),
            addMessage("test", { testType: "BON Decode Test", error: err.message, status: "error" }, "bon_decode_test"));
        }
      },
      addMessage = (type, data, command = null, extraMeta = {}) => {
        if (type !== "test" && (command === "_sys/ack" || command === "heartbeat")) return null;
        const meta = { ...extractMeta(data), ...extraMeta },
          entry = { type, timestamp: new Date().toISOString(), cmd: command, data, meta };
        return (messageHistory.value.unshift(entry), messageHistory.value.length > 50 && (messageHistory.value = messageHistory.value.slice(0, 50)), entry);
      },
      sendHeartbeat = () => {
        if (!isConnected.value) return;
        tokenStore.sendHeartbeat(selectedToken.value) ? message.success("Heartbeat message sent") : message.error("Heartbeat message send failed");
      },
      sendGetRoleInfo = () => {
        if (!isConnected.value) return;
        tokenStore.sendGetRoleInfo(selectedToken.value)
          ? (addMessage("sent", { cmd: "role_getroleinfo" }, "role_getroleinfo"), message.success("Role info request sent"))
          : message.error("Role info request send failed");
      },
      sendGetDataBundleVersion = () => {
        if (!isConnected.value) return;
        tokenStore.sendGameMessage(selectedToken.value, "system_getdatabundlever", { isAudit: false })
          ? (addMessage("sent", { cmd: "system_getdatabundlever" }, "system_getdatabundlever"), message.success("Data version request sent"))
          : message.error("Data version request send failed");
      },
      sendSignInReward = () => {
        if (!isConnected.value) return;
        tokenStore.sendGameMessage(selectedToken.value, "system_signinreward", {})
          ? (addMessage("sent", { cmd: "system_signinreward" }, "system_signinreward"), message.success("Sign-in request sent"))
          : message.error("Sign-in request send failed");
      },
      sendCustomMessage = () => {
        if (!(!isConnected.value || !selectedCommand.value))
          try {
            const body = JSON.parse(messageBody.value || "{}");
            let entry = null;
            const meta = {};
            tokenStore.sendGameMessage(selectedToken.value, selectedCommand.value, body, {
              onSent: (sent = {}) => {
                const sentMeta = {};
                (typeof sent.seq == "number" && (sentMeta.seq = sent.seq),
                  typeof sent.ack == "number" && (sentMeta.ack = sent.ack),
                  typeof sent.time == "number" && (sentMeta.time = sent.time),
                  entry ? (entry.meta = { ...entry.meta, ...sentMeta }) : Object.keys(sentMeta).length > 0 && Object.assign(meta, sentMeta));
              },
            })
              ? ((entry = addMessage("sent", { cmd: selectedCommand.value, body: body }, selectedCommand.value, meta) || null),
                message.success(`Custom message ${selectedCommand.value} sent`),
                (selectedCommand.value = ""),
                (messageBody.value = "{}"))
              : message.error("Custom message send failed");
          } catch (err) {
            message.error("Message body JSON format error: " + err.message);
          }
      },
      formatTimestamp = (timestamp) => new Date(timestamp).toLocaleTimeString(),
      getSequenceNumber = (entry) => {
        var meta, raw;
        if (!entry) return;
        if (((meta = entry.meta) == null ? void 0 : meta.seq) !== undefined) return entry.meta.seq;
        const data = ((raw = entry.data) == null ? void 0 : raw._raw) || entry.data;
        return typeof (data == null ? void 0 : data.seq) == "number" ? data.seq : undefined;
      },
      getAckNumber = (entry) => {
        var meta, raw;
        if (!entry) return;
        if (((meta = entry.meta) == null ? void 0 : meta.ack) !== undefined) return entry.meta.ack;
        const data = ((raw = entry.data) == null ? void 0 : raw._raw) || entry.data;
        return typeof (data == null ? void 0 : data.ack) == "number" ? data.ack : undefined;
      },
      hasSequenceOrAck = (entry) => getSequenceNumber(entry) !== undefined || getAckNumber(entry) !== undefined,
      getTagType = (type) =>
        type
          ? type.includes("error") || type.includes("fail")
            ? "error"
            : type.includes("resp") || type.includes("response")
              ? "success"
              : type.includes("get") || type.includes("info")
                ? "info"
                : type.includes("send") || type.includes("start")
                  ? "primary"
                  : "default"
          : "default",
      formatSize = (data) => {
        try {
          const json = JSON.stringify(data),
            bytes = new TextEncoder().encode(json).length;
          return bytes < 1024
            ? `${bytes}B`
            : bytes < 1024 * 1024
              ? `${(bytes / 1024).toFixed(1)}KB`
              : `${(bytes / 1024 / 1024).toFixed(1)}MB`;
        } catch {
          return "Unknown size";
        }
      },
      formatData = (data) => {
        var raw, decoded, rawData;
        if (!data) return "Empty data";
        try {
          let result = data;
          (((raw = data._raw) != null && raw.decodedBody) || data.decodedBody)
            ? (result = ((decoded = data._raw) == null ? void 0 : decoded.decodedBody) || data.decodedBody)
            : (((rawData = data._raw) != null && rawData.rawData) || data.rawData) &&
              (result = ((raw = data._raw) == null ? void 0 : raw.rawData) || data.rawData);
          const json = JSON.stringify(result);
          return json.length > 150 ? json.substring(0, 150) + "..." : json;
        } catch {
          return "Data parsing failed";
        }
      },
      clearHistory = () => {
        ((messageHistory.value = []), (lastMessage.value = null), message.success("Message history cleared"));
      },
      exportHistory = () => {
        try {
          const data = { exportTime: new Date().toISOString(), tokenId: selectedToken.value, messages: messageHistory.value },
            json = JSON.stringify(data, null, 2),
            blob = new Blob([json], { type: "application/json" }),
            url = URL.createObjectURL(blob),
            link = document.createElement("a");
          ((link.href = url),
            (link.download = `message-history-${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.json`),
            document.body.appendChild(link),
            link.click(),
            document.body.removeChild(link),
            URL.revokeObjectURL(url),
            message.success("Message history exported"));
        } catch (err) {
          message.error("Export failed: " + err.message);
        }
      },
      copyToClipboard = async (text) => {
        try {
          (await navigator.clipboard.writeText(text), message.success("Copied to clipboard"));
        } catch {
          const textarea = document.createElement("textarea");
          ((textarea.value = text),
            document.body.appendChild(textarea),
            textarea.select(),
            document.execCommand("copy"),
            document.body.removeChild(textarea),
            message.success("Copied to clipboard"));
        }
      },
      copyFormatted = (entry) => {
        const text = `[${entry.type.toUpperCase()}] ${formatTimestamp(entry.timestamp)} - ${entry.cmd || "No command"}
${JSON.stringify(entry.data, null, 2)}`;
        copyToClipboard(text);
      },
      copyJson = (entry) => {
        copyToClipboard(JSON.stringify(entry, null, 2));
      },
      copyRaw = (entry) => {
        copyToClipboard(formatData(entry));
      },
      copyCompact = (entry) => {
        copyToClipboard(JSON.stringify(entry, null, 2));
      },
      copyMinified = (entry) => {
        copyToClipboard(JSON.stringify(entry));
      },
      getDataType = (data) => {
        if (!data) return "null";
        if (Array.isArray(data)) return `[Array: ${data.length} items]`;
        if (data instanceof Uint8Array) return `[Uint8Array: ${data.length} bytes]`;
        if (typeof data == "object" && data.constructor === Object) {
          const keys = Object.keys(data);
          if (keys.every((key) => !isNaN(parseInt(key)))) return `[NumericObject: ${keys.length} entries]`;
        }
        return "[Unknown format]";
      },
      isBinaryData = (data) => {
        if (!data) return false;
        if (Array.isArray(data) || data instanceof Uint8Array) return true;
        if (typeof data == "object" && data.constructor === Object) {
          const keys = Object.keys(data);
          return keys.length > 0 && keys.every((key) => !isNaN(parseInt(key)));
        }
        return false;
      },
      formatJson = (data, maxDepth = 10, currentDepth = 0) => {
        try {
          if (!data) return "null";
          if (currentDepth > maxDepth) return "[Exceeded max depth limit]";
          let result = data;
          const raw = data._raw || data;
          if (raw.decodedBody || data.decodedBody) {
            const decoded = raw.decodedBody || data.decodedBody,
              original = raw.body || data.body;
            data._raw
              ? (result = { ...data, _raw: { ...data._raw, body: decoded, _originalBody: getDataType(original), _note: "body auto BON decoded" } })
              : (result = { ...data, body: decoded, _originalBody: getDataType(original), _note: "body auto BON decoded" });
          } else if (raw.rawData || data.rawData) {
            const rawData = raw.rawData || data.rawData;
            data._raw
              ? (result = { ...data, _raw: { ...data._raw, body: rawData, _note: "body used rawData decode" } })
              : (result = { ...data, body: rawData, _note: "body used rawData decode" });
          } else
            ((raw.body && isBinaryData(raw.body)) || (data.body && isBinaryData(data.body))) &&
              (result = { ...data, _note: "body is raw data, may need BON decode" });
          const seen = new WeakSet();
          return JSON.stringify(
            result,
            (key, value) => {
              if (typeof value == "object" && value !== null) {
                if (seen.has(value)) return "[Circular reference]";
                seen.add(value);
              }
              return (typeof value == "string" || Array.isArray(value), value);
            },
            2
          );
        } catch (err) {
          return `[JSON serialization error: ${err.message}]`;
        }
      };
    return (
      watch(
        () => tokenStore.wsConnections,
        (connections) => {
          if (!selectedToken.value || !connections[selectedToken.value]) return;
          const connection = connections[selectedToken.value];
          if (connection.lastMessage) {
            const msg = connection.lastMessage;
            if (lastMessage.value && lastMessage.value.timestamp === msg.timestamp) return;
            const data = msg.data || msg,
              cmd = data.cmd || msg.cmd;
            cmd && cmd !== "_sys/ack" && cmd !== "heartbeat" && (addMessage("received", data, cmd), (lastMessage.value = msg));
          }
        },
        { deep: true }
      ),
      // ... render function
    );
  },
};
```

---

### MessageTester Features

| Feature | Description |
|---------|-------------|
| **Token Selection** | Choose which game token to test |
| **Connection Status** | Real-time WebSocket status display |
| **BON Decode Test** | Test Binary Object Notation decoder |
| **BIN File Analysis** | Upload and analyze binary message files |
| **Preset Commands** | Quick-send common game commands |
| **Custom Messages** | Send arbitrary commands with JSON body |
| **Message History** | View last 50 messages with metadata |
| **Auto-Monitoring** | Watch for incoming messages in real-time |
| **Export** | Save message history to JSON file |
| **Copy Formats** | Copy as formatted, raw, compact, or minified |

---

## 2. WebSocketTester Module

### Original File: `WebSocketTester-DyA8ulah.js`

### Imports (Lines 1-22)

```javascript
import {
  s as useMessage,
  x as useTokenStore,
  r as ref,
  p as computed,
  o as onMounted,
  M as onUnmounted,
  c as createElement,
  b as createBlock,
  w as withCtx,
  d as resolveComponent,
  h as render,
  e as openBlock,
  A as withDirectives,
  i as isRef,
  t as toDisplayString,
  a as createVNode,
  F as Fragment,
  g as renderList,
  E as withModifiers,
} from "./index-UoU16364.js";
import { _ as pluginExportHelper } from "./_plugin-vue_export-helper-DlAUqK2U.js";
```

---

### Component: WebSocketTester

### Original Code Location: Lines 29-559

### Description
A dedicated WebSocket connection testing tool that provides connection management, command execution, and concurrent request testing capabilities.

### Translated Code

```javascript
const WebSocketTester = {
  __name: "WebSocketTester",
  setup(props) {
    const message = useMessage(),
      tokenStore = useTokenStore(),
      selectedToken = ref(null),
      connectionStatus = ref("disconnected"),
      connectionInfo = ref(null),
      selectedCommand = ref(null),
      commandParams = ref("{}"),
      isSending = ref(false),
      isSendingWithPromise = ref(false),
      isConcurrentTesting = ref(false),
      messageLog = ref([]),
      tokenOptions = computed(() => tokenStore.gameTokens.map((token) => ({ label: `${token.name} (${token.server})`, value: token.id }))),
      presetCommands = [
        { label: "Get Role Info", value: "role_getroleinfo" },
        { label: "Get Data Bundle Version", value: "system_getdatabundlever" },
        { label: "Sign-in Reward", value: "system_signinreward" },
        { label: "Claim Daily Task Reward", value: "task_claimdailyreward" },
        { label: "Get Mail List", value: "mail_getlist" },
        { label: "Claim All Mail Attachments", value: "mail_claimallattachment" },
        { label: "Get Legion Info", value: "legion_getinfo" },
        { label: "Hero Recruit", value: "hero_recruit" },
        { label: "Claim Hang-up Reward", value: "system_claimhangupreward" },
      ],
      getTagType = (status) =>
        ({
          connected: "success",
          connecting: "warning",
          disconnected: "default",
          reconnecting: "info",
          error: "error",
        })[status] || "default",
      getStatusText = (status) =>
        ({
          connected: "Connected",
          connecting: "Connecting",
          disconnected: "Disconnected",
          reconnecting: "Reconnecting",
          error: "Connection Error",
        })[status] || "Unknown Status",
      formatDate = (date) => (date ? new Date(date).toLocaleString("zh-CN") : "-"),
      refreshStatus = () => {
        updateStatus();
      },
      updateStatus = () => {
        if (!selectedToken.value) {
          ((connectionStatus.value = "disconnected"), (connectionInfo.value = null));
          return;
        }
        connectionStatus.value = tokenStore.getWebSocketStatus(selectedToken.value);
        const connection = tokenStore.wsConnections[selectedToken.value];
        connection
          ? (connectionInfo.value = { roleId: selectedToken.value, status: connection.status, connectedAt: connection.connectedAt, wsUrl: connection.wsUrl })
          : (connectionInfo.value = null);
      },
      connectWebSocket = async () => {
        if (!selectedToken.value) {
          message.error("Please select a Token first");
          return;
        }
        try {
          connectionStatus.value = "connecting";
          const token = tokenStore.gameTokens.find((t) => t.id === selectedToken.value);
          if (!token) {
            message.error("Token data not found");
            return;
          }
          (tokenStore.createWebSocketConnection(selectedToken.value, token.token, token.wsUrl),
            startStatusPolling(),
            message.success("WebSocket connection started"));
        } catch (err) {
          (console.error("WebSocket connection failed:", err), message.error("WebSocket connection failed: " + err.message));
        } finally {
          setTimeout(updateStatus, 1000);
        }
      },
      disconnectWebSocket = () => {
        selectedToken.value &&
          (tokenStore.closeWebSocketConnection(selectedToken.value),
          (connectionStatus.value = "disconnected"),
          (connectionInfo.value = null),
          message.info("WebSocket connection disconnected"));
      },
      sendCommand = async () => {
        if (!selectedCommand.value) {
          message.error("Please select a command to send");
          return;
        }
        try {
          isSending.value = true;
          let params = {};
          (commandParams.value.trim() && (params = JSON.parse(commandParams.value)),
            tokenStore.sendMessage(selectedToken.value, selectedCommand.value, params)
              ? (addLog("sent", { command: selectedCommand.value, params: params }), message.success("Command sent successfully"))
              : message.error("Command send failed"));
        } catch (err) {
          (console.error("Send command failed:", err), message.error("Send command failed: " + err.message));
        } finally {
          isSending.value = false;
        }
      },
      sendCommandWithPromise = async () => {
        if (!selectedCommand.value) {
          message.error("Please select a command to send");
          return;
        }
        try {
          isSendingWithPromise.value = true;
          let params = {};
          commandParams.value.trim() && (params = JSON.parse(commandParams.value));
          const response = await tokenStore.sendMessageWithPromise(selectedToken.value, selectedCommand.value, params);
          (addLog("sent", { command: selectedCommand.value, params: params }),
            addLog("received", response),
            message.success("Command executed successfully, response received"));
        } catch (err) {
          (console.error("Send command failed:", err), message.error("Send command failed: " + err.message));
        } finally {
          isSendingWithPromise.value = false;
        }
      },
      testConcurrency = async () => {
        if (!selectedCommand.value) {
          message.error("Please select a command to send");
          return;
        }
        try {
          isConcurrentTesting.value = true;
          let params = {};
          (commandParams.value.trim() && (params = JSON.parse(commandParams.value)),
            addLog("sent", { message: "Starting concurrency test: sending 5 identical commands simultaneously", command: selectedCommand.value, params: params }));
          const promises = [],
            startTime = Date.now();
          for (let i = 0; i < 5; i++) {
            const promise = tokenStore
              .sendMessageWithPromise(selectedToken.value, selectedCommand.value, { ...params, requestIndex: i + 1 })
              .then((response) => ({ requestIndex: i + 1, response: response, success: true }))
              .catch((err) => ({ requestIndex: i + 1, error: err.message, success: false }));
            promises.push(promise);
          }
          const results = await Promise.allSettled(promises),
            endTime = Date.now(),
            successCount = results.filter((result) => result.status === "fulfilled" && result.value.success).length,
            failCount = results.length - successCount;
          (addLog("received", {
            message: "Concurrency test complete",
            totalRequests: 5,
            successCount: successCount,
            failCount: failCount,
            duration: `${endTime - startTime}ms`,
            results: results.map((result) => (result.status === "fulfilled" ? result.value : { error: result.reason })),
          }),
            successCount === 5
              ? message.success(`Concurrency test successful! All 5 requests responded correctly, took ${endTime - startTime}ms`)
              : successCount > 0
                ? message.warning(`Concurrency test partially successful: ${successCount} success, ${failCount} failed`)
                : message.error("Concurrency test failed: All requests failed"));
        } catch (err) {
          (console.error("Concurrency test failed:", err),
            message.error("Concurrency test failed: " + err.message),
            addLog("received", { message: "Concurrency test exception", error: err.message }));
        } finally {
          isConcurrentTesting.value = false;
        }
      },
      startStatusPolling = () => {},
      addLog = (type, data) => {
        (messageLog.value.unshift({ type: type, data: data, timestamp: new Date().toISOString() }),
          messageLog.value.length > 100 && (messageLog.value = messageLog.value.slice(0, 100)));
      },
      clearLog = () => {
        messageLog.value = [];
      };
    let statusInterval = null;
    return (
      onMounted(() => {
        statusInterval = setInterval(() => {
          selectedToken.value && updateStatus();
        }, 1000);
      }),
      onUnmounted(() => {
        statusInterval && clearInterval(statusInterval);
      }),
      // ... render function
    );
  },
};
```

---

### WebSocketTester Features

| Feature | Description |
|---------|-------------|
| **Token Selection** | Select game token for testing |
| **Connection Status** | Real-time status with color-coded tags |
| **Connect/Disconnect** | Manual WebSocket connection control |
| **Connection Details** | Shows role ID, status, URL, connection time |
| **Preset Commands** | 9 common game commands for quick testing |
| **Custom Parameters** | JSON parameter input for commands |
| **Send Command** | Fire-and-forget message sending |
| **Send & Wait** | Send command and await response |
| **Concurrency Test** | Send 5 simultaneous requests and measure performance |
| **Message Log** | View last 100 messages with timestamps |
| **Auto-Refresh** | Status updates every 1 second |

---

## Common Game Commands Reference

### MessageTester Preset Commands

| Command | Description |
|---------|-------------|
| `role_getroleinfo` | Get player role information |
| `system_getdatabundlever` | Get data bundle version |
| `system_signinreward` | Daily sign-in reward |

### WebSocketTester Preset Commands

| Command | Description |
|---------|-------------|
| `role_getroleinfo` | Get player role information |
| `system_getdatabundlever` | Get data bundle version |
| `system_signinreward` | Daily sign-in reward |
| `task_claimdailyreward` | Claim daily task reward |
| `mail_getlist` | Get mail list |
| `mail_claimallattachment` | Claim all mail attachments |
| `legion_getinfo` | Get legion/club information |
| `hero_recruit` | Recruit hero |
| `system_claimhangupreward` | Claim hang-up/AFK reward |

---

## Connection Status States

### Status Mapping

| Status | Tag Type | Display Text |
|--------|----------|--------------|
| `connected` | success | 🟢 Connected |
| `connecting` | warning | 🟡 Connecting |
| `disconnected` | default | ⚪ Disconnected |
| `reconnecting` | info | 🔄 Reconnecting |
| `error` | error | 🔴 Connection Error |

---

## Message Log Structure

### MessageTester Log Entry

```javascript
{
  type: "sent" | "received" | "test",
  timestamp: "2024-01-01T12:00:00.000Z",
  cmd: "role_getroleinfo",
  data: { ... },
  meta: {
    seq: 123,
    ack: 456,
    resp: 789,
    time: 1704110400
  }
}
```

### WebSocketTester Log Entry

```javascript
{
  type: "sent" | "received",
  data: {
    command: "role_getroleinfo",
    params: { ... },
    response: { ... }
  },
  timestamp: "2024-01-01T12:00:00.000Z"
}
```

---

## BON (Binary Object Notation) Decoding

### Test Data

```javascript
const testData = new Uint8Array([8, 2, 5, 4, 114, 111, 108, 101]);
// Represents encoded binary game message data
```

### Decode Process

```javascript
// 1. Import g_utils module
const { g_utils } = await import("./index-UoU16364.js").then((mod) => mod.b4);

// 2. Check decoder availability
const hasDecoder = g_utils && g_utils.bon && g_utils.bon.decode;

// 3. Decode binary data
const decoded = g_utils.bon.decode(uint8Array);

// 4. Parse message structure
const parsed = g_utils.parse(uint8Array);
const body = g_utils.bon.decode(parsed.body);
```

---

## Concurrency Test Results

### Success Criteria

| Result | Condition |
|--------|-----------|
| **All Success** | 5/5 requests succeed |
| **Partial Success** | 1-4 requests succeed |
| **All Failed** | 0/5 requests succeed |

### Metrics Collected

```javascript
{
  totalRequests: 5,
  successCount: 3,
  failCount: 2,
  duration: "150ms",
  results: [
    { requestIndex: 1, response: {...}, success: true },
    { requestIndex: 2, error: "Timeout", success: false },
    // ...
  ]
}
```

---

## Error Handling

### Connection Errors

| Error | Handling |
|-------|----------|
| Token not selected | Show error message, prompt selection |
| Token not found | Show "Token data not found" error |
| Connection timeout | Set status to "error", log to console |
| Send failure | Return false, show error notification |

### Parse Errors

| Error | Handling |
|-------|----------|
| Invalid JSON | Catch exception, show "JSON format error" |
| BON decode fail | Log error, show "Decoder not available" |
| File read fail | Show "File read failed" error |

---

## UI Components Used

### MessageTester Components

| Component | Source |
|-----------|--------|
| n-select | Naive UI |
| n-tag | Naive UI |
| n-button | Naive UI |
| n-icon | Naive UI |
| n-popover | Naive UI |
| n-divider | Naive UI |
| n-input | Naive UI |
| n-space | Naive UI |
| n-tab-pane | Naive UI |
| n-tabs | Naive UI |
| n-collapse-item | Naive UI |
| n-collapse | Naive UI |
| n-card | Naive UI |

### WebSocketTester Components

| Component | Source |
|-----------|--------|
| n-tag | Naive UI |
| n-button | Naive UI |
| n-space | Naive UI |
| n-card | Naive UI |
| n-select | Naive UI |
| n-form-item | Naive UI |
| n-descriptions-item | Naive UI |
| n-text | Naive UI |
| n-descriptions | Naive UI |
| n-input | Naive UI |

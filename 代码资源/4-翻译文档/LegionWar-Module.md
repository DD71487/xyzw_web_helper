# LegionWar Module Translation

## Overview

The `LegionWar-RziOsa7H.js` file implements a comprehensive Legion War (Salt Field Battle / 盐场战) visualization and management system. It provides real-time battlefield mapping, club ranking statistics, and personal battle records using an interactive hexagonal grid canvas.

---

## Module Structure

### Imports (Lines 1-21)

```javascript
import { H as HexGrid, e as processBattleData, t as getColor, f as formatPower } from "./legionWar-5YonzZw2.js";
import { g as formatDate, X as WebSocketClient } from "./DateTimeUtils-CyGYuA3B.js";
import {
  x as useTokenStore,
  s as ref,
  r as reactive,
  p as computed,
  o as onMounted,
  M as onUnmounted,
  c as createElement,
  a as createVNode,
  b as createBlock,
  i as isRef,
  w as withCtx,
  d as resolveComponent,
  t as toDisplayString,
  h as render,
  E as withModifiers,
  u as unref,
} from "./index-UoU16364.js";
import { _ as pluginExportHelper } from "./_plugin-vue_export-helper-DlAUqK2U.js";
```

---

## Component: LegionWar

### Original Code Location: Lines 35-556

### Description
Main Legion War component that renders an interactive hexagonal battlefield map, displays club rankings, and shows personal battle statistics.

### Translated Code

```javascript
const LegionWar = {
  __name: "LegionWar",
  setup(props) {
    const tokenStore = useTokenStore(),
      message = useMessage(),
      wsClient = null,
      canvasRef = ref(null),
      isInBattlefield = ref(false),
      currentTime = ref(formatDate("yyyy-MM-dd HH:mm:ss"));
    computed(() => ((wsClient == null ? void 0 : wsClient.status) === "connected" ? "Connected" : "Disconnected"));
    const connectionStatus = computed(() => ((wsClient == null ? void 0 : wsClient.status) === "connected" ? "connected" : "disconnected")),
      statusClass = computed(() => (isInBattlefield.value ? "status-connected" : "status-disconnected"));
    computed(() => (connectionStatus == null ? void 0 : connectionStatus.value) === "connected");
    const isLoading = ref(false),
      showPersonalStats = ref(false),
      handleUpdate = function (data) {
        drawMap();
      },
      sendClubStats = async function () {
        let clubs = Object.values(battleData.value.legionInfo);
        const messages = [];
        for (let group = 0; group < 2; group++) {
          let text = "";
          for (let i = 0; i < 10; i++) {
            const club = clubs[i + group * 10];
            (i != 0 &&
              (text += `
`),
              (text += club.name + ":Remaining" + (150 - club.reviveCount)));
          }
          messages.push(text);
        }
        const tokenId = tokenStore.selectedToken.id,
          delay = 1500;
        for (let i = 0; i < messages.length; i++) {
          await wait(delay);
          try {
            await tokenStore.sendMessageToLegion(tokenId, messages[i]);
          } catch (err) {
            err.message.includes("Too frequent") &&
              (await wait(delay * 2), await tokenStore.sendMessageToLegion(tokenId, messages[i]));
          }
        }
      },
      canvasContainer = ref(null);
    let canvasContext = null;
    const pixelRatio = window.devicePixelRatio || 1;
    let resizeHandler = null;
    const hexRadius = 2 * HEX_SIZE,
      hexHeight = Math.sqrt(3) * HEX_SIZE,
      gridMap = Array.from({ length: 41 }, () => Array.from({ length: 41 }, () => 0));
    let maxCoords = [0, 0],
      battleData = ref(null);
    const rawBattleData = ref(null),
      drawHexagon = (x, y, color) => {
        canvasContext.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = ((2 * Math.PI) / 6) * i,
            hexX = x + HEX_SIZE * Math.cos(angle),
            hexY = y + HEX_SIZE * Math.sin(angle);
          (i === 0 ? canvasContext.moveTo(hexX, hexY) : canvasContext.lineTo(hexX, hexY),
          hexX >= maxCoords[0] && (maxCoords[0] = hexX),
          hexY >= maxCoords[1] && (maxCoords[1] = hexY));
        }
        (canvasContext.closePath(), (canvasContext.fillStyle = color), canvasContext.fill(), (canvasContext.strokeStyle = color), canvasContext.stroke());
      },
      drawMap = (mouseX = 0, mouseY = 0, eventType = "") => {
        (mouseX !== 0 && mouseY !== 0 ? drawHexGrid(mouseX, mouseY, eventType) : drawHexGrid(), drawBorder(), renderStats(battleData.value));
      },
      drawHexGrid = (mouseX = 0, mouseY = 0, eventType = "") => {
        canvasContext.clearRect(0, 0, canvasContext.canvas.width / pixelRatio, canvasContext.canvas.height / pixelRatio);
        let hexGrid = HexGrid.getInstance();
        if (
          (hexGrid.removeAllNode(),
          (battleData.value = processBattleData(rawBattleData.value, showPersonalStats.value)),
          battleData.value &&
            hexGrid.addNodeList(
              Object.values(battleData.value.buildingData).map((building) => ({
                id: building.id,
                type: building.type,
                belongsLegionId: building.belongsLegionId,
                hP: building.hP,
                maxHP: building.maxHP,
                point: building.point,
                belongsLegionInfo: battleData.value.legionInfo[building.belongsLegionId],
              }))
            ),
          !battleData.value)
        )
          return;
        if (!showPersonalStats.value)
          Object.values(battleData.value.legionInfo).forEach((legion) => {
            let buildings = Object.keys(legion.buildings).sort((a, b) => {
              const [ax, ay] = a.split("_").map(Number),
                [bx, by] = b.split("_").map(Number),
                dx = ax - bx;
              return dx !== 0 ? dx : ay - by;
            });
            for (let i = 0; i < buildings.length; i++)
              for (let j = i; j < buildings.length; j++) {
                let path = hexGrid.findShortestPath(buildings[i], buildings[j], legion.id);
                path &&
                  path.forEach((node) => {
                    ((node.belongsLegionId = legion.id), (node.colorBg = legion.color));
                  });
              }
          });
        else {
          let legions = Object.values(battleData.value.legionInfo);
          for (let i = 0; i < legions.length; i++) {
            let node = hexGrid.getNodeByCoords(legions[i].strongholdId);
            ((node.belongsLegionId = legions[i].id), (node.colorBg = legions[i].color));
          }
        }
        (hexGrid.getAllNodes().forEach((node) => {
          let x = node.position.x,
            y = node.position.y;
          (showPersonalStats.value && node.type != 4 && ((node.belongsLegionId = -1), (node.colorBg = getColor(9))),
          parseInt(x) >= 0 && parseInt(x) < 41 && parseInt(y) >= 0 && parseInt(y) < 32
            ? (gridMap[parseInt(y)][parseInt(x)] = node)
            : console.warn(`Coordinates[${x},${y}] out of bounds, skipping assignment`));
        }),
          showPersonalStats.value ||
            ((gridMap[16][19].belongsLegionId = gridMap[17][20].belongsLegionId),
            (gridMap[17][19].belongsLegionId = gridMap[17][20].belongsLegionId),
            (gridMap[16][21].belongsLegionId = gridMap[17][20].belongsLegionId),
            (gridMap[17][21].belongsLegionId = gridMap[17][20].belongsLegionId),
            (gridMap[16][20].belongsLegionId = gridMap[17][20].belongsLegionId),
            (gridMap[18][20].belongsLegionId = gridMap[17][20].belongsLegionId),
            (gridMap[16][21].colorBg = gridMap[17][20].colorBg),
            (gridMap[17][21].colorBg = gridMap[17][20].colorBg),
            (gridMap[16][19].colorBg = gridMap[17][20].colorBg),
            (gridMap[17][19].colorBg = gridMap[17][20].colorBg),
            (gridMap[16][20].colorBg = gridMap[17][20].colorBg),
            (gridMap[18][20].colorBg = gridMap[17][20].colorBg)));
        let labels = [],
          textPositions = [];
        for (let row = 0; row <= 31; row++)
          for (let col = 0; col <= 40; col++)
            if (row > 2 && gridMap[row][col] != 0) {
              const x = col * (hexRadius * 0.75) + HEX_SIZE + HEX_PADDING * col,
                y = row * hexHeight + (col % 2 === 1 ? hexHeight / 2 : 0) + HEX_PADDING * row;
              let color = gridMap[row][col].colorBg;
              if (mouseX !== 0 && mouseY !== 0) {
                const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
                eventType === "mousemove" ? (color = distance < HEX_SIZE ? "#42b983" : color) : eventType === "click" && distance < HEX_SIZE && (labels = gridMap[row][col]);
              }
              if ((drawHexagon(x, y, color), gridMap[row][col].type != 9)) {
                let name = gridMap[row][col].typeName.replace("Stronghold", "");
                (name == "Headquarters" && ((canvasContext.fillStyle = "#055138"), (name = battleData.value.legionInfo[gridMap[row][col].belongsLegionId].name)),
                  textPositions.push({ x: x - 13, y: y + 4, name: name }));
              }
            }
        for (let i = 0; i < textPositions.length; i++)
          ((canvasContext.fillStyle = "black"), (canvasContext.font = "bold 12px Microsoft Yahei"), canvasContext.fillText(textPositions[i].name, textPositions[i].x, textPositions[i].y));
        labels.type != 9 && Object.keys(labels).length > 0 && eventType === "click" && showTooltip(mouseX, mouseY, labels);
      },
      drawBorder = () => {
        (canvasContext.beginPath(),
          canvasContext.moveTo(maxCoords[0] + 10, maxCoords[1]),
          canvasContext.lineTo(maxCoords[0] + 10, 10),
          canvasContext.closePath(),
          (canvasContext.strokeStyle = "#000"),
          canvasContext.stroke());
      },
      renderStats = (data) => {
        if (data) {
          let tableData = {};
          if (!showPersonalStats.value)
            ((tableData = Object.values(data.legionInfo)
              .sort((a, b) => b.score - a.score)
              .map((legion) => [
                legion.name,
                legion.killCnt,
                legion.reviveCount + "/150",
                legion.score,
                legion.redCount,
                formatPower(legion.power),
                legion.participantsCount + "/" + legion.memberCount,
                legion.danCount,
                legion.blessingCount + " total " + legion.blessingScore + " points",
                legion.color,
              ])),
              (tableConfig = {
                x: maxCoords[0] + 20,
                y: 20,
                columns: 9,
                rows: 20,
                headerData: ["Club Name", "Kills", "Free Revives", "Score", "Red Count", "Power", "Members", "Total Dan", "Four Saints"],
                tableData: tableData || [],
                columnWidth: 78,
                rowHeight: 37,
                scale: 1,
              }));
          else {
            let members = [];
            (Object.values(data.memberInfo).forEach((member) => {
              var roleInfo, role;
              member.legionId ==
                ((role = (roleInfo = tokenStore.gameData) == null ? void 0 : roleInfo.roleInfo) == null ? void 0 : role.role.legionId) &&
                members.push([
                  member.name,
                  member.kill,
                  member.die,
                  member.revive + "/5",
                  member.score,
                  member.digGround,
                  member.dan,
                  parseFloat(member.kill / member.die).toFixed(2),
                ]);
            }),
              (members = members.sort((a, b) => b[1] - a[1])),
              (tableConfig = {
                x: maxCoords[0] + 20,
                y: 20,
                columns: 8,
                rows: members ? members.length : 30,
                headerData: ["Name", "Kills", "Deaths", "Revives Used", "Score", "Digging", "Revive Dan", "K/D"],
                tableData: members || [],
                columnWidth: 88,
                rowHeight: 25,
                scale: 1,
              }));
          }
          drawTable(canvasContext, tableConfig);
        }
      },
      drawTable = (ctx, config) => {
        var cellData, headerData;
        const options = {
            ...{
              columnWidth: 80,
              rowHeight: 25,
              headerBgColor: "#42b983",
              cellBgColor: "#ffffff",
              borderColor: "#333333",
              headerTextColor: "#ffffff",
              cellTextColor: "#373737",
              fontSize: 14,
              font: "Arial",
              scale: 1,
            },
            ...config,
          },
          {
            x: startX,
            y: startY,
            columns: colCount,
            rows: rowCount,
            headerData: headers,
            tableData: data,
            columnWidth: colWidth,
            rowHeight: rowHeight,
            headerBgColor: headerColor,
            cellBgColor: cellColor,
            borderColor: borderColor,
            headerTextColor: headerText,
            cellTextColor: cellText,
            fontSize: fontSize,
            font: fontFamily,
            scale: scale,
          } = options,
          windowWidth = window.innerWidth;
        let actualScale = scale;
        windowWidth < 768 ? (actualScale = scale * 0.7) : windowWidth < 1024 && (actualScale = scale * 0.85);
        let actualColWidth = colWidth * actualScale;
        const actualRowHeight = rowHeight * actualScale,
          actualFontSize = fontSize * actualScale,
          actualBorderWidth = 1 * actualScale;
        (ctx.save(), (ctx.strokeStyle = borderColor), (ctx.lineWidth = actualBorderWidth), ctx.strokeRect(startX, startY, colCount * actualColWidth, (rowCount + 1) * actualRowHeight));
        let currentX = startX,
          firstColOffset = 20 * actualScale,
          secondColOffset = 20 * actualScale;
        for (let col = 0; col < colCount; col++) {
          ctx.fillStyle = headerColor;
          let width = col === 0 ? actualColWidth + firstColOffset : actualColWidth;
          ((width = col === 1 ? actualColWidth - secondColOffset : width),
            ctx.fillRect(currentX, startY, width, actualRowHeight),
            ctx.strokeRect(currentX, startY, width, actualRowHeight),
            (ctx.fillStyle = headerText),
            (ctx.font = `${actualFontSize}px ${fontFamily}`),
            (ctx.textAlign = "center"),
            (ctx.textBaseline = "middle"),
            ctx.fillText(headers[col] || "", currentX + width / 2, startY + actualRowHeight / 2),
            (currentX += width));
        }
        for (let row = 0; row < rowCount; row++) {
          currentX = startX;
          for (let col = 0; col < colCount; col++) {
            let width = col === 0 ? actualColWidth + firstColOffset : actualColWidth;
            ((width = col === 1 ? actualColWidth - secondColOffset : width), (ctx.fillStyle = ((cellData = data[row]) == null ? void 0 : cellData[9]) || cellColor));
            const cellX = currentX,
              cellY = startY + (row + 1) * actualRowHeight;
            (ctx.fillRect(cellX, cellY, width, actualRowHeight),
              ctx.strokeRect(cellX, cellY, width, actualRowHeight),
              (ctx.fillStyle = cellText),
              (ctx.font = `${actualFontSize}px ${fontFamily}`),
              (ctx.textAlign = "center"),
              (ctx.textBaseline = "middle"),
              ctx.fillText(((headerData = data[row]) == null ? void 0 : headerData[col]) || "0", cellX + width / 2, cellY + actualRowHeight / 2),
              (currentX += width));
          }
        }
        ctx.restore();
      },
      showTooltip = (x, y, data, scale = 1, offsetX = 0, offsetY = 0, options = {}) => {
        var legionInfo;
        const tooltipOptions = {
          boxWidth: 200,
          boxPadding: 10,
          bgColor: "rgba(0, 0, 0, 0.8)",
          borderColor: "#ffffff",
          borderWidth: 1,
          fontColor: "#ffffff",
          fontSize: 14,
          font: "Arial",
          gap: 10,
          ...options,
        };
        let content = "";
        if (typeof data == "object" && data !== null) {
          content = Object.entries(data).map(([key, value]) => `${key}: ${value}`).join(`
`);
          let building = data;
          content = `Coordinates:${building.id}
HP:${building.hP}/${building.maxHP}
Type:${building.typeName}
Score:${building.point}
Belongs to Club:${((legionInfo = battleData.value.legionInfo[building.belongsLegionId]) == null ? void 0 : legionInfo.name) || "Unowned"}`;
        } else content = String(data || "No data");
        const lines = content.split(`
`),
          boxWidth = tooltipOptions.boxWidth * scale,
          padding = tooltipOptions.boxPadding * scale,
          fontSize = tooltipOptions.fontSize * scale,
          borderWidth = tooltipOptions.borderWidth * scale,
          gap = tooltipOptions.gap * scale,
          lineHeight = fontSize * 1.4,
          boxHeight = lines.length * lineHeight + 2 * padding,
          baseX = x * scale + offsetX,
          baseY = y * scale + offsetY;
        let tooltipX = baseX + gap,
          tooltipY = baseY + gap;
        (canvasContext.canvas.width / pixelRatio,
          canvasContext.canvas.height / pixelRatio,
          tooltipX + boxWidth > maxCoords[0] + 10 && (tooltipX = baseX - boxWidth - gap),
          tooltipY + boxHeight > maxCoords[1] + 20 && (tooltipY = baseY - boxHeight - gap),
          (tooltipX = Math.max(borderWidth, tooltipX)),
          (tooltipY = Math.max(borderWidth, tooltipY)),
          canvasContext.save(),
          (canvasContext.fillStyle = tooltipOptions.bgColor),
          canvasContext.fillRect(tooltipX - borderWidth, tooltipY - borderWidth, boxWidth + 2 * borderWidth, boxHeight + 2 * borderWidth),
          (canvasContext.strokeStyle = tooltipOptions.borderColor),
          (canvasContext.lineWidth = borderWidth),
          canvasContext.strokeRect(tooltipX, tooltipY, boxWidth, boxHeight),
          (canvasContext.fillStyle = tooltipOptions.fontColor),
          (canvasContext.font = `${fontSize}px ${tooltipOptions.font}`),
          (canvasContext.textBaseline = "top"),
          lines.forEach((line, index) => {
            canvasContext.fillText(line, tooltipX + padding, tooltipY + padding + index * lineHeight);
          }),
          canvasContext.restore());
      };
    function initCanvas(canvas) {
      const parent = canvas.parentElement,
        width = parent.clientWidth,
        height = parent.clientHeight;
      ((canvas.width = width * pixelRatio), (canvas.height = height * pixelRatio), canvasContext.scale(pixelRatio, pixelRatio), drawMap());
    }
    const connectWebSocket = () => {
        if (!tokenStore.selectedToken) {
          (message.warning("Please select a Token first"), router.push("/tokens"));
          return;
        }
        try {
          const tokenId = tokenStore.selectedToken.id,
            token = tokenStore.selectedToken.token;
          (tokenStore.createWebSocketConnection(tokenId, token),
            message.info("Establishing WebSocket connection..."),
            setTimeout(async () => {
              if (tokenStore.getWebSocketStatus(tokenId) === "connected") {
                message.success("WebSocket connection successful");
                const battlefield = await tokenStore.sendMessageWithPromise(tokenId, "legion_getbattlefield", {}, 10000);
                initBattlefield(battlefield);
              }
            }, 2000));
        } catch (err) {
          (console.error("WebSocket connection failed:", err), message.error("WebSocket connection failed"));
        }
      },
      initBattlefield = async (battlefield) => {
        if (tokenStore.selectedToken) {
          const tokenId = tokenStore.selectedToken.id;
          if (tokenStore.getWebSocketStatus(tokenStore.selectedToken.id) !== "connected") {
            connectWebSocket();
            return;
          }
          const wsUrl = `wss://xxz-xyzw-new.hortorgames.com/agent?p=${encodeURIComponent(tokenStore.selectedToken.token)}&e=x&sid2=${battlefield == null ? void 0 : battlefield.info.sid}&lang=chinese&sid2=${battlefield == null ? void 0 : battlefield.info.sid}`;
          ((battlefieldId.value = battlefield == null ? void 0 : battlefield.info.battlefieldId),
            (wsClient = new WebSocketClient({ url: wsUrl, utils: null, hint: battlefieldId.value, heartbeatMs: 5000 })),
            (wsClient.onConnect = async () => {
              try {
                setTimeout(() => {
                  isInBattlefield.value = true;
                  const result = wsClient.send("war_enterbattlefield", { battlefieldId: battlefieldId.value, useGzip: true });
                }, 5000);
              } catch (err) {
                console.error(`Initial battlefield request failed [${tokenId}]`, err);
              }
            }),
            wsClient.setMessageListener((msg) => {
              ((msg == null ? void 0 : msg.cmd) || "unknown").includes("war_getbattlefieldinfo") &&
                (console.log(msg.rawData), (rawBattleData.value = msg == null ? void 0 : msg.rawData), initCanvas(canvasContainer.value));
            }),
            (wsClient.onDisconnect = (event) => {
              (event.code === 1006 || event.reason, console.log(event));
            }),
            (wsClient.onError = (err) => {
              console.log(err);
            }),
            wsClient.init());
        }
      },
      refreshBattlefield = async () => {
        isInBattlefield.value
          ? (wsClient.send("war_getbattlefieldinfo", { battlefieldId: battlefieldId.value }), (currentTime.value = formatDate("")))
          : message.error("Not yet entered battlefield, please wait");
      };
    return (
      onMounted(() => {
        initBattlefield();
        const canvas = canvasContainer.value;
        ((canvasContext = canvas.getContext("2d")),
          (resizeHandler = () => initCanvas(canvas)),
          resizeHandler(),
          canvas.addEventListener("click", (event) => {
            const rect = canvas.getBoundingClientRect(),
              x = event.clientX - rect.left,
              y = event.clientY - rect.top;
            ((canvasContext.font = "12px Arial"), (canvasContext.fillStyle = "rgb(0,0,0)"), drawMap(x, y, "click"));
          }),
          window.addEventListener("resize", resizeHandler));
      }),
      onUnmounted(() => {
        window.removeEventListener("resize", resizeHandler);
      }),
      // ... render function with UI controls
    );
  },
};
```

---

## Battlefield Data Structure

### Club/Legion Info

```javascript
{
  id: 123,                    // Club ID
  name: "Club Name",          // Club name
  color: "#FF0000",           // Club color on map
  score: 50000,               // Total score
  killCnt: 150,               // Number of kills
  reviveCount: 20,            // Revives used (max 150)
  redCount: 5,                // Red item count
  power: 1000000,             // Total power
  participantsCount: 25,      // Active participants
  memberCount: 30,            // Total members
  danCount: 100,              // Dan medicine used
  blessingCount: 10,          // Blessing count
  blessingScore: 500,         // Blessing score
  buildings: {                // Owned buildings
    "19_20": { id: "19_20", type: 4 },
    // ...
  },
  strongholdId: "19_20"       // Main stronghold
}
```

### Building Data

```javascript
{
  id: "19_20",                // Coordinate ID "x_y"
  type: 4,                    // Building type (4 = stronghold)
  typeName: "Stronghold",     // Building type name
  belongsLegionId: 123,       // Owning club ID
  hP: 1000,                   // Current HP
  maxHP: 1000,                // Max HP
  point: 100                  // Point value
}
```

### Member Info (Personal Stats)

```javascript
{
  name: "Player Name",
  legionId: 123,              // Club ID
  kill: 50,                   // Kills
  die: 10,                    // Deaths
  revive: 3,                  // Revives used (max 5)
  score: 5000,                // Personal score
  digGround: 20,              // Digging count
  dan: 50                     // Dan medicine used
}
```

---

## Hexagonal Grid System

### Grid Configuration

| Parameter | Value | Description |
|-----------|-------|-------------|
| `HEX_SIZE` | 13.25 | Hexagon radius |
| `HEX_PADDING` | 2.75 | Spacing between hexagons |
| `Grid Width` | 41 columns | X-axis grid size |
| `Grid Height` | 32 rows | Y-axis grid size |
| `Pixel Ratio` | devicePixelRatio | For high-DPI displays |

### Hexagon Coordinate Calculation

```javascript
const hexRadius = 2 * HEX_SIZE;                           // 26.5
const hexHeight = Math.sqrt(3) * HEX_SIZE;                // ~22.94

// Calculate pixel position from grid coordinates
const pixelX = col * (hexRadius * 0.75) + HEX_SIZE + HEX_PADDING * col;
const pixelY = row * hexHeight + (col % 2 === 1 ? hexHeight / 2 : 0) + HEX_PADDING * row;
```

### Hexagon Drawing

```javascript
function drawHexagon(centerX, centerY, color) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = ((2 * Math.PI) / 6) * i;
    const x = centerX + HEX_SIZE * Math.cos(angle);
    const y = centerY + HEX_SIZE * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.stroke();
}
```

---

## Club Ranking Display

### Columns (Club Mode)

| Column | Description |
|--------|-------------|
| Club Name | Club name |
| Kills | Total kills |
| Free Revives | Revives used / 150 max |
| Score | Total battle score |
| Red Count | Red item count |
| Power | Total power (formatted) |
| Members | Active / Total members |
| Total Dan | Dan medicine consumed |
| Four Saints | Blessing count and score |

### Columns (Personal Mode)

| Column | Description |
|--------|-------------|
| Name | Player name |
| Kills | Personal kills |
| Deaths | Death count |
| Revives Used | Revives used / 5 max |
| Score | Personal score |
| Digging | Ground digging count |
| Revive Dan | Dan medicine used |
| K/D | Kill/Death ratio |

---

## WebSocket Communication

### Connection Flow

```
User selects token
    │
    ▼
Create WebSocket connection
    │
    ▼
Send "legion_getbattlefield" command
    │
    ▼
Receive battlefield ID and session ID
    │
    ▼
Connect to battlefield WebSocket URL
    │
    ▼
Send "war_enterbattlefield" command
    │
    ▼
Listen for "war_getbattlefieldinfo" updates
```

### Battlefield WebSocket URL

```javascript
`wss://xxz-xyzw-new.hortorgames.com/agent?p=${encodeURIComponent(token)}&e=x&sid2=${sid}&lang=chinese&sid2=${sid}`
```

### Message Handling

```javascript
wsClient.setMessageListener((message) => {
  if ((message?.cmd || "unknown").includes("war_getbattlefieldinfo")) {
    console.log(message.rawData);
    rawBattleData.value = message?.rawData;
    initCanvas(canvasContainer.value);  // Redraw map
  }
});
```

---

## Interactive Features

### Mouse Interactions

| Event | Action |
|-------|--------|
| **Click** | Shows building tooltip with details |
| **Mouse Move** | Highlights hexagon under cursor |
| **Resize** | Redraws canvas to fit container |

### Tooltip Information

```
Coordinates: {x}_{y}
HP: {currentHP}/{maxHP}
Type: {buildingType}
Score: {pointValue}
Belongs to Club: {clubName}
```

---

## Auto-Refresh

The battlefield information can be refreshed by clicking the refresh button, which sends:

```javascript
wsClient.send("war_getbattlefieldinfo", { battlefieldId: battlefieldId.value });
```

---

## Club Stats Broadcasting

The system can automatically broadcast club statistics to the in-game chat:

```javascript
sendClubStats: async () => {
  const clubs = Object.values(battleData.value.legionInfo);
  const messages = [];
  
  // Group clubs into 2 groups of 10
  for (let group = 0; group < 2; group++) {
    let text = "";
    for (let i = 0; i < 10; i++) {
      const club = clubs[i + group * 10];
      text += `${club.name}:Remaining${150 - club.reviveCount}`;
    }
    messages.push(text);
  }
  
  // Send with rate limiting
  for (const message of messages) {
    await wait(1500);
    try {
      await tokenStore.sendMessageToLegion(tokenId, message);
    } catch (err) {
      if (err.message.includes("Too frequent")) {
        await wait(3000);
        await tokenStore.sendMessageToLegion(tokenId, message);
      }
    }
  }
}
```

---

## Rendering Performance

### Optimizations
1. **Device Pixel Ratio**: Uses `window.devicePixelRatio` for crisp rendering on high-DPI screens
2. **Responsive Scaling**: Table scales down on smaller viewports
   - `< 768px`: 70% scale
   - `< 1024px`: 85% scale
3. **Canvas Clipping**: Only renders visible hexagons (rows > 2)
4. **Path Caching**: HexGrid instance caches node paths for efficient rendering

### Table Scaling

```javascript
const windowWidth = window.innerWidth;
let actualScale = scale;
if (windowWidth < 768) {
  actualScale = scale * 0.7;
} else if (windowWidth < 1024) {
  actualScale = scale * 0.85;
}
```

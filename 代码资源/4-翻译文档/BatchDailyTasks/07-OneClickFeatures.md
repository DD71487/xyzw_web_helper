# BatchDailyTasks - One-Click Features Translation

## Overview

This document provides a comprehensive translation and explanation of all "One-Click" (一键) features extracted from the `BatchDailyTasks-XgqKel1u.js` file. These features are batch operations that can be executed across multiple game accounts simultaneously.

---

## Available Tasks List

### Core Task Definitions (Lines 3070-3131)

```javascript
availableTasks = [
  { label: "Daily Tasks", value: "startBatch" },
  { label: "Claim Hang-up Rewards", value: "claimHangUpRewards" },
  { label: "One-Click Add Time", value: "batchAddHangUpTime" },
  { label: "Reset Bottles", value: "resetBottles" },
  { label: "One-Click Claim Salt Jars", value: "batchlingguanzi" },
  { label: "One-Click Tower Climb", value: "climbTower" },
  { label: "One-Click Weird Tower Climb", value: "climbWeirdTower" },
  { label: "One-Click Answer Questions", value: "batchStudy" },
  { label: "Smart Send Car", value: "batchSmartSendCar" },
  { label: "One-Click Claim Cars", value: "batchClaimCars" },
  { label: "Upgrade Modifications", value: "batchCarResearchUpgrade" },
  { label: "Batch Open Boxes", value: "batchOpenBox" },
  { label: "One-Click Box Event Opening", value: "batchOpenBoxByPoints" },
  { label: "One-Click Open Fragment Packs", value: "batchOpenFragmentPacks" },
  { label: "Box Weekly Reward Selection", value: "batchClaimBoxWeeklyRewards" },
  { label: "Claim Box Points", value: "batchClaimBoxPointReward" },
  { label: "Batch Fishing", value: "batchFish" },
  { label: "Batch Recruit", value: "batchRecruit" },
  { label: "One-Click Treasure Vault (Floors 1-3)", value: "batchbaoku13" },
  { label: "One-Click Treasure Vault (Floors 4-5)", value: "batchbaoku45" },
  { label: "One-Click Dreamland", value: "batchmengjing" },
  { label: "One-Click Club Sign-in", value: "batchclubsign" },
  { label: "One-Click Arena Battle (3 times)", value: "batcharenafight" },
  { label: "One-Click Fishing Top-up", value: "batchTopUpFish" },
  { label: "One-Click Arena Top-up", value: "batchTopUpArena" },
  { label: "One-Click Claim Weird Tower Free Items", value: "batchClaimFreeEnergy" },
  { label: "Claim Weird Tower Target Privileges", value: "claim_weird_tower_all" },
  { label: "Claim Weird Tower Pass", value: "claim_weird_tower_pass" },
  { label: "One-Click Skin Challenge", value: "skinChallenge" },
  { label: "One-Click Buy Four Saints Fragments", value: "legion_storebuygoods" },
  { label: "One-Click Buy Club 5 Skin Coins", value: "legionStoreBuySkinCoins" },
  { label: "One-Click Super Spirit Shell Pack", value: "buy_super_spirit_shell" },
  { label: "One-Click Buy Top Rod Package", value: "buy_top_rod_package" },
  { label: "Buy Mid-tier Black Market Pack", value: "weekly_market_free_gift" },
  { label: "Claim Free Gift Pack", value: "claim_recruit_welfare" },
  { label: "One-Click Black Market Purchase", value: "store_purchase" },
  { label: "Claim Points Rewards", value: "charge_claimaddup_rewards" },
  { label: "One-Click Buy Bronze Boxes", value: "store_buy_bronze" },
  { label: "One-Click Buy Platinum Boxes", value: "store_buy_platinum" },
  { label: "One-Click Buy Gold Rods", value: "store_buy_gold_rod" },
  { label: "One-Click Buy Colored Jade", value: "store_buy_jade" },
  { label: "Claim Free Treasure Pavilion", value: "collection_claimfreereward" },
  { label: "Free Gacha", value: "gacha_drawreward" },
  { label: "Batch Claim Legacy Fragments", value: "batchLegacyClaim" },
  { label: "Batch Gift Legacy Fragments", value: "batchLegacyGiftSendEnhanced" },
  { label: "Hero Four Saints Upgrade", value: "openHeroFourSaintsModal" },
  { label: "One-Click Hero Star Upgrade", value: "batchHeroUpgrade" },
  { label: "One-Click Claim Hero Book", value: "batchBookUpgrade" },
  { label: "One-Click Claim Pet Book", value: "batchClaimStarRewards" },
  { label: "One-Click Use Weird Tower Items", value: "batchUseItems" },
  { label: "One-Click Weird Tower Merge", value: "batchMergeItems" },
  { label: "One-Click Claim Peach Garden Tasks", value: "batchClaimPeachTasks" },
  { label: "One-Click Genie Sweep", value: "batchGenieSweep" },
  { label: "Use Spotted Egg", value: "use_spotted_egg" },
  { label: "Claim Pet Book Rewards", value: "claim_pet_book" },
  { label: "One-Click Buy Dreamland Items", value: "batchBuyDreamItems" },
  { label: "One-Click Buy Red Jade (5 times)", value: "legion_buy_red_jade" },
  { label: "One-Click Buy Spotted Egg", value: "legion_buy_spotted_egg" },
  { label: "Nightmare Lottery", value: "nightmare_draw_lottery" },
  { label: "Nightmare Lottery Target Reward", value: "nightmare_claim_book_reward" },
  { label: "Star Lottery", value: "star_drawturntable" },
];
```

---

## 1. One-Click Add Time (一键加钟)

**Original Code Location:** Lines 3844-3988

### Function Description
Automatically adds hang-up time for all selected accounts based on their current hang-up duration. The system calculates how many additional time extensions are needed (up to 4 times) to reach the maximum of 10 hours (36000 seconds).

### Parameters
- `e.value` - Array of selected token IDs
- `o.value` - Array of token objects with account info
- `r.value` - isRunning flag
- `i.value` - shouldStop flag
- `a.value` - Token status map

### Translated Code

```javascript
batchAddHangUpTime: async () => {
  if (selectedTokens.value.length !== 0)
    try {
      (isRunning.value = true),
        (shouldStop.value = false),
        selectedTokens.value.forEach((tokenId) => {
          tokenStatus.value[tokenId] = "waiting";
        });
      const retryQueue = [],
        maxRetries = 3,
        promises = selectedTokens.value.map(async (tokenId) => {
          if (shouldStop.value) return;
          tokenStatus.value[tokenId] = "running";
          const token = tokens.value.find((t) => t.id === tokenId);
          let connectionEstablished = false;
          try {
            (addLog({ time: new Date().toLocaleTimeString(), message: `=== One-Click Add Time: ${token.name} ===`, type: "info" }),
              await ensureConnection(tokenId),
              (connectionEstablished = true));
            const hangUpData = await getHangUpStatus(tokenId, { checkAddTime: false }),
              remainingTime = hangUpData.remainingTime || 0,
              elapsedTime = hangUpData.elapsedTime || 0,
              totalTime = hangUpData.hangUpTime || 0;
            let addCount = 0;
            if (totalTime >= 36000) {
              (addLog({
                time: new Date().toLocaleTimeString(),
                message: `${token.name} Total time: ${formatTime(totalTime)}, already at max, no need to add time`,
                type: "success",
              }),
                (tokenStatus.value[tokenId] = "completed"),
                tokenStore.sendMessage(tokenId, "role_getroleinfo"));
              return;
            } else totalTime >= 28800 ? (addCount = 1) : totalTime >= 21600 ? (addCount = 2) : totalTime >= 14400 ? (addCount = 3) : (addCount = 4);
            if (
              (addLog({
                time: new Date().toLocaleTimeString(),
                message: `${token.name} Total time ${formatTime(totalTime)}, decided to add time ${addCount} times`,
                type: "info",
              }),
              !(await addHangUpTime(tokenId, token.name, addCount)))
            )
              return;
            ((tokenStatus.value[tokenId] = "completed"),
              addLog({ time: new Date().toLocaleTimeString(), message: `✅ ${token.name} Add time completed`, type: "success" }),
              await refreshRoleInfo(tokenId, "role_getroleinfo", {}).catch(() => {}));
          } catch (err) {
            console.error(err);
            const errMsg = err.message || "";
            errMsg.includes("400340")
              ? (addLog({
                  time: new Date().toLocaleTimeString(),
                  message: `${token.name} Encountered 400340 error, added to retry queue`,
                  type: "warning",
                }),
                retryQueue.push({ tokenId: tokenId, tokenName: token.name, attempt: 1 }),
                (tokenStatus.value[tokenId] = "retry"))
              : ((tokenStatus.value[tokenId] = "failed"),
                addLog({ time: new Date().toLocaleTimeString(), message: `${token.name} Add time failed: ${errMsg}`, type: "error" }));
          } finally {
            connectionEstablished && (await releaseConnection(tokenId, token.name));
          }
        });
      await Promise.all(promises);
      let currentRetryQueue = retryQueue;
      for (let retry = 1; retry <= maxRetries && currentRetryQueue.length > 0 && !shouldStop.value; retry++) {
        if (
          (addLog({
            time: new Date().toLocaleTimeString(),
            message: `⏱️ Waiting 2 minutes to retry ${currentRetryQueue.length} accounts (attempt ${retry}/${maxRetries})...`,
            type: "info",
          }),
          await wait(120000),
          shouldStop.value)
        ) {
          addLog({ time: new Date().toLocaleTimeString(), message: "Stopped, cancel retry", type: "warning" });
          break;
        }
        addLog({ time: new Date().toLocaleTimeString(), message: `=== Starting ${retry}th retry for add time ===`, type: "info" });
        const nextRetryQueue = [],
          retryPromises = currentRetryQueue.map(async ({ tokenId, tokenName, attempt }) => {
            if (shouldStop.value) return;
            tokenStatus.value[tokenId] = "running";
            const token = tokens.value.find((t) => t.id === tokenId);
            let connectionEstablished = false;
            try {
              (await ensureConnection(tokenId), (connectionEstablished = true));
              const currentTotalTime = (await getHangUpStatus(tokenId, { checkAddTime: false })).hangUpTime || 0;
              let retryAddCount = 0;
              (currentTotalTime >= 36000
                ? (retryAddCount = 0)
                : currentTotalTime >= 28800
                  ? (retryAddCount = 1)
                  : currentTotalTime >= 21600
                    ? (retryAddCount = 2)
                    : currentTotalTime >= 14400
                      ? (retryAddCount = 3)
                      : (retryAddCount = 4),
                addLog({
                  time: new Date().toLocaleTimeString(),
                  message: `${token.name} ${retry}th retry: total time ${formatTime(currentTotalTime)}, add time ${retryAddCount} times`,
                  type: "info",
                }),
                (await addHangUpTime(tokenId, token.name, retryAddCount))
                  ? ((tokenStatus.value[tokenId] = "completed"),
                    addLog({
                      time: new Date().toLocaleTimeString(),
                      message: `✅ ${token.name} ${retry}th retry add time successful`,
                      type: "success",
                    }))
                  : ((tokenStatus.value[tokenId] = "failed"),
                    addLog({
                      time: new Date().toLocaleTimeString(),
                      message: `${token.name} ${retry}th retry add time partially failed`,
                      type: "warning",
                    })));
            } catch (err) {
              const errMsg = err.message || "";
              errMsg.includes("400340") && retry < maxRetries
                ? (addLog({
                    time: new Date().toLocaleTimeString(),
                    message: `${token.name} ${retry}th retry still encountered 400340 error, continue retrying`,
                    type: "warning",
                  }),
                  nextRetryQueue.push({ tokenId: tokenId, tokenName: token.name, attempt: retry + 1 }),
                  (tokenStatus.value[tokenId] = "retry"))
                : ((tokenStatus.value[tokenId] = "failed"),
                  addLog({
                    time: new Date().toLocaleTimeString(),
                    message: `${token.name} ${retry >= maxRetries ? "Still failed after 3 retries" : "Retry failed"}: ${errMsg}`,
                    type: "error",
                  }));
            } finally {
              connectionEstablished && (await releaseConnection(tokenId, token.name));
            }
          });
        (await Promise.all(retryPromises), (currentRetryQueue = nextRetryQueue));
      }
      currentRetryQueue.forEach(({ tokenId }) => {
        tokenStatus.value[tokenId] === "retry" && (tokenStatus.value[tokenId] = "failed");
      });
    } finally {
      ((isRunning.value = false), (currentRunningTokenId.value = null), message.success("Batch add time ended"));
    }
},
```

---

## 2. One-Click Answer Questions (一键答题)

**Original Code Location:** Lines 3989-4178

### Function Description
Automatically completes the study/answer questions mini-game for all selected accounts. Preloads the question bank and answers up to 10 questions correctly per week per account.

### Parameters
- Uses preloaded question database
- Checks weekly completion status
- Supports retry mechanism (up to 2 rounds)

### Translated Code

```javascript
batchStudy: async () => {
  if (selectedTokens.value.length !== 0)
    try {
      ((isRunning.value = true),
        (shouldStop.value = false),
        selectedTokens.value.forEach((tokenId) => {
          tokenStatus.value[tokenId] = "waiting";
        }));
      const { preloadQuestions, getQuestionCount } = await import("./index-UoU16364.js").then((mod) => mod.b7);
      (addLog({ time: new Date().toLocaleTimeString(), message: "📚 Loading question bank...", type: "info" }), await preloadQuestions());
      const totalQuestions = await getQuestionCount();
      addLog({ time: new Date().toLocaleTimeString(), message: `✅ Question bank loaded, total ${totalQuestions} questions`, type: "success" });
      const retryList = [],
        processAccount = async (tokenId, name, isRetry = false) => {
          let connectionEstablished = false;
          try {
            (await ensureConnection(tokenId), (connectionEstablished = true));
            const roleInfo = await sendMessage(tokenId, "role_getroleinfo", {}),
              studyData = roleInfo?.body?.role?.study || roleInfo?.study,
              maxCorrect = studyData?.maxCorrectNum ?? 0,
              beginTime = studyData?.beginTime ?? 0;
            const { isInCurrentWeek } = await import("./index-UoU16364.js").then((mod) => mod.b6);
            if (maxCorrect >= 10 && isInCurrentWeek(beginTime * 1000))
              return (
                addLog({
                  time: new Date().toLocaleTimeString(),
                  message: `✅ ${name} This week's questions already completed (${maxCorrect}/10)`,
                  type: "success",
                }),
                (tokenStatus.value[tokenId] = "completed"),
                true
              );
            (addLog({
              time: new Date().toLocaleTimeString(),
              message: `${name} Current correct count: ${maxCorrect}/10, starting questions...`,
              type: "info",
            }),
              await sendMessage(tokenId, "study_startgame", {}, { retryDelay: 3000 }),
              await wait(2000));
            let timeout = 120,
              completed = false,
              lastAnsweredCount = 0;
            for (; timeout > 0 && !shouldStop.value && !completed; ) {
              const gameData = tokenStore.getTokenGameData(tokenId),
                studyStatus = gameData?.studyStatus;
              if (studyStatus) {
                const answeredCount = studyStatus.answeredCount || 0;
                if (
                  (answeredCount !== lastAnsweredCount &&
                    ((lastAnsweredCount = answeredCount),
                    addLog({
                      time: new Date().toLocaleTimeString(),
                      message: `📝 ${name} Question progress: ${answeredCount}/${studyStatus.questionCount || 10}`,
                      type: "info",
                    })),
                  studyStatus.status === "completed")
                ) {
                  ((completed = true),
                    addLog({
                      time: new Date().toLocaleTimeString(),
                      message: `🎉 ${name} Questions completed, rewards claimed`,
                      type: "success",
                    }));
                  break;
                }
                if (studyStatus.status === "failed_need_retry")
                  return (
                    addLog({
                      time: new Date().toLocaleTimeString(),
                      message: `⚠️ ${name} Questions not completed, needs retry`,
                      type: "warning",
                    }),
                    false
                  );
              }
              (await wait(1000), timeout--);
            }
            return completed
              ? ((tokenStatus.value[tokenId] = "completed"), true)
              : (addLog({ time: new Date().toLocaleTimeString(), message: `❌ ${name} Question timeout`, type: "error" }), false);
          } catch (err) {
            const errMsg = err.message || "";
            if (errMsg.includes("3100080"))
              return (
                addLog({
                  time: new Date().toLocaleTimeString(),
                  message: `⚠️ ${name} Question attempts used up or not unlocked (3100080)`,
                  type: "warning",
                }),
                (tokenStatus.value[tokenId] = "completed"),
                true
              );
            if (errMsg.includes("200350"))
              return (
                addLog({
                  time: new Date().toLocaleTimeString(),
                  message: `${name} Encountered 200350 error, retry later in batch`,
                  type: "warning",
                }),
                false
              );
            throw err;
          } finally {
            connectionEstablished && (await releaseConnection(tokenId, name));
          }
        },
        promises = selectedTokens.value.map(async (tokenId) => {
          if (shouldStop.value) return;
          tokenStatus.value[tokenId] = "running";
          const token = tokens.value.find((t) => t.id === tokenId);
          try {
            !(await processAccount(tokenId, token.name, false)) &&
              !shouldStop.value &&
              (retryList.push({ tokenId: tokenId, name: token.name }), (tokenStatus.value[tokenId] = "waiting_retry"));
          } catch (err) {
            ((tokenStatus.value[tokenId] = "failed"),
              addLog({
                time: new Date().toLocaleTimeString(),
                message: `${token.name} Question failed: ${err.message}`,
                type: "error",
              }));
          }
        });
      await Promise.all(promises);
      let retryCount = 0;
      const maxRetryRounds = 2;
      for (; retryList.length > 0 && retryCount < maxRetryRounds && !shouldStop.value; ) {
        (retryCount++,
          addLog({
            time: new Date().toLocaleTimeString(),
            message: `
=== Round ${retryCount} retry (${retryList.length} accounts) ===`,
            type: "info",
          }),
          await wait(60000));
        const nextRetryList = [];
        for (const { tokenId, name } of retryList) {
          if (shouldStop.value) break;
          tokenStatus.value[tokenId] = "running";
          try {
            (await processAccount(tokenId, name, true))
              ? (tokenStatus.value[tokenId] = "completed")
              : (nextRetryList.push({ tokenId: tokenId, name: name }), (tokenStatus.value[tokenId] = "waiting_retry"));
          } catch (err) {
            (nextRetryList.push({ tokenId: tokenId, name: name }),
              (tokenStatus.value[tokenId] = "failed"),
              addLog({
                time: new Date().toLocaleTimeString(),
                message: `${name} Retry question failed: ${err.message}`,
                type: "error",
              }));
          }
          await wait(1000);
        }
        ((retryList.length = 0), retryList.push(...nextRetryList));
      }
      const failedCount = retryList.length;
      failedCount > 0 &&
        (addLog({
          time: new Date().toLocaleTimeString(),
          message: `
Still ${failedCount} accounts failed questions`,
          type: "error",
        }),
        retryList.forEach(({ name }) =>
          addLog({ time: new Date().toLocaleTimeString(), message: `  - ${name}`, type: "error" })
        ));
    } finally {
      ((isRunning.value = false), (currentRunningTokenId.value = null), message.success("Batch question answering ended"));
    }
},
```

---

## 3. One-Click Club Sign-in (一键俱乐部签到)

**Original Code Location:** Lines 4179-4215

### Function Description
Performs club/legion sign-in for all selected accounts.

### Translated Code

```javascript
batchclubsign: async () => {
  if (selectedTokens.value.length !== 0)
    try {
      ((isRunning.value = true),
        (shouldStop.value = false),
        selectedTokens.value.forEach((tokenId) => {
          tokenStatus.value[tokenId] = "waiting";
        }));
      const promises = selectedTokens.value.map(async (tokenId) => {
        if (shouldStop.value) return;
        tokenStatus.value[tokenId] = "running";
        const token = tokens.value.find((t) => t.id === tokenId);
        let connectionEstablished = false;
        try {
          (addLog({ time: new Date().toLocaleTimeString(), message: `=== Club Sign-in: ${token.name} ===`, type: "info" }),
            await ensureConnection(tokenId),
            (connectionEstablished = true),
            await sendMessage(tokenId, "legion_signin", {}),
            await wait(500),
            (tokenStatus.value[tokenId] = "completed"),
            addLog({ time: new Date().toLocaleTimeString(), message: `✅ ${token.name} Sign-in successful`, type: "success" }));
        } catch (err) {
          ((tokenStatus.value[tokenId] = "failed"),
            addLog({
              time: new Date().toLocaleTimeString(),
              message: `${token.name} Sign-in failed: ${err.message}`,
              type: "error",
            }));
        } finally {
          connectionEstablished && (await releaseConnection(tokenId, token.name));
        }
      });
      await Promise.all(promises);
    } finally {
      ((isRunning.value = false), (currentRunningTokenId.value = null), message.success("Batch club sign-in ended"));
    }
},
```

---

## 4. One-Click Claim Salt Jars (一键领取罐子)

**Original Code Location:** Lines 4359-4400

### Function Description
Claims rewards from salt jar bottles for all selected accounts.

### Translated Code

```javascript
batchlingguanzi: async () => {
  if (selectedTokens.value.length === 0) return;
  ((isRunning.value = true),
    (shouldStop.value = false),
    selectedTokens.value.forEach((tokenId) => {
      tokenStatus.value[tokenId] = "waiting";
    }));
  const promises = selectedTokens.value.map(async (tokenId) => {
    if (shouldStop.value) return;
    tokenStatus.value[tokenId] = "running";
    const token = tokens.value.find((t) => t.id === tokenId);
    try {
      if (
        (addLog({ time: new Date().toLocaleTimeString(), message: `=== Start One-Click Claim Salt Jars: ${token.name} ===`, type: "info" }),
        await ensureConnection(tokenId),
        shouldStop.value)
      )
        return;
      (await tokenStore.sendMessageWithPromise(tokenId, "bottlehelper_claim", {}, 3000),
        await wait(500),
        (tokenStatus.value[tokenId] = "completed"),
        addLog({ time: new Date().toLocaleTimeString(), message: `=== ${token.name} Claim Salt Jars completed ===`, type: "success" }));
    } catch (err) {
      (console.error(err),
        (tokenStatus.value[tokenId] = "failed"),
        addLog({
          time: new Date().toLocaleTimeString(),
          message: `${token.name} Claim Salt Jars failed: ${err.message || "Unknown error"}`,
          type: "error",
        }));
    } finally {
      (tokenStore.closeWebSocketConnection(tokenId),
        releaseConnection(),
        addLog({
          time: new Date().toLocaleTimeString(),
          message: `${token.name} Connection closed (Queue: ${connectionQueue.active}/${batchSettings.maxActive})`,
          type: "info",
        }));
    }
  });
  (await Promise.all(promises), (isRunning.value = false), (currentRunningTokenId.value = null), message.success("Batch claim salt jars ended"));
},
```

---

## 5. One-Click Tower Climb (一键爬塔)

**Original Code Location:** Lines 4501-4727

### Function Description
Automatically climbs the main tower for all selected accounts. Handles different tower states and attempts to reach the highest possible floor.

### Translated Code

```javascript
climbTower: async () => {
  if (selectedTokens.value.length === 0) return;
  ((isRunning.value = true),
    (shouldStop.value = false),
    selectedTokens.value.forEach((tokenId) => {
      tokenStatus.value[tokenId] = "waiting";
    }));
  const promises = selectedTokens.value.map(async (tokenId) => {
    // ... tower climbing logic with battle commands
    // Uses bosstower_getinfo, bosstower_startboss, bosstower_startbox commands
  });
  (await Promise.all(promises), (isRunning.value = false), (currentRunningTokenId.value = null), message.success("Batch tower climb ended"));
},
```

---

## 6. One-Click Weird Tower Climb (一键爬怪异塔)

**Original Code Location:** Lines 4728-5048

### Function Description
Climbs the weird/evolution tower for all selected accounts. Handles special tower mechanics including item usage and synthesis.

### Translated Code

```javascript
climbWeirdTower: async () => {
  if (selectedTokens.value.length === 0) return;
  ((isRunning.value = true),
    (shouldStop.value = false),
    selectedTokens.value.forEach((tokenId) => {
      tokenStatus.value[tokenId] = "waiting";
    }));
  const promises = selectedTokens.value.map(async (tokenId) => {
    // ... weird tower climbing logic
    // Uses evotower_getinfo, evotower_readyfight, evotower_fight commands
  });
  (await Promise.all(promises), (isRunning.value = false), (currentRunningTokenId.value = null), message.success("Batch weird tower climb ended"));
},
```

---

## 7. One-Click Claim Free Energy (一键领取怪异塔免费道具)

**Original Code Location:** Lines 5049-5091

### Function Description
Claims free energy/items for the weird tower for all selected accounts.

### Translated Code

```javascript
batchClaimFreeEnergy: async () => {
  if (selectedTokens.value.length === 0) return;
  ((isRunning.value = true),
    (shouldStop.value = false),
    selectedTokens.value.forEach((tokenId) => {
      tokenStatus.value[tokenId] = "waiting";
    }));
  const promises = selectedTokens.value.map(async (tokenId) => {
    if (shouldStop.value) return;
    tokenStatus.value[tokenId] = "running";
    const token = tokens.value.find((t) => t.id === tokenId);
    try {
      // Claims free energy items for weird tower
      await sendMessageWithRetry(tokenId, "evotower_getinfo", {});
      // ... claim free items logic
      (tokenStatus.value[tokenId] = "completed"),
        addLog({ time: new Date().toLocaleTimeString(), message: `✅ ${token.name} Free items claimed`, type: "success" });
    } catch (err) {
      (tokenStatus.value[tokenId] = "failed"),
        addLog({ time: new Date().toLocaleTimeString(), message: `${token.name} Claim failed: ${err.message}`, type: "error" });
    } finally {
      await closeConnection(tokenId, token.name);
    }
  });
  (await Promise.all(promises), (isRunning.value = false), (currentRunningTokenId.value = null), message.success("Batch claim free items ended"));
},
```

---

## 8. One-Click Skin Challenge (一键换皮闯关)

**Original Code Location:** Lines 5092-5274

### Function Description
Executes the skin challenge mode for all selected accounts. Challenges different bosses based on the current day of the week.

### Translated Code

```javascript
skinChallenge: async () => {
  if (selectedTokens.value.length === 0) return;
  ((isRunning.value = true),
    (shouldStop.value = false),
    selectedTokens.value.forEach((tokenId) => {
      tokenStatus.value[tokenId] = "waiting";
    }));
  const promises = selectedTokens.value.map(async (tokenId) => {
    if (shouldStop.value) return;
    tokenStatus.value[tokenId] = "running";
    const token = tokens.value.find((t) => t.id === tokenId);
    try {
      (addLog({ time: new Date().toLocaleTimeString(), message: `=== Skin Challenge: ${token.name} ===`, type: "info" }),
        await ensureConnection(tokenId));
      let towerInfo = await sendMessageWithRetry(tokenId, "towers_getinfo", {}),
        towerData = towerInfo.actId ? towerInfo : towerInfo.towerData?.actId ? towerInfo.towerData : towerInfo;
      if (!(towerData != null && towerData.actId)) throw new Error("Failed to get activity info");
      const actId = String(towerData.actId);
      // Check if activity is still valid based on date
      if (actId.length >= 6) {
        const year = 2000 + parseInt(actId.substring(0, 2)),
          month = parseInt(actId.substring(2, 4)) - 1,
          day = parseInt(actId.substring(4, 6)),
          startDate = new Date(year, month, day),
          endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7);
        const now = new Date();
        if (now < startDate || now >= endDate) {
          (addLog({ time: new Date().toLocaleTimeString(), message: `${token.name} Activity has ended`, type: "warning" }),
            (tokenStatus.value[tokenId] = "completed"));
          return;
        }
      }
      let levelRewardMap = towerData.levelRewardMap || {};
      const currentDay = new Date().getDay(),
        // Day mapping: Fri=[1], Sat=[2], Sun=[3], Mon=[4], Tue=[5], Wed=[6], Thu=[1,2,3,4,5,6]
        dailyBosses = { 5: [1], 6: [2], 0: [3], 1: [4], 2: [5], 3: [6], 4: [1, 2, 3, 4, 5, 6] }[currentDay] || [],
        isBossCleared = (bossId, rewards) => {
          const key = `${bossId}008`;
          return !!(rewards[key] || rewards[Number(key)]);
        },
        getBossProgress = (bossId, rewards) => {
          for (let level = 8; level >= 1; level--) {
            const key = `${bossId}00${level}`;
            if (rewards[key] || rewards[Number(key)]) return level === 8 ? 8 : level + 1;
          }
          return 1;
        },
        unclearedBosses = dailyBosses.filter((bossId) => !isBossCleared(bossId, levelRewardMap));
      if (unclearedBosses.length === 0) {
        (addLog({ time: new Date().toLocaleTimeString(), message: `${token.name} Today's bosses already cleared`, type: "info" }),
          (tokenStatus.value[tokenId] = "completed"));
        return;
      }
      for (const bossId of unclearedBosses) {
        if (shouldStop.value) break;
        addLog({ time: new Date().toLocaleTimeString(), message: `${token.name} Challenging BOSS ${bossId}`, type: "info" });
        let shouldStart = true,
          shouldContinue = true,
          attemptCount = 0;
        const maxAttempts = 3;
        for (; shouldContinue && !shouldStop.value && attemptCount < maxAttempts; )
          try {
            if (shouldStart) {
              addLog({ time: new Date().toLocaleTimeString(), message: `${token.name} BOSS ${bossId} Preparing to start skin challenge...`, type: "info" });
              try {
                (await sendMessageWithRetry(tokenId, "towers_start", { towerType: bossId }),
                  addLog({ time: new Date().toLocaleTimeString(), message: `${token.name} BOSS ${bossId} Start successful`, type: "success" }));
              } catch (startErr) {
                const errMsg = startErr.message || "";
                if (errMsg.includes("200020")) {
                  (addLog({
                    time: new Date().toLocaleTimeString(),
                    message: `${token.name} BOSS ${bossId} Skin challenge not unlocked or not open (200020)`,
                    type: "warning",
                  }),
                    (shouldContinue = false));
                  break;
                }
                if (errMsg.includes("200330"))
                  addLog({
                    time: new Date().toLocaleTimeString(),
                    message: `${token.name} BOSS ${bossId} Skin challenge already started, continuing battle (200330)`,
                    type: "info",
                  });
                else
                  throw (
                    addLog({
                      time: new Date().toLocaleTimeString(),
                      message: `${token.name} BOSS ${bossId} Start failed: ${errMsg.substring(0, 80)}`,
                      type: "error",
                    }),
                    startErr
                  );
              }
              shouldStart = false;
            }
            // ... battle logic continues
          } catch (battleErr) {
            // ... error handling
          }
      }
    } catch (err) {
      (tokenStatus.value[tokenId] = "failed"),
        addLog({ time: new Date().toLocaleTimeString(), message: `${token.name} Skin challenge failed: ${err.message}`, type: "error" });
    } finally {
      await closeConnection(tokenId, token.name);
    }
  });
  (await Promise.all(promises), (isRunning.value = false), (currentRunningTokenId.value = null), message.success("Batch skin challenge ended"));
},
```

---

## 9. One-Click Use Weird Tower Items (一键使用怪异塔道具)

**Original Code Location:** Lines 5275-5331

### Function Description
Uses items in the weird tower merge box mini-game for all selected accounts.

### Translated Code

```javascript
batchUseItems: async () => {
  if (selectedTokens.value.length === 0) return;
  ((isRunning.value = true),
    (shouldStop.value = false),
    selectedTokens.value.forEach((tokenId) => {
      tokenStatus.value[tokenId] = "waiting";
    }));
  const promises = selectedTokens.value.map(async (tokenId) => {
    if (shouldStop.value) return;
    tokenStatus.value[tokenId] = "running";
    const token = tokens.value.find((t) => t.id === tokenId);
    try {
      (addLog({ time: new Date().toLocaleTimeString(), message: `=== Use Items: ${token.name} ===`, type: "info" }),
        await ensureConnection(tokenId));
      const mergeBoxInfo = await sendMessageWithRetry(tokenId, "mergebox_getinfo", { actType: 1 }),
        towerInfo = await sendMessageWithRetry(tokenId, "evotower_getinfo", {});
      if (!(mergeBoxInfo != null && mergeBoxInfo.mergeBox)) throw new Error("Failed to get activity info");
      let totalCostCount = mergeBoxInfo.mergeBox.costTotalCnt || 0,
        remainingItems = towerInfo?.evoTower?.lotteryLeftCnt || 0;
      if (remainingItems <= 0) {
        (addLog({ time: new Date().toLocaleTimeString(), message: `${token.name} No remaining items`, type: "warning" }),
          (tokenStatus.value[tokenId] = "completed"));
        return;
      }
      addLog({ time: new Date().toLocaleTimeString(), message: `${token.name} Remaining items: ${remainingItems}`, type: "info" });
      let usedCount = 0;
      const totalItems = remainingItems;
      for (; usedCount < totalItems && remainingItems > 0 && !shouldStop.value; ) {
        let openPos = { gridX: 4, gridY: 5 };
        (totalCostCount >= 2 && (openPos = { gridX: 7, gridY: 3 }),
          totalCostCount >= 102 && (openPos = { gridX: 6, gridY: 3 }),
          await sendMessageWithRetry(tokenId, "mergebox_openbox", { actType: 1, pos: openPos }),
          totalCostCount++,
          remainingItems--,
          usedCount++,
          await wait(500));
      }
      try {
        (await sendMessageWithRetry(tokenId, "mergebox_claimcostprogress", { actType: 1 }),
          addLog({ time: new Date().toLocaleTimeString(), message: `${token.name} Claimed cumulative rewards`, type: "info" }));
      } catch {}
      ((tokenStatus.value[tokenId] = "completed"),
        addLog({ time: new Date().toLocaleTimeString(), message: `✅ ${token.name} Used items ${usedCount} times`, type: "success" }));
    } catch (err) {
      ((tokenStatus.value[tokenId] = "failed"),
        addLog({
          time: new Date().toLocaleTimeString(),
          message: `${token.name} Use items failed: ${err.message?.substring(0, 100)}`,
          type: "error",
        }));
    } finally {
      await closeConnection(tokenId, token.name);
    }
  });
  (await Promise.all(promises), (isRunning.value = false), (currentRunningTokenId.value = null), message.success("Batch use items ended"));
},
```

---

## 10. One-Click Weird Tower Merge (一键怪异塔合成)

**Original Code Location:** Lines 5332-5437

### Function Description
Performs item merging in the weird tower merge box mini-game for all selected accounts. Automatically claims merge rewards and synthesizes items.

### Translated Code

```javascript
batchMergeItems: async () => {
  if (selectedTokens.value.length === 0) return;
  ((isRunning.value = true),
    (shouldStop.value = false),
    selectedTokens.value.forEach((tokenId) => {
      tokenStatus.value[tokenId] = "waiting";
    }));
  const promises = selectedTokens.value.map(async (tokenId) => {
    if (shouldStop.value) return;
    tokenStatus.value[tokenId] = "running";
    const token = tokens.value.find((t) => t.id === tokenId);
    try {
      (addLog({ time: new Date().toLocaleTimeString(), message: `=== One-Click Merge: ${token.name} ===`, type: "info" }),
        await ensureConnection(tokenId));
      let mergeCount = 0;
      const maxMerges = 20,
        itemNames = {
          2: "Short Skirt Gloves",
          3: "Cool Vegetable Basket",
          4: "Wild Cutting Board",
          5: "Big Stomach Pot",
          6: "Shadow Teapot",
          7: "Angry Toaster",
          8: "Surprised Juicer",
          9: "Dynamic Rice Cooker",
          10: "Swift Oven",
          11: "Supreme Egg Beater",
          12: "Perfect Oven",
        };
      for (; mergeCount < maxMerges && !shouldStop.value; ) {
        mergeCount++;
        const boxInfo = await sendMessageWithRetry(tokenId, "mergebox_getinfo", { actType: 1 });
        if (!(boxInfo != null && boxInfo.mergeBox)) {
          addLog({ time: new Date().toLocaleTimeString(), message: `${token.name} Failed to get info`, type: "warning" });
          break;
        }
        const taskMap = boxInfo.mergeBox.taskMap || {},
          taskClaimMap = boxInfo.mergeBox.taskClaimMap || {};
        for (const taskId in taskMap) {
          if (shouldStop.value) break;
          if (taskMap[taskId] !== 0 && !taskClaimMap[taskId]) {
            await sendMessageWithRetry(tokenId, "mergebox_claimmergeprogress", { actType: 1, taskId: parseInt(taskId) }, { retries: 1 }).catch(
              () => {}
            );
            const itemId = parseInt(String(taskId).slice(-2)),
              itemName = itemNames[itemId] || `Task${taskId}`;
            (addLog({ time: new Date().toLocaleTimeString(), message: `${token.name} Claimed merge reward: ${itemName}`, type: "success" }),
              await wait(500));
          }
        }
        // ... merge logic continues
      }
    } catch (err) {
      // ... error handling
    } finally {
      await closeConnection(tokenId, token.name);
    }
  });
  (await Promise.all(promises), (isRunning.value = false), (currentRunningTokenId.value = null), message.success("Batch merge ended"));
},
```

---

## 11. One-Click Claim Cars (一键收车)

**Original Code Location:** Lines 5775-5870

### Function Description
Claims completed racing cars for all selected accounts. Includes retry mechanism for server errors.

### Translated Code

```javascript
batchClaimCars: async () => {
  if (selectedTokens.value.length !== 0)
    try {
      ((isRunning.value = true),
        (shouldStop.value = false),
        selectedTokens.value.forEach((tokenId) => {
          tokenStatus.value[tokenId] = "waiting";
        }));
      const retryQueue = [],
        promises = selectedTokens.value.map(async (tokenId) => {
          if (shouldStop.value) return;
          tokenStatus.value[tokenId] = "running";
          const token = tokens.value.find((t) => t.id === tokenId);
          let successCount = 0,
            failCount = 0;
          try {
            (addLog({ time: new Date().toLocaleTimeString(), message: `=== Start One-Click Claim Cars: ${token.name} ===`, type: "info" }),
              await ensureConnection(tokenId));
            const carData = await tokenStore.sendMessageWithPromise(tokenId, "car_getrolecar", {}, 20000);
            let cars = parseCarData(carData?.body ?? carData),
              researchLevel = carData?.roleCar?.research?.[1] || 0;
            const claimableCars = cars.filter((car) => isCarClaimable(car));
            if (claimableCars.length === 0) {
              (addLog({
                time: new Date().toLocaleTimeString(),
                message: `${token.name} No claimable cars, skipping`,
                type: "info",
              }),
                (tokenStatus.value[tokenId] = "completed"));
              return;
            }
            addLog({
              time: new Date().toLocaleTimeString(),
              message: `${token.name} Detected ${claimableCars.length} claimable cars, starting claim`,
              type: "info",
            });
            for (const car of cars) {
              if (shouldStop.value) break;
              if (!car.id) {
                addLog({
                  time: new Date().toLocaleTimeString(),
                  message: `${token.name} Car data anomaly (empty id), skipping`,
                  type: "warning",
                });
                continue;
              }
              if (isCarClaimable(car))
                try {
                  (await tokenStore.sendMessageWithPromise(tokenId, "car_claim", { carId: String(car.id) }, 20000),
                    successCount++,
                    addLog({
                      time: new Date().toLocaleTimeString(),
                      message: `${token.name} Car claimed successfully: ${getCarColor(car.color)}`,
                      type: "success",
                    }));
                  const roleInfo = await tokenStore.sendMessageWithPromise(tokenId, "role_getroleinfo", {}, 10000);
                  ((researchLevel = roleInfo?.roleCar?.research?.[1] || researchLevel),
                    await wait(batchSettings.action));
                } catch (claimErr) {
                  const errMsg = claimErr.message || "";
                  if (errMsg.includes("400340")) {
                    (addLog({
                      time: new Date().toLocaleTimeString(),
                      message: `${token.name} Claim failed: Server error 400340, added to retry queue`,
                      type: "warning",
                    }),
                      retryQueue.push({ tokenId: tokenId, tokenName: token.name, car: car, refreshlevel: researchLevel }),
                      failCount++);
                    continue;
                  }
                  (addLog({
                    time: new Date().toLocaleTimeString(),
                    message: `${token.name} Claim failed: ${errMsg}`,
                    type: "error",
                  }),
                    failCount++);
                }
            }
            (addLog(
              successCount === 0 && failCount === 0
                ? { time: new Date().toLocaleTimeString(), message: `${token.name} No claimable cars`, type: "info" }
                : {
                    time: new Date().toLocaleTimeString(),
                    message: `${token.name} Claim complete: ${successCount} success, ${failCount} failed`,
                    type: "success",
                  }
            ),
              (tokenStatus.value[tokenId] = "completed"));
          } catch (err) {
            (console.error(err),
              (tokenStatus.value[tokenId] = "failed"),
              addLog({ time: new Date().toLocaleTimeString(), message: `Claim cars failed: ${err.message}`, type: "error" }));
          } finally {
            await closeConnection(tokenId, token.name);
          }
        });
      await Promise.all(promises);
    } finally {
      ((isRunning.value = false), (currentRunningTokenId.value = null), message.success("Batch claim cars ended"));
    }
},
```

---

## 12. One-Click Box Event Opening (一键宝箱周开箱)

**Original Code Location:** Lines 7142-7373

### Function Description
Opens boxes during the box event week to reach target point thresholds. Calculates required boxes based on current points and opens them in optimal order.

### Translated Code

```javascript
batchOpenBoxByPoints: async (isTargetMode = false) => {
  if (selectedTokens.value.length === 0) return;
  ((isRunning.value = true), (shouldStop.value = false));
  const targetPoints = 8000,
    boxesPerRound = 4,
    targetRounds = isTargetMode ? settings.targetBoxRounds || 1 : currentSettings.targetRounds || 1,
    boxTypes = [
      { id: 2002, name: "Bronze Box", points: 10, reserve: 0 },
      { id: 2003, name: "Gold Box", points: 20, reserve: 0 },
      { id: 2004, name: "Platinum Box", points: 50, reserve: 0 },
      { id: 2001, name: "Wooden Box", points: 1, reserve: 200 },
    ];
  selectedTokens.value.forEach((tokenId) => {
    tokenStatus.value[tokenId] = "waiting";
  });
  const promises = selectedTokens.value.map(async (tokenId) => {
    if (shouldStop.value) return;
    tokenStatus.value[tokenId] = "running";
    const token = tokens.value.find((t) => t.id === tokenId);
    try {
      (addLog({ time: new Date().toLocaleTimeString(), message: `=== Start point-based box opening: ${token.name} ===`, type: "info" }),
        addLog({
          time: new Date().toLocaleTimeString(),
          message: `${token.name} Target rounds: ${targetRounds} rounds (${targetPoints} points per round)`,
          type: "info",
        }),
        await ensureConnection(tokenId));
      const activityData = await tokenStore.sendMessageWithPromise(tokenId, "activity_get", {}, 5000),
        activity = activityData?.activity || activityData?.body?.activity || activityData,
        boxEventData = (activity?.myTotalInfo || {})[2];
      if (!boxEventData) {
        (addLog({
          time: new Date().toLocaleTimeString(),
          message: `${token.name} No box event data found, event may not be active`,
          type: "error",
        }),
          (tokenStatus.value[tokenId] = "failed"));
        return;
      }
      const currentPoints = boxEventData.num || 0,
        completedRounds = Math.floor(currentPoints / targetPoints);
      addLog({
        time: new Date().toLocaleTimeString(),
        message: `${token.name} Current box event points: ${currentPoints}, completed ${completedRounds} rounds`,
        type: "info",
      });
      const targetTotalPoints = targetRounds * targetPoints,
        remainingPoints = Math.max(0, targetTotalPoints - currentPoints);
      if (
        (addLog({
          time: new Date().toLocaleTimeString(),
          message: `${token.name} Target total points: ${targetTotalPoints}, still need: ${remainingPoints}`,
          type: "info",
        }),
        remainingPoints <= 0)
      )
        addLog({
          time: new Date().toLocaleTimeString(),
          message: `${token.name} Already completed ${targetRounds} rounds, no need to open boxes`,
          type: "success",
        });
      else {
        const roleInfo = await tokenStore.sendMessageWithPromise(tokenId, "role_getroleinfo", {}, 10000),
          items = (roleInfo?.role || roleInfo?.data?.role || {}).items || {},
          availableBoxes = {};
        let totalAvailablePoints = 0;
        for (const boxType of boxTypes) {
          const quantity = items[boxType.id]?.quantity || 0,
            usableQuantity = boxType.id === 2001 ? Math.max(0, quantity - boxType.reserve) : quantity;
          ((availableBoxes[boxType.id] = usableQuantity), (totalAvailablePoints += usableQuantity * boxType.points));
        }
        if (
          (addLog({
            time: new Date().toLocaleTimeString(),
            message: `${token.name} Available boxes: Wooden=${availableBoxes[2001]}, Bronze=${availableBoxes[2002]}, Gold=${availableBoxes[2003]}, Platinum=${availableBoxes[2004]}`,
            type: "info",
          }),
          addLog({ time: new Date().toLocaleTimeString(), message: `${token.name} Total available points: ${totalAvailablePoints}`, type: "info" }),
          totalAvailablePoints < remainingPoints)
        ) {
          (addLog({
            time: new Date().toLocaleTimeString(),
            message: `${token.name} Insufficient points! Need ${remainingPoints}, available ${totalAvailablePoints}`,
            type: "error",
          }),
            (tokenStatus.value[tokenId] = "failed"));
          return;
        }
        let pointsNeeded = remainingPoints,
          openPlan = {};
        for (const boxType of boxTypes) {
          if (pointsNeeded <= 0) break;
          // ... box opening logic continues
        }
      }
    } catch (err) {
      // ... error handling
    }
  });
  (await Promise.all(promises), (isRunning.value = false), (currentRunningTokenId.value = null), message.success("Point-based box opening ended"));
},
```

---

## 13. One-Click Open Fragment Packs (一键开碎片礼包)

**Original Code Location:** Lines 7374-7487

### Function Description
Opens all fragment gift packs for all selected accounts. Supports batch opening up to 999 items at a time.

### Translated Code

```javascript
batchOpenFragmentPacks: async (isTargetMode = false) => {
  if (selectedTokens.value.length !== 0)
    try {
      ((isRunning.value = true),
        (shouldStop.value = false),
        selectedTokens.value.forEach((tokenId) => {
          tokenStatus.value[tokenId] = "waiting";
        }));
      const packTypes = [
          { itemId: 3007, name: "Random Red Hero Fragment" },
          { itemId: 3005, name: "Random Purple Hero Fragment" },
          { itemId: 3006, name: "Random Orange Hero Fragment" },
          { itemId: 3008, name: "Iron Fortune Bag" },
          { itemId: 3009, name: "Advance Stone Fortune Bag" },
          { itemId: 3011, name: "White Jade Fortune Bag" },
          { itemId: 3012, name: "Wrench Fortune Bag" },
          { itemId: 35011, name: "Racing Modification Gift Box" },
          { itemId: 3001, name: "Gold Coin Gift Pack" },
          { itemId: 3002, name: "Gold Brick Gift Pack" },
          { itemId: 3010, name: "Crystal Stone Fortune Bag" },
          { itemId: 37005, name: "Weird Gift Pack" },
        ],
        promises = selectedTokens.value.map(async (tokenId) => {
          if (shouldStop.value) return;
          tokenStatus.value[tokenId] = "running";
          const token = tokens.value.find((t) => t.id === tokenId);
          try {
            (addLog({
              time: new Date().toLocaleTimeString(),
              message: `=== Start opening fragment packs: ${token.name} ===`,
              type: "info",
            }),
              await ensureConnection(tokenId));
            const roleInfo = await tokenStore.sendMessageWithPromise(tokenId, "role_getroleinfo", {}, 8000),
              items = roleInfo?.role?.items || {};
            let totalOpened = 0;
            for (const packType of packTypes) {
              if (shouldStop.value) break;
              const quantity = Number(items[packType.itemId]?.quantity || 0);
              if (quantity > 0) {
                addLog({
                  time: new Date().toLocaleTimeString(),
                  message: `${token.name} Has ${packType.name} x${quantity}, starting to open...`,
                  type: "info",
                });
                let remaining = quantity,
                  openedCount = 0;
                for (; remaining > 0 && !shouldStop.value; ) {
                  const batchSize = Math.min(remaining, 999);
                  try {
                    (await tokenStore.sendMessageWithPromise(
                      tokenId,
                      "item_openpack",
                      { itemId: packType.itemId, number: batchSize, index: 0 },
                      10000
                    ),
                      (openedCount += batchSize),
                      (remaining -= batchSize),
                      remaining > 0
                        ? addLog({
                            time: new Date().toLocaleTimeString(),
                            message: `${token.name} Opened ${packType.name} x${batchSize} successfully, ${remaining} remaining`,
                            type: "success",
                          })
                        : addLog({
                            time: new Date().toLocaleTimeString(),
                            message: `${token.name} Opened ${packType.name} x${openedCount} successfully`,
                            type: "success",
                          }),
                      await wait(1000));
                  } catch (openErr) {
                    addLog({
                      time: new Date().toLocaleTimeString(),
                      message: `${token.name} Open ${packType.name} x${batchSize} failed: ${openErr.message}`,
                      type: "error",
                    });
                    break;
                  }
                }
                totalOpened += openedCount;
              }
            }
            (totalOpened > 0
              ? addLog({
                  time: new Date().toLocaleTimeString(),
                  message: `${token.name} === Fragment packs opening complete, total opened ${totalOpened} ===`,
                  type: "success",
                })
              : addLog({
                  time: new Date().toLocaleTimeString(),
                  message: `${token.name} No fragment packs to open`,
                  type: "warning",
                }),
              (tokenStatus.value[tokenId] = "completed"));
          } catch (err) {
            (console.error(err),
              (tokenStatus.value[tokenId] = "failed"),
              addLog({
                time: new Date().toLocaleTimeString(),
                message: `Open fragment packs failed: ${err.message}`,
                type: "error",
              }));
          } finally {
            await closeConnection(tokenId, token.name);
          }
        });
      (await Promise.all(promises), (isRunning.value = false), (currentRunningTokenId.value = null), message.success("Batch open fragment packs ended"));
    } catch {}
},
```

---

## 14. One-Click Hero Star Upgrade (一键英雄升星)

**Original Code Location:** Lines 7704-7747

### Function Description
Automatically upgrades hero stars for all selected accounts. Attempts to upgrade each hero up to 10 times.

### Translated Code

```javascript
batchHeroUpgrade: async () => {
  if (selectedTokens.value.length === 0) return;
  ((isRunning.value = true),
    (shouldStop.value = false),
    selectedTokens.value.forEach((tokenId) => {
      tokenStatus.value[tokenId] = "waiting";
    }));
  const promises = selectedTokens.value.map(async (tokenId) => {
    if (shouldStop.value) return;
    tokenStatus.value[tokenId] = "running";
    const token = tokens.value.find((t) => t.id === tokenId);
    try {
      (addLog({ time: new Date().toLocaleTimeString(), message: `=== Start hero star upgrade: ${token.name} ===`, type: "info" }),
        await ensureConnection(tokenId));
      for (const heroId of heroList) {
        if (shouldStop.value) break;
        for (let attempt = 1; attempt <= 10 && !shouldStop.value; attempt++) {
          try {
            const result = await tokenStore.sendMessageWithPromise(tokenId, "hero_heroupgradestar", { heroId: heroId }, 5000);
            if (result && (result.code === 0 || result.success === true || result.result === 0))
              addLog({
                time: new Date().toLocaleTimeString(),
                message: `${token.name} Hero ID:${heroId} Star upgrade successful (attempt ${attempt})`,
                type: "success",
              });
            else throw new Error("Star upgrade failed");
          } catch {
            break;
          }
          await wait(currentSettings.action);
        }
      }
      ((tokenStatus.value[tokenId] = "completed"),
        addLog({ time: new Date().toLocaleTimeString(), message: `${token.name} === Hero star upgrade complete ===`, type: "success" }));
    } catch (err) {
      (console.error(err),
        (tokenStatus.value[tokenId] = "failed"),
        addLog({ time: new Date().toLocaleTimeString(), message: `Hero star upgrade failed: ${err.message}`, type: "error" }));
    } finally {
      (tokenStore.closeWebSocketConnection(tokenId), releaseConnection());
    }
  });
  (await Promise.all(promises), (isRunning.value = false), (currentRunningTokenId.value = null), message.success("Batch hero star upgrade ended"));
},
```

---

## 15. One-Click Book Upgrade (一键领取英雄图鉴 / 图鉴升星)

**Original Code Location:** Lines 7748-7791

### Function Description
Upgrades the hero book/codex stars for all selected accounts.

### Translated Code

```javascript
batchBookUpgrade: async () => {
  if (selectedTokens.value.length === 0) return;
  ((isRunning.value = true),
    (shouldStop.value = false),
    selectedTokens.value.forEach((tokenId) => {
      tokenStatus.value[tokenId] = "waiting";
    }));
  const promises = selectedTokens.value.map(async (tokenId) => {
    if (shouldStop.value) return;
    tokenStatus.value[tokenId] = "running";
    const token = tokens.value.find((t) => t.id === tokenId);
    try {
      (addLog({ time: new Date().toLocaleTimeString(), message: `=== Start book star upgrade: ${token.name} ===`, type: "info" }),
        await ensureConnection(tokenId));
      for (const heroId of heroList) {
        if (shouldStop.value) break;
        for (let attempt = 1; attempt <= 10 && !shouldStop.value; attempt++) {
          try {
            const result = await tokenStore.sendMessageWithPromise(tokenId, "book_upgrade", { heroId: heroId }, 5000);
            if (result && (result.code === 0 || result.success === true || result.result === 0))
              addLog({
                time: new Date().toLocaleTimeString(),
                message: `${token.name} Hero ID:${heroId} Book star upgrade successful (attempt ${attempt})`,
                type: "success",
              });
            else throw new Error("Book star upgrade failed");
          } catch {
            break;
          }
          await wait(currentSettings.action);
        }
      }
      ((tokenStatus.value[tokenId] = "completed"),
        addLog({ time: new Date().toLocaleTimeString(), message: `${token.name} === Book star upgrade complete ===`, type: "success" }));
    } catch (err) {
      (console.error(err),
        (tokenStatus.value[tokenId] = "failed"),
        addLog({ time: new Date().toLocaleTimeString(), message: `Book star upgrade failed: ${err.message}`, type: "error" }));
    } finally {
      (tokenStore.closeWebSocketConnection(tokenId), releaseConnection());
    }
  });
  (await Promise.all(promises), (isRunning.value = false), (currentRunningTokenId.value = null), message.success("Batch book star upgrade ended"));
},
```

---

## 16. One-Click Claim Star Rewards (一键领取宠物图鉴)

**Original Code Location:** Lines 7792-7832

### Function Description
Claims star rewards from the pet book for all selected accounts.

### Translated Code

```javascript
batchClaimStarRewards: async () => {
  if (selectedTokens.value.length === 0) return;
  ((isRunning.value = true),
    (shouldStop.value = false),
    selectedTokens.value.forEach((tokenId) => {
      tokenStatus.value[tokenId] = "waiting";
    }));
  const promises = selectedTokens.value.map(async (tokenId) => {
    if (shouldStop.value) return;
    tokenStatus.value[tokenId] = "running";
    const token = tokens.value.find((t) => t.id === tokenId);
    try {
      (addLog({ time: new Date().toLocaleTimeString(), message: `=== Start claim star rewards: ${token.name} ===`, type: "info" }),
        await ensureConnection(tokenId));
      for (let attempt = 1; attempt <= 10 && !shouldStop.value; attempt++) {
        try {
          const result = await tokenStore.sendMessageWithPromise(tokenId, "book_claimpointreward", {}, 5000);
          if (result && (result.code === 0 || result.success === true || result.result === 0))
            addLog({ time: new Date().toLocaleTimeString(), message: `${token.name} Claimed star rewards successfully`, type: "success" });
          else throw new Error("Claim rewards failed");
        } catch {
          break;
        }
        await wait(currentSettings.action);
      }
      ((tokenStatus.value[tokenId] = "completed"),
        addLog({
          time: new Date().toLocaleTimeString(),
          message: `${token.name} === Claim star rewards complete ===`,
          type: "success",
        }));
    } catch (err) {
      (console.error(err),
        (tokenStatus.value[tokenId] = "failed"),
        addLog({ time: new Date().toLocaleTimeString(), message: `Claim star rewards failed: ${err.message}`, type: "error" }));
    } finally {
      (tokenStore.closeWebSocketConnection(tokenId), releaseConnection());
    }
  });
  (await Promise.all(promises), (isRunning.value = false), (currentRunningTokenId.value = null), message.success("Batch claim star rewards ended"));
},
```

---

## 17. One-Click Genie Sweep (一键扫荡灯神)

**Original Code Location:** Lines 7965-8048

### Function Description
Sweeps genie levels for all selected accounts. Uses sweep tickets to automatically clear the highest unlocked genie level.

### Translated Code

```javascript
batchGenieSweep: async () => {
  if (selectedTokens.value.length === 0) return;
  ((isRunning.value = true),
    (shouldStop.value = false),
    selectedTokens.value.forEach((tokenId) => {
      tokenStatus.value[tokenId] = "waiting";
    }));
  const promises = selectedTokens.value.map(async (tokenId) => {
    if (shouldStop.value) return;
    tokenStatus.value[tokenId] = "running";
    const token = tokens.value.find((t) => t.id === tokenId);
    try {
      (addLog({ time: new Date().toLocaleTimeString(), message: `=== Start genie sweep: ${token.name} ===`, type: "info" }),
        await ensureConnection(tokenId));
      const roleInfo = await tokenStore.sendMessageWithPromise(tokenId, "role_getroleinfo", {}, 10000),
        role = roleInfo?.role || roleInfo?.data?.role || {},
        genieData = role.genie || {},
        sweepTickets = role.items?.[1021]?.quantity || 0;
      if (
        (addLog({ time: new Date().toLocaleTimeString(), message: `${token.name} Current sweep tickets: ${sweepTickets}`, type: "info" }),
        sweepTickets <= 0)
      ) {
        (addLog({ time: new Date().toLocaleTimeString(), message: `${token.name} Insufficient sweep tickets, stopping sweep`, type: "warning" }),
          (tokenStatus.value[tokenId] = "completed"));
        return;
      }
      let maxLevel = -1,
        maxGenieId = -1;
      for (let genieId = 1; genieId <= 4; genieId++)
        if (genieData[genieId] !== undefined) {
          const level = genieData[genieId] + 1;
          level > maxLevel && ((maxLevel = level), (maxGenieId = genieId));
        }
      if (maxGenieId === -1) {
        (addLog({ time: new Date().toLocaleTimeString(), message: `${token.name} No sweepable genie levels found`, type: "warning" }),
          (tokenStatus.value[tokenId] = "completed"));
        return;
      }
      const genieNames = { 1: "Wei", 2: "Shu", 3: "Wu", 4: "Heroes", 5: "Deep Sea" };
      addLog({
        time: new Date().toLocaleTimeString(),
        message: `${token.name} Sweep: ${genieNames[maxGenieId]} Genie (Level ${maxLevel})`,
        type: "info",
      });
      let remainingTickets = sweepTickets;
      for (; remainingTickets > 0 && !shouldStop.value; ) {
        const batchSize = Math.min(remainingTickets, 20);
        try {
          const result = await tokenStore.sendMessageWithPromise(tokenId, "genie_sweep", { genieId: maxGenieId, sweepCnt: batchSize }, 5000);
          if (result && (result.role || result.role.items))
            (addLog({ time: new Date().toLocaleTimeString(), message: `${token.name} Sweep successful ${batchSize} times`, type: "success" }),
              (remainingTickets = result.role.items?.[1021]?.quantity || 0));
          else {
            addLog({
              time: new Date().toLocaleTimeString(),
              message: `${token.name} Sweep failed: ${result.hint || "Unknown error"}`,
              type: "error",
            });
            break;
          }
        } catch (sweepErr) {
          addLog({
            time: new Date().toLocaleTimeString(),
            message: `${token.name} Sweep request exception: ${sweepErr.message}`,
            type: "error",
          });
          break;
        }
        remainingTickets > 0 && (await wait(currentSettings.action));
      }
      (await tokenStore.sendMessage(tokenId, "role_getroleinfo"),
        (tokenStatus.value[tokenId] = "completed"),
        addLog({ time: new Date().toLocaleTimeString(), message: `${token.name} === Genie sweep complete ===`, type: "success" }));
    } catch (err) {
      (console.error(err),
        (tokenStatus.value[tokenId] = "failed"),
        addLog({ time: new Date().toLocaleTimeString(), message: `Genie sweep failed: ${err.message}`, type: "error" }));
    } finally {
      (tokenStore.closeWebSocketConnection(tokenId), releaseConnection());
    }
  });
  (await Promise.all(promises), (isRunning.value = false), (currentRunningTokenId.value = null), message.success("One-click genie sweep ended"));
},
```

---

## 18. One-Click Treasure Vault Floors 1-3 (一键宝库前3层)

**Original Code Location:** Lines 8321-8369

### Function Description
Executes treasure vault battles for floors 1-3 for all selected accounts.

### Translated Code

```javascript
batchbaoku13: async () => {
  if (selectedTokens.value.length === 0) return;
  ((isRunning.value = true),
    (shouldStop.value = false),
    selectedTokens.value.forEach((tokenId) => {
      tokenStatus.value[tokenId] = "waiting";
    }));
  const promises = selectedTokens.value.map(async (tokenId) => {
    if (shouldStop.value) return;
    tokenStatus.value[tokenId] = "running";
    const token = tokens.value.find((t) => t.id === tokenId);
    try {
      (addLog({ time: new Date().toLocaleTimeString(), message: `=== Start One-Click Treasure Vault: ${token.name} ===`, type: "info" }),
        await ensureConnection(tokenId));
      const currentFloor = (await tokenStore.sendMessageWithPromise(tokenId, "bosstower_getinfo", {})).bossTower.towerId;
      if (currentFloor >= 1 && currentFloor <= 3) {
        for (let i = 0; i < 2 && !shouldStop.value; i++)
          (await tokenStore.sendMessageWithPromise(tokenId, "bosstower_startboss", {}),
            await wait(500));
        for (let i = 0; i < 9 && !shouldStop.value; i++)
          (await tokenStore.sendMessageWithPromise(tokenId, "bosstower_startbox", {}),
            await wait(500));
      }
      ((tokenStatus.value[tokenId] = "completed"),
        addLog({
          time: new Date().toLocaleTimeString(),
          message: `=== ${token.name} Treasure Vault battle completed, please log in manually to claim rewards ===`,
          type: "success",
        }));
    } catch (err) {
      (console.error(err),
        (tokenStatus.value[tokenId] = "failed"),
        addLog({
          time: new Date().toLocaleTimeString(),
          message: `${token.name} Treasure Vault battle failed: ${err.message || "Unknown error"}`,
          type: "error",
        }));
    } finally {
      (tokenStore.closeWebSocketConnection(tokenId),
        releaseConnection(),
        addLog({
          time: new Date().toLocaleTimeString(),
          message: `${token.name} Connection closed (Queue: ${connectionQueue.active}/${batchSettings.maxActive})`,
          type: "info",
        }));
    }
  });
  (await Promise.all(promises), (isRunning.value = false), (currentRunningTokenId.value = null), message.success("Batch treasure vault ended"));
},
```

---

## 19. One-Click Treasure Vault Floors 4-5 (一键宝库4,5层)

**Original Code Location:** Lines 8370-8410

### Function Description
Executes treasure vault battles for floors 4-5 for all selected accounts.

### Translated Code

```javascript
batchbaoku45: async () => {
  if (selectedTokens.value.length === 0) return;
  ((isRunning.value = true),
    (shouldStop.value = false),
    selectedTokens.value.forEach((tokenId) => {
      tokenStatus.value[tokenId] = "waiting";
    }));
  const promises = selectedTokens.value.map(async (tokenId) => {
    if (shouldStop.value) return;
    tokenStatus.value[tokenId] = "running";
    const token = tokens.value.find((t) => t.id === tokenId);
    try {
      (addLog({ time: new Date().toLocaleTimeString(), message: `=== Start One-Click Treasure Vault: ${token.name} ===`, type: "info" }),
        await ensureConnection(tokenId));
      const currentFloor = (await tokenStore.sendMessageWithPromise(tokenId, "bosstower_getinfo", {})).bossTower.towerId;
      if (currentFloor >= 4 && currentFloor <= 5)
        for (let i = 0; i < 2 && !shouldStop.value; i++)
          (await tokenStore.sendMessageWithPromise(tokenId, "bosstower_startboss", {}),
            await wait(500));
      ((tokenStatus.value[tokenId] = "completed"),
        addLog({ time: new Date().toLocaleTimeString(), message: `=== ${token.name} Treasure Vault battle completed ===`, type: "success" }));
    } catch (err) {
      (console.error(err),
        (tokenStatus.value[tokenId] = "failed"),
        addLog({
          time: new Date().toLocaleTimeString(),
          message: `${token.name} Treasure Vault battle failed: ${err.message || "Unknown error"}`,
          type: "error",
        }));
    } finally {
      (tokenStore.closeWebSocketConnection(tokenId),
        releaseConnection(),
        addLog({
          time: new Date().toLocaleTimeString(),
          message: `${token.name} Connection closed (Queue: ${connectionQueue.active}/${batchSettings.maxActive})`,
          type: "info",
        }));
    }
  });
  (await Promise.all(promises), (isRunning.value = false), (currentRunningTokenId.value = null), message.success("Batch treasure vault ended"));
},
```

---

## Task Templates

### Default Task Groups (Lines 14688-14742)

```javascript
taskTemplates = [
  {
    name: "daily",
    label: "Daily",
    tasks: [
      "startBatch",
      "claimHangUpRewards",
      "batchAddHangUpTime",
      "resetBottles",
      "batchlingguanzi",
      "batchclubsign",
      "batchStudy",
      "batcharenafight",
      "batchSmartSendCar",
      "batchClaimCars",
      "batchCarResearchUpgrade",
      "store_purchase",
    ],
  },
  {
    name: "weekly",
    label: "Weekly",
    tasks: [
      "batchOpenBoxByPoints",
      "batchOpenFragmentPacks",
      "batchClaimBoxWeeklyRewards",
      "batchClaimBoxPointReward",
      "batchFish",
      "batchRecruit",
    ],
  },
  {
    name: "dungeon",
    label: "Dungeon",
    tasks: ["climbTower", "batchmengjing", "skinChallenge", "batchClaimPeachTasks", "batchBuyDreamItems"],
  },
  { name: "baoku", label: "Treasure Vault", tasks: ["batchbaoku13", "batchbaoku45"] },
  {
    name: "weirdTower",
    label: "Weird Tower",
    tasks: [
      "climbWeirdTower",
      "batchUseItems",
      "batchMergeItems",
      "batchClaimFreeEnergy",
      "claim_weird_tower_all",
      "claim_weird_tower_pass",
    ],
  },
  {
    name: "book",
    label: "Book",
    tasks: [
      "openHeroFourSaintsModal",
      "batchHeroUpgrade",
      "batchBookUpgrade",
      "batchClaimStarRewards",
      "claim_pet_book",
    ],
  },
];
```

---

## Common Parameters Across All Features

| Parameter | Type | Description |
|-----------|------|-------------|
| `e.value` / `selectedTokens` | Array | List of selected account token IDs |
| `o.value` / `tokens` | Array | List of token objects with account information |
| `a.value` / `tokenStatus` | Object | Map of token IDs to their current execution status |
| `r.value` / `isRunning` | Boolean | Whether a batch operation is currently running |
| `i.value` / `shouldStop` | Boolean | Flag to signal stopping the operation |
| `d()` / `ensureConnection()` | Function | Ensures WebSocket connection for a token |
| `k()` / `releaseConnection()` | Function | Releases the connection slot |
| `t()` / `addLog()` | Function | Adds a log entry |
| `M` / `message` | Object | Message/notification object |
| `P` / `currentSettings` | Object | Current batch settings |

## Status Values

- `"waiting"` - Task is queued
- `"running"` - Task is currently executing
- `"completed"` - Task completed successfully
- `"failed"` - Task failed
- `"retry"` - Task is queued for retry
- `"waiting_retry"` - Task is waiting for retry round

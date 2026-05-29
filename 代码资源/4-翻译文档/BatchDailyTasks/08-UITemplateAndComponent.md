# BatchDailyTasks 模块 UI 翻译文档

> 从编译后的 Vue 代码 `BatchDailyTasks-XgqKel1u.js`（24806行）还原翻译  
> ScopeId: `data-v-7059366c`（主组件）、`data-v-94a8ad04`（TokenCard 子组件）

---

## 一、UI 模板翻译

### 1.1 批量任务主界面布局

```html
<template>
  <div class="batch-daily-tasks">
    <div class="main-layout">
      <!-- 左列：控制面板 + 账号列表 -->
      <div class="left-column">
        <!-- 页面头部：定时任务卡片 -->
        <div class="page-header"
          :style="{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }">
          <div class="scheduled-tasks-wrapper">
            <div class="scheduled-tasks-card"
              :style="{
                flex: '1',
                minWidth: '280px',
                padding: '16px 20px',
                background: '#ffffff',
                borderRadius: '10px',
                color: '#333333',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e8e8e8'
              }">
              <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }">
                <div :style="{ flex: '1' }">
                  <div :style="{ fontSize: '14px', color: '#666666', marginBottom: '6px', fontWeight: '500' }">
                    📅 定时任务
                  </div>
                  <div :style="{ fontSize: '32px', fontWeight: '700', lineHeight: '1', color: '#1890ff' }">
                    {{ scheduledTasks.length }}
                  </div>
                </div>
                <div :style="{ flex: '1', borderLeft: '2px solid #e8e8e8', paddingLeft: '16px' }">
                  <div :style="{ fontSize: '14px', color: '#666666', marginBottom: '6px', fontWeight: '500' }">
                    ⏰ 即将执行
                  </div>
                  <div :style="{
                    fontSize: '15px',
                    fontWeight: '600',
                    wordBreak: 'break-word',
                    lineHeight: '1.4',
                    color: '#333333'
                  }">
                    {{ shortestCountdownTask
                      ? `${shortestCountdownTask.task.name} (${shortestCountdownTask.countdown.formatted})`
                      : '暂无任务' }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 定时任务按钮区 -->
          <div class="scheduled-tasks-buttons">
            <!-- 第一行：任务管理 -->
            <div class="button-row button-row-task">
              <n-button size="small" @click="openTaskModal" :style="{ flex: '1', color: 'white' }">
                <template #icon><span :style="{ fontSize: '16px' }">➕</span></template>
                新增任务
              </n-button>
              <n-button size="small" @click="showTasksModal = true" :disabled="scheduledTasks.length === 0"
                :style="{ flex: '1', color: 'white' }">
                <template #icon><span :style="{ fontSize: '16px' }">📋</span></template>
                查看任务
              </n-button>
            </div>
            <!-- 第二行：时段控制 -->
            <div class="button-row button-row-time">
              <n-button size="small" @click="toggleAllOfflineTime(true)" :disabled="scheduledTasks.length === 0"
                :style="{ flex: '1', color: 'white' }">
                <template #icon><span :style="{ fontSize: '16px' }">▶️</span></template>
                开启时段
              </n-button>
              <n-button size="small" @click="toggleAllOfflineTime(false)" :disabled="scheduledTasks.length === 0"
                :style="{ flex: '1', color: 'white' }">
                <template #icon><span :style="{ fontSize: '16px' }">⏸️</span></template>
                关闭时段
              </n-button>
            </div>
            <!-- 第三行：导入导出 -->
            <div class="button-row button-row-config">
              <n-button size="small" @click="triggerImportScheduledTasks" :style="{ flex: '1', color: 'white' }">
                <template #icon><span :style="{ fontSize: '16px' }">📥</span></template>
                导入任务
              </n-button>
              <n-button size="small" @click="exportScheduledTasksConfig" :disabled="scheduledTasks.length === 0"
                :style="{ flex: '1', color: 'white' }">
                <template #icon><span :style="{ fontSize: '16px' }">📤</span></template>
                导出任务
              </n-button>
              <n-button size="small" @click="triggerImportAccountConfig" :style="{ flex: '1', color: 'white' }">
                <template #icon><span :style="{ fontSize: '16px' }">📥</span></template>
                导入账号
              </n-button>
              <n-button size="small" @click="exportAccountConfig" :disabled="tokens.length === 0"
                :style="{ flex: '1', color: 'white' }">
                <template #icon><span :style="{ fontSize: '16px' }">📤</span></template>
                导出账号
              </n-button>
            </div>
          </div>
        </div>

        <!-- 隐藏的文件输入 -->
        <input ref="importScheduledTasksInput" type="file" accept=".json" :style="{ display: 'none' }"
          @change="handleImportScheduledTasks" />
        <input ref="importAccountConfigInput" type="file" accept=".json" :style="{ display: 'none' }"
          @change="handleImportAccountConfig" />

        <!-- 执行控制按钮区 -->
        <div :style="{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '8px 12px', backgroundColor: 'transparent',
          borderRadius: '12px', border: 'none', flexWrap: 'wrap'
        }">
          <n-button @click="startBatch" :disabled="isRunning || selectedTokens.length === 0" size="medium"
            :style="{
              flex: '1', minWidth: '120px', borderRadius: '8px', fontWeight: '500',
              background: 'rgba(255, 255, 255, 0.3)', borderColor: 'rgba(255, 255, 255, 0.3)', color: 'white'
            }">
            <template #icon><span :style="{ fontSize: '16px' }">▶️</span></template>
            {{ isRunning ? '执行中...' : '开始执行' }}
          </n-button>
          <n-button @click="stopBatch" :disabled="!isRunning" size="medium"
            :style="{
              flex: '1', minWidth: '120px', borderRadius: '8px', fontWeight: '500',
              background: 'rgba(255, 255, 255, 0.3)', borderColor: 'rgba(255, 255, 255, 0.3)', color: 'white'
            }">
            <template #icon><span :style="{ fontSize: '16px' }">⏹️</span></template>
            停止
          </n-button>
          <n-button @click="openTemplateManagerModal" size="medium"
            :style="{
              flex: '1', minWidth: '120px', borderRadius: '8px', fontWeight: '500',
              background: 'rgba(255, 255, 255, 0.3)', borderColor: 'rgba(255, 255, 255, 0.3)', color: 'white'
            }">
            <template #icon><span :style="{ fontSize: '16px' }">📥</span></template>
            任务模板
          </n-button>
          <n-button @click="openBatchSettings" size="medium"
            :style="{
              flex: '1', minWidth: '120px', borderRadius: '8px', fontWeight: '500',
              background: 'rgba(255, 255, 255, 0.3)', borderColor: 'rgba(255, 255, 255, 0.3)', color: 'white'
            }">
            <template #icon><span :style="{ fontSize: '16px' }">⚙️</span></template>
            设置
          </n-button>
          <n-button @click="connectSelected" :disabled="selectedTokens.length === 0" size="medium"
            :style="{
              flex: '1', minWidth: '120px', borderRadius: '8px', fontWeight: '500',
              background: 'rgba(255, 255, 255, 0.3)', borderColor: 'rgba(255, 255, 255, 0.3)', color: 'white'
            }">
            <template #icon><span :style="{ fontSize: '16px' }">🔗</span></template>
            连接
          </n-button>
          <n-button @click="disconnectSelected" :disabled="selectedTokens.length === 0" size="medium"
            :style="{
              flex: '1', minWidth: '120px', borderRadius: '8px', fontWeight: '500',
              background: 'rgba(255, 255, 255, 0.3)', borderColor: 'rgba(255, 255, 255, 0.3)', color: 'white'
            }">
            <template #icon><span :style="{ fontSize: '16px' }">🔌</span></template>
            断开
          </n-button>
        </div>
        <!-- ... 后续批量功能列表、账号列表 ... -->
      </div>

      <!-- 右列：执行日志 -->
      <div class="right-column">
        <!-- 日志卡片 -->
      </div>
    </div>

    <!-- 各种 Modal 弹窗 -->
    <!-- ... -->
  </div>
</template>
```

### 1.2 批量功能列表（Tabs 标签页）

```html
<n-card title="批量功能列表" class="token-list-card">
  <template #header-extra>
    <n-space :style="{ gap: '8px', alignItems: 'center' }">
      <n-space :style="{ gap: '6px', alignItems: 'center' }" size="small">
        <!-- 防休眠开关 -->
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-switch v-model:value="isWakeLockEnabled" @update:value="handleWakeLockToggle"
              :disabled="!wakeLockSupported" size="small" :style="{ transform: 'scale(0.85)' }">
              <template #checked>🛡️ 已开启</template>
              <template #unchecked>🛡️ 防休眠</template>
            </n-switch>
          </template>
          <span v-if="wakeLockSupported">开启后系统将保持唤醒状态,防止自动休眠</span>
          <span v-else>当前环境不支持防休眠功能</span>
        </n-tooltip>
        <n-text v-if="!wakeLockSupported" type="warning" :style="{ fontSize: '11px' }">不支持</n-text>
      </n-space>
      <n-button size="small" @click="isBatchFunctionsExpanded = !isBatchFunctionsExpanded"
        :type="isBatchFunctionsExpanded ? 'primary' : 'default'">
        {{ isBatchFunctionsExpanded ? '收起' : '展开' }}
      </n-button>
    </n-space>
  </template>

  <template #default>
    <div v-if="isBatchFunctionsExpanded">
      <n-tabs type="line" animated>
        <!-- 日常 -->
        <n-tab-pane name="daily" tab="日常">
          <n-space>
            <n-button size="small" @click="claimHangUpRewards" :disabled="isRunning || selectedTokens.length === 0">领取挂机</n-button>
            <n-button size="small" @click="batchAddHangUpTime" :disabled="isRunning || selectedTokens.length === 0">一键加钟</n-button>
            <n-button size="small" @click="resetBottles" :disabled="isRunning || selectedTokens.length === 0">重置罐子</n-button>
            <n-button size="small" @click="batchlingguanzi" :disabled="isRunning || selectedTokens.length === 0">一键领取罐子</n-button>
            <n-button size="small" @click="batchclubsign" :disabled="isRunning || selectedTokens.length === 0">一键俱乐部签到</n-button>
            <n-button size="small" @click="batchStudy" :disabled="isRunning || selectedTokens.length === 0">一键答题</n-button>
            <n-button size="small" @click="batcharenafight" :disabled="isRunning || selectedTokens.length === 0 || !isarenaActivityOpen">一键竞技场战斗3次</n-button>
            <n-button size="small" @click="batchSmartSendCar" :disabled="isRunning || selectedTokens.length === 0 || !isCarActivityOpen">智能发车</n-button>
            <n-button size="small" @click="batchClaimCars" :disabled="isRunning || selectedTokens.length === 0 || !isCarActivityOpen">一键收车</n-button>
            <n-button size="small" @click="batchCarResearchUpgrade" :disabled="isRunning || selectedTokens.length === 0 || !isCarActivityOpen">升级改装</n-button>
            <n-button size="small" @click="store_purchase" :disabled="isRunning || selectedTokens.length === 0">一键黑市采购</n-button>
          </n-space>
        </n-tab-pane>

        <!-- 福利 -->
        <n-tab-pane name="welfare" tab="福利">
          <n-space>
            <n-button size="small" @click="charge_claimaddup_rewards" :disabled="isRunning || selectedTokens.length === 0">积分好礼领取</n-button>
            <n-button size="small" @click="collection_claimfreereward" :disabled="isRunning || selectedTokens.length === 0">一键领取珍宝阁</n-button>
            <n-button size="small" @click="gacha_drawreward" :disabled="isRunning || selectedTokens.length === 0">免费扭蛋</n-button>
            <n-button size="small" @click="claim_recruit_welfare" :disabled="isRunning || selectedTokens.length === 0 || !isRecruitActivityOpen">免费礼包领取</n-button>
            <n-button size="small" @click="pkroom_appoint" :disabled="isRunning || selectedTokens.length === 0">预约直播</n-button>
          </n-space>
        </n-tab-pane>

        <!-- 副本 -->
        <n-tab-pane name="dungeon" tab="副本">
          <n-space>
            <n-button size="small" @click="climbTower" :disabled="isRunning || selectedTokens.length === 0">一键爬塔</n-button>
            <n-button size="small" @click="batchmengjing" :disabled="isRunning || selectedTokens.length === 0 || !ismengjingActivityOpen">一键梦境</n-button>
            <n-button size="small" @click="skinChallenge" :disabled="isRunning || selectedTokens.length === 0">一键换皮闯关</n-button>
            <n-button size="small" @click="batchClaimPeachTasks" :disabled="isRunning || selectedTokens.length === 0">一键领取蟠桃园任务</n-button>
            <n-button size="small" @click="batchBuyDreamItems" :disabled="isRunning || selectedTokens.length === 0 || !ismengjingActivityOpen">一键购买梦境商品</n-button>
          </n-space>
        </n-tab-pane>

        <!-- 宝库 -->
        <n-tab-pane name="baoku" tab="宝库">
          <n-space>
            <n-button size="small" @click="batchbaoku13" :disabled="isRunning || selectedTokens.length === 0 || !isbaokuActivityOpen">一键宝库前3层</n-button>
            <n-button size="small" @click="batchbaoku45" :disabled="isRunning || selectedTokens.length === 0 || !isbaokuActivityOpen">一键宝库4,5层</n-button>
          </n-space>
        </n-tab-pane>

        <!-- 怪异塔 -->
        <n-tab-pane name="weirdTower" tab="怪异塔">
          <n-space>
            <n-button size="small" @click="climbWeirdTower" :disabled="isRunning || selectedTokens.length === 0 || !isWeirdTowerActivityOpen">一键爬怪异塔</n-button>
            <n-button size="small" @click="batchUseItems" :disabled="isRunning || selectedTokens.length === 0 || !isWeirdTowerActivityOpen">一键使用怪异塔道具</n-button>
            <n-button size="small" @click="batchMergeItems" :disabled="isRunning || selectedTokens.length === 0 || !isWeirdTowerActivityOpen">一键怪异塔合成</n-button>
            <n-button size="small" @click="batchClaimFreeEnergy" :disabled="isRunning || selectedTokens.length === 0 || !isWeirdTowerActivityOpen">一键领取怪异塔免费道具</n-button>
            <n-button size="small" @click="claim_weird_tower_all" :disabled="isRunning || selectedTokens.length === 0 || !isWeirdTowerActivityOpen">领取怪异塔宝箱目标特权</n-button>
            <n-button size="small" @click="claim_weird_tower_pass" :disabled="isRunning || selectedTokens.length === 0 || !isWeirdTowerActivityOpen">领取怪异塔通行证</n-button>
          </n-space>
        </n-tab-pane>

        <!-- 资源 -->
        <n-tab-pane name="resource" tab="资源">
          <n-space>
            <n-button size="small" @click="openHelperModal('box')" :disabled="isRunning || selectedTokens.length === 0">批量开箱</n-button>
            <n-button size="small" @click="openHelperModal('pointsBox')" :disabled="isRunning || selectedTokens.length === 0">一键宝箱周开箱</n-button>
            <n-button size="small" @click="batchOpenDiamondBox" :disabled="isRunning || selectedTokens.length === 0">一键开钻石宝箱</n-button>
            <n-button size="small" @click="batchOpenFragmentPacks" :disabled="isRunning || selectedTokens.length === 0">一键开碎片礼包</n-button>
            <n-button size="small" @click="openBoxWeeklyRewardModal" :disabled="isRunning || selectedTokens.length === 0">宝箱达标奖励自选大奖</n-button>
            <n-button size="small" @click="batchClaimBoxPointReward" :disabled="isRunning || selectedTokens.length === 0">领取宝箱积分</n-button>
            <n-button size="small" @click="openHelperModal('fish')" :disabled="isRunning || selectedTokens.length === 0">批量钓鱼</n-button>
            <n-button size="small" @click="openHelperModal('recruit')" :disabled="isRunning || selectedTokens.length === 0">批量招募</n-button>
            <n-button size="small" @click="legion_storebuygoods" :disabled="isRunning || selectedTokens.length === 0">一键购买四圣碎片</n-button>
            <n-button size="small" @click="buy_super_spirit_shell" :disabled="isRunning || selectedTokens.length === 0">一键购买特级灵贝包</n-button>
            <n-button size="small" @click="buy_top_rod_package" :disabled="isRunning || selectedTokens.length === 0">一键购买顶级鱼竿包</n-button>
            <n-button size="small" @click="weekly_market_free_gift" :disabled="isRunning || selectedTokens.length === 0">购买中级黑市包</n-button>
            <n-button size="small" @click="store_buy_bronze" :disabled="isRunning || selectedTokens.length === 0">一键购买青铜宝箱</n-button>
            <n-button size="small" @click="store_buy_platinum" :disabled="isRunning || selectedTokens.length === 0">一键购买铂金宝箱</n-button>
            <n-button size="small" @click="store_buy_gold_rod" :disabled="isRunning || selectedTokens.length === 0">一键购买金鱼竿</n-button>
            <n-button size="small" @click="store_buy_jade" :disabled="isRunning || selectedTokens.length === 0">一键购买彩玉</n-button>
            <n-button size="small" @click="legionStoreBuySkinCoins" :disabled="isRunning || selectedTokens.length === 0">一键购买俱乐部5皮肤币</n-button>
            <n-button size="small" @click="legion_buy_red_jade" :disabled="isRunning || selectedTokens.length === 0">一键购买5次红玉</n-button>
            <n-button size="small" @click="legion_buy_spotted_egg" :disabled="isRunning || selectedTokens.length === 0">一键购买斑点蛋</n-button>
            <n-button size="small" @click="use_spotted_egg" :disabled="isRunning || selectedTokens.length === 0">使用斑点蛋</n-button>
            <n-button size="small" @click="batchGenieSweep" :disabled="isRunning || selectedTokens.length === 0">一键灯神扫荡</n-button>
          </n-space>
        </n-tab-pane>

        <!-- 图鉴 -->
        <n-tab-pane name="illustration" tab="图鉴">
          <n-space>
            <n-button size="small" @click="openHeroFourSaintsModal()" :disabled="isRunning || selectedTokens.length === 0">英雄四圣升级</n-button>
            <n-button size="small" @click="batchHeroUpgrade" :disabled="isRunning || selectedTokens.length === 0">一键英雄升星</n-button>
            <n-button size="small" @click="batchBookUpgrade" :disabled="isRunning || selectedTokens.length === 0">一键图鉴升星</n-button>
            <n-button size="small" @click="batchClaimStarRewards" :disabled="isRunning || selectedTokens.length === 0">一键领取图鉴奖励</n-button>
            <n-button size="small" @click="claim_pet_book" :disabled="isRunning || selectedTokens.length === 0">宠物领取图鉴奖励</n-button>
          </n-space>
        </n-tab-pane>

        <!-- 十殿 -->
        <n-tab-pane name="nightmare" tab="十殿">
          <n-space>
            <n-button size="small" @click="nightmare_draw_lottery" :disabled="isRunning || selectedTokens.length === 0">十殿抽奖</n-button>
            <n-button size="small" @click="nightmare_claim_book_reward" :disabled="isRunning || selectedTokens.length === 0">十殿抽奖达标奖励</n-button>
            <n-button size="small" @click="star_drawturntable" :disabled="isRunning || selectedTokens.length === 0">星级抽奖</n-button>
            <n-button size="small" @click="batch_star_challenge" :disabled="isRunning || selectedTokens.length === 0">十殿星级挑战</n-button>
          </n-space>
        </n-tab-pane>

        <!-- 功法 -->
        <n-tab-pane name="legacy" tab="功法">
          <n-space>
            <n-button size="small" @click="batchLegacyClaim" :disabled="isRunning || selectedTokens.length === 0">批量功法残卷领取</n-button>
            <n-button size="small" @click="showLegacyGiftModal = true" :disabled="isRunning || selectedTokens.length === 0">批量功法残卷赠送</n-button>
          </n-space>
        </n-tab-pane>

        <!-- 月度 -->
        <n-tab-pane name="monthly" tab="月度">
          <n-space>
            <n-button size="small" @click="batchTopUpFish" :disabled="isRunning || selectedTokens.length === 0">一键钓鱼补齐</n-button>
            <n-button size="small" @click="batchTopUpArena" :disabled="isRunning || selectedTokens.length === 0 || !isarenaActivityOpen">一键竞技场补齐</n-button>
            <n-button size="small" @click="openWarGuessModal" :disabled="isRunning || selectedTokens.length === 0 || !isWarGuessActivityOpen"
              :title="isWarGuessActivityOpen ? '' : warGuessActivityTip">月赛助威</n-button>
            <n-button size="small" @click="claim_guess_coin" :disabled="isRunning || selectedTokens.length === 0">领取助威币</n-button>
            <n-button size="small" @click="openLegionStoreModal" :disabled="isRunning || selectedTokens.length === 0">助威商店多选购买</n-button>
          </n-space>
        </n-tab-pane>
      </n-tabs>
    </div>
  </template>
</n-card>
```

### 1.3 账号选择区域（Checkbox 列表 + 分组选择）

```html
<n-card title="账号列表" :style="{ marginTop: '16px' }">
  <template #header-extra>
    <n-button size="small" @click="isTokenListExpanded = !isTokenListExpanded"
      :type="isTokenListExpanded ? 'primary' : 'default'">
      {{ isTokenListExpanded ? '收起' : '展开' }}
    </n-button>
  </template>

  <template #default>
    <div v-if="isTokenListExpanded">
      <!-- 分组选择区域 -->
      <div :style="{ background: '#f7f8fa', borderRadius: '6px', padding: '8px', marginBottom: '12px' }">
        <n-space vertical :style="{ width: '100%' }">
          <!-- 分组选择标签 -->
          <div v-if="tokenGroups.length > 0" class="group-selection-section">
            <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }">
              <label :style="{ fontWeight: '500', color: '#333', fontSize: '12px' }">分组选择</label>
              <n-button size="tiny" type="error" text @click="clearAllGroupSelection"
                :style="{ fontSize: '11px' }">一键清除所有分组选择</n-button>
            </div>
            <div :style="{ display: 'flex', gap: '6px', flexWrap: 'wrap' }">
              <div v-for="group in tokenGroups" :key="group.id"
                @click="toggleGroupSelection(group.id)"
                :style="{
                  padding: '6px 10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  backgroundColor: isGroupSelected(group.id) ? group.color : 'transparent',
                  border: `2px solid ${group.color}`,
                  color: isGroupSelected(group.id) ? 'white' : group.color,
                  fontWeight: isGroupSelected(group.id) ? '600' : '400',
                  transition: 'all 0.3s ease',
                  userSelect: 'none'
                }">
                <span :style="{ fontSize: '11px' }">{{ group.name }} ({{ getValidGroupTokenIds(group.id).length }})</span>
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div :style="{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e5e6eb'
          }">
            <n-space>
              <n-button type="info" size="small" @click="showGroupManageModal = true">管理分组</n-button>
              <n-button type="primary" size="small" @click="refreshSelectedTokens" :disabled="selectedTokens.length === 0">刷新Token</n-button>
              <n-popconfirm @positive-click="resetSelectedTokensCache" positive-text="确认重置" negative-text="取消">
                <template #trigger>
                  <n-button type="warning" size="small" :disabled="selectedTokens.length === 0">重置缓存</n-button>
                </template>
                确定要重置已选账号的本地缓存吗？这将清除localStorage缓存并重新加载卡片数据。
              </n-popconfirm>
            </n-space>
            <span v-if="selectedGroups.length > 0" :style="{ fontSize: '12px', color: '#86909c' }">
              已选择 {{ selectedGroups.length }} 个分组，包含 {{ selectedTokens.length }} 个账号
            </span>
          </div>
        </n-space>
      </div>

      <!-- 排序按钮 -->
      <div class="sort-buttons" :style="{ marginTop: '16px', marginBottom: '12px' }">
        <n-space align="center">
          <n-button-group size="small">
            <n-button @click="toggleSort('name')" :type="sortConfig.field === 'name' ? 'primary' : 'default'">
              名称 {{ getSortIcon('name') }}
            </n-button>
            <n-button @click="toggleSort('server')" :type="sortConfig.field === 'server' ? 'primary' : 'default'">
              服务器 {{ getSortIcon('server') }}
            </n-button>
            <n-button @click="toggleSort('createdAt')" :type="sortConfig.field === 'createdAt' ? 'primary' : 'default'">
              创建时间 {{ getSortIcon('createdAt') }}
            </n-button>
            <n-button @click="toggleSort('lastUsed')" :type="sortConfig.field === 'lastUsed' ? 'primary' : 'default'">
              最后使用 {{ getSortIcon('lastUsed') }}
            </n-button>
          </n-button-group>

          <!-- 每行数量 -->
          <div :style="{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '16px' }">
            <span :style="{ fontSize: '12px', color: '#666' }">每行数量:</span>
            <n-input-number v-model:value="batchSettings.tokenListColumns"
              @update:value="handleManualColumnChange" :min="1" :max="10" :step="1"
              size="small" :style="{ width: '80px' }" :disabled="!isMaximizedWindow" />
            <span v-if="!isMaximizedWindow" :style="{ fontSize: '12px', color: '#999' }">(自动)</span>
          </div>

          <!-- 搜索账号 -->
          <div :style="{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '16px' }">
            <span :style="{ fontSize: '12px', color: '#666' }">搜索账号:</span>
            <n-input v-model:value="tokenSearchKeyword" @update:value="handleTokenSearch"
              placeholder="输入账号名称搜索..." size="small" clearable :style="{ width: '200px' }">
              <template #prefix>
                <n-icon><!-- 搜索图标 --></n-icon>
              </template>
            </n-input>
          </div>
        </n-space>
      </div>

      <!-- 全选 + 展开/收起控制 -->
      <div :style="{ background: '#f7f8fa', borderRadius: '8px', padding: '12px', marginTop: '16px' }">
        <n-space vertical>
          <div :style="{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }">
            <n-checkbox :checked="isAllSelected" :indeterminate="isIndeterminate" @update:checked="handleSelectAll">
              全选
            </n-checkbox>
            <div class="expand-collapse-buttons">
              <div class="button-group">
                <n-button size="small" @click="isTowerExpandedForAll = true">展开闯关</n-button>
                <n-button size="small" @click="isTowerExpandedForAll = false">收起闯关</n-button>
              </div>
              <div class="button-group">
                <n-button size="small" @click="isCarExpandedForAll = true">展开赛车</n-button>
                <n-button size="small" @click="isCarExpandedForAll = false">收起赛车</n-button>
              </div>
              <div class="button-group">
                <n-button size="small" @click="isClimbTowerExpandedForAll = true">展开爬塔</n-button>
                <n-button size="small" @click="isClimbTowerExpandedForAll = false">收起爬塔</n-button>
              </div>
              <div class="button-group">
                <n-button size="small" @click="isWeirdTowerExpandedForAll = true">展开怪塔</n-button>
                <n-button size="small" @click="isWeirdTowerExpandedForAll = false">收起怪塔</n-button>
              </div>
            </div>
          </div>

          <!-- Token 卡片网格 -->
          <n-grid :x-gap="12" :y-gap="12" :cols="responsiveColumns">
            <n-grid-item v-for="token in sortedTokens" :key="token.id">
              <TokenCard
                :token="token"
                :is-selected="selectedTokens.includes(token.id)"
                :is-tower-expanded="isTowerExpandedForAll"
                :is-car-expanded="isCarExpandedForAll"
                :is-climb-tower-expanded="isClimbTowerExpandedForAll"
                :is-weird-tower-expanded="isWeirdTowerExpandedForAll"
                :is-drop-target="targetTokenId === token.id"
                @select="handleTokenSelect"
                @settings="openSettings"
                @toggle-connection="handleToggleConnection"
                @drag-start="handleTokenDragStart"
                @drag-end="handleTokenDragEnd"
                @drop="handleTokenDrop"
                @drag-query="handleTokenDragQuery"
                @drag-update-target="handleTokenDragUpdateTarget"
                @drag-get-target="handleTokenDragGetTarget"
              />
            </n-grid-item>
          </n-grid>
        </n-space>
      </div>
    </div>
  </template>
</n-card>
```

### 1.4 日志显示区域（右列）

```html
<div class="right-column">
  <n-card class="log-card">
    <template #header>
      <div class="custom-card-header">
        <div class="card-title">
          {{ currentRunningTokenName ? `正在执行: ${currentRunningTokenName}` : '执行日志' }}
          <span :style="{ marginLeft: '12px', fontSize: '12px', color: '#86909c' }">
            {{ logs.length }}/{{ batchSettings.maxLogEntries || 1000 }}
          </span>
        </div>
        <div class="log-header-controls">
          <n-checkbox v-model:checked="autoScrollLog" size="small">自动滚动</n-checkbox>
          <n-checkbox v-model:checked="filterErrorsOnly" size="small">只看错误</n-checkbox>
          <n-tag v-if="errorCount > 0" type="error" size="small">{{ errorCount }} 个错误</n-tag>
          <n-button size="small" @click="clearLogs">清空日志</n-button>
          <n-button size="small" @click="copyLogs">复制日志</n-button>
        </div>
      </div>
    </template>

    <template #default>
      <n-progress type="line" :percentage="currentProgress" indicator-placement="inside" processing />
      <div class="log-container" ref="logContainer" @scroll="handleLogScroll">
        <div v-for="(log, index) in filteredLogs" :key="index" :class="['log-item', log.type]">
          <span class="time">{{ log.time }}</span>
          <span class="message">{{ log.message }}</span>
        </div>
      </div>
    </template>
  </n-card>
</div>
```

### 1.5 设置面板（Modal 弹窗）

```html
<!-- 单账号任务设置 -->
<n-modal v-model:show="showSettingsModal" preset="card"
  :title="`任务设置 - ${currentSettingsTokenName}`"
  :style="{ width: '90%', maxWidth: '400px' }">
  <div class="settings-content">
    <div class="settings-grid">
      <div class="setting-item">
        <label class="setting-label">竞技场阵容</label>
        <n-select v-model:value="currentSettings.arenaFormation" :options="formationOptions" size="small" />
      </div>
      <div class="setting-item">
        <label class="setting-label">爬塔阵容</label>
        <n-select v-model:value="currentSettings.towerFormation" :options="formationOptions" size="small" />
      </div>
      <div class="setting-item">
        <label class="setting-label">BOSS阵容</label>
        <n-select v-model:value="currentSettings.bossFormation" :options="formationOptions" size="small" />
      </div>
      <div class="setting-item">
        <label class="setting-label">BOSS次数</label>
        <n-select v-model:value="currentSettings.bossTimes" :options="bossTimesOptions" size="small" />
      </div>
      <div class="setting-switches">
        <div class="switch-row">
          <span class="switch-label">领罐子</span>
          <n-switch v-model:value="currentSettings.claimBottle" />
        </div>
        <div class="switch-row">
          <span class="switch-label">领挂机</span>
          <n-switch v-model:value="currentSettings.claimHangUp" />
        </div>
        <div class="switch-row">
          <span class="switch-label">领邮件</span>
          <n-switch v-model:value="currentSettings.claimEmail" />
        </div>
        <div class="switch-row">
          <span class="switch-label">付费招募</span>
          <n-switch v-model:value="currentSettings.payRecruit" />
        </div>
        <div class="switch-row">
          <span class="switch-label">开宝箱</span>
          <n-switch v-model:value="currentSettings.openBox" />
        </div>
        <div class="switch-row">
          <span class="switch-label">竞技场</span>
          <n-switch v-model:value="currentSettings.arenaEnable" />
        </div>
        <div class="switch-row">
          <span class="switch-label">黑市采购</span>
          <n-switch v-model:value="currentSettings.blackMarketPurchase" />
        </div>
      </div>
      <div class="setting-item">
        <label class="setting-label">功法赠送密码</label>
        <n-input v-model:value="currentSettings.legacyGiftPassword" type="password" placeholder="可选" size="small" />
      </div>
    </div>
  </div>
  <div class="modal-actions" :style="{ marginTop: '20px', textAlign: 'right' }">
    <n-button @click="showSettingsModal = false">取消</n-button>
    <n-button type="primary" @click="saveSettings">保存</n-button>
  </div>
</n-modal>
```

### 1.6 分组管理界面

```html
<n-modal v-model:show="showGroupManageModal" preset="card" title="分组管理"
  :style="{ width: '90%', maxWidth: '600px' }">
  <!-- 新建分组 -->
  <div :style="{ marginBottom: '16px' }">
    <div :style="{ fontWeight: 'bold', marginBottom: '8px' }">新建分组</div>
    <n-space :style="{ display: 'flex', gap: '12px', marginBottom: '12px' }">
      <n-input v-model:value="newGroupName" placeholder="分组名称" size="small" :style="{ width: '150px' }" />
      <!-- 颜色选择器 -->
      <div :style="{ display: 'flex', gap: '6px' }">
        <div v-for="color in groupColors" :key="color"
          @click="newGroupColor = color"
          :style="{
            width: '24px', height: '24px', backgroundColor: color, borderRadius: '4px',
            border: newGroupColor === color ? '3px solid #000' : '2px solid #ddd',
            cursor: 'pointer', transition: 'transform 0.2s'
          }"
          @mouseover="$event.target.style.transform = 'scale(1.1)'"
          @mouseleave="$event.target.style.transform = 'scale(1)'" />
      </div>
      <n-button type="primary" size="small" @click="createNewGroup">创建分组</n-button>
    </n-space>

    <!-- 包含账号选择 -->
    <div :style="{ background: '#f9f9f9', padding: '12px', borderRadius: '8px', border: '1px solid #eee' }">
      <div :style="{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }">
        <span :style="{ fontSize: '13px', fontWeight: 'bold' }">包含账号 ({{ newGroupSelectedTokens.length }})</span>
        <n-space size="small">
          <n-button size="tiny" @click="selectAllNewGroup">全选</n-button>
          <n-button size="tiny" @click="deselectAllNewGroup">全不选</n-button>
        </n-space>
      </div>
      <div :style="{ maxHeight: '150px', overflowY: 'auto' }">
        <n-checkbox-group v-model:value="newGroupSelectedTokens">
          <n-grid :cols="3" :x-gap="12" :y-gap="8">
            <n-grid-item v-for="token in sortedTokens" :key="token.id">
              <n-checkbox :value="token.id">{{ token.name }}</n-checkbox>
            </n-grid-item>
          </n-grid>
        </n-checkbox-group>
      </div>
    </div>
  </div>

  <n-divider title-placement="left" :style="{ margin: '0 0 16px 0' }">分组列表</n-divider>

  <!-- 分组列表 -->
  <div :style="{ maxHeight: '500px', overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px' }">
    <div v-for="group in tokenGroups" :key="group.id"
      :style="{ padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', marginBottom: '12px', background: '#fafafa' }">
      <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }">
        <div :style="{ flex: '1' }">
          <!-- 编辑模式 -->
          <div v-if="editingGroupId === group.id" :style="{ display: 'flex', gap: '8px' }">
            <n-input v-model:value="editingGroupName" placeholder="分组名称" size="small" :style="{ width: '150px' }" />
            <div :style="{ display: 'flex', gap: '6px', alignItems: 'center' }">
              <div v-for="color in groupColors" :key="color"
                @click="editingGroupColor = color"
                :style="{
                  width: '20px', height: '20px', backgroundColor: color, borderRadius: '4px',
                  border: editingGroupColor === color ? '3px solid #000' : '2px solid #ddd', cursor: 'pointer'
                }" />
            </div>
            <n-button size="small" type="primary" @click="saveEditGroup" :style="{ width: '60px' }">保存</n-button>
            <n-button size="small" @click="cancelEditGroup" :style="{ width: '60px' }">取消</n-button>
          </div>
          <!-- 展示模式 -->
          <div v-else>
            <div :style="{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }">
              <div :style="{ width: '16px', height: '16px', backgroundColor: group.color, borderRadius: '3px' }" />
              <span :style="{ fontWeight: '500', fontSize: '14px' }">{{ group.name }}</span>
              <n-tag size="small" type="info">{{ getValidGroupTokenIds(group.id).length }} 个账号</n-tag>
            </div>
            <!-- 账号标签列表 -->
            <div :style="{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' }">
              <div v-for="tokenId in getValidGroupTokenIds(group.id)" :key="tokenId"
                :style="{
                  padding: '2px 8px', background: 'white', border: '1px solid #ddd',
                  borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px'
                }">
                {{ tokens.find(t => t.id === tokenId)?.name }}
                <n-button size="tiny" type="error" text @click="removeTokenFromSelectedGroup(group.id, tokenId)">×</n-button>
              </div>
            </div>
            <!-- 添加账号下拉 -->
            <div :style="{ marginBottom: '8px' }">
              <n-select placeholder="添加账号到分组" size="small" filterable
                :options="tokens.filter(t => !getValidGroupTokenIds(group.id).includes(t.id)).map(t => ({ label: t.name, value: t.id }))"
                @update:value="(v) => { v && addTokenToSelectedGroup(group.id, v) }" />
            </div>
          </div>
        </div>
        <!-- 编辑/删除按钮 -->
        <div v-if="editingGroupId !== group.id" :style="{ display: 'flex', gap: '8px' }">
          <n-button size="small" @click="startEditGroup(group.id)">编辑</n-button>
          <n-button size="small" type="error" @click="deleteGroup(group.id)">删除</n-button>
        </div>
      </div>
    </div>
    <div v-if="tokenGroups.length === 0" :style="{ textAlign: 'center', padding: '24px', color: '#86909c' }">
      暂无分组，请创建一个新分组
    </div>
  </div>

  <div class="modal-actions" :style="{ marginTop: '20px', textAlign: 'right' }">
    <n-button @click="showGroupManageModal = false">关闭</n-button>
  </div>
</n-modal>
```

### 1.7 定时任务创建/编辑 Modal

```html
<n-modal v-model:show="showTaskModal" preset="card"
  :title="editingTask ? '编辑定时任务' : '新增定时任务'"
  :style="{ width: '90%', maxWidth: '700px' }">
  <div class="settings-content" :style="{ paddingBottom: '20px' }">
    <div class="settings-grid">
      <div class="setting-item">
        <label class="setting-label">任务名称</label>
        <n-input v-model:value="taskForm.name" placeholder="请输入任务名称" size="small" />
      </div>
      <div class="setting-item">
        <label class="setting-label">运行类型</label>
        <n-radio-group v-model:value="taskForm.runType" size="small">
          <n-radio value="daily">每天固定时间</n-radio>
          <n-radio value="cron">Cron表达式</n-radio>
        </n-radio-group>
      </div>
      <div class="setting-item" v-if="taskForm.runType === 'daily'">
        <label class="setting-label">运行时间</label>
        <n-time-picker v-model:value="taskForm.runTime" format="HH:mm" size="small" clearable />
      </div>
      <div class="setting-item" v-if="taskForm.runType === 'cron'">
        <label class="setting-label">Cron表达式</label>
        <n-input v-model:value="taskForm.cronExpression" placeholder="分 时 日 月 周 (如: 0 8 * * *)" size="small" />
        <!-- Cron 解析结果 -->
        <div v-if="taskForm.cronExpression" class="cron-parser" :style="{ marginTop: '8px', overflowX: 'auto' }">
          <div v-if="cronValidation.valid" class="cron-validation success">✓ {{ cronValidation.message }}</div>
          <div v-else class="cron-validation error">✗ {{ cronValidation.message }}</div>
        </div>
        <div v-if="cronNextRuns.length > 0" class="cron-next-runs" :style="{ marginTop: '8px' }">
          <div>下次执行时间:</div>
          <ul :style="{ paddingLeft: '20px', margin: '0' }">
            <li v-for="run in cronNextRuns" :key="run">{{ run }}</li>
          </ul>
        </div>
      </div>
      <div class="setting-item">
        <label class="setting-label">启用</label>
        <n-switch v-model:value="taskForm.enabled" />
      </div>
      <div class="setting-item">
        <label class="setting-label">不上线时段</label>
        <n-switch v-model:value="taskForm.offlineTimeEnabled" />
      </div>
      <!-- 选择任务 -->
      <div class="setting-item">
        <label class="setting-label">选择任务</label>
        <div v-for="(tasks, groupName) in groupedAvailableTasks" :key="groupName">
          <div :style="{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '8px', flexWrap: 'wrap', gap: '8px'
          }">
            <span :style="{ fontWeight: 'bold' }">{{ taskGroupDefinitions.find(g => g.name === groupName)?.label || '其他' }}</span>
          </div>
          <div :style="{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }">
            <n-checkbox v-for="task in tasks" :key="task.value"
              :checked="taskForm.selectedTasks.includes(task.value)"
              @update:checked="(v) => toggleTaskSelection(task.value, v)">
              {{ task.label }}
            </n-checkbox>
          </div>
        </div>
      </div>
      <!-- 选择账号 -->
      <div class="setting-item">
        <label class="setting-label">选择账号</label>
        <n-checkbox-group v-model:value="taskForm.selectedTokens">
          <n-grid :cols="3" :x-gap="12" :y-gap="8">
            <n-grid-item v-for="token in sortedTokens" :key="token.id">
              <n-checkbox :value="token.id">{{ token.name }}</n-checkbox>
            </n-grid-item>
          </n-grid>
        </n-checkbox-group>
      </div>
    </div>
  </div>
  <div class="modal-actions" :style="{ marginTop: '20px', textAlign: 'right' }">
    <n-button @click="showTaskModal = false">取消</n-button>
    <n-button type="primary" @click="saveTask">保存</n-button>
  </div>
</n-modal>
```

### 1.8 任务模板管理 Modal

```html
<n-modal v-model:show="showTemplateManagerModal" preset="card" title="任务模板管理"
  :style="{ width: '90%', maxWidth: '600px' }">
  <div class="settings-content">
    <div class="modal-header-actions"
      :style="{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }">
      <div :style="{ display: 'flex', gap: '8px', alignItems: 'center' }">
        <n-button type="primary" size="small" @click="showTaskTemplateModal = true">新增模板</n-button>
        <n-button size="small" @click="showApplyTemplateModal = true">应用模板</n-button>
      </div>
      <div :style="{ display: 'flex', gap: '8px', alignItems: 'center' }">
        <n-button size="small" @click="showAccountTemplateModal = true">账号模板</n-button>
      </div>
    </div>

    <!-- 模板列表 -->
    <div class="template-list" :style="{ maxHeight: '400px', overflowY: 'auto', marginBottom: '16px' }">
      <div v-for="template in filteredTaskTemplates" :key="template.id"
        :style="{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', marginBottom: '8px'
        }">
        <div>
          <h4 :style="{ margin: '0', marginBottom: '8px' }">{{ template.name }}</h4>
          <span :style="{ fontSize: '12px', color: '#86909c' }">
            {{ template.selectedTasks?.length || 0 }} 个任务
          </span>
        </div>
        <div :style="{ display: 'flex', gap: '8px' }">
          <n-button size="small" @click="applyTemplate(template)">应用</n-button>
          <n-button size="small" type="error" @click="deleteTemplate(template.id)">删除</n-button>
        </div>
      </div>
      <div v-if="filteredTaskTemplates.length === 0"
        :style="{ textAlign: 'center', padding: '24px', color: '#86909c' }">
        暂无模板
      </div>
    </div>
  </div>
  <div class="modal-actions" :style="{ marginTop: '20px', textAlign: 'right' }">
    <n-button @click="showTemplateManagerModal = false">关闭</n-button>
  </div>
</n-modal>
```

### 1.9 配置导入/导出界面

```html
<!-- 导入/导出通过隐藏的 file input 实现 -->
<input ref="importScheduledTasksInput" type="file" accept=".json"
  :style="{ display: 'none' }" @change="handleImportScheduledTasks" />
<input ref="importAccountConfigInput" type="file" accept=".json"
  :style="{ display: 'none' }" @change="handleImportAccountConfig" />

<!-- 触发按钮在定时任务卡片中 -->
<n-button size="small" @click="triggerImportScheduledTasks">📥 导入任务</n-button>
<n-button size="small" @click="exportScheduledTasksConfig">📤 导出任务</n-button>
<n-button size="small" @click="triggerImportAccountConfig">📥 导入账号</n-button>
<n-button size="small" @click="exportAccountConfig">📤 导出账号</n-button>
```

### 1.10 其他 Modal 弹窗

#### 功法赠送 Modal
```html
<n-modal v-model:show="showLegacyGiftModal" preset="card" title="批量功法残卷赠送"
  :style="{ width: '90%', maxWidth: '500px' }">
  <div class="settings-content">
    <n-alert :type="passwordStatusType" :title="passwordStatusMessage" :style="{ marginBottom: '16px' }" />
    <div class="settings-grid">
      <div class="setting-item" :style="{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }">
        <label class="setting-label">收件人ID</label>
        <n-input v-model:value="recipientIdInput" placeholder="请输入收件人ID" size="small" :style="{ width: '200px' }" />
      </div>
      <!-- 收件人信息展示（含头像、名称、等级、战力等） -->
      <div v-if="recipientInfo" class="recipient-info"
        :style="{
          background: '#f7f8fa', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb',
          display: 'flex', alignItems: 'flex-start', gap: '16px', transition: 'all 0.3s ease'
        }">
        <div class="avatar-container"
          :style="{
            position: 'relative', width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }">
          <img v-if="recipientInfo.avatar && !avatarLoadError" :src="recipientInfo.avatar"
            :style="{ width: '100%', height: '100%', objectFit: 'cover' }" @error="avatarLoadError = true" />
          <div v-else-if="!recipientInfo.avatar || avatarLoadError" class="avatar-fallback"
            :style="{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '100%', height: '100%', color: 'white', fontSize: '24px', fontWeight: 'bold'
            }">
            {{ recipientInfo.name?.charAt(0) }}
          </div>
        </div>
        <div class="role-info" :style="{ flex: '1', minWidth: '0' }">
          <div :style="{ marginBottom: '12px', fontSize: '18px', fontWeight: 'bold', color: '#1d2129' }">
            {{ recipientInfo.name }}
          </div>
          <div class="role-info-grid" :style="{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }">
            <div class="info-item"><label>等级</label><div class="info-value">{{ recipientInfo.level }}</div></div>
            <div class="info-item"><label>服务器</label><div class="info-value">{{ recipientInfo.server }}</div></div>
            <div class="info-item"><label>战力</label><div class="info-value" :style="{ color: '#667eea' }">{{ recipientInfo.power }}</div></div>
            <div class="info-item"><label>公会</label><div class="info-value">{{ recipientInfo.guild }}</div></div>
          </div>
        </div>
      </div>
      <div class="setting-item" :style="{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }">
        <label class="setting-label">赠送密码</label>
        <n-input v-model:value="securityPassword" type="password" placeholder="功法赠送密码" size="small" />
      </div>
    </div>
  </div>
  <div class="modal-actions" :style="{ marginTop: '20px', textAlign: 'right' }">
    <n-button @click="showLegacyGiftModal = false">取消</n-button>
    <n-button type="primary" @click="handleLegacyGiftSend" :disabled="!recipientInfo">确认赠送</n-button>
  </div>
</n-modal>
```

#### 批量设置 Modal（高级配置）
```html
<n-modal v-model:show="showBatchSettingsModal" preset="card" title="定时批量任务设置"
  :style="{ width: '90%', maxWidth: '800px' }">
  <div class="settings-content">
    <div class="settings-grid">
      <!-- 连接池大小 -->
      <div class="setting-item" :style="{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }">
        <label class="setting-label">最大并发连接数</label>
        <n-input-number v-model:value="batchSettings.maxActive" :min="1" :max="20" size="small" />
      </div>
      <!-- 延迟配置 -->
      <div class="setting-item" :style="{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }">
        <label class="setting-label">命令延迟(ms)</label>
        <n-input-number v-model:value="batchSettings.commandDelay" :min="500" :max="10000" :step="100" size="small" />
      </div>
      <div class="setting-item" :style="{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }">
        <label class="setting-label">任务延迟(ms)</label>
        <n-input-number v-model:value="batchSettings.taskDelay" :min="500" :max="10000" :step="100" size="small" />
      </div>
      <div class="setting-item" :style="{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }">
        <label class="setting-label">战斗延迟(ms)</label>
        <n-input-number v-model:value="batchSettings.battleDelay" :min="1000" :max="30000" :step="500" size="small" />
      </div>
      <!-- 超时配置 -->
      <div class="setting-item" :style="{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }">
        <label class="setting-label">默认命令超时(ms)</label>
        <n-input-number v-model:value="batchSettings.defaultCommandTimeout" :min="1000" :max="30000" :step="1000" size="small" />
      </div>
      <div class="setting-item" :style="{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }">
        <label class="setting-label">战斗命令超时(ms)</label>
        <n-input-number v-model:value="batchSettings.battleCommandTimeout" :min="5000" :max="60000" :step="1000" size="small" />
      </div>
      <!-- 重试配置 -->
      <div class="setting-item" :style="{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }">
        <label class="setting-label">默认重试次数</label>
        <n-input-number v-model:value="batchSettings.defaultRetryCount" :min="0" :max="5" size="small" />
      </div>
      <div class="setting-item" :style="{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }">
        <label class="setting-label">重试延迟(ms)</label>
        <n-input-number v-model:value="batchSettings.retryDelay" :min="10000" :max="300000" :step="10000" size="small" />
      </div>
      <!-- 自动刷新 -->
      <div class="setting-item" :style="{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }">
        <label class="setting-label">自动刷新Token</label>
        <n-switch v-model:value="batchSettings.enableRefresh" />
      </div>
      <div class="setting-item" :style="{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }">
        <label class="setting-label">刷新间隔(秒)</label>
        <n-input-number v-model:value="batchSettings.refreshInterval" :min="60" :max="3600" size="small" />
      </div>
      <!-- 日志配置 -->
      <div class="setting-item" :style="{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }">
        <label class="setting-label">最大日志条数</label>
        <n-input-number v-model:value="batchSettings.maxLogEntries" :min="100" :max="10000" :step="100" size="small" />
      </div>
    </div>
  </div>
  <div class="modal-actions" :style="{ marginTop: '20px', textAlign: 'right' }">
    <n-button @click="showBatchSettingsModal = false">取消</n-button>
    <n-button type="primary" @click="saveBatchSettings">保存</n-button>
  </div>
</n-modal>
```

---

## 二、组件结构翻译

### 2.1 主组件 defineComponent 定义

```javascript
const _sfc_main = {
  __name: "BatchDailyTasks",
  setup(__props) {
    // ... 所有逻辑
  }
}

// 导出
export default _export_sfc(_sfc_main, [["__scopeId", "data-v-7059366c"]])
```

### 2.2 setup() 函数结构

```javascript
setup(__props) {
  // ========== 外部依赖 ==========
  const importScheduledTasksInput = ref(null)
  const importAccountConfigInput = ref(null)
  const tokenStore = useTokenStore()
  const message = useMessage()
  const { storeArrayBuffer: storeArrayBufferToDB, getArrayBuffer: getArrayBufferFromDB } = useIndexedDB()

  // ========== 排序配置 ==========
  const savedSortConfig = localStorage.getItem("tokenSortConfig")
  const sortConfig = ref(savedSortConfig ? JSON.parse(savedSortConfig) : { field: "createdAt", direction: "asc" })
  const tokenOrder = ref([])

  // ========== 计算属性 ==========
  const evoTowerInfo = computed(() => tokenStore.gameData?.evoTowerInfo || null)
  const weirdTowerData = computed(() => evoTowerInfo.value?.evoTower || null)
  // weirdTowerId = computed(() => weirdTowerData.value?.towerId || 0)
  // weirdTowerEnergy = computed(() => weirdTowerData.value?.energy || 0)

  const sortedTokens = computed(() => {
    // 支持搜索过滤 + 排序（按tokenOrder或sortConfig）
  })

  const tokens = computed(() => tokenStore.gameTokens)

  // ========== 活动开放判断 ==========
  const isCarActivityOpen = computed(() => checkCarActivityOpen())        // 周一至周三 6点后
  const ismengjingActivityOpen = computed(() => checkMengjingActivityOpen()) // 周日/一/三/四
  const isbaokuActivityOpen = computed(() => checkBaokuActivityOpen())     // 非周一/二
  const isarenaActivityOpen = computed(() => checkArenaActivityOpen())     // 6:00-22:00
  const getCurrentActivityWeek = computed(() => { /* 黑市周/招募周/宝箱周 三周循环 */ })
  const isWeirdTowerActivityOpen = computed(() => { /* 黑市周开放 */ })
  const isRecruitActivityOpen = computed(() => { /* 招募周/黑市周/宝箱周 */ })
  const isWarGuessActivityOpen = computed(() => { /* 每月第四个周日 00:00-19:55 */ })
  const warGuessActivityTip = computed(() => { /* 提示信息 */ })

  // ========== 核心响应式数据 ==========
  const selectedTokens = ref([])
  const tokenStatus = ref({})
  const isRunning = ref(false)
  const shouldStop = ref(false)
  const shouldRefreshAfterTask = ref(false)
  const showGroupManageModal = ref(false)
  const selectedGroups = ref([])
  const newGroupName = ref("")
  const newGroupColor = ref("#1677ff")
  const newGroupSelectedTokens = ref([])
  const editingGroupId = ref(null)
  const editingGroupName = ref("")
  const editingGroupColor = ref("")
  const taskScheduleSelectedGroupIds = ref([])
  const groupColors = ["#1677ff", "#52c41a", "#faad14", "#f5222d", "#722ed1", "#13c2c2", "#eb2f96", "#fa8c16"]

  // 月赛助威
  const showWarGuessModal = ref(false)
  const warGuessList = ref([])
  const warGuessLoading = ref(false)
  const warGuessCoin = ref(20)
  const selectedWarGuessLegionId = ref(null)

  // 助威商店
  const showLegionStoreModal = ref(false)
  const legionStoreSelections = ref({
    7: { selected: false, count: 1, maxCount: 1, disabled: false },
    8: { selected: false, count: 1, maxCount: 1, disabled: false },
    9: { selected: false, count: 1, maxCount: 1, disabled: false },
    10: { selected: false, count: 20, maxCount: 20, disabled: false },
    11: { selected: false, count: 20, maxCount: 20, disabled: false },
  })

  // 单账号设置
  const showSettingsModal = ref(false)
  const currentSettingsTokenId = ref(null)
  const currentSettingsTokenName = ref("")
  const currentSettings = reactive({
    arenaFormation: 1,
    towerFormation: 1,
    bossFormation: 1,
    bossTimes: 2,
    claimBottle: true,
    payRecruit: true,
    openBox: true,
    arenaEnable: true,
    claimHangUp: true,
    claimEmail: true,
    blackMarketPurchase: true,
    legacyGiftPassword: "",
  })

  // 任务模板
  const showTaskTemplateModal = ref(false)
  const showApplyTemplateModal = ref(false)
  const showTemplateManagerModal = ref(false)
  const showAccountTemplateModal = ref(false)
  const taskTemplates = ref([])
  const selectedTemplateId = ref(null)
  const selectedTokensForApply = ref([])
  const currentTemplateName = ref("")
  const currentTemplateId = ref(null)
  const currentTemplate = reactive({ /* 同 currentSettings 结构 */ })
  const accountTemplateReferences = ref([])
  const filteredAccountTemplates = ref([])
  const selectedTemplateForFilter = ref(null)
  const isAllSelectedForApply = computed(() => /* ... */)
  const isIndeterminateForApply = computed(() => /* ... */)
  const filteredTaskTemplates = computed(() => taskTemplates.value)

  // 批量助手
  const showHelperModal = ref(false)
  const helperType = ref("box")
  const helperSettings = reactive({ boxType: 2001, fishType: 1, count: 100, targetRounds: 1 })
  const helperModalTitle = computed(() =>
    ({ box: "批量开宝箱", fish: "批量钓鱼", recruit: "批量招募", pointsBox: "一键宝箱周开箱" })[helperType.value] || "批量助手"
  )

  // 英雄四圣升级
  const showHeroFourSaintsModal = ref(false)
  const selectedHeroSingle = ref(null)
  const heroOptions = [
    { label: "司马懿", value: 101 }, { label: "关羽", value: 103 },
    { label: "诸葛亮", value: 104 }, { label: "周瑜", value: 105 },
    { label: "太史慈", value: 106 }, { label: "吕布", value: 107 },
    { label: "甄姬", value: 109 }, { label: "孙策", value: 111 },
    { label: "贾诩", value: 112 }, { label: "曹仁", value: 113 },
    { label: "姜维", value: 114 }, { label: "公孙瓒", value: 116 },
    { label: "典韦", value: 117 }, { label: "超云", value: 118 },
    { label: "张角", value: 120 }, { label: "鲁肃", value: 121 },
  ]

  // 宝箱达标奖励
  const showBoxWeeklyRewardModal = ref(false)
  const selectedBoxWeeklyRewards = ref([5])
  const boxWeeklyRewardCounts = ref({ 5: 1 })
  const boxWeeklyRewardOptions = [
    { label: "万能红将碎片", value: 0 }, { label: "梦魇晶石", value: 1 },
    { label: "精铁", value: 2 }, { label: "进阶石", value: 3 },
    { label: "扳手", value: 4 }, { label: "珍珠", value: 5 },
  ]

  // 批量高级设置
  const showBatchSettingsModal = ref(false)
  const batchSettings = reactive({
    dreamPurchaseList: defaultDreamPurchaseList,
    boxCount: 100, fishCount: 100, recruitCount: 100,
    defaultBoxType: 2001, defaultFishType: 1, targetBoxPoints: 1000,
    receiverId: "", password: "",
    tokenListColumns: 4, autoColumns: true,
    useGoldRefreshFallback: false,
    commandDelay: 1500, taskDelay: 1500, actionDelay: 1500,
    battleDelay: 1500, refreshDelay: 2000, longDelay: 7000,
    taskIntervalWait: 0, batchIntervalWait: 5,
    maxActive: 5, carMinColor: 4,
    connectionTimeout: 30000, reconnectDelay: 5000,
    maxLogEntries: 1000,
    enableRefresh: true, refreshInterval: 360,
    smartDepartureGoldThreshold: 800,
    smartDepartureRecruitThreshold: 20,
    smartDepartureJadeThreshold: 1500,
    smartDepartureTicketThreshold: 4,
    tokensPerPage: 20, logPageSize: 100,
    defaultCommandTimeout: 5000, battleCommandTimeout: 15000,
    defaultRetryCount: 2, retryDelay: 60000, accountRetryInterval: 3000,
  })

  // 功法赠送
  const showLegacyGiftModal = ref(false)
  const recipientIdInput = ref("")
  const recipientIdError = ref("")
  const recipientInfo = ref(null)
  const isQueryingRecipient = ref(false)
  const securityPassword = ref("")
  const hasPasswordForSelectedTokens = computed(() => /* ... */)
  const passwordStatusMessage = computed(() => /* ... */)
  const passwordStatusType = computed(() => /* ... */)

  // 定时任务
  const scheduledTasks = ref([])
  const showTaskModal = ref(false)
  const showTasksModal = ref(false)
  const editingTask = ref(null)
  const taskForm = reactive({
    name: "", runType: "daily", runTime: null, cronExpression: "",
    selectedTokens: [], selectedTasks: [], enabled: true,
    offlineTimeEnabled: false,
    legionStoreItems: { 7: { selected: false, count: 1 }, 8: { selected: false, count: 1 }, ... },
    boxWeeklyRewards: { 5: 1 },
  })

  // 任务分组定义
  const taskGroupDefinitions = [
    { name: "daily", label: "日常", tasks: ["startBatch", "claimHangUpRewards", ...] },
    { name: "welfare", label: "福利", tasks: [...] },
    { name: "dungeon", label: "副本", tasks: [...] },
    { name: "baoku", label: "宝库", tasks: [...] },
    { name: "weirdTower", label: "怪异塔", tasks: [...] },
    { name: "illustration", label: "图鉴", tasks: [...] },
    { name: "nightmare", label: "十殿", tasks: [...] },
    { name: "resource", label: "资源", tasks: [...] },
    { name: "legacy", label: "功法", tasks: [...] },
    { name: "monthly", label: "月度", tasks: [...] },
  ]

  const groupedAvailableTasks = computed(() => { /* 按分组归类 */ })
  const cronValidation = ref({ valid: true, message: "" })
  const cronNextRuns = ref([])

  // ... 更多 ref/computed/watch/方法 ...

  // ========== 生命周期 ==========
  onMounted(() => {
    // 初始化防休眠
    wakeLockSupported.value = wakeLockManager.isSupported()
    // 自动恢复防休眠
    // 加载Token排序
    loadSavedTokenOrder()
    // 响应式列数
    batchSettings.autoColumns && nextTick(() => { windowWidth.value = window.innerWidth })
    // 启动定时任务调度
    scheduleTaskExecution()
    startCountdown()
    loadTaskTemplates()
    tokenStore.startAutoRefresh()
    setupResponsiveColumns()
  })

  onBeforeUnmount(() => {
    // 清理定时器
    countdownInterval && clearInterval(countdownInterval)
    intervalId.value && clearInterval(intervalId.value)
    healthCheckInterval && clearInterval(healthCheckInterval)
    cleanupResponsiveColumns && cleanupResponsiveColumns()
    resizeTimer && clearTimeout(resizeTimer)
    tokenStore.stopAutoRefresh()
    // 释放 WakeLock
    if (isWakeLockEnabled.value) {
      wakeLockManager.release()
    }
  })

  // ========== 返回渲染函数 ==========
  return () => {
    // 解析所有 Naive UI 组件
    const o = resolveComponent("n-button")
    const a = resolveComponent("n-switch")
    // ... 更多组件 ...
    // 返回 VNode 树
    return openBlock(), createElementBlock("div", _hoisted_1, [ /* ... */ ])
  }
}
```

### 2.3 TokenCard 子组件

```javascript
const _sfc_main$1 = {
  __name: "TokenCard",
  props: {
    token: { type: Object, required: true },
    isSelected: { type: Boolean, default: false },
    isTowerExpanded: { type: Boolean, default: false },
    isCarExpanded: { type: Boolean, default: false },
    isClimbTowerExpanded: { type: Boolean, default: false },
    isWeirdTowerExpanded: { type: Boolean, default: false },
    draggable: { type: Boolean, default: true },
    isDropTarget: { type: Boolean, default: false },
  },
  emits: [
    "select", "settings", "toggleConnection",
    "update:isClimbTowerExpanded", "update:isWeirdTowerExpanded",
    "update:isCarExpanded", "update:isTowerExpanded",
    "drag-start", "drag-end", "drop", "drag-query",
    "drag-update-target", "drag-get-target",
  ],
  setup(props, { emit }) {
    const tokenStore = useTokenStore()
    const message = useMessage()

    // 拖拽逻辑
    // ...

    // 计算属性
    const gameData = computed(() => tokenStore.getTokenGameData(props.token.id))
    const isConnected = computed(() => tokenStore.wsConnections[props.token.id]?.status === "connected")
    const isConnecting = computed(() => /* connecting or reconnecting */)
    const statusClass = computed(() => ({ "status-connected": isConnected.value, "status-disconnected": !isConnected.value }))
    const connectionText = computed(() => isConnected.value ? "已连接" : "未连接")
    const isTokenRunning = computed(() => tokenStore.isTokenRunning(props.token.id))
    const lastRefreshTime = computed(() => /* ... */)
    const studyStatus = computed(() => /* 答题状态 */)
    const effectiveStudyStatus = computed(() => /* 综合答题状态 */)

    // 响应式状态
    const saltJar = ref({ isRunning: false, remainingTime: 0, stopTime: 0 })
    const hangUp = ref({ isActive: false, remainingTime: 0, elapsedTime: 0, endTime: null })
    const dailyTask = ref({ progress: 0, complete: [] })
    const monthlyTask = ref({ fish: 0, arena: 0, fishTarget: 320, arenaTarget: 240, totalProgress: 0 })
    const isTowerExpandedLocal = ref(props.isTowerExpanded)
    const isCarExpandedLocal = ref(props.isCarExpanded)
    const carStatus = ref({ availableCars: 0, onMissionCars: 0, claimableCars: 0, totalCars: 0, cars: [], isLoading: false, freeRaidCnt: 0, successRaidCnt: 0 })
    const legacyStatus = ref({ isAvailable: false, quantity: 0, lastClaimTime: null })
    const starChallengeTotalStars = ref(0)
    const isStarChallengeRunning = ref(false)
    const arenaRank = ref(0)
    const towerData = ref({ floor: "0 - 0", maxFloor: "0 - 0", energy: 0, maxEnergy: 20, isExpanded: false, isRefreshing: false })
    const weirdTowerData = ref({ floor: "1-1", energy: 0, maxEnergy: 10, lotteryLeftCnt: 0, isExpanded: false, isRefreshing: false })
    const towerInfo = ref({ actId: null, levelRewardMap: {}, dailyFightNum: 0, isActivityValid: false, finishedCount: 0, isRefreshing: false })
    const studyState = ref({ isAnswering: false, questionCount: 0, answeredCount: 0, status: "", isCompleted: false, maxCorrectNum: 0, thisWeek: false })

    // Watch
    watch(() => props.isTowerExpanded, (v) => { isTowerExpandedLocal.value = v })
    watch(() => props.isCarExpanded, (v) => { isCarExpandedLocal.value = v })
    watch(() => props.isClimbTowerExpanded, (v) => { towerData.value.isExpanded = v })
    watch(() => props.isWeirdTowerExpanded, (v) => { weirdTowerData.value.isExpanded = v })
    watch([saltJar, hangUp, dailyTask, monthlyTask, legacyStatus, starChallengeTotalStars, arenaRank, studyState, towerData, weirdTowerData, towerInfo, carStatus],
      async () => { /* 防抖保存状态到 IndexedDB */ },
      { deep: true }
    )

    const tokenGroups = computed(() => tokenStore.getTokenGroups?.(props.token.id) || [])

    // 生命周期
    onMounted(async () => { /* 恢复保存的状态 */ })
    onUnmounted(() => { /* 清理 */ })

    // 返回渲染函数
    return () => { /* TokenCard 的 VNode 树 */ }
  }
}

export default _export_sfc(_sfc_main$1, [["__scopeId", "data-v-94a8ad04"]])
```

### 2.4 可用任务列表（availableTasks）

```javascript
const availableTasks = [
  { label: "日常任务", value: "startBatch" },
  { label: "领取挂机", value: "claimHangUpRewards" },
  { label: "一键加钟", value: "batchAddHangUpTime" },
  { label: "重置罐子", value: "resetBottles" },
  { label: "一键领取罐子", value: "batchlingguanzi" },
  { label: "一键爬塔", value: "climbTower" },
  { label: "一键爬怪异塔", value: "climbWeirdTower" },
  { label: "一键答题", value: "batchStudy" },
  { label: "智能发车", value: "batchSmartSendCar" },
  { label: "一键收车", value: "batchClaimCars" },
  { label: "升级改装", value: "batchCarResearchUpgrade" },
  { label: "批量开箱", value: "batchOpenBox" },
  { label: "一键宝箱周开箱", value: "batchOpenBoxByPoints" },
  { label: "一键开碎片礼包", value: "batchOpenFragmentPacks" },
  { label: "宝箱达标奖励自选大奖", value: "batchClaimBoxWeeklyRewards" },
  { label: "领取宝箱积分", value: "batchClaimBoxPointReward" },
  { label: "批量钓鱼", value: "batchFish" },
  { label: "批量招募", value: "batchRecruit" },
  { label: "一键宝库前3层", value: "batchbaoku13" },
  { label: "一键宝库4,5层", value: "batchbaoku45" },
  { label: "一键梦境", value: "batchmengjing" },
  { label: "一键俱乐部签到", value: "batchclubsign" },
  { label: "一键竞技场战斗3次", value: "batcharenafight" },
  { label: "一键钓鱼补齐", value: "batchTopUpFish" },
  { label: "一键竞技场补齐", value: "batchTopUpArena" },
  { label: "一键领取怪异塔免费道具", value: "batchClaimFreeEnergy" },
  { label: "领取怪异塔宝箱目标特权", value: "claim_weird_tower_all" },
  { label: "领取怪异塔通行证", value: "claim_weird_tower_pass" },
  { label: "一键换皮闯关", value: "skinChallenge" },
  { label: "一键购买四圣碎片", value: "legion_storebuygoods" },
  { label: "一键购买俱乐部5皮肤币", value: "legionStoreBuySkinCoins" },
  { label: "一键特级灵贝包", value: "buy_super_spirit_shell" },
  { label: "一键购买顶级鱼竿包", value: "buy_top_rod_package" },
  { label: "购买中级黑市包", value: "weekly_market_free_gift" },
  { label: "免费礼包领取", value: "claim_recruit_welfare" },
  { label: "一键黑市采购", value: "store_purchase" },
  { label: "积分好礼领取", value: "charge_claimaddup_rewards" },
  { label: "一键购买青铜宝箱", value: "store_buy_bronze" },
  { label: "一键购买铂金宝箱", value: "store_buy_platinum" },
  { label: "一键购买黄金鱼竿", value: "store_buy_gold_rod" },
  { label: "一键购买彩玉", value: "store_buy_jade" },
  { label: "免费领取珍宝阁", value: "collection_claimfreereward" },
  { label: "免费扭蛋", value: "gacha_drawreward" },
  { label: "批量领取功法残卷", value: "batchLegacyClaim" },
  { label: "批量赠送功法残卷", value: "batchLegacyGiftSendEnhanced" },
  { label: "英雄四圣升级", value: "openHeroFourSaintsModal" },
  { label: "一键英雄升星", value: "batchHeroUpgrade" },
  { label: "一键领取英雄图鉴", value: "batchBookUpgrade" },
  { label: "一键领取宠物图鉴", value: "batchClaimStarRewards" },
  { label: "一键使用怪异塔道具", value: "batchUseItems" },
  { label: "一键怪异塔合成", value: "batchMergeItems" },
  { label: "一键领取蟠桃园任务", value: "batchClaimPeachTasks" },
  { label: "一键扫荡灯神", value: "batchGenieSweep" },
  { label: "使用斑点蛋", value: "use_spotted_egg" },
  { label: "宠物领取图鉴奖励", value: "claim_pet_book" },
  { label: "一键购买梦境商品", value: "batchBuyDreamItems" },
  { label: "一键购买5次红玉", value: "legion_buy_red_jade" },
  { label: "一键购买斑点蛋", value: "legion_buy_spotted_egg" },
  { label: "十殿抽奖", value: "nightmare_draw_lottery" },
  { label: "十殿抽奖达标奖励", value: "nightmare_claim_book_reward" },
  { label: "星级抽奖", value: "star_drawturntable" },
  { label: "十殿星级挑战", value: "batch_star_challenge" },
  { label: "预约直播", value: "pkroom_appoint" },
  { label: "领取助威币", value: "claim_guess_coin" },
  { label: "助威商店多选购买", value: "legion_buy_store_items" },
]
```

---

## 三、Pinia Store 翻译

### 3.1 useTokenStore

```javascript
// 从 index-UoU16364.js 导入，别名为 x
import { x as useTokenStore } from "./index-UoU16364.js"

// 在组件中的使用方式：
const tokenStore = useTokenStore()

// 使用到的 Store 属性和方法：
tokenStore.gameTokens          // 所有游戏 Token 列表
tokenStore.gameData            // 游戏全局数据
tokenStore.gameData.evoTowerInfo  // 进化塔信息
tokenStore.wsConnections       // WebSocket 连接状态映射 { [tokenId]: { status: 'connected'|'connecting'|'reconnecting'|'disconnected' } }
tokenStore.getTokenGameData(tokenId)  // 获取指定 Token 的游戏数据
tokenStore.getTokenGroups(tokenId)    // 获取指定 Token 所属的分组
tokenStore.isTokenRunning(tokenId)    // 判断指定 Token 是否正在执行任务
tokenStore.getWebSocketStatus(tokenId) // 获取 WebSocket 连接状态
tokenStore.createWebSocketConnection(tokenId, token, wsUrl) // 创建 WebSocket 连接
tokenStore.sendMessageWithPromise(tokenId, command, params, timeout) // 发送消息并等待响应
tokenStore.startAutoRefresh()  // 启动自动刷新
tokenStore.stopAutoRefresh()   // 停止自动刷新
```

### 3.2 useMessage

```javascript
// 从 index-UoU16364.js 导入，别名为 s
import { s as useMessage } from "./index-UoU16364.js"

// Naive UI 的消息提示服务
const message = useMessage()

// 使用方式：
message.success("定时批量任务设置已保存")
message.warning("请先选择一个账号用于获取月赛助威数据")
message.error("保存设置失败")
```

### 3.3 useIndexedDB

```javascript
import { q as useIndexedDB } from "./index-UoU16364.js"

const { storeArrayBuffer: storeArrayBufferToDB, getArrayBuffer: getArrayBufferFromDB } = useIndexedDB()
```

---

## 四、CSS 样式翻译

### 4.1 Scoped 样式（data-v-7059366c）

> 注意：编译后的 JS 中没有直接包含 CSS 字符串，CSS 通过外部文件 `index-CM9NKNN3.css` 加载。  
> 以下从 `class` 属性和 `style` 属性中推断还原。

```css
/* 主容器 */
.batch-daily-tasks {
  /* 主容器样式 */
}

.main-layout {
  display: flex;
  gap: 16px;
}

.left-column {
  flex: 1;
  min-width: 0;
}

.right-column {
  width: 400px;
  flex-shrink: 0;
}

/* 页面头部 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

/* 定时任务卡片 */
.scheduled-tasks-wrapper {
  /* 外层包裹 */
}

.scheduled-tasks-card {
  flex: 1;
  min-width: 280px;
  padding: 16px 20px;
  background: #ffffff;
  border-radius: 10px;
  color: #333333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8e8e8;
}

.scheduled-tasks-buttons {
  /* 按钮区域容器 */
}

.button-row {
  display: flex;
  gap: 8px;
}

.button-row-task { /* 任务管理按钮行 */ }
.button-row-time { /* 时段控制按钮行 */ }
.button-row-config { /* 导入导出按钮行 */ }

/* 批量功能列表卡片 */
.token-list-card {
  /* n-card 自定义样式 */
}

/* 分组选择 */
.group-selection-section {
  /* 分组选择区域 */
}

/* 排序按钮 */
.sort-buttons {
  margin-top: 16px;
  margin-bottom: 12px;
}

/* 展开/收起按钮组 */
.expand-collapse-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.button-group {
  display: flex;
  gap: 4px;
}

/* 日志卡片 */
.log-card {
  /* 日志区域卡片 */
}

.custom-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-weight: 600;
  font-size: 16px;
}

.log-header-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

.log-container {
  height: 500px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 12px;
  line-height: 1.6;
}

.log-item {
  display: flex;
  gap: 8px;
  padding: 2px 0;
  border-bottom: 1px solid #f0f0f0;
}

.log-item .time {
  color: #999;
  white-space: nowrap;
  min-width: 80px;
}

.log-item .message {
  flex: 1;
  word-break: break-all;
}

.log-item.info { color: #333; }
.log-item.success { color: #52c41a; }
.log-item.warning { color: #faad14; }
.log-item.error { color: #f5222d; }

/* 设置面板 */
.settings-content {
  padding: 0;
}

.settings-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.setting-label {
  font-size: 13px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.setting-switches {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
}

.switch-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.switch-label {
  font-size: 13px;
  color: #333;
}

/* Modal 操作按钮 */
.modal-actions {
  margin-top: 20px;
  text-align: right;
}

/* 任务列表 */
.tasks-list {
  max-height: 600px;
  overflow-y: auto;
  padding: 10px 0;
}

/* Cron 解析 */
.cron-parser {
  margin-top: 8px;
  overflow-x: auto;
}

.cron-validation.success {
  color: #52c41a;
  font-size: 12px;
}

.cron-validation.error {
  color: #f5222d;
  font-size: 12px;
}

.cron-next-runs {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}

/* 收件人信息 */
.recipient-info {
  background: #f7f8fa;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  transition: all 0.3s ease;
}

.avatar-container {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.avatar-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.avatar-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.role-info {
  flex: 1;
  min-width: 0;
}

.role-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.info-item label {
  font-size: 12px;
  color: #86909c;
}

.info-value {
  font-size: 14px;
  font-weight: 500;
  color: #1d2129;
}

/* 模板列表 */
.template-list {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 16px;
}

.account-template-list {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 16px;
}

/* Modal 头部操作 */
.modal-header-actions {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

### 4.2 TokenCard 子组件 Scoped 样式（data-v-94a8ad04）

```css
/* Token 卡片状态 */
.status-connected {
  /* 连接状态 - 绿色 */
}

.status-disconnected {
  /* 断开状态 - 红色 */
}

/* 卡片内各区域 */
.role-info { /* ... */ }

/* 进度条 */
.progress-bar {
  height: 4px;
  border-radius: 2px;
  background: #e8e8e8;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s ease;
}
```

### 4.3 Naive UI 主题覆盖

```css
/* 从代码中推断的 Naive UI 组件自定义样式 */

/* n-button 在控制区的半透明样式 */
.n-button[style*="rgba(255, 255, 255, 0.3)"] {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 8px;
  font-weight: 500;
}

/* n-progress 进度条 */
.n-progress {
  margin-bottom: 8px;
}

/* n-tabs 标签页 */
.n-tabs .n-tab-pane {
  padding: 8px 0;
}

/* n-modal 卡片预设 */
.n-modal.n-card {
  max-height: 90vh;
  overflow-y: auto;
}
```

---

## 五、辅助工具类翻译

### 5.1 WakeLockManager（防休眠管理器）

```javascript
const wakeLockManager = new WakeLockManager()
const WAKE_LOCK_STORAGE_KEY = "wakeLockEnabled"

// 方法：
wakeLockManager.isSupported()       // 是否支持 WakeLock API
wakeLockManager.getEnvironmentInfo() // 获取环境信息 { envName, supported }
wakeLockManager.request()            // 请求 WakeLock
wakeLockManager.release()            // 释放 WakeLock
```

### 5.2 Cron 表达式工具

```javascript
// 验证 Cron 字段
validateCronField(value, min, max, fieldName) → { valid: boolean, message?: string }

// 验证完整 Cron 表达式（5字段：分 时 日 月 周）
validateCronExpression(expression) → { valid: boolean, message: string }

// 解析 Cron 字段为数值数组
parseCronField(field, min, max) → number[]

// 计算下次执行时间（最多5个）
calculateNextRuns(minute, hour, day, month, weekday, count = 5) → string[]

// 计算单个下次执行时间
calculateNextExecutionTime(task) → Date | null

// 格式化时间差
formatTimeDifference(ms) → string  // 如 "1天2小时30分15秒"

// 匹配 Cron 表达式
matchesCronExpression(expression, date = new Date()) → boolean
```

### 5.3 SVG 图标组件

```javascript
// Link 图标（连接）
const Link = defineComponent({
  name: "Link",
  render() {
    return h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, [
      h("path", { d: "M200.66 352H144a96 96 0 0 1 0-192h55.41", ... }),
      h("path", { d: "M312.59 160H368a96 96 0 0 1 0 192h-56.66", ... }),
      h("path", { d: "M169.07 256h175.86", ... }),
    ])
  }
})

// Unlink 图标（断开）
const Unlink = defineComponent({
  name: "Unlink",
  render() { /* 类似结构 */ }
})

// Settings 图标（从外部导入）
import { S as Settings } from "./Settings-BMY43FOw.js"
```

---

## 六、组件关系图

```
BatchDailyTasks (主组件, data-v-7059366c)
├── Naive UI 组件
│   ├── n-button / n-button-group
│   ├── n-switch
│   ├── n-tooltip
│   ├── n-text
│   ├── n-space
│   ├── n-tabs / n-tab-pane
│   ├── n-card
│   ├── n-popconfirm
│   ├── n-input-number
│   ├── n-icon
│   ├── n-input
│   ├── n-checkbox / n-checkbox-group
│   ├── n-grid / n-grid-item
│   ├── n-tag
│   ├── n-progress
│   ├── n-select
│   ├── n-modal
│   ├── n-upload
│   ├── n-alert
│   ├── n-radio / n-radio-group
│   ├── n-time-picker
│   ├── n-divider
│   └── n-data-table
├── TokenCard (子组件, data-v-94a8ad04)
│   ├── SVG Icons (Link, Unlink, Settings)
│   └── Naive UI 组件
├── Pinia Stores
│   ├── useTokenStore (token 管理、WebSocket)
│   └── useMessage (Naive UI 消息)
├── useIndexedDB (状态持久化)
└── WakeLockManager (防休眠)
```

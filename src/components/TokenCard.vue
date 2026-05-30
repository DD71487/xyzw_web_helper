<template>
  <div
    class="token-card"
    :class="{
      'is-selected': props.isSelected,
      'is-drop-target': props.isDropTarget,
      'is-running': isTokenRunning,
    }"
    :style="cardStyle"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
    @dragover.prevent="handleDragOver"
    @drop="handleDrop"
  >
    <!-- 卡片头部：选择框 + 名称 + 状态 + 设置按钮 -->
    <div class="card-header">
      <div class="header-left">
        <n-checkbox
          :checked="props.isSelected"
          @update:checked="handleSelect"
          class="token-checkbox"
        />
        <span class="token-name" :title="props.token.name">{{ props.token.name }}</span>
        <n-tag
          v-if="connectionStatus === 'connected'"
          size="tiny"
          type="success"
          class="status-tag"
        >
          已连接
        </n-tag>
        <n-tag
          v-else-if="connectionStatus === 'connecting'"
          size="tiny"
          type="warning"
          class="status-tag"
        >
          连接中
        </n-tag>
        <n-tag
          v-else
          size="tiny"
          type="default"
          class="status-tag"
        >
          未连接
        </n-tag>
      </div>
      <div class="header-right">
        <!-- 分组标签 -->
        <div v-if="tokenGroups.length > 0" class="group-tags">
          <n-tag
            v-for="group in tokenGroups"
            :key="group.id"
            size="tiny"
            :color="{ color: group.color, textColor: 'white' }"
            class="group-tag"
          >
            {{ group.name }}
          </n-tag>
        </div>
        <n-button
          size="tiny"
          circle
          class="settings-btn"
          @click.stop="handleSettings"
        >
          <template #icon>
            <n-icon><Settings /></n-icon>
          </template>
        </n-button>
      </div>
    </div>

    <!-- 运行状态指示器 -->
    <div v-if="isTokenRunning" class="running-indicator">
      <n-spin size="small" />
      <span class="running-text">执行中...</span>
    </div>

    <!-- 基础信息行 -->
    <div class="info-row">
      <span class="server-info">{{ props.token.server || '未知服务器' }}</span>
      <span v-if="gameData?.roleInfo?.role?.level" class="level-info">
        Lv.{{ gameData.roleInfo.role.level }}
      </span>
      <span v-if="lastRefreshTime" class="refresh-time">
        刷新: {{ lastRefreshTime }}
      </span>
    </div>

    <!-- 挂机状态 -->
    <div v-if="hangUpStatus?.isActive" class="status-section hangup-section">
      <div class="section-label">
        <span class="label-icon">⏰</span>
        <span>挂机中</span>
        <span class="time-remaining">{{ formatTimeRemaining(hangUpStatus.remainingTime) }}</span>
      </div>
      <n-progress
        type="line"
        :percentage="calculateHangUpProgress(hangUpStatus)"
        :show-indicator="false"
        status="success"
        :height="4"
      />
    </div>

    <!-- 日常任务进度 -->
    <div v-if="dailyTaskStatus" class="status-section">
      <div class="section-label">
        <span class="label-icon">📋</span>
        <span>日常任务</span>
        <span class="progress-text">{{ dailyTaskStatus.complete?.length || 0 }}/{{ dailyTaskTotal }}</span>
      </div>
      <n-progress
        type="line"
        :percentage="calculateDailyProgress(dailyTaskStatus)"
        :show-indicator="false"
        status="info"
        :height="4"
      />
    </div>

    <!-- 月度任务进度 -->
    <div v-if="monthlyTaskStatus" class="status-section">
      <div class="section-label">
        <span class="label-icon">📅</span>
        <span>月度任务</span>
        <span class="progress-text">
          钓鱼 {{ monthlyTaskStatus.fish }}/{{ monthlyTaskStatus.fishTarget }}
          竞技场 {{ monthlyTaskStatus.arena }}/{{ monthlyTaskStatus.arenaTarget }}
        </span>
      </div>
      <n-progress
        type="line"
        :percentage="monthlyTaskStatus.totalProgress || 0"
        :show-indicator="false"
        status="warning"
        :height="4"
      />
    </div>

    <!-- 答题状态 -->
    <div v-if="studyStatus?.isAnswering" class="status-section study-section">
      <div class="section-label">
        <span class="label-icon">📝</span>
        <span>答题中</span>
        <span class="progress-text">{{ studyStatus.answeredCount }}/{{ studyStatus.questionCount }}</span>
      </div>
    </div>

    <!-- 快捷操作按钮区 -->
    <div class="quick-actions">
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button
            size="tiny"
            class="action-btn"
            @click="handleQuickAction('tower')"
            :disabled="isTokenRunning"
          >
            <template #icon><span>🏰</span></template>
            闯关
          </n-button>
        </template>
        一键闯关
      </n-tooltip>

      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button
            size="tiny"
            class="action-btn"
            @click="handleQuickAction('climbTower')"
            :disabled="isTokenRunning"
          >
            <template #icon><span>🗼</span></template>
            爬塔
          </n-button>
        </template>
        一键爬塔
      </n-tooltip>

      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button
            size="tiny"
            class="action-btn"
            @click="handleQuickAction('weirdTower')"
            :disabled="isTokenRunning"
          >
            <template #icon><span>👻</span></template>
            怪塔
          </n-button>
        </template>
        一键爬怪异塔
      </n-tooltip>

      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button
            size="tiny"
            class="action-btn"
            @click="handleQuickAction('car')"
            :disabled="isTokenRunning"
          >
            <template #icon><span>🚗</span></template>
            赛车
          </n-button>
        </template>
        智能发车
      </n-tooltip>
    </div>

    <!-- 展开/收起控制区 -->
    <div class="expand-controls">
      <n-button
        size="tiny"
        text
        class="expand-btn"
        @click="toggleSection('tower')"
      >
        {{ isTowerExpanded ? '收起' : '展开' }}闯关
      </n-button>
      <n-button
        size="tiny"
        text
        class="expand-btn"
        @click="toggleSection('car')"
      >
        {{ isCarExpanded ? '收起' : '展开' }}赛车
      </n-button>
      <n-button
        size="tiny"
        text
        class="expand-btn"
        @click="toggleSection('climbTower')"
      >
        {{ isClimbTowerExpanded ? '收起' : '展开' }}爬塔
      </n-button>
      <n-button
        size="tiny"
        text
        class="expand-btn"
        @click="toggleSection('weirdTower')"
      >
        {{ isWeirdTowerExpanded ? '收起' : '展开' }}怪塔
      </n-button>
    </div>

    <!-- 展开的闯关详情 -->
    <div v-if="isTowerExpanded && towerData" class="expanded-section">
      <div class="detail-row">
        <span class="detail-label">当前层数:</span>
        <span class="detail-value">{{ towerData.floor || '0-0' }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">最高层数:</span>
        <span class="detail-value">{{ towerData.maxFloor || '0-0' }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">能量:</span>
        <span class="detail-value">{{ towerData.energy || 0 }}/{{ towerData.maxEnergy || 20 }}</span>
      </div>
    </div>

    <!-- 展开的赛车详情 -->
    <div v-if="isCarExpanded && carStatus" class="expanded-section">
      <div class="detail-row">
        <span class="detail-label">可用车辆:</span>
        <span class="detail-value">{{ carStatus.availableCars || 0 }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">任务中:</span>
        <span class="detail-value">{{ carStatus.onMissionCars || 0 }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">可领取:</span>
        <span class="detail-value">{{ carStatus.claimableCars || 0 }}</span>
      </div>
    </div>

    <!-- 展开的爬塔详情 -->
    <div v-if="isClimbTowerExpanded && towerData" class="expanded-section">
      <div class="detail-row">
        <span class="detail-label">爬塔进度:</span>
        <span class="detail-value">{{ towerData.floor || '0-0' }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">剩余能量:</span>
        <span class="detail-value">{{ towerData.energy || 0 }}/{{ towerData.maxEnergy || 20 }}</span>
      </div>
    </div>

    <!-- 展开的怪塔详情 -->
    <div v-if="isWeirdTowerExpanded && weirdTowerData" class="expanded-section">
      <div class="detail-row">
        <span class="detail-label">怪塔层数:</span>
        <span class="detail-value">{{ weirdTowerData.floor || '1-1' }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">剩余能量:</span>
        <span class="detail-value">{{ weirdTowerData.energy || 0 }}/{{ weirdTowerData.maxEnergy || 10 }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">抽奖次数:</span>
        <span class="detail-value">{{ weirdTowerData.lotteryLeftCnt || 0 }}</span>
      </div>
    </div>

    <!-- 连接/断开按钮 -->
    <div class="connection-actions">
      <n-button
        v-if="connectionStatus !== 'connected'"
        size="tiny"
        type="primary"
        class="connect-btn"
        @click="handleToggleConnection"
        :loading="connectionStatus === 'connecting'"
      >
        <template #icon>
          <n-icon><Link /></n-icon>
        </template>
        连接
      </n-button>
      <n-button
        v-else
        size="tiny"
        type="error"
        class="connect-btn"
        @click="handleToggleConnection"
      >
        <template #icon>
          <n-icon><Unlink /></n-icon>
        </template>
        断开
      </n-button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import {
  NCheckbox,
  NTag,
  NButton,
  NIcon,
  NProgress,
  NTooltip,
  NSpin,
} from "naive-ui";
import { Settings, Link, Unlink } from "@vicons/ionicons5";
import { useTokenStore } from "@/stores/tokenStore";

const props = defineProps({
  token: { type: Object, required: true },
  isSelected: { type: Boolean, default: false },
  isTowerExpanded: { type: Boolean, default: false },
  isCarExpanded: { type: Boolean, default: false },
  isClimbTowerExpanded: { type: Boolean, default: false },
  isWeirdTowerExpanded: { type: Boolean, default: false },
  draggable: { type: Boolean, default: true },
  isDropTarget: { type: Boolean, default: false },
});

const emit = defineEmits([
  "select",
  "settings",
  "toggle-connection",
  "quick-action",
  "drag-start",
  "drag-end",
  "drop",
  "update:isTowerExpanded",
  "update:isCarExpanded",
  "update:isClimbTowerExpanded",
  "update:isWeirdTowerExpanded",
]);

const tokenStore = useTokenStore();

// =====================
// 计算属性
// =====================

const gameData = computed(() => tokenStore.getTokenGameData(props.token.id));
const connectionStatus = computed(() => {
  return tokenStore.wsConnections[props.token.id]?.status || "disconnected";
});
const isTokenRunning = computed(() => tokenStore.isTokenRunning(props.token.id));

const tokenGroups = computed(() => {
  return tokenStore.getTokenGroups?.(props.token.id) || [];
});

const lastRefreshTime = computed(() => {
  const data = gameData.value;
  if (!data?.lastUpdated) return null;
  const date = new Date(data.lastUpdated);
  return date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
});

// 各状态数据
const hangUpStatus = computed(() => gameData.value?.hangUpStatus);
const dailyTaskStatus = computed(() => gameData.value?.dailyTaskStatus);
const monthlyTaskStatus = computed(() => gameData.value?.monthlyTaskStatus);
const studyStatus = computed(() => gameData.value?.studyStatus);
const towerData = computed(() => gameData.value?.towerData);
const weirdTowerData = computed(() => gameData.value?.weirdTowerData);
const carStatus = computed(() => gameData.value?.carStatus);
const arenaRank = computed(() => gameData.value?.arenaRank);

// 本地展开状态
const isTowerExpanded = ref(props.isTowerExpanded);
const isCarExpanded = ref(props.isCarExpanded);
const isClimbTowerExpanded = ref(props.isClimbTowerExpanded);
const isWeirdTowerExpanded = ref(props.isWeirdTowerExpanded);

// 监听 props 变化
watch(() => props.isTowerExpanded, (v) => { isTowerExpanded.value = v; });
watch(() => props.isCarExpanded, (v) => { isCarExpanded.value = v; });
watch(() => props.isClimbTowerExpanded, (v) => { isClimbTowerExpanded.value = v; });
watch(() => props.isWeirdTowerExpanded, (v) => { isWeirdTowerExpanded.value = v; });

// =====================
// 样式
// =====================

const cardStyle = computed(() => {
  const baseStyle = {
    border: "1px solid #e8e8e8",
    borderRadius: "8px",
    padding: "12px",
    background: "#fff",
    transition: "all 0.3s ease",
    cursor: "grab",
    position: "relative",
  };

  if (props.isSelected) {
    baseStyle.border = "2px solid #1890ff";
    baseStyle.background = "#f0f7ff";
  }

  if (props.isDropTarget) {
    baseStyle.border = "2px dashed #52c41a";
    baseStyle.background = "#f6ffed";
  }

  if (isTokenRunning.value) {
    baseStyle.border = "2px solid #faad14";
  }

  return baseStyle;
});

// =====================
// 方法
// =====================

const handleSelect = (checked) => {
  emit("select", props.token.id, checked);
};

const handleSettings = () => {
  emit("settings", props.token.id);
};

const handleToggleConnection = () => {
  emit("toggle-connection", props.token.id);
};

const handleQuickAction = (action) => {
  emit("quick-action", props.token.id, action);
};

const toggleSection = (section) => {
  switch (section) {
    case "tower":
      isTowerExpanded.value = !isTowerExpanded.value;
      emit("update:isTowerExpanded", isTowerExpanded.value);
      break;
    case "car":
      isCarExpanded.value = !isCarExpanded.value;
      emit("update:isCarExpanded", isCarExpanded.value);
      break;
    case "climbTower":
      isClimbTowerExpanded.value = !isClimbTowerExpanded.value;
      emit("update:isClimbTowerExpanded", isClimbTowerExpanded.value);
      break;
    case "weirdTower":
      isWeirdTowerExpanded.value = !isWeirdTowerExpanded.value;
      emit("update:isWeirdTowerExpanded", isWeirdTowerExpanded.value);
      break;
  }
};

// 拖拽处理
const handleDragStart = (e) => {
  if (!props.draggable) return;
  emit("drag-start", props.token.id, e);
};

const handleDragEnd = (e) => {
  emit("drag-end", props.token.id, e);
};

const handleDragOver = (e) => {
  e.preventDefault();
  emit("drag-update-target", props.token.id);
};

const handleDrop = (e) => {
  e.preventDefault();
  emit("drop", props.token.id, e);
};

// =====================
// 辅助函数
// =====================

const formatTimeRemaining = (seconds) => {
  if (!seconds || seconds <= 0) return "已完成";
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours}小时${mins}分`;
  return `${mins}分钟`;
};

const calculateHangUpProgress = (status) => {
  if (!status?.elapsedTime || !status?.remainingTime) return 0;
  const total = status.elapsedTime + status.remainingTime;
  if (total <= 0) return 0;
  return Math.min(100, Math.round((status.elapsedTime / total) * 100));
};

const dailyTaskTotal = 12; // 日常任务总数

const calculateDailyProgress = (status) => {
  if (!status?.complete) return 0;
  return Math.min(100, Math.round((status.complete.length / dailyTaskTotal) * 100));
};
</script>

<style scoped>
.token-card {
  user-select: none;
  min-width: 0;
}

.token-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.token-card.is-selected {
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  gap: 4px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.token-name {
  font-weight: 600;
  font-size: 14px;
  color: #1d2129;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

.status-tag {
  flex-shrink: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.group-tags {
  display: flex;
  gap: 3px;
  flex-wrap: wrap;
  max-width: 100px;
}

.group-tag {
  font-size: 10px;
}

.settings-btn {
  flex-shrink: 0;
}

.running-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: #fff7e6;
  border-radius: 4px;
  margin-bottom: 8px;
}

.running-text {
  font-size: 12px;
  color: #d46b08;
}

.info-row {
  display: flex;
  gap: 6px;
  align-items: center;
  margin-bottom: 8px;
  font-size: 11px;
  color: #86909c;
  flex-wrap: wrap;
}

.status-section {
  margin-bottom: 8px;
}

.section-label {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
  font-size: 11px;
  color: #4e5969;
}

.label-icon {
  font-size: 13px;
}

.time-remaining {
  margin-left: auto;
  color: #86909c;
  font-size: 11px;
}

.progress-text {
  margin-left: auto;
  font-size: 10px;
  color: #86909c;
}

.quick-actions {
  display: flex;
  gap: 3px;
  margin-top: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.action-btn {
  flex: 1;
  min-width: 0;
  font-size: 11px;
  padding: 0 4px;
}

.expand-controls {
  display: flex;
  gap: 3px;
  flex-wrap: wrap;
  margin-bottom: 8px;
  padding-top: 8px;
  border-top: 1px solid #f0f0f0;
}

.expand-btn {
  font-size: 10px;
  padding: 0 4px;
}

.expanded-section {
  background: #f7f8fa;
  border-radius: 6px;
  padding: 6px 10px;
  margin-bottom: 8px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 0;
  font-size: 11px;
}

.detail-label {
  color: #86909c;
}

.detail-value {
  color: #1d2129;
  font-weight: 500;
}

.connection-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
  border-top: 1px solid #f0f0f0;
}

.connect-btn {
  font-size: 11px;
}

/* =====================
   响应式适配
   ===================== */

/* 小屏幕优化 */
@media (max-width: 576px) {
  .token-card {
    padding: 8px;
  }

  .card-header {
    flex-wrap: wrap;
    gap: 4px;
  }

  .header-left {
    gap: 4px;
    width: 100%;
  }

  .token-name {
    font-size: 13px;
    max-width: 80px;
  }

  .header-right {
    width: 100%;
    justify-content: flex-end;
  }

  .group-tags {
    max-width: 80px;
  }

  .info-row {
    font-size: 10px;
    gap: 4px;
  }

  .section-label {
    font-size: 10px;
  }

  .quick-actions {
    gap: 2px;
  }

  .action-btn {
    font-size: 10px;
    padding: 0 2px;
    min-width: 0;
  }

  .expand-controls {
    gap: 2px;
  }

  .expand-btn {
    font-size: 9px;
    padding: 0 2px;
  }

  .expanded-section {
    padding: 4px 8px;
  }

  .detail-row {
    font-size: 10px;
  }

  .connect-btn {
    font-size: 10px;
  }
}

/* 超小屏幕 */
@media (max-width: 360px) {
  .token-card {
    padding: 6px;
  }

  .token-name {
    max-width: 60px;
    font-size: 12px;
  }

  .action-btn {
    font-size: 9px;
  }

  .expand-btn {
    font-size: 8px;
  }
}
</style>

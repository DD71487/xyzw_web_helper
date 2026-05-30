<template>
  <div
    class="game-status-container"
    :class="{
      'full-grid': activeSection === 'fightPvp',
      'full-page-mode':
        activeSection === 'saltFieldGroup' ||
        activeSection === 'peachGroup' ||
        activeSection === 'rankGroup',
      'club-mode': activeSection === 'club',
    }"
  >
    <!-- 身份牌常驻（嵌入式，Tabs 上方） -->
    <IdentityCard embedded />

    <!-- 下方选卡分区切换（Tabs）：日常｜俱乐部｜活动｜工具｜盐场｜蟠桃园｜排行榜｜切磋 -->
    <n-tabs
      class="section-tabs"
      v-model:value="activeSection"
      type="line"
      animated
      size="small"
    >
      <n-tab-pane name="daily" tab="日常" />
      <n-tab-pane name="club" tab="俱乐部" />
      <n-tab-pane name="activity" tab="活动" />
      <n-tab-pane v-if="ENABLE_TOOLS_TAB" name="tools" tab="工具" />
      <n-tab-pane name="saltFieldGroup" tab="盐场" />
      <n-tab-pane name="peachGroup" tab="蟠桃园" />
      <n-tab-pane name="rankGroup" tab="排行榜" />
      <n-tab-pane name="fightPvp" tab="切磋" />
    </n-tabs>

    <!-- ====== 日常 Tab ====== -->
    <template v-if="activeSection === 'daily'">
      <TeamFormation />
      <DailyTaskStatus />
      <TowerStatus v-if="isShowTowerStatus" />
      <WeirdTowerStatus />
      <BottleHelperCard />
      <HangUpStatusCard />
    </template>

    <!-- ====== 俱乐部 Tab ====== -->
    <template v-if="activeSection === 'club'">
      <ClubInfo />
      <ClubCarKing />
    </template>

    <!-- ====== 活动 Tab ====== -->
    <template v-if="activeSection === 'activity'">
      <MonthlyTasksCard />
      <StudyChallengeCard />
      <SkinChallengeCard />
    </template>

    <!-- ====== 工具 Tab ====== -->
    <template v-if="activeSection === 'tools'">
      <Unlimitedlineup />
      <BoxHelperCard />
      <FishHelperCard />
      <RecruitHelperCard />
      <StarUpgradeCard />
      <FightHelperCard />
      <DreamHelperCard />
      <HeroUpgradeCard />
      <RefineHelperCard />
      <ConsumptionProgressCard />
      <BossTower />
    </template>

    <!-- ====== 盐场 Tab ====== -->
    <div class="salt-field-group" v-if="activeSection === 'saltFieldGroup'">
      <div
        class="sub-nav"
        style="
          padding: 8px;
          background: var(--n-color);
          display: flex;
          justify-content: center;
        "
      >
        <n-tabs
          type="segment"
          animated
          v-model:value="saltFieldSubTab"
          size="small"
        >
          <n-tab-pane name="warrank" tab="盐场" />
          <n-tab-pane name="weekBattle" tab="本周盐场战绩" />
          <n-tab-pane name="monthBattle" tab="本月盐场战绩" />
          <n-tab-pane name="legionWarMap" tab="盐场地图" />
          <n-tab-pane name="legionWarStatistics" tab="盐场战况" />
        </n-tabs>
      </div>

      <div
        class="warrank-full-container"
        v-if="saltFieldSubTab === 'weekBattle'"
      >
        <ClubBattleRecords />
      </div>

      <div class="warrank-full-container" v-if="saltFieldSubTab === 'warrank'">
        <ClubWarrank />
      </div>

      <div
        class="warrank-full-container"
        v-if="saltFieldSubTab === 'monthBattle'"
      >
        <ClubMonthBattleRecords />
      </div>

      <div
        class="warrank-full-container"
        v-if="saltFieldSubTab === 'legionWarMap'"
      >
        <LegionWarMap />
      </div>
      <div
        class="warrank-full-container"
        v-if="saltFieldSubTab === 'legionWarStatistics'"
      >
        <LegionWarStatistics />
      </div>
    </div>

    <!-- ====== 蟠桃园 Tab ====== -->
    <div class="peach-group" v-if="activeSection === 'peachGroup'">
      <div
        class="sub-nav"
        style="
          padding: 8px;
          background: var(--n-color);
          display: flex;
          justify-content: center;
        "
      >
        <n-tabs
          type="segment"
          animated
          v-model:value="peachSubTab"
          size="small"
        >
          <n-tab-pane name="peach" tab="蟠桃园信息" />
          <n-tab-pane name="peachBattle" tab="蟠桃园战绩" />
        </n-tabs>
      </div>

      <div class="warrank-full-container" v-if="peachSubTab === 'peachBattle'">
        <PeachBattleRecords />
      </div>

      <div class="warrank-full-container" v-if="peachSubTab === 'peach'">
        <PeachInfo />
      </div>
    </div>

    <!-- ====== 排行榜 Tab ====== -->
    <div class="rank-group" v-if="activeSection === 'rankGroup'">
      <div
        class="sub-nav"
        style="
          padding: 8px;
          background: var(--n-color);
          display: flex;
          justify-content: center;
        "
      >
        <n-tabs type="segment" animated v-model:value="rankSubTab" size="small">
          <n-tab-pane name="serverrank" tab="区服榜" />
          <n-tab-pane name="toprank" tab="巅峰榜" />
          <n-tab-pane name="topclubrank" tab="俱乐部榜" />
          <n-tab-pane name="goldclubrank" tab="黄金积分榜" />
          <n-tab-pane name="greatRouteRank" tab="伟大航路积分榜" />
        </n-tabs>
      </div>

      <div class="warrank-full-container" v-if="rankSubTab === 'serverrank'">
        <ServerRankList />
      </div>

      <div class="warrank-full-container" v-if="rankSubTab === 'toprank'">
        <TopRankList />
      </div>

      <div class="warrank-full-container" v-if="rankSubTab === 'topclubrank'">
        <TopClubList />
      </div>

      <div class="warrank-full-container" v-if="rankSubTab === 'goldclubrank'">
        <GoldClubList />
      </div>

      <div
        class="warrank-full-container"
        v-if="rankSubTab === 'greatRouteRank'"
      >
        <GreatRouteRankList />
      </div>
    </div>

    <!-- ====== 切磋 Tab ====== -->
    <FightPvp v-if="activeSection === 'fightPvp'" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useTokenStore } from "@/stores/tokenStore";
import IdentityCard from "@/components/Common/IdentityCard.vue";
import BottleHelperCard from "@/components/cards/BottleHelperCard.vue";
import BoxHelperCard from "@/components/cards/BoxHelperCard.vue";
import FishHelperCard from "@/components/cards/FishHelperCard.vue";
import RecruitHelperCard from "@/components/cards/RecruitHelperCard.vue";
import StarUpgradeCard from "@/components/cards/StarUpgradeCard.vue";
import HangUpStatusCard from "@/components/cards/HangUpStatusCard.vue";
import MonthlyTasksCard from "@/components/cards/MonthlyTasksCard.vue";
import StudyChallengeCard from "@/components/cards/StudyChallengeCard.vue";
import SkinChallengeCard from "@/components/cards/SkinChallengeCard.vue";
import ClubWarrank from "@/components/Club/ClubWarrank.vue";
import ClubMonthBattleRecords from "@/components/Club/ClubMonthBattleRecords.vue";
import ClubBattleRecords from "@/components/Club/ClubBattleRecords.vue";
import PeachBattleRecords from "@/components/Club/PeachBattleRecords.vue";
import TopRankList from "@/components/cards/TopRankListPageCard.vue";
import TopClubList from "@/components/cards/TopClubListPageCard.vue";
import GreatRouteRankList from "@/components/Club/GreatRouteRankListPageCard.vue";
import GoldClubList from "@/components/cards/GoldRankListPageCard.vue";
import FightPvp from "@/components/cards/FightPvp.vue";
import FightHelperCard from "@/components/cards/FightHelperCard.vue";
import DreamHelperCard from "@/components/cards/DreamHelperCard.vue";
import HeroUpgradeCard from "@/components/cards/HeroUpgradeCard.vue";
import ConsumptionProgressCard from "@/components/cards/ConsumptionProgressCard.vue";
import RefineHelperCard from "@/components/cards/RefineHelperCard.vue";
import TowerStatus from "@/components/Tower/TowerStatus.vue";
import WeirdTowerStatus from "@/components/Tower/WeirdTowerStatus.vue";
import BossTower from "@/components/Tower/BossTower.vue";
import PeachInfo from "@/components/Club/PeachInfo.vue";
import ServerRankList from "@/components/cards/ServerRankListPageCard.vue";
import LegionWarMap from "@/components/Club/LegionWarMap.vue";
import LegionWarStatistics from "@/components/Club/LegionWarStatistics.vue";
import Unlimitedlineup from "@/components/cards/Unlimitedlineup.vue";
import TeamFormation from "@/components/Team/TeamFormation.vue";
import DailyTaskStatus from "@/components/Daily/DailyTaskStatus.vue";
import ClubInfo from "@/components/Club/ClubInfo.vue";
import ClubCarKing from "@/components/ClubCarKing.vue";

const tokenStore = useTokenStore();

// 响应式数据
const activeSection = ref("daily");
const saltFieldSubTab = ref("warrank");
const peachSubTab = ref("peach");
const rankSubTab = ref("serverrank");

// 功能开关
const ENABLE_TOOLS_TAB = true;

// 计算属性
const roleInfo = computed(() => {
  return tokenStore.gameData?.roleInfo || null;
});

const isShowTowerStatus = computed(() => {
  const tower = roleInfo.value?.role?.tower;
  const towerId = tower?.id;
  if (!towerId) return true;
  const floor = Math.floor(towerId / 10) + 1;
  return floor <= 450;
});

// WebSocket连接状态
const isConnected = computed(() => {
  if (!tokenStore.selectedToken) return false;
  const status = tokenStore.getWebSocketStatus(tokenStore.selectedToken.id);
  return status === "connected";
});

// 监听角色信息变化
watch(
  roleInfo,
  (newValue) => {
    if (newValue) {
      // 角色信息已更新
    }
  },
  { deep: true, immediate: true },
);

// 监听 WebSocket 连接状态（俱乐部信息）
const hasFetchedLegionOnce = ref(false);
watch(
  () =>
    tokenStore.selectedToken
      ? tokenStore.getWebSocketStatus(tokenStore.selectedToken.id)
      : "disconnected",
  (status) => {
    if (status === "connected") {
      if (!hasFetchedLegionOnce.value && tokenStore.selectedToken) {
        hasFetchedLegionOnce.value = true;
        const tokenId = tokenStore.selectedToken.id;
        tokenStore.sendMessage(tokenId, "legion_getinfo");
      }
    }
  },
);

// 生命周期
onMounted(() => {
  if (
    tokenStore.selectedToken &&
    tokenStore.getWebSocketStatus(tokenStore.selectedToken.id) === "connected"
  ) {
    const tokenId = tokenStore.selectedToken.id;
    tokenStore.sendMessage(tokenId, "legion_getinfo");
    hasFetchedLegionOnce.value = true;
  }
});

onUnmounted(() => {
  // 组件卸载时清理
});
</script>

<style scoped lang="scss">
.game-status-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);

  @media (min-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
    max-width: 1400px;
    margin: 0 auto;
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
    padding: var(--spacing-sm);
    gap: var(--spacing-md);
  }
}

.full-grid {
  grid-template-columns: repeat(1, 1fr);
}

.game-status-container.full-page-mode {
  max-width: 100% !important;
  grid-template-columns: 1fr;
  padding: var(--spacing-sm);

  @media (min-width: 1400px) {
    max-width: 100% !important;
  }
}

.game-status-container.club-mode {
  @media (min-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 100% !important;
  }
}

.section-tabs {
  margin: 0 var(--spacing-sm) var(--spacing-md) var(--spacing-sm);
  grid-column: 1 / -1;
  border-bottom: 1px solid var(--border-light);
  overflow: auto;
}

.section-tabs :deep(.n-tabs-pane-wrapper) {
  display: none;
}

.warrank-full-container {
  grid-column: 1 / -1;
  width: 100%;
  height: calc(100vh - 200px);
  min-height: 600px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: calc(100vh - 180px);
    min-height: 500px;
  }
}

.salt-field-group,
.peach-group,
.rank-group {
  grid-column: 1 / -1;
  width: 100%;
  display: flex;
  flex-direction: column;
}

// 响应式设计
@media (max-width: 768px) {
  .game-status-container {
    grid-template-columns: 1fr;
    padding: var(--spacing-sm);
  }

  .status-card {
    padding: var(--spacing-md);
  }

  .card-header {
    flex-wrap: wrap;
    gap: var(--spacing-sm);

    .status-info {
      flex: 1;
      min-width: 120px;
    }

    .status-badge {
      margin-left: auto;
    }
  }
}
</style>

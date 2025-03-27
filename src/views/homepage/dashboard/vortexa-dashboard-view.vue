<script setup lang="ts">
import TipsCard from "@/views/homepage/dashboard/child/tips-card.vue";
import SampleStatusList from "@/views/homepage/dashboard/child/sample-status-list.vue";
import ScriptOnlineChart from "@/views/homepage/dashboard/child/script-online-chart.vue";
import ScriptHeathChart from "@/views/homepage/dashboard/child/script-heath-chart.vue";
import ScriptFlowUsageChart from "@/views/homepage/dashboard/child/script-flow-usage-chart.vue";
import ScriptMemoryUsageChart from "@/views/homepage/dashboard/child/script-memory-usage-chart.vue";
</script>

<template>
  <div class="vortexa-dashboard">
    <tips-card/>

    <sample-status-list/>

    <div class="dashboard-chart-area">
      <script-online-chart class="dashboard-chart-area-item"/>
      <script-heath-chart class="dashboard-chart-area-item"/>
      <script-flow-usage-chart class="dashboard-chart-area-item"/>
      <script-memory-usage-chart class="dashboard-chart-area-item"/>
    </div>
  </div>
</template>

<style scoped>
.vortexa-dashboard {
  padding: 0 10px;
}

.dashboard-chart-area {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.dashboard-chart-area-item {
  flex: 1 1 40%;
  height: 440px;
}

@media (max-width: 1080px) {
  .dashboard-chart-area-item {
    flex: 1 1 100%;
  }
}
</style>

<script setup lang="ts">
import ContentBlock from "@/components/content-block/content-block.vue";
import {computed} from "vue";
import {Loading, Monitor, Coin, Basketball} from '@element-plus/icons-vue'

interface SampleStatus {
  runningScriptCount: number,
  scriptHeathRatio: number,
  flowUsage: number,
  memoryUsage: number,
}

interface Props {
  sampleStatus: SampleStatus
}

const props = withDefaults(defineProps<Props>(), {
  sampleStatus: () => ({
    runningScriptCount: 3,
    scriptHeathRatio: 0.90,
    flowUsage: 129193,
    memoryUsage: 1231
  })
});

const heathRatio = computed(() => {
  return (props.sampleStatus.scriptHeathRatio * 100).toFixed(2)
})
const heathRatioStyle = computed(() => {
  if (props.sampleStatus.scriptHeathRatio < 0.4) {
    return {color: '#ff392a'}
  } else if (props.sampleStatus.scriptHeathRatio < 0.8) {
    return {color: '#ffd920'}
  } else {
    return {color: '#34ff1e'}
  }
})


</script>

<template>
  <content-block class="status-card-list">
    <el-statistic
      class="status-card-item"
      :value="sampleStatus.runningScriptCount">
      <template #title>
        <div class="statistic-title">
          <Loading class="statistic-title-icon"/>
          Running Script
        </div>
      </template>
    </el-statistic>

    <el-statistic
      class="status-card-item"
      :value="heathRatio"
      :value-style="heathRatioStyle"
    >
      <template #title>
        <div class="statistic-title">
          <Monitor class="statistic-title-icon"/>
          Script Heath
        </div>
      </template>
      <template #suffix>
        <div class="statistic-unit">
          %
        </div>
      </template>
    </el-statistic>

    <el-statistic
      :value="sampleStatus.flowUsage"
      class="status-card-item"
    >
      <template #title>
        <div class="statistic-title">
          <Basketball class="statistic-title-icon"/>
          Flow Usage
        </div>
      </template>
      <template #suffix>
        <div class="statistic-unit">
          MB
        </div>
      </template>
    </el-statistic>

    <el-statistic
      class="status-card-item"
      :value="sampleStatus.memoryUsage">
      <template #title>
        <div class="statistic-title">
          <Coin class="statistic-title-icon"/>
          Memory Usage
        </div>
      </template>
      <template #suffix>
        <div class="statistic-unit">
          MB
        </div>
      </template>
    </el-statistic>
  </content-block>
</template>

<style scoped>
.status-card-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center; /* 垂直方向上的间隔 */
  gap: 10px; /* 元素之间的间隔 */
}

.status-card-item {
  flex: 1 1 20%;
}

@media (max-width: 1080px) {
  .status-card-item {
    flex: 1 1 46%;
  }
}

.statistic-title {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  min-width: 135px;
}

.statistic-title-icon {
  width: 14px;
  font-weight: 500;
  margin-right: 5px;
}

.statistic-unit {
  font-size: 14px;
  font-weight: 500;
  justify-content: left !important;
}
</style>

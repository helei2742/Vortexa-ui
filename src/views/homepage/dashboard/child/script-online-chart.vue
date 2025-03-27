<script setup lang="ts">
import {Loading} from '@element-plus/icons-vue'
import type {ECBasicOption} from "echarts/types/dist/shared";
import ScriptStatusChartCard from "@/views/homepage/dashboard/child/component/script-status-chart-card.vue";

interface RunningScriptChartData {
  total: number,
  options: ECBasicOption
}

interface Props {
  runningScriptChartData: RunningScriptChartData
}

withDefaults(defineProps<Props>(), {
  runningScriptChartData: () => ({
    total: 0,
    options:   {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
  })
})
</script>

<template>
    <script-status-chart-card
      height="400px"
      :chart-options="runningScriptChartData.options">
      <template #header>
        <div>Running Script</div>
        <div style="font-size: 14px; font-weight: 400; line-height: 14px;margin-top: 4px">
          <Loading style="width: 14px"/>
          {{ runningScriptChartData.total }} online
        </div>
      </template>
    </script-status-chart-card>
</template>

<style scoped>

</style>

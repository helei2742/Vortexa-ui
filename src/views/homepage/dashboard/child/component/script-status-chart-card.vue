<script setup lang="ts">
import ContentBlock from "@/components/content-block/content-block.vue";
import * as echarts from 'echarts'
import {ref, onMounted} from "vue";
import type {ECBasicOption} from "echarts/types/dist/shared";

const props = defineProps<{
  chartOptions: ECBasicOption,
  height: string
}>()

const chart = ref(null)

onMounted(()=>{
  const myChart = echarts.init(chart.value)
  myChart.setOption(<ECBasicOption>props.chartOptions)
  window.onresize = () => myChart.resize()
})
</script>

<template>
  <content-block>
    <template #header>
      <slot name="header"></slot>
    </template>

    <template #default>
      <div ref="chart" style="height: 400px; width: 100%"/>
    </template>
  </content-block>
</template>

<style scoped>

</style>

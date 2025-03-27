<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed} from "vue";

const route = useRoute()
const breadcrumbs = computed(() => {
  return route.matched.filter((item) => item.meta && item.meta.title)
})


</script>

<template>
  <el-page-header icon="">
    <template #breadcrumb>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.meta.title">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template #title>
      <h1 class="text-large font-600 mr-3"> {{ breadcrumbs[breadcrumbs.length - 1].meta.title }} </h1>
    </template>
    <template #extra>
      <div class="flex items-center">
        <el-button>Print</el-button>
        <el-button type="primary" class="ml-2">Edit</el-button>
      </div>
    </template>
  </el-page-header>
</template>

<style scoped>

</style>

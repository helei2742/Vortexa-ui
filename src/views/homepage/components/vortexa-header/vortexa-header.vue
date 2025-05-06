<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";
const route = useRoute()
const breadcrumbs = computed(() => {
  return route.matched.filter((item) => item.meta && item.meta.title)
})

const router = useRouter()
</script>

<template>
  <div class="vortexa-header" >
    <el-page-header icon="">
      <template #breadcrumb>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.meta.title">
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <template #title>
        <h1 class="text-large font-600 mr-3" @click="router.replace(breadcrumbs[breadcrumbs.length - 1].path)">
          {{ breadcrumbs[breadcrumbs.length - 1].meta.title }}
        </h1>
      </template>
    </el-page-header>
  </div>
</template>

<style scoped>
:deep(.vortexa-header > .el-page-header) {
  margin-bottom: 0 !important;
}
.vortexa-header {
  margin-bottom: 0 !important;
}
</style>

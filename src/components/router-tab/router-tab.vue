<script setup lang="ts">
import {usePageTabStore} from "@/stores/usePageTabSrore.ts";
import {storeToRefs} from "pinia";
import {ref} from 'vue';

const usePageTab = usePageTabStore()
const {pageList, currentPage} = storeToRefs(usePageTab)

const tabName = (path, id) => {
  return id
}

const activeTab = ref('')

// 切换 tab
const onTabClick = (tab) => {
  const pathAndId = tab.props.name.split('@')
  const path = pathAndId[0]
  const id = pathAndId[1]
  usePageTab.routeToHiddenPage({path, id})
};

// 关闭 tab
const onTabRemove = (targetPath) => {
  const pathAndId = targetPath.split('@')
  const path = pathAndId[0]
  const id = pathAndId[1]
  usePageTab.removeHiddenPage({path, id})
}
</script>

<template>
  <div>
    <el-tabs
      class="router-tab"
      v-model="activeTab"
      type="card"
      @tab-click="onTabClick"
      @tab-remove="onTabRemove"
    >
      <el-tab-pane
        v-for="tab in pageList"
        :closable="tab.path !== 'introduce'"
        :key="tabName(tab.path, tab.id)"
        :label="tabName(tab.path, tab.id)"
        :name="tab.path + '@' + tab.id"
      />
    </el-tabs>
    <slot>
    </slot>
  </div>
</template>

<style scoped>
.router-tab {
  width: calc(100vh - 250px);
  overflow-x: scroll;
}

:deep(.router-tab .el-tabs__item ){
  background-color: var(--el-color-info-light-9) !important;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  padding: 0 16px;
}
</style>

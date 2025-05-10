<script setup lang="ts">
import {usePageTabStore} from "@/stores/usePageTabStore.ts";
import {storeToRefs} from "pinia";
import {ref, watch} from 'vue';
import VortexaIcon from "@/components/vortexa-icon.vue";

const usePageTab = usePageTabStore()
const {pageList} = storeToRefs(usePageTab)

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

watch(
  () => usePageTab.currentPage,
  (newValue) => {
    if (newValue) {
      activeTab.value = newValue.path + '@' + newValue.id
    }
  }
)
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
        :name="tab.path + '@' + tab.id"
      >
        <template #label>
          <vortexa-icon :name="tab.icon" size="19"/>
          <span>{{ tabName(tab.path, tab.id) }}</span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <slot>
    </slot>
  </div>
</template>

<style scoped>
.router-tab {
  width: 100%;
  overflow-x: scroll;
}

:deep(.router-tab .el-tabs__item ) {
  background-color: var(--el-color-info-light-9) !important;
  font-size: 14px;
}
</style>

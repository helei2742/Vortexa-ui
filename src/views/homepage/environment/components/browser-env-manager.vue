<script setup lang="ts">
import DynamicAddFieldTable from "@/components/dynamic-add-field-table.vue";
import {ref} from "vue";
import {flattenObject} from "@/util/common.ts";
import {UploadEntry} from "@/types/vortexa-type-common.ts";
import {ElMessage} from "element-plus";
import {BrowserEnv} from "@/types/vortexa-type.ts";
import {
  deleteBrowserEnvNetwork,
  pageQueryBrowserEnvNetwork,
  uploadBrowserEnvListNetwork
} from "@/api/browser-env.ts";

const loading = ref(false)

const browserEnvList = ref<Array<object>>([])
const dataTable = ref()

const reload = () => {
  accountBaseInfoList.value = []
  dataTable.value?.reload()
}


// 分页查询代理
const pageQueryBrowserEnv = (query) => {
  pageQueryBrowserEnvNetwork(query)
    .then(response => {
      const pageResult = response.data;
      const list: Array<BrowserEnv> = pageResult.list
      browserEnvList.value = list.map(item => flattenObject(item))
      dataTable.value?.updatePageInfo(pageResult.total)
    })
    .finally(() => {
      loading.value = false
    })
}

// 新增或更新
const insertOrUpdateBrowserEnv = (uploadEntry: UploadEntry) => {
  loading.value = true
  uploadBrowserEnvListNetwork(uploadEntry)
    .then(() => {
      ElMessage({
        message: 'update account success',
        type: 'success',
      })

      reload()
    })
    .finally(() => {
      loading.value = false
    })
}

// 删除
const deleteBrowserEnv = (ids: Array<number>) => {
  deleteBrowserEnvNetwork(ids)
    .then(() => {
      ElMessage({
        message: 'delete account success',
        type: 'success'
      })

      reload()
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div>
    <dynamic-add-field-table
      ref="dataTable"
      :headers="['id', 'userAgent', 'insertDatetime']"
      id-field="id"
      :data="browserEnvList"
      @page-query="pageQueryBrowserEnv"
      @update-data="insertOrUpdateBrowserEnv"
      @delete-data="deleteBrowserEnv"
    >
    </dynamic-add-field-table>
  </div>
</template>

<style scoped>

</style>

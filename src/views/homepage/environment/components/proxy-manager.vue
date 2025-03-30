<script setup lang="ts">
import DynamicAddFieldTable from "@/components/dynamic-add-field-table.vue";
import {ref} from "vue";
import {flattenObject} from "@/util/common.ts";
import {UploadEntry} from "@/types/vortexa-type-common.ts";
import {ElMessage} from "element-plus";
import {ProxyInfo} from "@/types/vortexa-type.ts";
import {
  deleteProxyInfoNetwork,
  pageQueryProxyInfoNetwork,
  uploadProxyInfoListNetwork
} from "@/api/proxy-info.ts";

const loading = ref(false)

const proxyList = ref<Array<object>>([])
const dataTable = ref()

const reload = () => {
  accountBaseInfoList.value = []
  dataTable.value?.reload()
}


// 分页查询代理
const pageQueryProxyInfo = (query) => {
  pageQueryProxyInfoNetwork(query)
    .then(response => {
      const pageResult = response.data;
      const list: Array<ProxyInfo> = pageResult.list
      proxyList.value = list.map(item => flattenObject(item))
      dataTable.value?.updatePageInfo(pageResult.total)
    })
    .finally(() => {
      loading.value = false
    })
}

// 新增或更新
const insertOrUpdateProxyInfo = (uploadEntry: UploadEntry) => {
  loading.value = true
  uploadProxyInfoListNetwork(uploadEntry)
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
const deleteProxyInfo = (ids: Array<number>) => {
  deleteProxyInfoNetwork(ids)
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
      :headers="['id', 'proxyType', 'proxyProtocol', 'host', 'port']"
      id-field="id"
      :data="proxyList"
      @page-query="pageQueryProxyInfo"
      @update-data="insertOrUpdateProxyInfo"
      @delete-data="deleteProxyInfo"
    >
    </dynamic-add-field-table>
  </div>
</template>

<style scoped>

</style>

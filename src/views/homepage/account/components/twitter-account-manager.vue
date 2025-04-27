<script setup lang="ts">
import DynamicAddFieldTable from "@/components/dynamic-add-field-table.vue";
import {ref} from "vue";
import {flattenObject} from "@/util/common.ts";
import {UploadEntry} from "@/types/vortexa-type-common.ts";
import {ElMessage} from "element-plus";
import {
  deleteTwitterNetwork,
  insertOrUpdateTwitterListNetwork,
  pageQueryTwitterNetwork
} from "@/api/twitter.ts";
import {TwitterInfo} from "@/types/vortexa-type.ts";

const loading = ref(false)

const twitterList = ref<Array<object>>([])
const dataTable = ref()

const reload = () => {
  twitterList.value = []
  dataTable.value?.reload()
}

// 分页查询账户数据
const pageQueryTwitterInfo = (query) => {
  loading.value = true

  pageQueryTwitterNetwork(query)
    .then(response => {
      const pageResult = response.data;
      const abiList: Array<TwitterInfo> = pageResult.list
      twitterList.value = abiList.map(item => flattenObject(item))
      dataTable.value?.updatePageInfo(pageResult.total)
    })
    .finally(() => {
      loading.value = false
    })
}

// 新增或更新
const insertOrUpdateTwitterInfo = (uploadEntry: UploadEntry) => {
  loading.value = true
  insertOrUpdateTwitterListNetwork(uploadEntry)
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
const deleteTwitterInfo = (ids: Array<number>) => {
  deleteTwitterNetwork(ids)
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
  <div v-loading="loading">
    <dynamic-add-field-table
      ref="dataTable"
      :headers="['id', 'username', 'email', 'params', 'insertDatetime']"
      id-field="id"
      :data="twitterList"
      @page-query="pageQueryTwitterInfo"
      @update-data="insertOrUpdateTwitterInfo"
      @delete-data="deleteTwitterInfo"
    >
    </dynamic-add-field-table>
  </div>
</template>

<style scoped>

</style>

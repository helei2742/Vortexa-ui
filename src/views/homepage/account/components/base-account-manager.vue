<script setup lang="ts">
import DynamicAddFieldTable from "@/components/dynamic-add-field-table.vue";
import {ref} from "vue";
import {
  deleteAccountBaseInfoNetwork,
  pageQueryAccountBaseInfoNetwork,
  uploadAccountBaseInfoListNetwork
} from "@/api/account-base-info.ts";
import type {AccountBaseInfo} from "@/types/vortexa-type.ts";
import {flattenObject} from "@/util/common.ts";
import {UploadEntry} from "@/types/vortexa-type-common.ts";
import {ElMessage} from "element-plus";

const loading = ref(false)

const accountBaseInfoList = ref<Array<object>>([])
const dataTable = ref()

const reload = () => {
  accountBaseInfoList.value = []
  dataTable.value?.reload()
}


// 分页查询账户数据
const pageQueryAccountBaseInfo = (query) => {
  pageQueryAccountBaseInfoNetwork(query)
    .then(response => {
      const pageResult = response.data;
      const abiList: Array<AccountBaseInfo> = pageResult.list
      accountBaseInfoList.value = abiList.map(item => flattenObject(item))
      dataTable.value?.updatePageInfo(pageResult.total)
    })
    .finally(() => {
      loading.value = false
    })
}

// 新增或更新
const insertOrUpdateAccountBaseInfo = (uploadEntry: UploadEntry) => {
  loading.value = true
  uploadAccountBaseInfoListNetwork(uploadEntry)
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
const deleteAccountBaseInfo = (ids: Array<number>) => {
  deleteAccountBaseInfoNetwork(ids)
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
      :headers="['id', 'name', 'email', 'type', 'insertDatetime']"
      id-field="id"
      :data="accountBaseInfoList"
      @page-query="pageQueryAccountBaseInfo"
      @update-data="insertOrUpdateAccountBaseInfo"
      @delete-data="deleteAccountBaseInfo"
    />
  </div>
</template>

<style scoped>

</style>

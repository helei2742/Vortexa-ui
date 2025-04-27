<script setup lang="ts">
import DynamicAddFieldTable from "@/components/dynamic-add-field-table.vue";
import {ref} from "vue";
import {flattenObject} from "@/util/common.ts";
import {PageQuery, UploadEntry} from "@/types/vortexa-type-common.ts";
import {ElMessage} from "element-plus";
import {
  deleteWalletNetwork,
  insertOrUpdateWalletListNetwork,
  pageQueryWalletNetwork
} from "@/api/wallet.ts";
import {TwitterInfo} from "@/types/vortexa-type.ts";

const loading = ref(false)
const walletList = ref<Array<object>>([])
const dataTable = ref()

const pageQueryWalletInfo = (query: PageQuery) => {
  loading.value = true

  pageQueryWalletNetwork(query).then(response => {
    const pageResult = response.data;
    const abiList: Array<TwitterInfo> = pageResult.list
    walletList.value = abiList.map(item => flattenObject(item))
    dataTable.value?.updatePageInfo(pageResult.total)
  }).finally(() => {
    loading.value = false
  })
}

const insertOrUpdateWalletInfo = (uploadEntry: UploadEntry) => {
  loading.value = true
  insertOrUpdateWalletListNetwork(uploadEntry)
    .then(() => {
      ElMessage({
        message: 'update wallet success',
        type: 'success',
      })
      reload()
    })
    .finally(() => {
      loading.value = false
    })
}

const deleteWalletInfo = (ids: Array<number>) => {
  deleteWalletNetwork(ids)
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
      :headers="['id', 'mnemonic','ethAddress', 'solAddress', 'btcAddress']"
      id-field="id"
      :data="walletList"
      @page-query="pageQueryWalletInfo"
      @update-data="insertOrUpdateWalletInfo"
      @delete-data="deleteWalletInfo"
    >
    </dynamic-add-field-table>
  </div>
</template>

<style scoped>

</style>

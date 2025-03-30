<script setup lang="ts">
import DynamicAddFieldTable from "@/components/dynamic-add-field-table.vue";
import {ref} from "vue";
import {flattenObject} from "@/util/common.ts";
import {UploadEntry} from "@/types/vortexa-type-common.ts";
import {ElMessage} from "element-plus";
import {
  deleteDiscordNetwork,
  pageQueryDiscordNetwork,
  uploadDiscordListNetwork
} from "@/api/discord.ts";
import {DiscordInfo} from "@/types/vortexa-type.ts";

const loading = ref(false)

const discordInfoList = ref<Array<object>>([])
const dataTable = ref()

const reload = () => {
  discordInfoList.value = []
  dataTable.value?.reload()
}


// 分页查询discord数据
const pageQueryDiscord = (query) => {
  pageQueryDiscordNetwork(query)
    .then(response => {
      console.log('discord', response)
      const pageResult = response.data;
      const abiList: Array<DiscordInfo> = pageResult.list
      discordInfoList.value = abiList.map(item => flattenObject(item))
      dataTable.value?.updatePageInfo(pageResult.total)
    })
    .finally(() => {
      loading.value = false
    })
}

// 新增或更新
const insertOrUpdateDiscord = (uploadEntry: UploadEntry) => {
  loading.value = true
  uploadDiscordListNetwork(uploadEntry)
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
const deleteDiscord = (ids: Array<number>) => {
  deleteDiscordNetwork(ids)
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
      :headers="['id', 'username', 'password', 'bind_email']"
      id-field="id"
      :data="discordInfoList"
      @page-query="pageQueryDiscord"
      @delete-data="deleteDiscord"
      @update-data="insertOrUpdateDiscord"
    >
    </dynamic-add-field-table>
  </div>
</template>

<style scoped>

</style>

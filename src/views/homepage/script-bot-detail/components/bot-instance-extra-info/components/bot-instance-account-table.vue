<script setup lang="ts">
import {type Ref, ref} from "vue";
import {BotInstanceAccount} from "@/types/vortexa-type.ts";
import DynamicAddFieldTable from "@/components/dynamic-add-field-table.vue";
import {flattenObject} from "@/util/common.ts";
import {pageQueryBotInstanceAccountNetwork} from "@/api/bot.ts";

const props = defineProps<{
  scriptBotName: string,
  botKey: string
}>()

const loading = ref(false)

const dataTable = ref()

const botInstanceAccounts: Ref<Array<BotInstanceAccount>> = ref([])

const pageQueryBotInstanceAccounts = (query) => {
  loading.value = true
  pageQueryBotInstanceAccountNetwork(props.scriptBotName, props.botKey, query)
    .then(response => {
      const pageResult = response.data;
      const list: Array<BotInstanceAccount> = pageResult.list
      botInstanceAccounts.value = list.map(item => flattenObject(item))
      dataTable.value?.updatePageInfo(pageResult.total)
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
      id-field="id"
      :headers="['id', 'accountBaseInfoId','proxyId', 'browserEnvId']"
      :filter-fields="['botId', 'botKey']"
      :data="botInstanceAccounts"
      @page-query="pageQueryBotInstanceAccounts"
    />
  </div>
</template>

<style scoped>

</style>

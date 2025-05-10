<script setup lang="ts">
import {queryBotInfoByNameNetwork} from "@/api/bot-info.ts";
import {type Ref, ref} from "vue";
import type {BotInfo} from "@/types/vortexa-type.ts";
import {toLocalDatetimeStr} from "@/util/common.ts";
import ContentBlock from "@/components/content-block/content-block.vue";

const loading = ref(false)


const botInfo: Ref<BotInfo> = ref(null)

const queryBotInfo = (botName) => {
  loading.value = true
  queryBotInfoByNameNetwork(botName).then(result => {
    botInfo.value = result.data
  }).finally(() => loading.value = false)
}

defineExpose({queryBotInfo})
</script>

<template>
  <content-block v-if="botInfo">
    <template #header>
      <div style="text-align: center;font-size: 26px;color:#c1c4cb">
        Create
        <span style="color:teal"> {{ botInfo.name }}</span>
        Instance
      </div>
    </template>
    <el-divider/>
    <el-descriptions
      border
      direction="vertical"
      style="overflow-x: scroll"
      v-loading="loading">
      <el-descriptions-item label="name" :span="1">
        <el-tag>{{ botInfo.name }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="insertDatetime" :span="1">
        {{ toLocalDatetimeStr(botInfo.insertDatetime) }}
      </el-descriptions-item>
      <el-descriptions-item label="updateDatetime" :span="1">
        {{ toLocalDatetimeStr(botInfo.updateDatetime) }}
      </el-descriptions-item>
      <el-descriptions-item
        :width="140"
        label="icon"
        align="center"
      >
        <el-image
          style="width: 100px; height: 100px"
          :src="botInfo.image"
        />
      </el-descriptions-item>
      <el-descriptions-item label="describe" :span="2">
        {{ botInfo.describe ? botInfo.describe : '_' }}
      </el-descriptions-item>
    </el-descriptions>
  </content-block>
</template>

<style scoped>

</style>

<script setup lang="ts">

import ContentBlock from "@/components/content-block/content-block.vue";
import {onMounted, ref, type Ref, watch} from "vue";
import {BotLaunchConfig} from "@/types/vortexa-type.ts";
import DynamicRowInputCard
  from "@/views/homepage/script-bot-instance-create/components/dynamic-row-input-card.vue";

const createForm: Ref<BotLaunchConfig> = ref(new BotLaunchConfig())

const props = defineProps<{
  scriptNodeName: string
  botName: string
}>()

onMounted(() => {
  createForm.value.scriptNodeName = props.scriptNodeName
  createForm.value.botName = props.botName
})

watch(
  () => props,
  (newProp) => {
    createForm.value.scriptNodeName = newProp.scriptNodeName
    createForm.value.botName = newProp.botName
  },
  {
    deep: true
  }
)
</script>

<template>
  <content-block>
    <el-form
      class="create-form"
      :model="createForm"
      label-width="auto"
      label-position="left"
    >
      <el-form-item label="scriptNodeName">
        <el-input v-model="createForm.scriptNodeName" disabled/>
      </el-form-item>
      <el-form-item label="botName">
        <el-input v-model="createForm.botName" disabled/>
      </el-form-item>
      <el-form-item label="botKey">
        <el-input v-model="createForm.botKey" placeholder="Place enter bot key"/>
      </el-form-item>
      <el-form-item label="config">
       <dynamic-row-input-card/>
      </el-form-item>
    </el-form>
  </content-block>
</template>

<style scoped>

</style>

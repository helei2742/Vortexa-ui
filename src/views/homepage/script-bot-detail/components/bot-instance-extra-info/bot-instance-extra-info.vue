<script setup lang="ts">
import {BotInstanceInfo} from "@/types/vortexa-type.ts";
import {onMounted, ref} from "vue";
import LaunchConfigEditor
  from "@/views/homepage/script-bot-detail/components/bot-instance-extra-info/components/launch-config-editor.vue";
import {saveBotLaunchConfigNetwork} from "@/api/bot.ts";
import {ElMessage} from "element-plus";
import BotInstanceAccountTable
  from "@/views/homepage/script-bot-detail/components/bot-instance-extra-info/components/bot-instance-account-table.vue";
import BotInstanceRuningLog
  from "@/views/homepage/script-bot-detail/components/bot-instance-extra-info/components/bot-instance-runing-log.vue";

const props = defineProps<{
  botInstance: BotInstanceInfo
  botLaunchConfig: string
}>()

const activeTag = ref('Reword')

const loading = ref(false)

// 保存配置
const saveBotLaunchConfig = (editLaunchConfig) => {
  loading.value = true
  saveBotLaunchConfigNetwork({
    scriptNodeName: props.botInstance.scriptNodeName,
    botKey: props.botInstance.botKey,
    botLaunchConfig: editLaunchConfig
  }).then(result => {
    if (result.success) {
      ElMessage.success({
        message: 'save bot launch config success'
      })

      reloadData()
    }
  }).finally(() => loading.value = false)
}

const emit = defineEmits(['reload-data'])

const reloadData = () => {
  emit('reload-data')
}

onMounted(() => {
})
</script>

<template>
  <div>
    <el-tabs v-model="activeTag">
      <el-tab-pane label="Reword" name="Reword">

      </el-tab-pane>
      <el-tab-pane label="Running Log" name="Running Log">
        <bot-instance-runing-log
          :script-node-name="botInstance.scriptNodeName"
          :bot-name="botInstance.botName"
          :bot-key="botInstance.botKey"
        />
      </el-tab-pane>
      <el-tab-pane label="Account" name="Account">
        <bot-instance-account-table
          :script-bot-name="botInstance.scriptNodeName"
          :bot-key="botInstance.botKey"
        />
      </el-tab-pane>
      <el-tab-pane label="Launch Config" name="Launch Config">
        <launch-config-editor
          v-loading="loading"
          @reload-data="reloadData"
          @save-launch-config="saveBotLaunchConfig"
          :bot-launch-config="botLaunchConfig"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>

</style>

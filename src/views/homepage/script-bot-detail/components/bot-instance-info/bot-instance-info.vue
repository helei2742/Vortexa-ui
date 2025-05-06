<script setup lang="ts">
import {BotInfo, type BotInstanceInfo} from "@/types/vortexa-type.ts";
import BotJobInfoCapsule
  from "@/views/homepage/script-bot-detail/components/bot-instance-info/components/bot-job-info-capsule.vue";
import {toLocalDatetimeStr} from "@/util/common.ts";
import {onMounted, ref, watch} from "vue";
import {
  startScriptNodeBotInstanceNetwork,
  stopScriptNodeBotInstanceNetwork
} from "@/api/script-node.ts";
import {ElMessage, ElMessageBox} from "element-plus";
import {BotInstanceStatus} from "@/config/vortexa-config.ts";

const props = defineProps<{
  botInfo: BotInfo
  botInstance: BotInstanceInfo
  jobTriggers?: object
  online: boolean
}>()

const getBotJobTrigger = (jobName) => {
  if (props.jobTriggers) {
    return props.jobTriggers[jobName]
  }
  return []
}

// bot状态
const botIsOnline = ref(false)

const loading = ref(false)

// 启动bot
const startScriptNodeBotInstance = () => {
  ElMessageBox.confirm(
    `Start bot ${props.botInstance.botKey}. Continue?`,
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'danger',
    }
  ).then(() => {
    loading.value = true
    startScriptNodeBotInstanceNetwork({
      scriptNodeName: props.botInstance.scriptNodeName,
      botKey: props.botInstance.botKey
    }).then(result => {
      if (result.success) {
        ElMessage.success({
          message: 'start bot success',
          type: 'success'
        });
        if (result.data === BotInstanceStatus.RUNNING) {
          botIsOnline.value = true
        }
      }
    }).finally(() => {
      setTimeout(() => {
        reloadData()
        loading.value = false
      }, 3000)
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: 'start canceled',
    })
  })
}

// 关闭bot
const stopScriptNodeBotInstance = () => {
  ElMessageBox.confirm(
    `Stop bot ${props.botInstance.botKey}. Continue?`,
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'danger',
    }
  ).then(() => {
    loading.value = true
    stopScriptNodeBotInstanceNetwork({
      scriptNodeName: props.botInstance.scriptNodeName,
      botKey: props.botInstance.botKey
    }).then(result => {
      if (result.success) {
        ElMessage.success({
          message: 'stop bot success',
          type: 'success',
        })
        if (result.data === BotInstanceStatus.STOPPED) {
          botIsOnline.value = false
        }
      }
    }).finally(() => {
      setTimeout(() => {
        reloadData()
        loading.value = false
      }, 3000)
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: 'stop canceled',
    })
  })
}

// 启动关闭按钮
const handleBotStatusSwitch = () => {
  // 网络请求切换状态
  if (!botIsOnline.value) {
    startScriptNodeBotInstance()
  } else {
    stopScriptNodeBotInstance()
  }

}

const emit = defineEmits(['reload-data'])
const reloadData = () => {
  emit('reload-data')
}

watch(
  () => props.online,
  (newValue) => {
    botIsOnline.value = newValue
  }
)

onMounted(() => {
  botIsOnline.value = props.online
})
</script>

<template>
  <div class="bot-instance-info">
    <div class="bot-instance-basic-info">
      <el-descriptions
        title="Basic"
        direction="vertical"
        style="width: 100%;"
        :column="4"
        border
      >
        <template #extra>
          <el-switch
            v-model="botIsOnline"
            :loading="loading"
            :before-change="handleBotStatusSwitch"
            inline-prompt
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            active-text="Running"
            inactive-text="Stopped"
          />
        </template>
        <el-descriptions-item
          :rowspan="2"
          :width="140"
          label="icon"
          align="center"
        >
          <el-image
            style="width: 100px; height: 100px"
            :src="botInfo.image"
          />
        </el-descriptions-item>
        <el-descriptions-item label="id">
          {{ botInstance.id }}
        </el-descriptions-item>
        <el-descriptions-item label="botId">
          {{ botInstance.botId }}
        </el-descriptions-item>
        <el-descriptions-item label="botName">
          {{ botInstance.botName }}
        </el-descriptions-item>
        <el-descriptions-item label="scriptNodeName">
          {{ botInstance.scriptNodeName }}
        </el-descriptions-item>
        <el-descriptions-item label="botKey">
          {{ botInstance.botKey }}
        </el-descriptions-item>
        <el-descriptions-item label="">
        </el-descriptions-item>
        <el-descriptions-item label="insertDatetime" :span="2">
          {{ toLocalDatetimeStr(botInstance.insertDatetime) }}
        </el-descriptions-item>
        <el-descriptions-item label="updateDatetime" :span="2">
          {{ toLocalDatetimeStr(botInstance.updateDatetime) }}
        </el-descriptions-item>
        <el-descriptions-item v-if="botInfo.describe" label="describe" :span="4">
          {{ botInfo.describe }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <el-divider/>

    <h4 style="display: block">Jobs</h4>
    <div v-if="botInstance" class="bot-instance-job-list">
      <bot-job-info-capsule v-for="(jobParam,jobName) in botInstance.jobParams"
                            @reload-data="reloadData"
                            :script-node-name="botInstance.scriptNodeName"
                            :bot-key="botInstance.botKey"
                            :job-param="jobParam"
                            :triggers="getBotJobTrigger(jobName)"
                            :key="jobName"
      />
    </div>
  </div>
</template>

<style scoped>
.bot-instance-info {
  overflow-x: scroll;
}

.bot-instance-basic-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
}

.bot-instance-job-list {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}

</style>

<script lang="ts" setup>
import {SwitchButton, More} from '@element-plus/icons-vue'
import {ElMessage, ElMessageBox} from "element-plus";
import type {BotInstanceInfo} from "@/types/vortexa-type.ts";
import {computed, ref} from "vue";
import {stringToEnum} from "@/util/common.ts";
import {useCommonStore} from "@/stores/commonStore.ts";
import {BotInstanceStatus} from "@/config/vortexa-config.ts";
import HorizontalScrollBar from "@/components/horizontal-scroll-bar/horizontal-scroll-bar.vue";
import BotJobDetail from "@/views/homepage/script/components/bot-job-detail.vue";


const props = defineProps<{
  botInstance: BotInstanceInfo
}>();

// 运行状态
const botInstanceStatus = computed(() => {
  return stringToEnum(props.botInstance.params['bot_instance_status'], BotInstanceStatus)
})

// 基本任务
// const botInstanceBasicTask = computed(() => {
//   return props.botInstance.params['basic_job_list']
// })

// 任务
const botInstanceTask = computed(() => {
  return props.botInstance.jobParams
})
// 当前显示的job
const activeJobName = ref('')
const activeJobParams = computed(() => {
  if (activeJobName.value) {
    return props.botInstance.jobParams[activeJobName.value]
  }
  return {}
})
// 当前显示的job 变化
const activeJobChangeHandler = (newJobName: string) => {
  activeJobName.value = newJobName
}

// 事件
const emit = defineEmits([
  'start-script',
  'stop-script',
  'delete-script',
  'start-script-job',
  'stop-script-job'
])

// 开始运行Script
const startScriptHandler = () => {
  emit('start-script', {instanceId: props.botInstance.id})
}

// 停止运行Script
const stopScriptHandler = () => {
  emit('stop-script', {instanceId: props.botInstance.id})
}

// 删除Script
const deleteInstanceHandler = () => {
  ElMessageBox.confirm(
    'delete the script instance. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'danger',
    }
  )
    .then(() => {
      emit('delete-task', {instanceId: props.botInstance.id})
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

// 开始任务
const startTaskHandler = (jobName) => {
  emit('start-script-job', {
    botName: props.botInstance.botName,
    botKey: props.botInstance.botKey,
    jobName: jobName
  })
}

// 停止任务
const stopTaskHandler = (jobName) => {
  emit('stop-script-job', {
    botName: props.botInstance.botName,
    botKey: props.botInstance.botKey,
    jobName: jobName
  })
}

// 账户日志
const {updateCurrentBotInstance} = useCommonStore()
const showBotLog = () => {
  updateCurrentBotInstance(props.botInstance, true)
}
</script>

<template>
  <div class="bot-runtime-display-card">
    <div class="card-header clearfix">
      <div style="display:flex; align-items: start">
        <div style="width: 60px;">
          <el-image class="head-image"/>
        </div>
        <div
          style="flex: 1;overflow: hidden;font-weight: 700; cursor: pointer"
          @click="activeJobName=''"
        >
          <el-text truncated>{{ botInstance.botKey }}</el-text>
          <div style="font-weight: 400;">
            <el-text truncated>
              {{ botInstance.insertDatetime ? botInstance.insertDatetime : 'unknown start time' }}
            </el-text>
          </div>
        </div>

        <el-dropdown placement="bottom-end">
          <el-icon class="setting-button">
            <More/>
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Account Edit</el-dropdown-item>
              <el-dropdown-item @click="showBotLog">
                Runtime Log
              </el-dropdown-item>
              <el-dropdown-item
                @click="deleteInstanceHandler"
              >
                <span style="color: red">Delete</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>


    <div class="data-print-line">
      <horizontal-scroll-bar :step="180">
        <el-button
          v-for="(task, jobName) in botInstanceTask"
          size="small"
          :key="jobName"
          class="button-morandi"
          :class="{'active-job-button': activeJobName==jobName}"
          @click="activeJobChangeHandler(jobName, task)"
          plain
        >
          {{ jobName }}
        </el-button>
      </horizontal-scroll-bar>
    </div>

    <div class="card-detail">
      <el-scrollbar class="card-detail-content">
        <bot-job-detail
          :job-name="activeJobName"
          :job-params="activeJobParams"
          :is-running="false"
          @start-task="startTaskHandler"
          @stop-task="stopTaskHandler"
        />
      </el-scrollbar>

      <el-button v-if="botInstanceStatus==BotInstanceStatus.RUNNING"
                 @click="stopScriptHandler"
                 class="opt-button"
                 type="danger"
                 plain
      >
        <el-icon>
          <SwitchButton/>
        </el-icon>
        Stop Task
      </el-button>
      <el-button
        v-else
        class="opt-button"
        type="success"
        @click="startScriptHandler"
        plain
      >
        <el-icon>
          <SwitchButton/>
        </el-icon>
        Start Script
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.bot-runtime-display-card {
  width: 300px;
  min-width: 300px;
  //max-width: 500px;
  height: 350px;
  background-color: rgba(110, 110, 110, 0.1);
  padding: 24px;

  margin-left: 12px;

  color: #9da3ae;
  border-radius: 10px;
}

.card-header {
  height: 48px;
}

.data-print-line {
  height: 28px;
  margin-top: 4px;
  border-bottom: 1px solid #9da3ae;
}

.card-detail {
  height: 222px;
  margin-top: 16px;
}

.head-image {
  height: 48px;
  width: 48px;
  margin-right: 8px;
}

.icon-button {
  width: 24px;
  height: 24px;
  color: #9da3ae;
  font-size: 20px;

  cursor: pointer;
}

.icon-button:hover {
  transform: scale(1.2); /* 鼠标悬浮时放大 */
  color: #007BFF; /* 鼠标悬浮时改变颜色 */
}

.card-detail-content {
  height: 222px;
}

.opt-button {
  margin-top: 4px;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
}

.setting-button {
  font-size: 23px;
  cursor: pointer;
}

.setting-button:hover {
  color: #000000;
}

.active-job-button {
  background-color: aquamarine !important;
  color: #000000 !important;
}

:deep(.el-descriptions__body), :deep(.el-descriptions__label.el-descriptions__cell.is-bordered-label) {
  background-color: transparent !important;
}
</style>


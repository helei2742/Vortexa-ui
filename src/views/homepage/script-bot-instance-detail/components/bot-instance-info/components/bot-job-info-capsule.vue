<script setup lang="ts">
import {AutoBotJobParams, JobStatus, JobTrigger, JobType} from "@/types/vortexa-type.ts";
import {computed, onMounted, type Ref, ref} from "vue";
import {toLocalDatetimeStr} from "@/util/common.ts";
import equal from "fast-deep-equal/es6";
import {
  deleteScriptJobNetwork,
  pauseScriptJobNetwork,
  startScriptJobNetwork,
  updateBotJobParamNetwork
} from "@/api/bot-instance.ts";
import {ElMessage} from "element-plus";
import LaunchControlBar from "@/components/launch-control-bar.vue";

const props = defineProps<{
  scriptNodeName: string
  botKey: string
  jobParam: AutoBotJobParams
  triggers?: Array<JobTrigger>
}>()

// 组件内双向绑定用的
const editJobParam: Ref<AutoBotJobParams> = ref(null)

// 右上角点点颜色
const dotColor = computed(() => {
  if (props.triggers && props.triggers.length > 0) {
    const trigger = props.triggers[0]
    if (trigger.jobStatus === JobStatus.NORMAL || trigger.jobStatus === JobStatus.BLOCKED) {
      return 'radial-gradient(circle at 30% 30%, #6ee7b7, #10b981)'
    } else if (trigger.jobStatus === JobStatus.PAUSED) {
      return 'radial-gradient(circle at 30% 30%, #fef08a, #facc15)'
    } else if (trigger.jobStatus === JobStatus.ERROR) {
      return 'radial-gradient(circle at 30% 30%, #fca5a5, #ef4444)'
    }
  }
  return 'radial-gradient(circle at 30% 30%, #e5e7eb, #9ca3af)'
})

// 任务类型标签类型
const jobTypeTagType = computed(() => {
  if (props.jobParam) {
    if (props.jobParam.jobType === JobType.ONCE_TASK) {
      return 'info'
    } else if (props.jobParam.jobType === JobType.TIMED_TASK || props.jobParam.jobType === JobType.ACCOUNT_SPLIT_JOB) {
      return 'success'
    } else if (props.jobParam.jobType === JobType.WEB_SOCKET_CONNECT) {
      return 'primary'
    } else if (props.jobParam.jobType === JobType.QUERY_REWARD) {
      return 'warning'
    }
  }
  return 'info'
})

// 保存参数
const saveJobParam = () => {
  jobDetailDialogLoading.value = true
  updateBotJobParamNetwork({
    scriptNodeName: props.scriptNodeName,
    botKey: props.botKey,
    botJobParam: editJobParam.value
  }).then((result) => {
    if (result.success) {
      ElMessage({
        message: 'save job param success',
        type: 'success',
      })
      reloadData()
    }
  }).finally(() => {
    jobDetailDialogLoading.value = false
  })
}

// 开启job
const startJob = () => {
  jobDetailDialogLoading.value = true
  startScriptJobNetwork({
    scriptNodeName: props.scriptNodeName,
    botKey: props.botKey,
    jobName: editJobParam.value.jobName
  }).then((result) => {
    if (result.success) {
      ElMessage.success({
        message: 'start job success',
        type: 'success',
      })

      reloadData()
    }
  }).finally(() => {
    jobDetailDialogLoading.value = false
  })
}

// 暂停job
const pauseJob = () => {
  jobDetailDialogLoading.value = true
  pauseScriptJobNetwork({
    scriptNodeName: props.scriptNodeName,
    botKey: props.botKey,
    jobName: editJobParam.value.jobName
  }).then((result) => {
    if (result.success) {
      ElMessage.success({
        message: 'pause job success',
        type: 'success',
      })

      reloadData()
    }
  }).finally(() => {
    jobDetailDialogLoading.value = false
  })
}

// 删除job
const deleteJob = () => {
  jobDetailDialogLoading.value = true
  deleteScriptJobNetwork({
    scriptNodeName: props.scriptNodeName,
    botKey: props.botKey,
    jobName: editJobParam.value.jobName
  }).then((result) => {
    if (result.success) {
      ElMessage.success({
        message: 'delete job success',
        type: 'success',
      })

      reloadData()
    }
  }).finally(() => {
    jobDetailDialogLoading.value = false
  })
}

// 重载数据
const emit = defineEmits(['reload-data'])
const reloadData = () => {
  emit('reload-data')
}

// 触发器是否在工作
const triggerRunning = computed(() => {
  return props.triggers && props.triggers[0]
    && (props.triggers[0].jobStatus === JobStatus.NORMAL || props.triggers[0].jobStatus === JobStatus.BLOCKED);
})

const triggerDeletable = computed(() => {
  return props.triggers && props.triggers.length > 0
})

const jobDetailVisible = ref(false)
const jobDetailDialogLoading = ref(false)

onMounted(() => {
  editJobParam.value = JSON.parse(JSON.stringify(props.jobParam))
})
</script>

<template>
  <div class="bot-job-info-capsule fancy-border">
    <div class="bot-job-info-capsule-header">
      <el-text style="font-weight: 900;cursor: pointer"

               @click="jobDetailVisible = true"
               truncated
      >
        {{ jobParam.jobName }}
      </el-text>
      <span class="capsule-dot"
            style="float: right"
            @click="jobDetailVisible = true"
            :style="{'background': dotColor}"
      />
    </div>

    <div class="bot-job-info-capsule-content">
      <div class="clearfix" style="margin-bottom: 5px">
        <el-tag size="small"
                :type="jobTypeTagType">
          {{ jobParam.jobType }}
        </el-tag>
      </div>
      <div v-if="triggers" style="font-weight: 500;color: #77726e">
        <div>last at: {{ toLocalDatetimeStr(triggers[0].previousFireTime) }}</div>
        <div>next at: {{ toLocalDatetimeStr(triggers[0].nextFireTime) }}</div>
      </div>
      <div v-else>

      </div>
    </div>

    <el-dialog
      v-model="jobDetailVisible"
      align-center
      :show-close="false"
      width="600"
    >
      <template #header>
        <div>
           <span style="font-weight: 700; font-size: 20px">
          {{ jobParam.jobName + ' Config' }}
        </span>
          <launch-control-bar style="float: right"
                              @start-handle="startJob"
                              @pause-handle="pauseJob"
                              @delete-handle="deleteJob"
                              :deletable="triggerDeletable"
                              :running="triggerRunning"
          />
        </div>
      </template>
      <div v-loading="jobDetailDialogLoading">
        <el-descriptions
          style="margin-bottom: 10px"
          title="Job Params"
          :column="2"
          size="small"
          border
        >
          <template #extra>
            <el-button v-if="!equal(jobParam, editJobParam)"
                       @click="saveJobParam"
                       type="primary"
                       size="small"
            >
              Save
            </el-button>
          </template>
          <el-descriptions-item label="jobType">
            <el-tag :type="jobTypeTagType" size="small"> {{ editJobParam.jobType }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="uniqueAccount">
            {{ editJobParam.uniqueAccount }}
          </el-descriptions-item>
          <el-descriptions-item label="syncExecute">
            <el-select
              v-model="editJobParam.syncExecute"
              size="small"
            >
              <el-option label="true" :value="true"/>
              <el-option label="false" :value="false"/>
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item label="intervalInSecond">
            <el-input-number v-model="editJobParam.intervalInSecond"
                             size="small"
                             controls-position="right"
                             :min="1"
            />
          </el-descriptions-item>
          <el-descriptions-item label="cronExpression">
            <el-input size="small"
                      v-model="editJobParam.cronExpression"/>
          </el-descriptions-item>
          <el-descriptions-item label="concurrentCount" :span="2">
            <el-input-number v-model="editJobParam.concurrentCount"
                             size="small"
                             controls-position="right"
                             :min="1"
            />
          </el-descriptions-item>
          <el-descriptions-item label="dynamicTimeWindowMinute">
            <el-input-number v-model="editJobParam.dynamicTimeWindowMinute"
                             size="small"
                             controls-position="right"
                             :min="1"
            />
          </el-descriptions-item>
          <el-descriptions-item label="dynamicTrigger">
            <el-select
              v-model="editJobParam.dynamicTrigger"
              size="small"
            >
              <el-option label="true" :value="true"/>
              <el-option label="false" :value="false"/>
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item label="description">
            {{ editJobParam.description }}
          </el-descriptions-item>
        </el-descriptions>

        <el-descriptions
          v-for="trigger in triggers"
          :key="trigger.jobGroup + trigger.jobName"
          class="margin-top"
          :title="trigger.jobName + ' Trigger'"
          :column="2"
          size="small"
          border
        >
          <el-descriptions-item label="jobStatus">
            <el-tag type="info" size="small" :style="{'background':dotColor}">
              {{ trigger.jobStatus}}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="timesTriggered">
            {{ trigger.timesTriggered }}
          </el-descriptions-item>
          <el-descriptions-item label="repeatInterval">
            {{ trigger.repeatInterval + 'ms' }}
          </el-descriptions-item>

          <el-descriptions-item label="startTime">
            {{ toLocalDatetimeStr(trigger.startTime) }}
          </el-descriptions-item>
          <el-descriptions-item label="previousFireTime">
            {{ toLocalDatetimeStr(trigger.previousFireTime) }}
          </el-descriptions-item>
          <el-descriptions-item label="nextFireTime">
            {{ toLocalDatetimeStr(trigger.nextFireTime) }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.bot-job-info-capsule {
  position: relative;
  width: 180px;
  height: 90px;
  margin-bottom: 8px;
  margin-right: 8px;
  padding: 6px 6px 6px 12px
}

.capsule-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
  box-shadow: inset 0 0 4px rgba(255, 255, 255, 0.6),
  0 1px 3px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 8px;
  right: 2px;
  background: gray; /* 默认背景，可被具体颜色覆盖 */
  cursor: pointer;
}

.capsule-dot::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
}

.bot-job-info-capsule-header {
  margin-bottom: 5px;
}

.bot-job-info-capsule-content {
  font-size: 12px;
}
</style>

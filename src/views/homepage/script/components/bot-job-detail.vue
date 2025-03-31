<script setup lang="ts">
import {CaretLeft, EditPen, SemiSelect} from "@element-plus/icons-vue";
import {ref} from "vue";

const props = defineProps<{
  jobName: string,
  jobParams: object,
  isRunning: boolean
}>()


const editJobParamsDialogVisible = ref(false)

// 事件
const emit = defineEmits([
  'start-task',
  'stop-task'
])

const startTaskHandler = () => {
  emit('start-task', props.jobName)
}

const stopTaskHandler = () => {
  emit('stop-task', props.jobName)
}
</script>

<template>
  <div>
    <div v-if="jobName==''">
      概况图
    </div>
    <div v-else>
      <el-descriptions
        class="margin-top"
        :title="jobName"
        border
        :column="1"
      >
        <template #extra>
          <el-button-group class="ml-4">
            <el-button
              v-if="!props.isRunning"
              size="small"
              @click="startTaskHandler">
              <el-icon>
                <CaretLeft/>
              </el-icon>
            </el-button>
            <el-button
              v-else
              size="small"
              @click="stopTaskHandler"
            >
              <el-icon>
                <SemiSelect/>
              </el-icon>
            </el-button>
            <el-button
              size="small"
              @click="editJobParamsDialogVisible = true"
            >
              <el-icon>
                <EditPen/>
              </el-icon>
            </el-button>
          </el-button-group>
        </template>
        <el-descriptions-item label="Launch Times">1</el-descriptions-item>
        <el-descriptions-item label="Last Start">2024-03-28 22:12:33</el-descriptions-item>
        <el-descriptions-item label="Job Type">
          <el-tag size="small">{{ jobParams.jobType }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Description">
          <el-text line-clamp="2">
            The -webkit-line-clamp CSS property<br/>
            allows limiting of the contents of<br/>
            a block to the specified number of lines.
          </el-text>
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <el-dialog v-model="editJobParamsDialogVisible" title="Edit Job Params" width="480">
      <template #footer>
        <div>
          {{ jobParams }}
        </div>
        <div class="dialog-footer">
          <el-button @click="editJobParamsDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="editJobParamsDialogVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>

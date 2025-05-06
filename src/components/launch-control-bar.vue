<script setup lang="ts">
import VortexaIcon from "@/components/vortexa-icon.vue";
import {ElMessage, ElMessageBox} from "element-plus";

const props = withDefaults(defineProps<{
  running: boolean
  deletable: boolean
  display: Array<string>
}>(), {
  running: false,
  deletable: false,
  display: () => ['start', 'pause', 'delete']
})

const containType = (type) => {
  return props.display && props.display.indexOf(type) != -1
}

const emit = defineEmits(['start-handle', 'pause-handle', 'delete-handle'])

const startHandle = () => {
  emit('start-handle')
}

const pauseHandle = () => {
  emit('pause-handle')
}

const deleteHandle = () => {
  ElMessageBox.confirm(
    'Will delete it. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      emit('delete-handle')
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}
</script>

<template>
  <div style="display: inline-block">
    <el-button-group>
      <el-button type="primary" size="small"
                 @click="startHandle"
                 v-if="containType('start')"
                 :disabled="running"
      >
        <vortexa-icon name="start" size="10"/>
      </el-button>
      <el-button type="warning" size="small"
                 @click="pauseHandle"
                 v-if="containType('pause')"
                 :disabled="!running"
      >
        <vortexa-icon name="stop" size="10"/>
      </el-button>
      <el-button type="danger" size="small"
                 :disabled="!deletable"
                 v-if="containType('delete')"
                 @click="deleteHandle">
        <vortexa-icon name="delete" size="12"/>
      </el-button>
    </el-button-group>
  </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
import {Refresh} from '@element-plus/icons-vue'
import type {ScriptNode} from "@/types/vortexa-type.ts";
import {toLocalDatetimeStr} from "@/util/common.ts";

defineProps<{
  scriptNode: ScriptNode
}>()

const emit = defineEmits(['reload-data'])
</script>

<template>
  <div>
    <el-descriptions
      style="width: 100%"
      :title="scriptNode.scriptNodeName"
      border
      :column="3"
    >
      <template #extra>
        <el-button type="text" @click="emit('reload-data')">
          <el-icon><Refresh /></el-icon>
        </el-button>
      </template>
      <el-descriptions-item label="status">
        <el-tag v-if="scriptNode.online" type="success">
          Online
        </el-tag>
        <el-tag v-else type="danger">
          Offline
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="host">
        {{ scriptNode.host }}
      </el-descriptions-item>
      <el-descriptions-item label="port">
        {{ scriptNode.port }}
      </el-descriptions-item>

      <el-descriptions-item label="groupId">
        {{ scriptNode.groupId }}
      </el-descriptions-item>
      <el-descriptions-item label="serviceId">
        {{ scriptNode.serviceId }}
      </el-descriptions-item>
      <el-descriptions-item label="instanceId">
        {{ scriptNode.instanceId }}
      </el-descriptions-item>

      <el-descriptions-item label="createDatetime" :span="3">
        <el-tag v-if="scriptNode.insertDatetime" type="info">
          {{ toLocalDatetimeStr(scriptNode.insertDatetime) }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="updateDatetime" :span="3">
        <el-tag v-if="scriptNode.updateDatetime" type="info">
          {{ toLocalDatetimeStr(scriptNode.updateDatetime) }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="description" :span="3">
        {{ scriptNode.description }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped>

</style>

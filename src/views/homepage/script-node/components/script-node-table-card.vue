<script setup lang="ts">
import type {ScriptNode} from "@/types/vortexa-type.ts";
import {onMounted, ref} from "vue";
import {useWindowSizeStore} from "@/stores/windowSizeStore.ts";

defineProps<{
  scriptNode: ScriptNode
}>();

const {addWindowSizeChangeHandler} = useWindowSizeStore();
const descriptionsColumn = ref(3)

const emit = defineEmits(['openBotDetail'])

const openBotConfig = (scriptNodeName, botKey)=>{
  emit('openBotDetail', scriptNodeName, botKey)
}

onMounted(()=>{
  addWindowSizeChangeHandler((w, h)=>{
    console.log(w)
    if (w < 900) descriptionsColumn.value = 1
    else if (w < 1400) descriptionsColumn.value = 2
    else descriptionsColumn.value = 3
  })
})
</script>

<template>
  <div class="script-node-table-card">
    <el-descriptions
      :title="scriptNode.scriptNodeName"
      :column="descriptionsColumn"
      size="small"
      border
      :label-width="120"
    >
      <template #extra>
        <el-button type="primary">Operation</el-button>
      </template>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            id
          </div>
        </template>
        {{scriptNode.id}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Create time
          </div>
        </template>
        {{scriptNode.insertDatetime}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Update time
          </div>
        </template>
        {{scriptNode.updateDatetime}}
      </el-descriptions-item>
      <el-descriptions-item
        label-class-name="cell-item-2"
        v-for="(botKey, index) in scriptNode.managedBotKeyList" :key="botKey"
      >
        <template #label>
          <div class="cell-item">
            Deploy Bot: {{index + 1}}
          </div>
        </template>
        <el-link @click="openBotConfig(scriptNode.scriptNodeName, botKey)">
          {{botKey}}
        </el-link>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped>
.cell-item {
  display: flex;
  align-items: center;
}
:deep(.cell-item-2) {
  background: var(--el-color-warning-light-9) !important;
}

.script-node-table-card{
  padding: 10px 24px;
}
</style>

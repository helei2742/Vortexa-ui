<script setup lang="ts">
import {onMounted, type Ref, ref} from "vue";
import {Plus, CloseBold} from "@element-plus/icons-vue"

const prop = defineProps<{
  keyValues: Record<string, never>
}>()

const editKeyValues: Ref<Array<Array<string>>> = ref([])

const addNewRow = () => {
  editKeyValues.value.push(['', ''])
}

const isValidKeyValue = (keyValue: Array<string>) => {
  return !!keyValue[0];
}

const getKeyValues = () => {
  const keyValueMap = {}
  editKeyValues.value.forEach(kv => {
    if (kv[0] != null) {
      keyValueMap[kv[0]] = kv[1]
    }
  })

  return keyValueMap
}

defineExpose({getKeyValues})

onMounted(()=>{
  if (prop.keyValues) {
    editKeyValues.value = Object.keys(prop.keyValues).map(key => [key, prop.keyValues[key]])
  }
})
</script>

<template>
  <div class="dynamic-row-input-card">
    <div class="card-header">
      <el-button @click="addNewRow" circle type="success" size="small">
        <el-icon>
          <Plus/>
        </el-icon>
      </el-button>
    </div>
    <div class="card-body">
      <div v-if="editKeyValues.length <= 0">
        click plus to add config line
      </div>
      <div v-else v-for="(keyValue, index) in editKeyValues"
           :key="index"
           class="config-line"
           :class="{'success-line': isValidKeyValue(keyValue)}"
      >
        <el-input class="row-input" v-model="keyValue[0]" clearable size="small"/>
        <span class="dash">:</span>
        <el-input class="row-input" v-model="keyValue[1]" clearable size="small"/>
        <el-link size="small"
                 style="color: #000000"
                 @click="editKeyValues.splice(index, 1)"
                 class="delete-btn"
        >
          <el-icon>
            <CloseBold/>
          </el-icon>
        </el-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dynamic-row-input-card {
  display: flex;
  justify-content: space-between;

  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  max-width: 600px;
  margin: 20px auto;

  width: 100%;
}

.row-input {
  width: 35%;
  min-width: 120px;
}

.card-header {
  margin-bottom: 12px;
  margin-right: 10px;
  width: 28px;
}

.card-body {
  flex: 1;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.config-line {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px #fafaf9 solid;
  padding: 3px 5px;
  border-radius: 6px;
  background-color: #f99f8b;
}
.success-line {
  background-color: #aec6f6;
}

.row-input {
  flex: 1;
  min-width: 0;
}

.dash {
  font-weight: bold;
  color: #666;
}

.delete-btn {
  transition: background-color 0.3s ease;
}

.delete-btn:hover {
  background-color: #f56c6c22;
}
</style>

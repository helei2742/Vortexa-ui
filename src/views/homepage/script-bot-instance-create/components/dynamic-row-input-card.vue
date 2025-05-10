<script setup lang="ts">
import {type Ref, ref} from "vue";
import {Plus, CloseBold} from "@element-plus/icons-vue"

const keyValues: Ref<Array<Array<string>>> = ref([])

const addNewRow = () => {
  keyValues.value.push(['', ''])
}
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
      <div v-if="keyValues.length <= 0">
        click plus to add config line
      </div>
      <div v-else v-for="(keyValue, index) in keyValues" :key="index" class="config-line">
        <el-input class="row-input" v-model="keyValue[0]" clearable size="small"/>
        <span class="dash">:</span>
        <el-input class="row-input" v-model="keyValue[1]" clearable size="small"/>
        <el-link  size="small"
                   style="color: #000000"
                   @click="keyValues.splice(index, 1)"
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
}

.row-input {
  width: 35%;
  min-width: 120px;

}

.card-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
  margin-right: 10px;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.config-line {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px rgba(100, 100, 100, 0.3) solid;
  padding: 0 5px;
  border-radius: 6px;
  background-color: #a1a3aa;
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

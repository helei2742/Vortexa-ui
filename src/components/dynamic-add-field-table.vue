<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import {ref} from "vue";

interface Props {
  headers: array<string>,
  idField: string,
}

withDefaults(defineProps<Props>(), {
  headers: ['id', 'email', 'username'],
  idField: 'id'
})

const filterFields = ref([])


</script>

<template>
<div>
  <div class="select-bar-list">
    <el-dropdown trigger="click">
      <el-button>
        <el-icon class="el-icon--left"><arrow-down /></el-icon>Field
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in headers" :key="item">
            <el-checkbox :label="item" disabled />
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-dropdown
      trigger="click"
      v-for="item in headers"
      :key="item"
    >
      <el-button>
        <el-icon class="el-icon--left"><arrow-down /></el-icon>
        {{ item }}
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

</div>
</template>

<style scoped>
.select-bar-list{
  display: flex;
  align-items: flex-start;
  gap: 6px;
}

/deep/ .select-bar-list .el-button {
  background-color: transparent !important;
  color: #000000 !important;
  font-weight: 500;
}

/deep/ .select-bar-list .el-button:hover {
  background-color: #ecebeb !important;
  color: #000000 !important;
  font-weight: 900;
}
/deep/ .select-bar-list .el-button:active {
  background-color: #ecebeb !important;
  color: #000000 !important;
  font-weight: 900;
}
</style>

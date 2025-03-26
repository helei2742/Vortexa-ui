<script setup lang="ts">
import {Calendar, DCaret} from '@element-plus/icons-vue'
</script>

<template>
  <div class="vortexa-banner">
    <div class="avatar-wrapper">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <span style="font-weight: 700">Vortexa</span>
    </div>

    <el-dropdown class="vortexa-schedule" placement="bottom-start">
      <span class="el-dropdown-link">
        <el-icon class="el-icon--left">
          <Calendar/>
        </el-icon>
        Schedule
        <el-icon style="margin-left: auto;"><DCaret /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item>Action 4</el-dropdown-item>
          <el-dropdown-item>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <div>

    </div>

  </div>
</template>

<style scoped>
.vortexa-banner {
  padding: 0 12px;
  font-size: 24px;
  line-height: 40px;
}

.avatar-wrapper {
  display: flex;
  align-items: baseline; /* 垂直居中 */
  margin-bottom: 10px;
}

.vortexa-schedule {
  width: 184px;
  height: 36px;
  padding: 0 12px;
  font-size: 14px;
  font-weight: 500;
  margin-top: 10px;
}
.vortexa-schedule:hover{
  background-color: #ecebeb;
}
.el-dropdown-link{
  display: flex;
  width: 100%;
  line-height: 36px;
  align-items: center;
}
</style>

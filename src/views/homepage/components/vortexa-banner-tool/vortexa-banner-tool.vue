<script setup lang="ts">
import {Calendar, DCaret} from '@element-plus/icons-vue'
import {ref} from 'vue'

const calenderVisible = ref(false)

const today = ref(new Date())


const currentTime = ref(new Date())
setInterval(() => {
  currentTime.value = new Date();
}, 1000);
</script>

<template>
  <div class="vortexa-banner">
    <div class="avatar-wrapper">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <span style="font-weight: 700">Vortexa</span>
    </div>

    <el-divider/>

    <div
      class="vortexa-schedule"
      @click="calenderVisible = true"
    >
      <el-icon class="el-icon--left">
        <Calendar/>
      </el-icon>
      Schedule
      <el-icon style="margin-left: auto;">
        <DCaret/>
      </el-icon>
    </div>

    <div class="datetime-printer">
      <el-date-picker
        v-model="currentTime"
        :editable="false"
        readonly
        :clearable="false"
        type="datetime"
        placeholder="Pick a Date"
        format="YYYY/MM/DD hh:mm:ss"
      />
    </div>

    <el-divider/>
  </div>

  <el-dialog
    v-model="calenderVisible"
    title="Tips"
    width="700px"
  >
    <el-calendar v-model="today"/>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="calenderVisible = false">Cancel</el-button>
        <el-button type="primary" @click="calenderVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
:deep(.el-input__wrapper) {
  border: none !important;
  box-shadow: none !important;
  background-color: transparent !important;
}

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

  display: flex;
  line-height: 36px;
  align-items: center;
}

.vortexa-schedule:hover {
  background-color: #ecebeb;
  cursor: pointer;
}

.el-dropdown-link {

}

.datetime-printer > .el-input__wrapper {
  background-color: transparent;
  border: none;
}
</style>

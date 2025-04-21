<script setup lang="ts">
import {ref} from "vue";

const botKey = ref('')
const botConfig = ref({})
const dialogVisible = ref(false)

const openDialog = (bk:string, bc:object) => {
  botConfig.value = bc
  botKey.value = bk
  dialogVisible.value = true
}

defineExpose({
  openDialog
})
</script>

<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :title="botKey"
      width="45%"
      align-center
    >
      <span>{{ botConfig }}</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>

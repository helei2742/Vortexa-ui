<script setup lang="ts">
defineProps<{
  left: never
  right: never
}>()
</script>

<template>
  <div class="key-value-card">
    <el-text class="key-value-card-left" truncated>
      {{ left }}
    </el-text>
    <el-text class="key-value-card-right" truncated>
      {{ right }}
    </el-text>
  </div>
</template>

<style scoped>
.key-value-card {
  display: flex;
  font-size: 14px;
  max-width: 90%;
}

.key-value-card-left {
  font-weight: 700;
  max-width: 120px;
  padding: 5px 12px;
}

.key-value-card-right {
  flex: 1;
  padding: 5px 8px;
  min-width: 0;
}
</style>

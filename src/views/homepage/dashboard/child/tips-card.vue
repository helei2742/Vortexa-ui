<script setup lang="ts">

import ContentBlock from "@/components/content-block/content-block.vue";
</script>

<template>
  <content-block class="tips-card">
    <el-text class="tips-card-title" size="large" line-clamp="2">
      Self element set width 100pxSelf element set width 100pxSelf
      element set width 100pxSelf element set width 100pxSelf element set width 100pxSelf element
    </el-text>

    <el-text class="tips-card-content" size="large" line-clamp="3">
      Self element set width 100px
    </el-text>

    <div class="tips-buttons">
      <el-button type="primary">Config Bot</el-button>
      <el-button>close tips</el-button>
    </div>
  </content-block>
</template>

<style scoped>
.tips-card {
  position: relative;
  height: 150px;
}

.tips-card-title {
  width: 100%;
  font-weight: 900;
  margin-bottom: 10px;
}

.tips-buttons {
  position: absolute;
  bottom: 20px;
  left: 20px;
}
</style>

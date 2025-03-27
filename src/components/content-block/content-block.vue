<script setup lang="ts">

</script>

<template>
  <div class="content-block">
    <div v-if="$slots.header" class="content-block-header">
      <slot name="header"></slot>
    </div>
    <slot name="default"></slot>
  </div>
</template>

<style scoped>
.content-block{
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #f8f8f8;
  padding: 20px 15px;
  margin-bottom: 8px;
  box-shadow: 0 0 5px 0 rgba(100, 100, 100, 0.1);
}

.content-block-header{
  font-weight: 700;
}
</style>

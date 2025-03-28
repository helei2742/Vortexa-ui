<script setup lang="ts">

import BotRuntimeDisplayCard from "@/views/homepage/script/components/bot-runtime-display-card.vue";
</script>

<template>
  <div class="vortexa-script-view">
    <bot-runtime-display-card class=".vortexa-script-item"/>
    <bot-runtime-display-card class=".vortexa-script-item"/>
    <bot-runtime-display-card class=".vortexa-script-item"/>
    <bot-runtime-display-card class=".vortexa-script-item"/>
  </div>
</template>

<style scoped>
.vortexa-script-view {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.vortexa-script-item {
  flex: 1 1 40%;
  margin-top: 10px;
}
</style>

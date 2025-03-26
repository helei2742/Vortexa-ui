<template>
  <div class="vortexa-app">
    <div style="display: flex;">
      <div v-if="isDesktop" class="sidebar">
        <vortexa-banner/>
        <vortexa-menu :is-horizontal="!isDesktop"/>
      </div>

      <div class="vortexa-main">
        <vortexa-header/>
        <router-view/>
      </div>
    </div>

    <div class="bottom-menu">
      <vortexa-menu v-if="!isDesktop" :is-horizontal="!isDesktop"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, onUnmounted} from 'vue';
import VortexaMenu from "@/components/vortexa-menu/vortexa-menu.vue";
import VortexaHeader from "@/components/vortexa-header/vortexa-header.vue";
import VortexaBanner from "@/components/vortexa-banner-tool/vortexa-banner-tool.vue";

const isDesktop = ref(window.innerWidth > 780);

const updateLayout = () => {
  isDesktop.value = window.innerWidth > 780;
};

onMounted(() => {
  window.addEventListener('resize', updateLayout);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateLayout);
});


</script>

<style>
.vortexa-app {
  min-height: 100vh;
  background-color: #fafaf9;
  max-width: 1340px;
}

.el-container > .sidebar{
  width: 208px;
  padding: 24px 16px;
}
.vortexa-app > .vortexa-main {
  flex: 1;
}

.bottom-menu {
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
}

</style>

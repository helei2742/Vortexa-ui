<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue';
import {useCommonStore} from '@/stores/commonStore.ts'
import VortexaMenu from "@/views/homepage/components/vortexa-menu/vortexa-menu.vue";
import VortexaHeader from "@/views/homepage/components/vortexa-header/vortexa-header.vue";
import VortexaBanner from "@/views/homepage/components/vortexa-banner-tool/vortexa-banner-tool.vue";
import BotDetailDrawer from "@/views/homepage/script-bot/components/bot-detail-drawer.vue";
import {useWindowSizeStore} from '@/stores/windowSizeStore.ts'

const isDesktop = ref(window.innerWidth > 780);

const updateLayout = () => {
  isDesktop.value = window.innerWidth > 780
  updateWindowSize(window.innerWidth, window.innerHeight)
};

const {updateWindowSize} = useWindowSizeStore()

const {currentBotInstance} = useCommonStore()

onMounted(() => {
  window.addEventListener('resize', updateLayout)
});

onUnmounted(() => {
  window.removeEventListener('resize', updateLayout)
});
</script>

<template>
  <div>
    <div class="vortexa-app">
      <div style="display: flex; margin-bottom: 60px">
        <div v-if="isDesktop" class="sidebar">
          <vortexa-banner/>
          <vortexa-menu :is-horizontal="!isDesktop"/>
        </div>

        <div class="vortexa-main">
          <vortexa-header style="margin-bottom: 14px"/>

          <router-view v-slot="{ Component, route }">
            <keep-alive>
              <component v-if="route.meta.keepAlive" :is="Component" :key="route.fullPath"/>
            </keep-alive>
            <component v-if="!route.meta.keepAlive" :is="Component" :key="route.fullPath"/>
          </router-view>
        </div>
      </div>

      <!--    bot详情抽屉-->
      <bot-detail-drawer :bot-instance="currentBotInstance"/>

      <div v-if="!isDesktop" class="bottom-menu">
        <vortexa-menu :is-horizontal="!isDesktop"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vortexa-app {
  min-height: 100vh;
  background-color: #fafaf9;
  max-width: 1980px;
  padding: 20px;
  margin: auto;
}

.vortexa-app > .sidebar {
  width: 208px;
  padding: 24px 16px;
}

.vortexa-main {
  flex: 1;
}

.bottom-menu {
  z-index: 10;
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
}
</style>

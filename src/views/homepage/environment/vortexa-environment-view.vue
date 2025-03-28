<script setup lang="ts">
import VortexaIcon from "@/components/vortexa-icon.vue";
import ProxyManager from "@/views/homepage/environment/components/proxy-manager.vue";
import BrowserEnvManager from "@/views/homepage/environment/components/browser-env-manager.vue";
import {ref} from "vue";

const activeName = ref('Proxy')
</script>

<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane name="Proxy">
        <template #label>
        <span class="tabs-label">
          <vortexa-icon name="proxy" size="14"/>
          <span>Proxy</span>
        </span>
        </template>

        <proxy-manager/>
      </el-tab-pane>

      <el-tab-pane name="Browser Env">
        <template #label>
        <span class="tabs-label">
          <vortexa-icon name="browser" size="14"/>
          <span>Browser Env</span>
        </span>
        </template>

        <browser-env-manager/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>

</style>

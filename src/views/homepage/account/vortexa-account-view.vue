<script setup lang="ts">
import {ref} from "vue";
import VortexaIcon from "@/components/vortexa-icon.vue";
import BaseAccountManager from "@/views/homepage/account/components/base-account-manager.vue";
const activeName = ref('Base')

</script>

<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane name="Base">
        <template #label>
        <span class="tabs-label">
          <vortexa-icon name="email" size="14"/>
          <span>Base</span>
        </span>
        </template>

        <base-account-manager/>
      </el-tab-pane>

      <el-tab-pane label="Twitter" name="Twitter">
        <template #label>
        <span class="tabs-label">
          <vortexa-icon name="twitter" size="14"/>
          <span>Twitter</span>
        </span>
        </template>
        Twitter
      </el-tab-pane>

      <el-tab-pane name="Discord">
        <template #label>
        <span class="tabs-label">
          <vortexa-icon name="discord" size="14"/>
          <span>Discord</span>
        </span>
        </template>
        Discord
      </el-tab-pane>

      <el-tab-pane name="telegram">
        <template #label>
        <span class="tabs-label">
         <vortexa-icon name="telegram" size="14"/>
          <span>Telegram</span>
        </span>
        </template>
        Telegram
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.tabs-label {
  color: #797470;
}
</style>

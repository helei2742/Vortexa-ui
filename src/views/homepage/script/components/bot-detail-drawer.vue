<script setup lang="ts">
import {CircleCloseFilled} from '@element-plus/icons-vue'
import {useCommonStore} from "@/stores/commonStore.ts";
import {useWebsocketStore} from "@/stores/useWebsocket.ts";
import {generateStartLogMessage} from "@/constants/websocket-constants.ts";

const {websocketClient} = useWebsocketStore()
const commonStore = useCommonStore()

const sendStartLogMessage = () => {
  const instance = commonStore.currentBotInstance;
  websocketClient.send(generateStartLogMessage(instance.botName, instance.botKey))
}
</script>

<template>
  <el-drawer v-model="commonStore.botDetailDrawerVisible" :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
      <el-button-group>
        <el-button type="success" @click="sendStartLogMessage">
          <el-icon class="el-icon--left">
            <CircleCloseFilled/>
          </el-icon>
          Start Log
        </el-button>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left">
            <CircleCloseFilled/>
          </el-icon>
          Close
        </el-button>
      </el-button-group>
    </template>
    <p v-for="log in commonStore.botInstanceLogList" :key="log.txId">
      {{ log }}
    </p>
  </el-drawer>
</template>

<style scoped>

</style>

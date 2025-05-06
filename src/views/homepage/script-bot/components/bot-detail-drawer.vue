<script setup lang="ts">
import Codemirror, {createLinkMark, createLogMark, createTitle} from "codemirror-editor-vue3";
import {useCommonStore} from "@/stores/commonStore.ts";
import {useWebsocketStore} from "@/stores/useWebsocket.ts";
import {generateStartLogMessage} from "@/constants/websocket-constants.ts";
import {onMounted, ref, watch,} from "vue";

const {websocketClient} = useWebsocketStore()
const commonStore = useCommonStore()

const prefix = `完整日志下载地址：
${createLinkMark({
  href: "/logDownload",
  download: "",
  target: "_blank",
})}
${createTitle("Script Node日志")}`

const logContent = ref(prefix)

// 日志组件设置
const cmOptions = {
  mode: "log",
  theme: "default",
}

const sendStartLogMessage = () => {
  const instance = commonStore.currentBotInstance;
  logContent.value = prefix
  websocketClient.send(generateStartLogMessage(instance.botName, instance.botKey))
}

watch(
  () => commonStore.currentBotInstance,
  () => {
    logContent.value = prefix
  }
)

onMounted(() => {
  logContent.value = prefix

  commonStore.botInstanceLogAppendHandler = (message) => {
    const logObj = JSON.parse(message.message)
    console.log(logObj)
    if (logObj != null) {
      const print = `[${logObj.datetime}][${logObj.type} - ${logObj.content}]`
      logContent.value += `${createLogMark(print, logObj.type.toLowerCase())}\n`
    }
  }
})
</script>

<template>
  <el-drawer
    v-model="commonStore.botDetailDrawerVisible"
    :close-on-click-modal="false"
    size="70%"
  >
    <template #header="{ titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">{{ commonStore.currentBotInstance.botKey }}</h4>
      <el-button-group>
        <el-button type="info" @click="sendStartLogMessage">
          Load Log
        </el-button>
      </el-button-group>
    </template>

    <Codemirror class="log-content" v-model:value="logContent" :options="cmOptions" border/>

  </el-drawer>
</template>

<style>
.c-editor--log__info {
  color: #346fff !important;
}
</style>

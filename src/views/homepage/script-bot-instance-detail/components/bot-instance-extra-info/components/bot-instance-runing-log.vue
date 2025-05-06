<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useWebsocketStore} from "@/stores/useWebsocket.ts";
import {generateStartLogMessage, SCRIPT_NODE_LOG} from "@/constants/websocket-constants.ts";
import VortexaTerminal from "@/components/terminal/vortexa-terminal.vue";
import VortexaIcon from "@/components/vortexa-icon.vue";
import ContentBlock from "@/components/content-block/content-block.vue";
import {FullScreen} from "@element-plus/icons-vue";

const props = defineProps<{
  scriptNodeName: string
  botName: string
  botKey: string
}>()

const {websocketClient} = useWebsocketStore()

const botTerminal = ref()

// 发送命令开启日志推送
const sendStartLogMessage = () => {
  botTerminal.value.reset()
  websocketClient.send(generateStartLogMessage(props.scriptNodeName, props.botName, props.botKey))
}

onMounted(() => {
  // 添加消息处理
  websocketClient.addMessageHandler(SCRIPT_NODE_LOG, message => {
    botTerminal.value.terminal.writeln(message.message.trim())
  })
})
</script>

<template>
  <content-block>
    <vortexa-terminal
      ref="botTerminal"
      @start-handle="sendStartLogMessage"
      start-print-str="please click start button to load runtime log"
    />
  </content-block>
</template>

<style scoped>

</style>

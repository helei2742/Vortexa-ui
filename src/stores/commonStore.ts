import {type Ref, ref} from 'vue'
import {defineStore} from 'pinia'
import {BotInstanceInfo} from "@/types/vortexa-type.ts";
import {useWebsocketStore} from "@/stores/useWebsocket.ts";
import {SCRIPT_NODE_LOG} from "@/constants/websocket-constants.ts";
import type {WebSocketMessage} from "@/types/vortexa-type-common.ts";
import {WS_CONNECT_URL} from "@/config/vortexa-config.ts";

export const useCommonStore = defineStore('common', () => {
// 当前显示的的bot实例
  const currentBotInstance: Ref<BotInstanceInfo> = ref<BotInstanceInfo>(new BotInstanceInfo({}))

  // 更新当前bot实例
  const updateCurrentBotInstance = (botInstance: BotInstanceInfo) => {
    console.log('update current bot instance')
    botInstanceLogList.value = []
    currentBotInstance.value = botInstance
  }


  // 存放日志
  const botInstanceLogList = ref<Array<WebSocketMessage>>([])

  const botInstanceLogAppendHandler = ref()

  const {websocketClient} = useWebsocketStore()

  // 给websocket添加回调
  websocketClient.addMessageHandler(SCRIPT_NODE_LOG, message => {
    botInstanceLogList.value.push(message)
    if (botInstanceLogAppendHandler.value != null) {
      botInstanceLogAppendHandler.value(message)
    }
  })

  websocketClient.connect(WS_CONNECT_URL)

  return {
    currentBotInstance,
    updateCurrentBotInstance,
    botInstanceLogList,
    botInstanceLogAppendHandler
  }
})

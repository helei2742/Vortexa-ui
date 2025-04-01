import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {BotInstanceInfo} from "@/types/vortexa-type.ts";
import {useWebsocketStore} from "@/stores/useWebsocket.ts";
import {SCRIPT_NODE_LOG} from "@/constants/websocket-constants.ts";
import type {WebSocketMessage} from "@/types/vortexa-type-common.ts";

export const useCommonStore = defineStore('common', () => {
  // 当前显示的的bot实例
  const currentBotInstance:BotInstanceInfo = ref<BotInstanceInfo>(0)

  // 更新当前bot实例
  const updateCurrentBotInstance = (botInstance:BotInstanceInfo, visible: boolean) => {
    console.log('update current bot instance')
    botInstanceLogList.value = []
    currentBotInstance.value = botInstance
    botDetailDrawerVisible.value = visible
  }

  // botDetail 是否能打开
  const botDetailDrawerVisible = ref(false)

  // 存放日志
  const botInstanceLogList = ref<Array<WebSocketMessage>>([])

  const {websocketClient} = useWebsocketStore()
  // 给websocket添加回调
  websocketClient.addMessageHandler(SCRIPT_NODE_LOG, message => {
    botInstanceLogList.value.push(message)
  })

  return { currentBotInstance, updateCurrentBotInstance, botDetailDrawerVisible, botInstanceLogList}
})

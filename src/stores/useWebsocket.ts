import {defineStore} from 'pinia'
import {WebSocketClient} from "@/types/WebSocketClient.ts";
import {WS_CONNECT_URL} from "@/config/vortexa-config.ts";

export const useWebsocketStore
  = defineStore('websocket', () => {

  const websocketClient: WebSocketClient = new WebSocketClient(WS_CONNECT_URL)

  return {websocketClient}
})

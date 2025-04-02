import ReconnectingWebSocket from "reconnecting-websocket";
import {WebSocketMessage} from "@/types/vortexa-type-common.ts";
import * as Events from "reconnecting-websocket/events.ts";

export class WebSocketClient {
  url: string
  ws: ReconnectingWebSocket | undefined
  messageHandlers: Map<number, (message) => void>

  constructor() {
    this.ws = undefined
    this.messageHandlers = new Map<number, (message) => void>();
  }

  // 连接 WebSocket
  connect(url: string): void {
    if (this.ws) this.ws.close();
    this.url = url

    this.ws = new ReconnectingWebSocket(url, undefined, {
      debug: true
    });

    this.ws.onopen = () => {
      console.log("✅ WebSocket 连接成功", this.messageHandlers)
      this.onOpen()
    }
    this.ws.onmessage = (message) => {
      this.handleMessage(message, this.messageHandlers)
    }
    this.ws.onerror = () => {
      console.error("❌ WebSocket 错误:", event)
      this.onError()
    }
    this.ws.onclose = () => {
      console.log("🔌 WebSocket 已断开");
      this.onClose()
    }
  }

  // 处理接收消息
  private handleMessage(event: MessageEvent, messageHandlers: Map<number, (message) => void>): void {
    if (event.data) {
      const data = event.data
      const message: WebSocketMessage = new WebSocketMessage(JSON.parse(data))
      const code = message.code;
      console.log('ws-message', message)
      if (code) {
        const handler: (message) => void = messageHandlers.get(code)
        if (handler) {
          handler(message)
        }
      }
    }
  }

  // 注册消息处理函数
  addMessageHandler(code: number, handler: (message) => void): void {
    console.log('add message handler for ' + code)
    this.messageHandlers.set(code, handler)
  }

  // 去除消息处理函数
  removeMessageHandler(code: number): void {
    this.messageHandlers.delete(code)
  }

  // 发送消息
  send(message: WebSocketMessage): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log('send', message)
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn("🚫 WebSocket 未连接");
    }
  }

  onOpen(): void {

  }

  onError(event: Events.ErrorEvent): void {

  }

  onClose(): void {

  }
}


// src/utils/WebSocketClient.js
import ReconnectingWebSocket from 'reconnecting-websocket';
import {
  decodeRemotingCommand,
  encodeRemotingCommand,
  RemotingCommand
} from "@/types/remoting_command_pb.ts";
import type {WebsocketMessageHandler} from "@/types/vortexa-type-common.ts";


export class WebSocketClient {
  url: string
  ws: ReconnectingWebSocket
  messageHandlers: WebsocketMessageHandler[]

  constructor(url) {
    this.url = url;
    this.ws = null;
    this.messageHandlers = [];
  }

  serialize(message: RemotingCommand) {
    console.log(message)
    return encodeRemotingCommand(message)
  }

  deserialize = (data: Uint8Array): RemotingCommand => {
    return decodeRemotingCommand(data)
  }

  // 连接 WebSocket
  connect() {
    if (this.ws) this.ws.close();

    this.ws = new ReconnectingWebSocket(this.url, null, {
      debug: true
    });

    this.ws.onopen = () => console.log("✅ WebSocket 连接成功");
    this.ws.onmessage = (event) => this.handleMessage(event);
    this.ws.onerror = (error) => console.error("❌ WebSocket 错误:", error);
    this.ws.onclose = () => console.log("🔌 WebSocket 已断开");
  }

  // 处理接收消息
  handleMessage(event) {
    const command: RemotingCommand = this.deserialize(event.data)
    this.messageHandlers.forEach(handler => handler(command));
  }

  // 注册消息处理函数
  onMessage(handler:WebsocketMessageHandler) {
    this.messageHandlers.push(handler);
  }

  // 发送消息
  send(message: RemotingCommand) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(this.serialize(message));
    } else {
      console.warn("🚫 WebSocket 未连接");
    }
  }

  // 关闭 WebSocket
  close() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

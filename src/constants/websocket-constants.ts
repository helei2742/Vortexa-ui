import {WebSocketMessage} from "@/types/vortexa-type-common.ts";
import { v4 as uuidV4 } from 'uuid';

// 开始推送日志消息
export const START_PUSH_SCRIPT_NODE_LOG: number = 6001
export const STOP_UP_BOT_LOG: number = 6002

// 日志消息
export const SCRIPT_NODE_LOG: number = 6666


/**
 * 生成开始日志的消息
 *
 * @param botName botName
 * @param botKey  botKey
 */
export function generateStartLogMessage(botName: string, botKey: string): WebSocketMessage {
  return new WebSocketMessage({
    txId: uuidV4(),
    code: START_PUSH_SCRIPT_NODE_LOG,
    params: {
      'target_group': 'default',
      'target_bot_name': botName,
      'target_bot_key': botKey
    }
  })
}
/**
 * 生成关闭日志的消息
 *
 * @param botName botName
 * @param botKey  botKey
 */
export function generateStopLogMessage(botName: string, botKey: string): WebSocketMessage {
  return new WebSocketMessage({
    txId: uuidV4(),
    code: STOP_UP_BOT_LOG,
    params: {
      'target_group': 'default',
      'target_bot_name': botName,
      'target_bot_key': botKey
    }
  })
}

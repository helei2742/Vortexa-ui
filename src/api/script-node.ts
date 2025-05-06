import request from '@/util/request.ts'
import {ScriptNode} from "@/types/vortexa-type.ts";
import type {Result} from "@/types/vortexa-type-common.ts";

/**
 * 查询所有已注册的script node
 * @returns {*}
 */
export function queryAllRegisteredScriptNodeNetwork(): Promise<Result<Array<ScriptNode>>> {
  return request({
    url: '/script-node/all',
    method: 'post'
  })
}


/**
 * 开启节点中的bot
 * @param data
 */
export function startScriptNodeBotInstanceNetwork(data: {
  scriptNodeName,
  botKey
}): Promise<Result<never>> {
  return request({
    url: '/script-node/start_bot',
    method: 'post',
    data: data
  })
}

/**
 * 关闭节点中的bot
 * @param data
 */
export function stopScriptNodeBotInstanceNetwork(data: {
  scriptNodeName,
  botKey
}): Promise<Result<never>> {
  return request({
    url: '/script-node/stop_bot',
    method: 'post',
    data: data
  })
}

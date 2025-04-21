import request from '@/util/request.ts'
import type {RegisteredScriptNode} from "@/types/vortexa-type.ts";
import type {Result} from "@/types/vortexa-type-common.ts";

/**
 * 查询所有已注册的script node
 * @returns {*}
 */
export function queryAllRegisteredScriptNode(): Promise<Result<Array<RegisteredScriptNode>>> {
  return request({
    url: '/script-node/all',
    method: 'post'
  })
}

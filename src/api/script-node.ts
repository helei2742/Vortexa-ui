import request from '@/util/request.ts'
import type {PageResult} from "@/types/vortexa-type-common.ts";
import type {RegisteredScriptNode} from "@/types/vortexa-type.ts";

/**
 * 查询所有已注册的script node
 * @returns {*}
 */
export function queryAllRegisteredScriptNode(): Promise<PageResult<RegisteredScriptNode>> {
  return request({
    url: '/scriptNode/all',
    method: 'post'
  })
}

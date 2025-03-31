import request from '@/util/request.ts'
import type {PageQuery} from "@/types/vortexa-type-common.ts";

/**
 * 分页查询bot
 * @param pageQuery pageQuery
 * @returns {*}
 */
export function pageQueryBotInfoNetwork(pageQuery: PageQuery) {
  return request({
    url: '/bot/pageQuery',
    method: 'post',
    data: pageQuery
  })
}

/**
 * 创建bot
 * @param botId
 * @param botKey
 * @param accountIds
 */
export function createBot({botId, botKey, accountIds}) {
  return request({
    url: '/bot/create',
    method: 'post',
    data: {
      botId,
      botKey,
      accountIds
    }
  })
}

/**
 * 分页查询bot实例
 * @param pageQuery
 */
export function pageQueryBotInstanceNetwork(pageQuery: PageQuery) {
  return request({
    url: '/botInstance/pageQuery',
    method: 'post',
    data: pageQuery
  })
}

/**
 * 开始执行脚本的某个job
 * @param botName bot名称
 * @param botKey  实例名称
 * @param jobName 任务名
 */
export function startScriptJobNetwork({botName, botKey, jobName}) {
  console.log(botKey, botName, jobName)
  return request({
    url: '/botInstance/startJob',
    method: 'post',
    data: {
      botName,
      botKey,
      jobName
    }
  })
}

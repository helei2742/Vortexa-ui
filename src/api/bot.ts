import request from '@/util/request.ts'
import {type PageQuery, PageResult, type Result} from "@/types/vortexa-type-common.ts";
import {
  AutoBotJobParams,
  BotInfo,
  BotInstanceAccount,
  BotInstanceDetail
} from "@/types/vortexa-type.ts";

/**
 * 分页查询bot
 * @param pageQuery pageQuery
 * @returns {*}
 */
export function pageQueryBotInfoNetwork(pageQuery: PageQuery)
  : Promise<Result<PageResult<BotInfo>>> {
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
 * 查询scriptNodeName下botKey的信息
 * @param scriptNodeName
 * @param botKey
 */
export function queryBotInstanceNetwork(scriptNodeName, botKey): Promise<Result<BotInstanceDetail>> {
  return request({
    url: '/botInstance/detail',
    method: 'post',
    data: {
      scriptNodeName,
      botKey
    }
  })
}

/**
 * 开始执行脚本的某个job
 */
export function startScriptJobNetwork(data: {
  scriptNodeName,
  botKey,
  jobName
}): Promise<Result<never>> {
  return request({
    url: '/botInstance/startJob',
    method: 'post',
    data: data
  })
}

/**
 * 暂停job
 * @param data
 */
export function pauseScriptJobNetwork(data: {
  scriptNodeName, botKey, jobName
}): Promise<Result<never>> {
  return request({
    url: '/botInstance/pauseJob',
    method: 'post',
    data: data
  })
}

/**
 * 删除job
 * @param data
 */
export function deleteScriptJobNetwork(data: {
  scriptNodeName, botKey, jobName
}): Promise<Result<never>> {
  return request({
    url: '/botInstance/deleteJob',
    method: 'post',
    data: data
  })
}

/**
 * 保存bot 的jobParam
 * @param data
 */
export function updateBotJobParamNetwork(data: {
  scriptNodeName,
  botKey,
  botJobParam: AutoBotJobParams
}): Promise<Result<never>> {
  return request({
    url: '/botInstance/updateJobParam',
    method: 'post',
    data: data
  })
}

/**
 * 保存bot的启动参数
 * @param data
 */
export function saveBotLaunchConfigNetwork(data: {
  scriptNodeName,
  botKey,
  botLaunchConfig
}): Promise<Result<never>> {
  return request({
    url: '/botInstance/saveBotLaunchConfig',
    method: 'post',
    data: data
  })
}

/**
 * 分页查询bot instance 账号
 * @param scriptNodeName
 * @param botKey
 * @param pageQuery
 */
export function pageQueryBotInstanceAccountNetwork(
  scriptNodeName: string, botKey: string, pageQuery: PageQuery
): Promise<Result<PageResult<BotInstanceAccount>>> {
  return request({
    url: '/botInstance/pageQueryAccount',
    method: 'post',
    data: {
      scriptNodeName: scriptNodeName,
      botKey: botKey,
      page: pageQuery.page,
      limit: pageQuery.limit,
      filterMap: pageQuery.filterMap
    }
  })
}

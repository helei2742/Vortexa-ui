import request from '@/util/request.ts'
import {type PageQuery, PageResult, Result} from "@/types/vortexa-type-common.ts";
import type {BotInfo} from "@/types/vortexa-type.ts";


/**
 * 分页查询bot
 * @param pageQuery pageQuery
 * @returns {*}
 */
export function pageQueryBotInfoNetwork(pageQuery: PageQuery)
  : Promise<Result<PageResult<BotInfo>>> {
  return request({
    url: '/botInfo/pageQuery',
    method: 'post',
    data: pageQuery
  })
}

/**
 * 根据botName查找bot
 * @param botName
 */
export function queryBotInfoByNameNetwork(botName: string): Promise<Result<BotInfo>> {
  return request({
    url: '/botInfo/queryByName',
    method: 'post',
    data: {
      name: botName
    }
  })
}

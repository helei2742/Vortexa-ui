import request from '@/util/request.ts'
import {PageQuery, UploadEntry} from "@/types/vortexa-type-common.ts";

/**
 * 上传Discord
 * @param uploadEntry uploadEntry
 * @returns {*}
 */
export function uploadDiscordListNetwork(uploadEntry: UploadEntry) {
  return request({
    url: '/discord/batchAdd',
    method: 'post',
    data: uploadEntry
  })
}

/**
 * 分页查询Discord
 * @param pageQuery pageQuery
 * @returns {*}
 */
export function pageQueryDiscordNetwork(pageQuery: PageQuery) {
  return request({
    url: '/discord/pageQuery',
    method: 'post',
    data: pageQuery
  })
}

/**
 * 删除Discord，根据id
 * @param ids
 * @returns {*}
 */
export function deleteDiscordNetwork(ids) {
  return request({
    url: '/discord/delete',
    method: 'post',
    data: ids
  })
}

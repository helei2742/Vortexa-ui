import request from '@/util/request.ts'
import {PageQuery, UploadEntry} from "@/types/vortexa-type-common.ts";

/**
 * 上传浏览器环境
 * @param uploadEntry uploadEntry
 * @returns {*}
 */
export function uploadBrowserEnvListNetwork(uploadEntry: UploadEntry) {
  return request({
    url: '/browserEnv/batchAdd',
    method: 'post',
    data: uploadEntry
  })
}
/**
 * 分页查询浏览器环境
 * @param pageQuery pageQuery
 * @returns {*}
 */
export function pageQueryBrowserEnvNetwork(pageQuery: PageQuery) {
  return request({
    url: '/browserEnv/pageQuery',
    method: 'post',
    data: pageQuery
  })
}

/**
 * 删除BrowserEnv，根据id
 * @param ids
 * @returns {*}
 */
export function deleteBrowserEnvNetwork(ids) {
  return request({
    url: '/browserEnv/delete',
    method: 'post',
    data: ids
  })
}

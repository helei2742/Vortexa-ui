import request from '@/util/request.ts'
import {PageQuery, UploadEntry} from "@/types/vortexa-type-common.ts";

/**
 * 上传代理
 * @param uploadEntry uploadEntry
 * @returns {*}
 */
export function uploadProxyInfoListNetwork(uploadEntry: UploadEntry) {
  return request({
    url: '/proxyInfo/batchAdd',
    method: 'post',
    data: uploadEntry
  })
}

/**
 * 分页查询代理
 * @param pageQuery pageQuery
 * @returns {*}
 */
export function pageQueryProxyInfoNetwork(pageQuery: PageQuery) {
  return request({
    url: '/proxyInfo/pageQuery',
    method: 'post',
    data: pageQuery
  })
}

/**
 * 删除账户，根据id
 * @param ids
 * @returns {*}
 */
export function deleteProxyInfoNetwork(ids) {
  return request({
    url: '/proxyInfo/delete',
    method: 'post',
    data:  ids
  })
}

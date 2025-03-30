import request from '@/util/request.ts'
import {PageQuery, UploadEntry} from "@/types/vortexa-type-common.ts";

/**
 * 上传账户基本信息
 * @param uploadEntry uploadEntry
 * @returns {*}
 */
export function uploadAccountBaseInfoListNetwork(uploadEntry: UploadEntry) {
  return request({
    url: '/accountBaseInfo/batchAdd',
    method: 'post',
    data: uploadEntry
  })
}

/**
 * 分页查询账户基本信息
 * @param pageQuery pageQuery
 * @returns {*}
 */
export function pageQueryAccountBaseInfoNetwork(pageQuery: PageQuery) {
  return request({
    url: '/accountBaseInfo/pageQuery',
    method: 'post',
    data: pageQuery
  })
}

/**
 * 获取AccountBaseInfo 根据type分类的信息
 */
export function queryAccountBaseInfoTypedInfo() {
  return request({
    url: '/accountBaseInfo/typedInfo',
    method: 'get'
  })
}

/**
 * 删除账户，根据id
 * @param ids
 * @returns {*}
 */
export function deleteAccountBaseInfoNetwork(ids: Array<number>) {
  return request({
    url: '/accountBaseInfo/delete',
    method: 'post',
    data: ids
  })
}

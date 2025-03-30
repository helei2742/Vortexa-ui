import request from '@/util/request.ts'
import type {UploadEntry} from "@/types/vortexa-type-common.ts";
import {PageQuery} from "@/types/vortexa-type-common.ts";

/**
 * 分页查询twitter
 * @param pageQuery pageQuery
 * @returns {*}
 */
export function pageQueryTwitterNetwork(pageQuery: PageQuery) {
  return request({
    url: '/twitter/pageQuery',
    method: 'post',
    data: pageQuery
  })
}

/**
 * 上传twitter
 * @param uploadEntry uploadEntry
 * @returns {*}
 */
export function insertOrUpdateTwitterListNetwork(uploadEntry: UploadEntry) {
  return request({
    url: '/twitter/batchAdd',
    method: 'post',
    data: uploadEntry
  })
}

/**
 * 删除Twitter，根据id
 * @param ids
 * @returns {*}
 */
export function deleteTwitterNetwork(ids) {
  return request({
    url: '/twitter/delete',
    method: 'post',
    data: ids
  })
}

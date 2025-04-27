import request from '@/util/request.ts'
import type {UploadEntry} from "@/types/vortexa-type-common.ts";
import {PageQuery} from "@/types/vortexa-type-common.ts";

/**
 * 分页查询钱包
 * @param pageQuery pageQuery
 * @returns {*}
 */
export function pageQueryWalletNetwork(pageQuery: PageQuery) {
  return request({
    url: '/web3/pageQuery',
    method: 'post',
    data: pageQuery
  })
}

/**
 * 上传钱包
 * @param uploadEntry uploadEntry
 * @returns {*}
 */
export function insertOrUpdateWalletListNetwork(uploadEntry: UploadEntry) {
  return request({
    url: '/web3/batchAdd',
    method: 'post',
    data: uploadEntry
  })
}

/**
 * 删除钱包，根据id
 * @param ids
 * @returns {*}
 */
export function deleteWalletNetwork(ids) {
  return request({
    url: '/web3/delete',
    method: 'post',
    data: ids
  })
}

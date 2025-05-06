import {API_DEFAULT_PAGE, API_DEFAULT_PAGE_SIZE} from "@/config/vortexa-config.ts";

/**
 * 上传实体
 */
export class UploadEntry {
  rawLines: Array<Map<string, object>>

  constructor(rawLines: Array<Map<string, object>>) {
    this.rawLines = rawLines
  }
}

/**
 * Http 响应实体
 */
export class Result<T> {
  success: boolean
  errorMsg: string
  data: T

  constructor({success, errorMsg, data}: { success: boolean, errorMsg: string, data: T }) {
    this.success = success
    this.errorMsg = errorMsg
    this.data = data
  }
}

export class PageQuery {
  page: number = API_DEFAULT_PAGE
  limit: number = API_DEFAULT_PAGE_SIZE
  filterMap?: Map<string, object>

  constructor({page, limit, filterMap}: {
    page?: number,
    limit?: number,
    filterMap?: Map<string, object>
  }) {
    this.page = page == undefined ? API_DEFAULT_PAGE : page
    this.limit = limit == undefined ? API_DEFAULT_PAGE_SIZE : limit
    this.filterMap = filterMap
  }
}

/**
 * 分页响应实体
 */
export class PageResult<T> {
  total: number;
  list: Array<T>;
  pages: number;
  pageNum: number;
  pageSize: number;

  constructor({total, pages, pageNum, pageSize, list}: {
    total: number,
    pages: number,
    pageNum: number,
    pageSize: number,
    list: Array<T>
  }) {
    this.total = total
    this.pages = pages
    this.pageNum = pageNum
    this.pageSize = pageSize
    this.list = list
  }
}

/**
 * websocket 发送的消息
 */
export class WebSocketMessage {
  txId: string
  code: number
  success: boolean
  params: object
  message: string
  errorMsg: string

  constructor({txId, code, success, params, message, errorMsg}: {
    txId: string
    code: number,
    success: boolean,
    params: string
    message: string
    errorMsg: string
  }) {
    this.txId = txId
    this.code = code
    this.success = success
    this.params = params
    this.message = message
    this.errorMsg = errorMsg
  }
}


export class PageTabInfo {
  path: string
  id: string
  payload: object
  constructor({path, id, payload}: {
    path: string
    id: string,
    payload: object,
  }) {
    this.path = path
    this.id = id
    this.payload = payload
  }
}

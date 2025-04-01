export enum BotInstanceStatus {
  ALL = '',
  RUNNING = 'RUNNING',
  STOPPED = 'STOPPED',
  UN_USABLE = 'UN_USABLE'
}

// ws链接地址
export const WS_CONNECT_URL:string = 'ws://localhost:10110/websocket/test'
// api链接地址
export const API_BASE_URL: string = 'http://localhost:10110'
// api超时时间
export const API_TIME_OUT: number = 5000

// 默认分页参数
export const API_DEFAULT_PAGE: number = 1
export const API_DEFAULT_PAGE_SIZE: number = 20
export const PAGINATION_PAGE_SIZES: number[] = [20, 50, 100, 200, 400];


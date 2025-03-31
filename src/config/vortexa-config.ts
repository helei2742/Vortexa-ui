export enum BotInstanceStatus {
  ALL = '',
  RUNNING = 'RUNNING',
  STOPPED = 'STOPPED',
  UN_USABLE = 'UN_USABLE'
}

export const WS_CONNECT_URL:string = 'ws://localhost:18848'
export const API_BASE_URL: string = 'http://localhost:10110'
export const API_TIME_OUT: number = 5000

export const API_DEFAULT_PAGE: number = 1
export const API_DEFAULT_PAGE_SIZE: number = 20

export const PAGINATION_PAGE_SIZES: number[] = [20, 50, 100, 200, 400];

export enum BotInstanceStatus {
  ALL=-100001,
  RUNNING=1,
  STOPPED=0
}


export const API_BASE_URL:string = 'http://localhost:10110'
export const API_TIME_OUT:number = 5000

export const API_DEFAULT_PAGE:number = 1
export const API_DEFAULT_PAGE_SIZE:number = 20

export const PAGINATION_PAGE_SIZES:number[] = [20, 50, 100, 200, 400];

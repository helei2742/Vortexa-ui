// src/utils/request.ts
import axios from 'axios'
import {Result} from "@/types/vortexa-type-common.ts";
import {API_BASE_URL, API_TIME_OUT} from "@/config/vortexa-config.ts";
import {ElMessage} from "element-plus";

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIME_OUT,
  transformResponse: [(data) => {
    const parsedData = JSON.parse(data)
    return new Result(parsedData) // 转换为类实例
  }]
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    console.log("请求拦截", config)
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    const data:Result<never> = response.data
    if (!data.success) {
      ElMessage({
        message: 'Request error, ' + data.errorMsg,
        type: 'error',
      })
      return Promise.reject(new Error(data.errorMsg))
    }
    return data
  },
  error => {
    ElMessage({
      message: 'Network error, ' + error.code,
      type: 'error',
    })
    return Promise.reject(error)
  }
)

export default instance

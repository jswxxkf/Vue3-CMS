import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HyRequestInterceptors, HyRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

const DEFAULT_LOADING = true

class HyRequest {
  instance: AxiosInstance
  interceptors?: HyRequestInterceptors
  showLoading?: boolean
  loading?: ILoadingInstance
  constructor(config: HyRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息 (拓展AxiosRequestConfig接口的字段)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    // 使用拦截器
    // 1. 从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    // 2. 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据......',
            background: 'rgba(0, 0, 0, 0.15)',
          })
        }
        return config
      },
      (err) => err
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 将Loading遮罩层移除
        this.loading?.close()
        const data = res.data
        if (data.returnCode && data.returnCode === '-1001') {
          console.log('请求失败，错误信息')
        } else {
          return data
        }
      },
      (err) => {
        this.loading?.close()
        // 例子：根据不同的httpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404 page not found')
        }
        return err
      }
    )
  }
  request<T>(config: HyRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1. 单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2. 判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 置this.showLoading为默认值true，这样不会影响下一次请求
          this.showLoading = DEFAULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }
  get<T>(config: HyRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
  post<T>(config: HyRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T>(config: HyRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T>(config: HyRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default HyRequest

// service同一出口
import HyRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const hyRequest = new HyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch(error) {
      console.log(error)
      return error
    },
    responseInterceptor(res) {
      return res
    },
    responseInterceptorCatch(error) {
      console.log(error)
      return error
    },
  },
})

export default hyRequest

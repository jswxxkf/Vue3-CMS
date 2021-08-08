import { createApp } from 'vue'
import rootApp from './App.vue'
import router from './router'
import store from './store'
import { registerApp } from './global'
import hyRequest from './service'
import 'normalize.css'
import './assets/css/index.less'

const app = createApp(rootApp)

registerApp(app)
app.use(router)
app.use(store)
app.mount('#app')

console.log(process.env.VUE_APP_BASE_URL)
console.log(process.env.VUE_APP_BASE_NAME)

// hyRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor(config) {
//       console.log('单独请求的config')
//       return config
//     },
//     responseInterceptor(res) {
//       console.log('单独响应的response')
//       return res
//     },
//   },
// })

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

hyRequest
  .get<DataType>({
    url: '/home/multidata',
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  })

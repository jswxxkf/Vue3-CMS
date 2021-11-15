import { App } from 'vue'
import { formatUtcString } from '@/utils/dateFormat'

// 给全局添加$filters属性，做一些格式化操作
export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value)
    },
  }
}

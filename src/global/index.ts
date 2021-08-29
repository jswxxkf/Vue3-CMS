import { App } from 'vue'
import registerElement from './registerElement'
import registerProperties from './registerProperties'

export function registerApp(app: App): void {
  app.use(registerElement)
  app.use(registerProperties)
}

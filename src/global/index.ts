import 'element-plus/lib/theme-chalk/base.css'

import {
  ElAlert,
  ElAside,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
} from 'element-plus'

const components = [
  ElAlert,
  ElAside,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
]

export function registerApp(app: any): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}

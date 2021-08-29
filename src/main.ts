import { createApp } from 'vue'
import rootApp from './App.vue'
import router from './router'
import store from './store'
import { registerApp } from './global'
import 'normalize.css'
import './assets/css/index.less'
import { setupStore } from './store'

const app = createApp(rootApp)

app.use(registerApp)
app.use(store)
setupStore()
app.use(router)

app.mount('#app')

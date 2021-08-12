import { createStore } from 'vuex'
import { IRootState } from './type'
import login from './login/login'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'xkf',
      age: 25,
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login,
  },
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store

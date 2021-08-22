import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState } from './type'
import login from './login/login'
import { IStoreType } from './type'

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

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store

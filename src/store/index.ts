import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState } from './type'
import { IStoreType } from './type'
// sub modules
import login from './login/login'
import system from './main/system/system'
import dashboard from './analysis/dashboard'

import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'xkf',
      age: 25,
      entireDepartment: [],
      entireRole: [],
      entireMenu: [],
    }
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    },
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 请求部门和角色数据
      const deptResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000,
      })
      const { list: deptList } = deptResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000,
      })
      const { list: roleList } = roleResult.data
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data
      // 保存数据
      commit('changeEntireDepartment', deptList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    },
  },
  modules: {
    login,
    system,
    dashboard,
  },
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store

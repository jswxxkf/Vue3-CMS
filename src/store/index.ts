import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState } from './type'
import { IStoreType } from './type'
// sub modules
import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'

import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootState>({
  // 对应redux中的initialState
  state() {
    return {
      name: 'xkf',
      age: 25,
      entireDepartment: [],
      entireRole: [],
      entireMenu: [],
    }
  },
  // 对应redux提供的useSelector(state=>({}))
  // 或者是connect高阶组件结合mapStateToProps
  getters: {},
  // 对应redux中的reducers[pure functions]
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
  // 对应redux中的中间件(redux-saga生成器函数或redux-thunk派发action函数)
  actions: {
    async getInitialDataAction({ commit }) {
      // 请求全部部门、角色、菜单数据
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
  // 对应redux的子reducer，需要通过combineReducers来合并多个子reducer
  modules: {
    login,
    system,
    dashboard,
  },
})

// main.ts中调用，作用是一开始便根据localStorage中已有的数据来做初始化工作
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('getInitialDataAction')
}

// 对外暴露自己的useStore()，目的是能够点出module类型提示，使得代码更加规范
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store

import type { Module } from 'vuex'
import type { IRootState } from '../type'
import type { ILoginState } from './type'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId,
} from '@/service/login/login'
import localCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/mapMenus'
import router from '@/router'
import type { IAccount } from '@/service/login/type'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: [],
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // 将用户菜单信息映射到路由，即动态地配置路由信息，
      // 用户只能跳转到自己权限对应的路由路径，否则404
      const routes = mapMenusToRoutes(userMenus)
      // 将各route作为main的子路由进行追加
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    },
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1. 实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      // 1.1 存储token
      commit('changeToken', token)
      localCache.setCache('token', token)
      // 1.2 发送初始化的请求 (请求全部部门、角色、菜单等数据)
      dispatch('getInitialDataAction', null, { root: true })
      // 2. 根据id，请求用户信息并存储到store和本地
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)
      // 3. 请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      // 3.1 根据用户菜单，动态生成路由配置
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)
      // 4. 跳转首页
      router.push('/main')
    },
    // main.ts中调用，作用是一开始便根据localStorage中已有的数据来做初始化工作
    // 配合beforeEach全局导航守卫，若已登录，则从loginPage直接跳转至mainPage
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 发送初始化的请求 (请求全部部门、角色、菜单等数据)
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    },
  },
}

export default loginModule

import { Module } from 'vuex'
import { IRootState } from '../type'
import { ILoginState } from './type'
import { accountLoginRequest } from '@/service/login/login'
import type { IAccount } from '@/service/login/type'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // 1. 实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      // 2. 请求用户信息
    },
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('执行phoneLoginAction', payload)
    // },
  },
}

export default loginModule

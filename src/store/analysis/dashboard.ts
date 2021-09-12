import { Module } from 'vuex'
import { IDashboardState } from './type'
import { IRootState } from '../type'
import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodSale,
} from '@/service/analysis/dashboard'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: [],
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    },
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountRes = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryCountRes)
      const categorySaleRes = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', categorySaleRes)
      const categoryFavorRes = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', categoryFavorRes)
      const addressSaleRes = await getAddressGoodSale()
      commit('changeAddressGoodsSale', addressSaleRes)
    },
  },
}

export default dashboardModule

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    microLoading: true
  },
  actions: {
    setMicroLoading ({ commit }, payload) {
      commit('SET_MICRO_LOADING', payload)
    }
  },
  mutations: {
    SET_MICRO_LOADING (state, payload) {
      state.microLoading = payload
    }
  },
  getters: {},
  modules: {
  }
})

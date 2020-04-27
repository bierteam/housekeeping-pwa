import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jwt: '' // toggle in vue devtools
  },
  mutations: {
    saveJWT (state, jwt) {
      state.jwt = jwt
    }
  },
  actions: {
  },
  modules: {
  },
  strict: process.env.NODE_ENV !== 'production' // throw error if used incorrecty https://vuex.vuejs.org/guide/strict.html
})

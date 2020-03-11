import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import state from './state'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  modules: modules
})

export default store

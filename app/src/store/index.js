import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import direction from './modules/direction'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    direction
  },
  getters
})

export default store

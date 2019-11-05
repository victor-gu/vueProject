const user = {
  state: {
    direction: 'forward'
  },

  mutations: {
    SET_DIRECTION: (state, direction) => {
      state.direction = direction
    }
  },

  actions: {
    // 设置用户名
    SetDirection({ commit }, direction) {
      commit('SET_DIRECTION', direction);
    }
  }
}

export default user

import { login, logout, refresh } from '@/api/login' // eslint-disable-line no-unused-vars
import { getToken, removeToken, getUserId, setUserId, removeUserId, getExpiration, removeExpiration } from '@/utils/auth'
import { Toast } from 'vant';

const user = {
  state: {
    token: getToken(),
    userId: getUserId(),
    name: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_NAME: (state, name) => {
      state.name = name
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          // id
          setUserId(response.id);
          commit('SET_USERID', response.id)
          commit('SET_NAME', response.name)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_USERID', '')
        commit('SET_NAME', '')
        // 清除token,userid
        removeToken()
        removeUserId();
        removeExpiration();
        resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_USERID', '')
        commit('SET_NAME', '')
        // 清除token,userid
        removeToken()
        removeUserId();
        removeExpiration();
        resolve()
      })
    },

    // 设置用户名
    SetUserName({ commit, state }, username) {
      commit('SET_NAME', username);
    },

    // 设置token
    SetMyToken({ commit, state }, token) {
      commit('SET_TOKEN', token);
    },

    // 成功情况下判断用户token是否过期
    PastToken({ commit, state }) {
      const expression = getExpiration();
      const newTime = new Date().getTime();
      const aheadTime = 1000 * 60 * 5; // 五分钟内触发
      if (newTime >= expression) {
        Toast.alert('您登陆已过期，请重新登陆！！！', '登陆过期', {
          confirmButtonText: '确定',
          showClose: false,
          center: true,
          type: 'info',
          callback: () => {
            // 退出登陆
            removeToken();
            location.reload();
          }
        });
      } else if (newTime >= expression - aheadTime) {
        refresh().then().catch((error) => {
          console.log(error);
        });
      }
    },

    // 失败情况下判断用户token是否过期
    errorToke({ commit, state }) {
      return new Promise((resolve, reject) => {
        const expression = getExpiration();
        const newTime = new Date().getTime();
        if (newTime >= expression) {
          Toast.alert('您登陆已过期，请重新登陆！！！', '登陆过期', {
            confirmButtonText: '确定',
            showClose: false,
            center: true,
            type: 'info',
            callback: () => {
              // 退出登陆
              removeToken();
              location.reload();
            }
          });
          resolve();
        } else {
          reject();
        }
      })
    }
  }
}

export default user

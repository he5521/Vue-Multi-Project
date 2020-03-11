import { login, logout, checkUserLoginStatus } from '../../../api/userService'
import { getToken, setToken, removeToken, getTokenKey, setTokenKey, removeTokenKey, setUserInfo, getUserInfo, removeUserInfo, removeVisitedViews, removeCachedViews } from '@/utils/auth'

const user = {
  state: {
    token: getToken() || '',
    tokenkey: getTokenKey() || '',
    userInfo: getUserInfo() || {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_TOKENKEY: (state, tokenKey) => {
      state.tokenkey = tokenKey
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername ({ commit }, data) {
      return new Promise((resolve, reject) => {
        const userInfo = {
          username: data.username.trim(),
          password: data.password,
          chartype: data.chartype
        }
        login(userInfo).then((res) => {
          commit('SET_TOKEN', res.data.token)
          commit('SET_TOKENKEY', res.data.tokenkey)
          commit('SET_USERINFO', res.data)
          setToken(res.data.token)
          setTokenKey(res.data.tokenkey)
          delete res.data['token']
          setUserInfo(res.data)
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    // 登出
    LogOut ({ commit }, data) {
      return new Promise((resolve, reject) => {
        logout(data).then((res) => {
          commit('SET_TOKEN', '')
          commit('SET_TOKENKEY', '')
          commit('SET_USERINFO', {})
          removeToken()
          removeTokenKey()
          removeUserInfo()
          removeCachedViews()
          removeVisitedViews()
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    LoginClean ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_TOKENKEY', '')
        commit('SET_USERINFO', {})
        removeToken()
        removeTokenKey()
        removeUserInfo()
        removeCachedViews()
        removeVisitedViews()
        resolve()
      })
    },
    // 查看用户单点登录状态
    CheckUserLoginStatus ({ commit }, data) {
      return new Promise((resolve, reject) => {
        checkUserLoginStatus(data).then((res) => {
          commit('SET_TOKEN', res.data.token)
          commit('SET_TOKENKEY', res.data.tokenkey)
          commit('SET_USERINFO', res.data)
          setToken(res.data.token)
          setTokenKey(res.data.tokenkey)
          delete res.data['token']
          setUserInfo(res.data)
          resolve(res.data)
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}

export default user

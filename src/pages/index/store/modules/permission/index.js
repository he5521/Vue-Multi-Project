import { getPermission } from '../../../api/permissionService'
// import axios from '@/util/ajax'

const permission = {
  state: {
    router: [],
    navList: [],
    province: ''
  },

  mutations: {
    SET_ROUTER_LIST: (state, data) => {
      state.router = data
    },
    SET_NAV_LIST: (state, data) => {
      state.navList = data
    },
    SET_PROVINCE: (state, data) => {
      state.province = data
    }
  },

  actions: {
    // 获取用户信息
    GetPermission ({ commit }, data) {
      return new Promise((resolve, reject) => {
        getPermission(data).then((res) => {
          commit('SET_ROUTER_LIST', res.data.router)
          commit('SET_NAV_LIST', res.data.navList)
          commit('SET_PROVINCE', res.data.province)
          resolve(res.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    // 设置收藏菜单
    setNavList ({ commit, state }, data) {
      return new Promise((resolve) => {
        commit('SET_NAV_LIST', data)
        resolve([...state.navList])
      })
    }
  }
}

export default permission

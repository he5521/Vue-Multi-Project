/* 2018/02/06 */
import axios from 'axios'
import store from '../store'
import env from './env'
// import webConfig from './config'
import qs from 'qs'
import { Message } from 'element-ui'

/**
 *
 * @param to
 * @param _from
 * @returns {*}
 */
function extend (to, _from) {
  for (let key in _from) {
    to[key] = _from[key]
  }
  return to
}
let defaults = {
  // baseURL: 'http://172.16.180.102:8080/easd/',
  // baseURL: process.env.BASE_API,
  // baseURL: process.env.NODE_ENV === 'production' ? window.location.origin + '/easd' : 'http://yunnan.dev.eascs.com/easd',
  baseURL: env.baseUrl,
  // baseURL: window.location.origin + '/easd',
  method: 'POST',
  responseType: 'json',
  timeout: 600000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'version': '1.0.0',
    'token': '',
    'tokenkey': ''
  },
  // 允许发送请求前 修改请求数据
  transformRequest: [function (data) {
    if (typeof data === 'object') {
      return qs.stringify(data)
    }
    if (typeof data === 'string') {
      return data
    }
  }],

  // 传递给then/catch前 允许修改响应数据
  transformResponse: [function (data) {
    if (typeof data === 'string') {
      data = JSON.parse(data)
    }
    return data
  }],
  // 序列化params
  paramsSerializer: function (params) {
    return qs.stringify(params)
  }

}

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    Message.error('服务器请求失败')
    return Promise.reject(error)
  }
)
extend(axios.defaults, defaults)
const CODE_MESSAGE = {
  9009: '用户登录超时，请重新登录！'
}
export default {
  ajax (options, type) {
    let exModel = {}
    if (!!options.params && options.params instanceof Object) {
      extend(options.params, exModel)
    }
    if (!!options.data && options.data instanceof Object) {
      extend(options.data, exModel)
    }
    if (type === 'json') {
      axios.defaults.responseType = 'json'
      axios.defaults.headers['Content-Type'] = 'application/json'
    } else if (type === 'blob') {
      axios.defaults.responseType = 'blob'
      axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
    } else {
      axios.defaults.responseType = 'json'
      axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
    }
    axios.defaults.headers.token = store.state.user.token
    axios.defaults.headers.tokenkey = store.state.user.tokenkey
    extend(axios.defaults, options)
    return new Promise((resolve, reject) => {
      axios.request(axios.defaults)
        .then(
          (response) => {
            if (axios.defaults.responseType === 'blob') {
              return resolve(response)
            }
            if (response.data.state !== 0) {
              let message = ''
              if (CODE_MESSAGE[response.data.state]) {
                message = CODE_MESSAGE[response.data.state]
              } else {
                message = response.data.msg
              }
              Message.error({ message: message, showClose: true })
              if (response.data.state === 9009) {
                store.dispatch('LoginClean').then(() => {
                  location.reload()
                })
              }
              return reject(message)
            }
            return resolve(response.data)
          },
          (response) => {
            return reject(response)
          })
        .catch(function (error) {
          return reject(error)
        })
    })
  }
}

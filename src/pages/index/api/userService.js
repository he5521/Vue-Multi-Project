/**
 * Created by jahon on 2017/3/28.
 */
import http from './../utils/http'

export function login (data) {
  const options = {
    // url: '/login/login',
    url: '/loginNew.do',
    method: 'post',
    data: data
  }
  return http.ajax(options)
}
export function checkUserLoginStatus (data) {
  const options = {
    // url: '/login/login',
    url: '/loginPreCAS.do',
    method: 'post',
    data: data
  }
  return http.ajax(options)
}
export function logout (data) {
  const options = {
    method: 'post',
    url: '/logoutNew.do',
    data: data
  }
  return http.ajax(options)
}

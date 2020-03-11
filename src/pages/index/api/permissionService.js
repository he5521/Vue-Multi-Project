/**
 * Created by wenshuo.he on 2018/2/8.
 */
import http from './../utils/http'

export function getPermission (data) {
  let options = {
    // url: '/user/permissionNavList',
    url: '/loginMenuNew.do',
    method: 'post',
    data: data
  }
  return http.ajax(options)
}

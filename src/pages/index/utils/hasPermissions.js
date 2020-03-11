import Vue from 'vue'
/**权限指令**/
const has = Vue.directive('has', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding, vnode) {
    let btnPermissions = ''
    // 获取指令按钮权限
    let characteristic = binding.value
    if (characteristic) btnPermissions = characteristic
    // 获取路由按钮权限
    btnPermissions = vnode.context.$route.meta.btnPermissions.split(',')
    if (!Vue.prototype.$_has(btnPermissions)) {
      el.parentNode.removeChild(el)
    }
  }
})
// 权限检查方法
Vue.prototype.$_has = function (value) {
  let isExist = false
  let btnPermissionsStr = sessionStorage.getItem("btnPermissions")
  if (btnPermissionsStr == undefined || btnPermissionsStr == null) {
    return false
  }
  let res = value.filter((x) => {
    return btnPermissionsStr.include(x)
  })
  if (res.length > 0) isExist = true
  return isExist
}

export { has }

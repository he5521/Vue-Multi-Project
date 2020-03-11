// 字符串转成json对象 // mockjs 中使用
export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}
// 判断对象
export function isObject (val) {
  return val !== null && typeof val === 'object' && Array.isArray(val) === false
}

// 格式化数字并保留小数
export function fmoney (s, n) {
  let m = n
  let minus = false
  if (s < 0) {
    s = Math.abs(s)
    minus = true
  }
  n = n > 0 && n <= 20 ? n : 2
  s = parseFloat((s + '').replace(/\[^\d\.-]/g, '')).toFixed(n) + ''
  let l = s.split('.')[0].split('').reverse()
  let r = s.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
  }
  let sum
  if (minus) {
    sum = '-' + t.split('').reverse().join('') + '.' + r
  } else {
    sum = t.split('').reverse().join('') + '.' + r
  }
  if (m === 0) {
    return sum.split('.')[0]
  } else {
    return sum
  }
}

// 格式化数字3位分割
export function numFormat (value) {
  if (!value) {
    return '0.00'
  }
  let intPart = Number(value).toFixed(0) // 获取整数部分
  let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断

  let floatPart = '.00' // 预定义小数部分
  let value2Array = value.toString().split('.')

  // =2表示数据有小数位
  if (value2Array.length === 2) {
    floatPart = value2Array[1].toString() // 拿到小数部分
    if (floatPart.length === 1) { // 补0,实际上用不着
      return intPartFormat + '.' + floatPart + '0'
    } else {
      return intPartFormat + '.' + floatPart
    }
  } else {
    return intPartFormat + floatPart
  }
}

// 格式化日期
export function formatDate (value, fmt) {
  let getDate = new Date(value)
  let o = {
    'M+': getDate.getMonth() + 1,
    'd+': getDate.getDate(),
    'h+': getDate.getHours(),
    'm+': getDate.getMinutes(),
    's+': getDate.getSeconds(),
    'q+': Math.floor((getDate.getMonth() + 3) / 3),
    'S': getDate.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

// 核算部门
export function buildAccountChnTree (data, no) {
  var groups = {}
  // 按父节点将节点分组
  for (var i in data) {
    if (!groups[data[i].chnhighno]) {
      groups[data[i].chnhighno] = []
    }
    groups[data[i].chnhighno].push(data[i])
    if (no && no === data[i].chnno) { // 发现传入的根节点id作为节点id时，将根节点设置为该节点的父节点
      no = data[i].chnhighno
    }
  }
  var rootNodes = groups[no]
  groups[no] = null // 防止自为父节点或互为父节点（有环图结构）导致的死循环
  function traverseTreeNodeGroup (treeNodeGroup) {
    for (var i in treeNodeGroup) {
      var node = treeNodeGroup[i]
      if (groups[node.chnno]) {
        node.children = groups[node.chnno]
        groups[node.chnno] = null // 防止自为父节点或互为父节点（有环图结构）导致的死循环
        traverseTreeNodeGroup(node.children)
      }
    }
  }
  traverseTreeNodeGroup(rootNodes)
  return rootNodes
}
// 格式化字符串
export function formatStr (value, fmt) {
  let str = ''
  str = (value.substring(value.length - 1) === fmt) ? value.substring(0, value.length - 1) : value
  return str
}
// 验证手机号
export function isvalidPhone (str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(str)
}
// 遍历菜单speed
export function getSpeedItem (navList) {
  let result = []
  function getItem(navList) {
    for (var i in navList) {
      let item = navList[i]
      if (item.children) {
        getItem(item.children)
      } else if(item.meta.speed) {
        result.push(item)
      }
    }
  }
  getItem(navList)
  return result
}

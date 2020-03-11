export default {
  install (Vue) {
    Vue.filter('formatDate', function (value, fmt) {
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
    })
    Vue.filter('moneyFormat', function (value) {
      if (!value) {
        return '0.00'
      }
      // let intPart = Number(value).toFixed(0) // 获取整数部分
      let intPart = parseInt(value) // 获取整数部分
      let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断

      let floatPart = '.00' // 预定义小数部分
      let value2Array = Number(value).toString().split('.')

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
    })
    // 生成二维数组
    Vue.filter('createDimensionalArr', function (arr) {
      const arrs = []
      arr.forEach((item, index) => {
        const i = Math.floor(index / 5)
        if (!arrs[i]) {
          arrs[i] = []
        }
        arrs[i].push(item)
      })
      return arrs
    })
  }
}

/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseImportUrl: 文件导入路径
 * baseImagePath: 图片存放地址
 *
 */
let baseUrl = ''
let baseUploadUrl = ''
if (process.env.NODE_ENV === 'production') {
  baseUrl = window.location.origin + '/easd'
  // baseUploadUrl = 'http://fileupload/'
} else {
  // baseUrl = 'http://172.16.180.112:8080/easd' // 172.16.180.102, 172.28.5.128, 172.28.5.32, 172.16.180.112
  // baseUrl = 'http://172.28.4.234:8080/easd'
  baseUrl = ''
  baseUploadUrl = 'http://fileupload/'
}
export default {
  baseUrl,
  baseUploadUrl
}

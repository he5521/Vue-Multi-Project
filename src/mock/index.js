import Mock from 'mockjs'
import loginAPI from './login'
import permissionAPI from './permissionNavList'

Mock.mock(/\/loginNew.do/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/logoutNew.do/, 'post', loginAPI.logout)
Mock.mock(/\/loginMenuNew.do/, 'post', permissionAPI.getNavList)

export default Mock

import qs from 'qs'
// import { param2Obj } from '@/utils'
const loginByUsernameMap = {
  admin: {
    data: {
      baseurl: 'http://',
      chartype: 'SIMPLYFIED',
      employee: {
        deptno: 1,
        deptname: '0',
        email: '',
        empcode: 'DL0521',
        employeeoano: 139201,
        empno: 627666,
        emptitle: 'OPT',
        emptype: 'SYS',
        entrantcompany: '3600',
        isdoauditcount: 'N',
        name: '小李',
        tel: '13478512345',
        username: 'admin'
      },
      isloginok: 'Y',
      istest: 'Y',
      isyiliao: 'N',
      machine: {
      },
      token: 'NjI3NjY2RUFfU1lTVEVNX1RZUEVfS0VZX1NEd2Vuc2h1by5oZToxNzJfMTZfMTc5XzE0MV8xMTQzNUVBX1NZU1RFTV9UWVBFX0tFWV9TRDIwMTgxMTI2MDkyOTI2MDAwMDA0ODk05L2V5paH56GVMjc5OA==',
      tokenkey: 'b9daca530e59fca78ae53c4a547871d7',
      user: ''
    },
    state: 0
  }
}
const logoutMap = {
  data: {
    empno: 627666,
    username: 'admin',
    name: '管理员'
  },
  state: 0
}
const loginErr = {
  msg: '用户名或密码错误',
  state: 9001
}
export default {
  loginByUsername: config => {
    const { username } = qs.parse(config.body)
    if (loginByUsernameMap[username]) {
      return loginByUsernameMap[username]
    } else {
      return loginErr
    }
  },
  logout: () => {
    return logoutMap
  }
}

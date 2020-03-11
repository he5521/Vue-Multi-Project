import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import store from '../store'
import 'nprogress/nprogress.css'
import asyncRouter from './asyncRouter'
import { lazyLoading } from './lazyLoading'
import { getToken, getUserInfo } from '@/utils/auth'
// import {Message} from 'element-ui'
NProgress.configure({ showSpinner: false })
Vue.use(Router)
const routes = [
  {
    path: '/',
    // 重定向
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '../views/login')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import(/* webpackChunkName: 'layout' */ '../views/layout'),
    children: []
  }
]
const router = new Router({
  // mode: 'history',
  routes: routes
})

// 免登录白名单
const whiteList = ['/login']

/**
 * 根据权限匹配路由
 * @param {array} permission 权限列表（菜单列表）
 * @param {array} asyncRouter 异步路由对象
 */
function routerMatch (permission, asyncRouter) {
  return new Promise((resolve) => {
    const routers = asyncRouter[0]
    permission.forEach((item) => {
      const menu = Object.assign({}, item)
      if (menu.name === 'home') {
        delete menu.meta.src
        menu.component.name = 'home'
      }
      menu.component = lazyLoading(menu.component.name, menu.component.ChunkName)
      routers.children.push(menu)
    })
    resolve([routers])
  })
}

// 路由跳转前验证
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start()
  // 判断querystring参数是否是走CAS登录
  if (to.query.stat === '1') {
    store.dispatch('CheckUserLoginStatus', '').then(() => {
      // console.log(' 验证CAS 成功!!')
      router.replace(to.path)
    }).catch(() => {
      // console.log('CAS验证错误')
      store.dispatch('LoginClean').then(() => {
        router.replace('/login')
      })
    })
  } else {
    // 判断用户是否登录
    if (getToken()) {
      // if (getLtd() === undefined || getLtd() === '') {
      //   store.dispatch('LogOut').then(() => {
      //     router.replace('/login')
      //   })
      // }
      // 如果当前处于登录状态，并且跳转地址为login，则自动跳回系统首页
      // 这种情况出现在手动修改地址栏地址时
      if (to.path === '/login') {
        router.replace('/home')
      } else {
        if (getUserInfo() === null) {
          store.dispatch('LoginClean').then(() => {
            router.replace('/login')
          })
          return
        }
        // 页面跳转前先判断是否存在权限列表，如果存在则直接跳转，如果没有则请求一次
        if (store.state.permission.router.length === 0) {
          // store.dispatch('GetUserInfo')
          const empno = {
            empno: store.state.user.userInfo.employee.empno
          }
          // 获取权限列表，如果失败则跳回登录页重新登录
          store.dispatch('GetPermission', empno).then((res) => {
            routerMatch(res.router, asyncRouter).then((routerRes) => {
              router.addRoutes(routerRes)
              next(to.path)
            })
          }).catch(() => {
            // console.log('获取权限失败')
            store.dispatch('LoginClean').then(() => {
              router.replace('/login')
            })
          })
        } else {
          // 如果跳转页面存在于路由中则进入，否则跳转到404
          // 因为可以通过改变url值进行访问，所以必须有该判断
          if (to.matched.length) {
            if (whiteList.indexOf(to.path) < 0) {
              // store.dispatch('user/actionlog', to)
            }
            next()
          } else {
            router.replace('/error/404')
          }
        }
      }
    } else {
      // 如果是免登陆的页面则直接进入，否则跳转到登录页面
      if (whiteList.indexOf(to.path) >= 0) {
        // console.log('该页面无需登录即可访问')
        next()
      } else {
        // console.log('请重新登录')
        router.replace('/login')
        NProgress.done()
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

export default router

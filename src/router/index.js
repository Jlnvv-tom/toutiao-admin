import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/'
import HomeIndex from '@/views/home'
import LayoutIndex from '@/views/layout'
import ArticalIndex from '@/views/artical'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: LayoutIndex,
    children: [
      {
        path: '', // path为空，会作为默认子路由渲染
        name: 'home',
        component: HomeIndex
      },
      {
        path: '/artical',
        name: 'artical',
        component: ArticalIndex
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 路由导航守卫，所有页面的导航都会经过 这里
// to: 要去的页面
// from:来自那里的路由
// next： 放行的方法
router.beforeEach((to, from, next) => {
  // 如果要访问的不是/login，校验登录状态，登录了可以访问，没登录就强制跳转到登录页
  // const user = window.localStorage.getItem('user')
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    // 登录页面，正常允许通过
    next()
  }
})

export default router

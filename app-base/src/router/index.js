import Vue from 'vue'
import VueRouter from 'vue-router'
import { microAppRoutes } from '../config/micro-app.config.js'
import microApp from '../views/micro-app.vue'
Vue.use(VueRouter)

// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/vue2-app/'
    // children: [
    //   {
    //     path: '*',
    //     name: 'side-bar',
    //     component: () => import(/* webpackChunkName: "micro-side" */ '../components/micro-side.vue')
    //   }
    // ]
  },
  ...microAppRoutes.map(item => {
    return {
      name: item.name,
      path: item.path,
      component: microApp
    }
  })
]

console.log(routes, 'routes')

const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/app-base' : process.env.BASE_URL,
  routes
})

export default router

import './public-path'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  watch: {
    '$route' () {
      // 发送全局通信，主要是在父级应用中使用
      if (window.__MICRO_APP_ENVIRONMENT__) {
        window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
      }
    }
  },
  render: h => h(App)
}).$mount('#app')

// 判断是否在子应用环境中
if (window.__MICRO_APP_ENVIRONMENT__) {
  // 发送全局数据
  /**
  * 绑定监听函数
  * dataListener: 绑定函数
  * autoTrigger: 在初次绑定监听函数时有缓存数据，是否需要主动触发一次，默认为false
  * 补充: autoTrigger主要是为子应用提供的，因为子应用是异步渲染的，如果在子应用还没渲染时基座应用发送数据，
  * 子应用在初始化后不会触发绑定函数，但这个数据会放入缓存中，此时可以设置autoTrigger为true主动触发一次监听函数来获取数据。
  */
  // const dataListener = async (data) => {
  // const { pathMatch, baseurl } = data || {}
  // 判断子应用basurl 是否与window.__MICRO_APP_BASE_URL__一致
  // if (window.__MICRO_APP_BASE_URL__ && window.__MICRO_APP_BASE_URL__ === baseurl) {
  // 子应用获取父应用路由变化触发跳转
  // await router.push('/' + pathMatch)
  // }
  // }
  // window.microApp && window.microApp.addDataListener(dataListener, true)

  // 子应用解绑处理
  // window.addEventListener('unmount', function () {
  //   console.log('子应用要卸载啦！！~！！！！！')
  //   window.microApp && window.microApp.clearDataListener(dataListener)
  // })
  // 解除绑定
  // window.microApp && window.microApp.removeDataListener(dataListener)

// 清空所有当前应用的绑定函数
// window.microApp && window.microApp.clearDataListener()
}

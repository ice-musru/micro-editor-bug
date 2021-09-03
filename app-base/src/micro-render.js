import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'
import microApp from '@micro-zoe/micro-app'
const isProd = process.env.NODE_ENV === 'production'
/**
 *
 * @param loading 加载子应用loading状态
 */
async function mainRender () {
  return new Vue({
    router,
    store,
    render: h => h(App),
    beforeDestroy () {
      microApp.clearGlobalDataListener()
    }
  }).$mount('#app')
}

/**
 *
 * @param loading 加载子应用loading状态
 * @param hideMenu 是否隐藏侧边栏
 * @param appContent render方法传入的字符串html，不推荐使用
 * @returns {Promise<void>}
 */
let app = ''
export async function render () {
  if (!app) {
    app = await mainRender()
  }
  return app
}
// loading更状态新
export function start () {
  return new Promise((resolve) => {
    microApp.start({
      preFetchApps: [
        { name: 'vue2-app', url: !isProd ? 'http://localhost:9001/' : 'https://needing.xin/app-vue2/' },
        { name: 'vue3-app', url: !isProd ? 'http://localhost:9002/' : 'https://needing.xin/app-vue3/' },
        { name: 'side-bar', url: !isProd ? 'http://localhost:9004/' : 'https://needing.xin/side-nav/' }
      ],
      lifeCycles: {
        created (e) {
          // console.log('created 创建完成啦')
        },
        async beforemount (e) {
          // console.log('beforemount 初始化之前')
        },
        mounted (e) {
          // console.log('mounted 初始化之后')
        },
        async unmount (e) {
          console.log('unmount 卸载完成', app)
          await render()
        },
        error (err) {
          console.log(err, 'error 发生错误')
        }
      },

      /**
       * 自定义fetch
       * @param url 静态资源地址
       * @param options fetch请求配置项
       * @param appName 应用名称
       * @returns Promise<string>
       */
      fetch (url, options, appName) {
        return fetch(url, Object.assign(options, { credentials: 'include' }))
          .then((res) => {
            console.log(res, 'res')
            return res.text()
          })
          .catch(() => {
            return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">

              <title>哔哩哔哩直播后台</title>
            </head>
            <body>
              <div id="micro-error">
                <img style="width: 50%;display:block;margin:100px auto;" src="https://i0.hdslb.com/bfs/activity-plat/cover/20170511/499njw4m17.png" alt="">
              </div>
            </body>
            </html>
            `
          })
      }
    })
    resolve()
  })
}

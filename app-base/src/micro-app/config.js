const defaultConfig = {
  inline: false, // 默认值false
  destory: false, // 默认值false
  disableScopecss: false, // 默认值false
  disableSandbox: false, // 默认值false
  macro: false, // 默认值false
  shadowDOM: false // 默认值false
}

const isProd = process.env.NODE_ENV === 'production'
// export default configs
// 子应用配置
const microAppConfig = {
  'vue2-app': {
    ...defaultConfig,
    name: 'vue2-app',
    url: !isProd ? 'http://localhost:9001/' : 'https://needing.xin/app-vue2/',
    baseurl: !isProd ? '/vue2-app' : '/app-base/vue2-app'
  },
  'vue3-app': {
    ...defaultConfig,
    name: 'vue3-app',
    url: !isProd ? 'http://localhost:9002/' : 'https://needing.xin/app-vue3/',
    baseurl: !isProd ? '/vue3-app' : '/app-base/vue3-app'
  },
  'vue3-vite': {
    ...defaultConfig,
    name: 'vue3-vite',
    url: !isProd ? 'http://localhost:9003/' : 'https://needing.xin/app-vite/',
    baseurl: !isProd ? '/vue3-vite' : '/app-base/vue3-vite'
  }
}
// 子应用路由配置
const microAppRoutes = [
  {
    name: 'vue2-app',
    path: '/vue2-app/*'
  },
  {
    name: 'vue3-app',
    path: '/vue3-app/*'
  },
  {
    name: 'vue3-vite',
    path: '/vue3-vite/*'
  }
]

export { microAppConfig, microAppRoutes }

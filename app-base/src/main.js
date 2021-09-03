import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { render, start } from './micro-render.js'
// index.js
Vue.use(ElementUI)

Vue.config.productionTip = false

start().then(async res => {
  await render()
})

<template>
  <micro-app
    v-bind="config[routerName]"
    v-loading="loading"
    element-loading-text="子应用拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.8)"
    :data="eventData"
    :class="$style['micro-container']"
    @created="handleCreated"
    @beforemount="handleBeforeMount"
    @mounted="handleMounted"
    @unmount="handleUnMount"
    @error="handleError"
  ></micro-app>
</template>

<script>
// import microApp from '@micro-zoe/micro-app'
import { microAppConfig } from '../config/micro-app.config.js'
export default {
  data () {
    return {
      config: microAppConfig,
      loading: false
    }
  },
  computed: {
    routerName () {
      return this.$route.name || ''
    },
    baseConfig () {
      return this.config[this.routerName]
    },
    // 发送事件通信
    eventData () {
      // 获取baseurl后面的所有路由信息
      // let customMatchPath =
      //   window.location.pathname.replace(this.baseConfig.baseurl, '') +
      //   window.location.search
      // if (customMatchPath.startsWith('/')) {
      //   customMatchPath = customMatchPath.substring(1)
      // }
      // const pathMatch = customMatchPath || ''
      // // 向子应用抛出数据
      // return {
      //   baseurl: this.baseConfig.baseurl,
      //   pathMatch,
      //   path: this.$route.fullPath
      // }
      return {}
    }
  },
  methods: {
    handleCreated () {},
    handleBeforeMount () {
      console.log('子应用' + this.routerName + ':beforeMount 加载完成之前')
      this.loading = true
    },
    handleMounted () {
      console.log('子应用' + this.routerName + ':mounted 加载完成了')
      this.loading = false
    },
    handleUnMount () {
      console.log('子应用' + this.routerName + ':unMount 卸载完成了')
      this.loading = true
    },
    handleError () {
      console.log('子应用' + this.routerName + ':error 加载失败了')
      this.loading = false
    }
  },
  mounted () {
    console.log(this.routerName)
  }
}
</script>
<style lang="scss" module>
.micro-container {
  height: 100%;
}
</style>

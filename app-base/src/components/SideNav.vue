<template>
  <div class="side-nav">
    <!-- <micro-app name="side-bar" :url="url" baseurl="/"></micro-app> -->
    <el-menu :default-active="activeIndex" router  background-color="#666" text-color="#fff" active-text-color="#E6A23C" @select="handleRouteSelect">
      <el-submenu v-for="(item, idx) in menus" :index="item.index" :key="idx">
        <span slot="title">{{item.title}}</span>
        <el-menu-item v-for="(child, cdx) in item.children" :key="idx + '_' + cdx" :index="child.index">{{child.title}}</el-menu-item>
      </el-submenu>
   </el-menu>
  </div>
</template>

<script>
// import microApp from '@micro-zoe/micro-app'
export default {
  data () {
    return {
      url: process.env.NODE_ENV === 'development' ? 'http://localhost:9004/' : 'https://needing.xin/side-nav/',
      activeIndex: '',
      defaultMenu: [
        {
          index: '/vue2-app/',
          title: 'vue2-app',
          children: [{ index: '/vue2-app/', title: 'vue2-app' }, { index: '/vue2-app/about', title: 'vue2-app/about' }]
        },
        {
          index: '/vue3-app/',
          title: 'vue3-app',
          children: [{ index: '/vue3-app/', title: 'vue3-app' }, { index: '/vue3-app/about', title: 'vue3-app/about' }]
        },
        {
          index: '/vue3-vite/',
          title: 'vue3-vite',
          children: [{ index: '/vue3-vite/', title: 'vue3-vite' }, { index: '/vue3-vite/about', title: 'vue3-vite' }]
        }
      ]
    }
  },
  computed: {
    menus () {
      let menus = []
      if (process.env.NODE_ENV === 'production') {
        // menus = this.deepChangeMenus(this.defaultMenu, '/app-base')
        menus = this.defaultMenu
      } else {
        menus = this.defaultMenu
      }
      return menus
    }
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler (newRoute) {
        this.activeIndex = newRoute.path
      }
    }
  },
  methods: {
    handleRouteSelect (index) {
      console.log(index, '111111')
      // history.pushState(null, null, '/app-base' + index)
      // console.log(window.location, 'ggg')
      this.$router.push(index)
      // 主动触发一次popstate事件
      window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
    },
    deepChangeMenus (arr = [], prefix = '') {
      arr.forEach(item => {
        item.index = prefix + item.index
        this.deepChangeMenus(item.children, prefix)
      })
      return arr
    }
    // dataListener (data) {
    //   const { path } = data
    //   this.activeIndex = path
    // }
  },
  mounted () {
    /**
     * 绑定监听函数
     * dataListener: 绑定函数
     * autoTrigger: 在初次绑定监听函数时有缓存数据，是否需要主动触发一次，默认为false
     */
    // microApp.addGlobalDataListener(this.dataListener, true)
    /**
     * 销毁的时候清空所有全局绑定事件
     */
    // this.$once('hook:beforeDestroy', () => {
    //   microApp.removeGlobalDataListener(this.dataListener)
    // })
  }
}
</script>

<style lang="scss" scoped>
.side-nav{
  width: 240px;
  height: 100%;
  background:#666;
}
::v-deep .el-menu {
  border-right: none;
}
</style>

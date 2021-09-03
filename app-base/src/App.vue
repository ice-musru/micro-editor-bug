<template>
  <div :id="$style.app">
    <div :class="$style['app-head']">
      <el-button type="primary" @click="() => $router.push('/')">去首页</el-button>
    </div>
    <div :class="$style['app-container']">
      <side-nav :class="$style['container-nav']"></side-nav>
      <main :class="$style['container-view']">
        <div :class="$style['main-wrap']">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import SideNav from '@/components/SideNav.vue'
export default {
  components: { SideNav },
  computed: {
    microLoading () {
      return this.$store.state.microLoading
    }
  }
}
</script>

<style lang="scss" module>
#app {
  display: flex;
  flex-direction: column;
}

.app-head{
  height: 60px;
  background: black;
}

.app-container {
  width: 100%;
  height: calc(100% - 60px);
  display:  flex;
}
.container-nav{
  width: 240px;
}

.container-view{
  width: 100%;
  flex: 1;
  padding: 20px;
}
.main-wrap{
  height: 100%;
  overflow: auto;
  background: #f1f1f1;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
  background: #f1f1f1;
}
*,
*:after,
*:before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>

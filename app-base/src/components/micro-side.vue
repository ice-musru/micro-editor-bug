<template>
  <micro-app name="side-bar" :url="url"></micro-app>
</template>

<script>
export default {
  data () {
    return {
      url: process.env.NODE_ENV === 'development' ? 'http://localhost:9004/' : 'https://needing.xin/side-nav/'
    }
  }
}
</script>

<style>

</style>

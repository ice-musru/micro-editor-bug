const isDev = process.env.NODE_ENV === 'development'
module.exports = {
  publicPath: isDev ? '/' : '/app-vue2/',
  productionSourceMap: false,
  devServer: {
    port: 9001,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}

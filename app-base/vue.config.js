const isDev = process.env.NODE_ENV === 'development'
module.exports = {
  publicPath: isDev ? '/' : '/app-base/',
  devServer: {
    port: 9000,
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

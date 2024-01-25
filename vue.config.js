const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('sass')
      .test(/\.scss$/)
      .use('sass-loader')
      .loader('sass-loader')
      .end();
  }
})

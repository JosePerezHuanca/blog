const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer:{
    port: process.env.VUE_APP_PORT
  },
  transpileDependencies: true
})

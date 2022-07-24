import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import graphql from '@rollup/plugin-graphql'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), graphql()]
})

// For Vue CLI apps

// vue.config.js

// module.exports = {
//   chainWebpack: config => {
//     config.module
//       .rule('graphql')
//       .test(/\.(graphql|gql)$/)
//       .use('graphql-tag/loader')
//       .loader('graphql-tag/loader')
//       .end()
//   },
// }
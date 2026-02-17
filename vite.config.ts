import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons' //引入svg需要用到插件
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
  createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    symbolId: 'icon-[dir]-[name]',
  })
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
    }
  }
})

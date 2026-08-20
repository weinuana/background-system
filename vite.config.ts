import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons' //引入svg需要用到插件
import path from 'path'
//mock插件提供方法
import { viteMockServe } from 'vite-plugin-mock'
// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  //获取各个环境下的对应的变量
  const env = loadEnv(mode, process.cwd()); //加载哪一个环境的文件 根目录在哪个位置(相当于环境的文件)
  return {
    plugins: [vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
    viteMockServe({
      localEnabled: command === 'serve',//保证开发阶段可以使用mock接口
    }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
      }
    },
    //scss全局变量的配置
    css: {
      preprocessorOptions: {
        scss: {
          //javascriptEnabled: true,
          additionalData: '@use "@/styles/variable.scss";',
        },
      },
    },
    //代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    },
    build: {
      //将更新频率不同的大型依赖拆成独立文件，业务代码更新后浏览器仍可复用依赖缓存。
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return
            if (id.includes('element-plus') || id.includes('@element-plus/icons-vue')) {
              return 'element-plus'
            }
            if (id.includes('echarts')) {
              return 'echarts'
            }
            if (id.includes('/vue/') || id.includes('/@vue/') || id.includes('vue-router') || id.includes('pinia')) {
              return 'vue-vendor'
            }
          },
        },
      },
    }
  }
})

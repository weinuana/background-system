import { createApp } from 'vue'
import App from '@/App.vue'
//按需注册项目使用到的Element Plus组件与图标，减少首屏包体积
import elementPlus from '@/plugins/element-plus'
//svg插件需要配置代码
//@ts-ignore
import 'virtual:svg-icons-register'
//引入模版的全局的样式
import '@/styles/index.scss'
//暗黑模式需要的样式
import 'element-plus/theme-chalk/dark/css-vars.css'
//引入自定义插件对象:注册整个项目组件
import globalComponent from '@/components'
//引入路由
import router from './router'
//引入仓库
import pinia from './store'
//引入路由鉴权
import './permisstion'
//引入自定义指令文件
import { isHasButton } from './directive/has'
//获取应用实例对象
const app = createApp(App)
//安装按需拆分后的Element Plus组件
app.use(elementPlus)
isHasButton(app);
//设置全局组件
// import SvgIcon from '@/components/SvgIcon/index.vue'
// app.component('SvgIcon', SvgIcon)
//安装自定义插件
app.use(globalComponent)
//安装仓库
app.use(pinia);
//注册模版路由
app.use(router);
//将应用挂载到挂载点上
app.mount('#app')

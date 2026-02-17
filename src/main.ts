import { createApp } from 'vue'

import App from './App.vue'
//引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//配置element-plus国际化
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//获取应用实例对象
const app = createApp(App)
//安装element-plus插件
app.use(ElementPlus, {
    locale: zhCn//国际化配置 变成中文
});
//将应用挂载到挂载点上
app.mount('#app')

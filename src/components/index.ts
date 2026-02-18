//引入项目中全部的全局组件
import SvgIcon from '@/components/SvgIcon/index.vue'
import app from '@/App.vue'
import type { Component } from 'vue';
//全局对象
const allGloablComponent: any = { SvgIcon }//简写 SvgIcon: SvgIcon

//对外暴露插件对象
export default {
    //一定叫install方法
    install(app: any) {
        //注册项目全部的全局组件
        Object.keys(allGloablComponent).forEach(key => {
            app.component(key, allGloablComponent[key])
        });
    }
}
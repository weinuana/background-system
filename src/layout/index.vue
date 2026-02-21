<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <Logo></Logo>
            <!-- 展示菜单 -->
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- <el-menu background-color="variable.$base-menu-background" text-color="white">
                    <el-menu-item index="1">首页</el-menu-item>
                    <el-menu-item index="2">数据大屏</el-menu-item>
                    折叠菜单 
                    <el-sub-menu index="3">
                        <template #title>
                            <span>权限管理</span>
                        </template>
<el-menu-item index="2-1">用户管理</el-menu-item>
<el-menu-item index="2-2">角色管理</el-menu-item>
<el-menu-item index="2-3">菜单管理</el-menu-item>
</el-sub-menu>
</el-menu> -->
                <!-- 根据路由动态生成菜单 -->
                <el-menu :default-active="route.path" background-color="variable.$base-menu-background"
                    text-color="white" :router="true" active-text-color="pink">
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar">
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示区域 -->
        <div class="layout_main">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
//获取路由对象
import { useRoute } from 'vue-router';
//引入左侧菜单logo子组件
import type router from '@/router';
import Logo from './logo/index.vue'
//引入菜单组件
import Menu from './menu/index.vue'
//右侧内容展示区域
import Main from './main/index.vue'
//引入顶部tabbar组件
import Tabbar from './tabbar/index.vue'
//获取用户相关的小仓库
import useUserStore from '@/store/modules/user';
let userStore = useUserStore();
//获取路由对象
let route = useRoute();

</script>

<style scoped lang="scss">
.layout_container {

    width: 100%;
    height: 100vh;
    //background: red;
    position: relative;

    .layout_slider {
        color: white;
        width: variable.$base-menu-width;
        height: 100vh;
        background: variable.$base-menu-background;

        .scrollbar {
            width: 100%;
            height: calc(100vh - variable.$base-menu-logo-height);

            .el-menu {
                border-right: none;
            }
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - variable.$base-menu-width);
        height: variable.$base-tabbar-height;
        top: 0px;
        left: variable.$base-menu-width;
    }

    .layout_main {
        position: absolute;
        width: calc(100% - variable.$base-menu-width);
        height: calc(100vh - variable.$base-tabbar-height);
        background: aquamarine;
        left: variable.$base-menu-width;
        top: variable.$base-tabbar-height;
        padding: 20px;
        overflow: auto;
    }
}
</style>
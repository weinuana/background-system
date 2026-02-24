<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <Logo></Logo>
            <!-- 展示菜单 -->
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 根据路由动态生成菜单 -->
                <el-menu :collapse="LayOutSettingStore.fold ? true : false" :default-active="route.path"
                    background-color="variable.$base-menu-background" text-color="white" :router="true"
                    active-text-color="pink">
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar" :class="{ fold: LayOutSettingStore.fold ? true : false }">
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示区域 -->
        <div class="layout_main" :class="{ fold: LayOutSettingStore.fold ? true : false }">
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
import useLayOutSettingStore from '@/store/modules/setting';
let userStore = useUserStore();
let LayOutSettingStore = useLayOutSettingStore();
//获取路由对象
let route = useRoute();

</script>

<script lang="ts">
export default {
    name: "Layout"
}
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
        transition: all 0.3s;
        overflow: hidden;
        white-space: nowrap; //禁止文本自动换行

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
        transition: all 0.3s;
        background: rgb(154, 154, 154);

        &.fold {
            width: calc(100vw - variable.$base-menu-min-width );
            left: variable.$base-menu-min-width;
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - variable.$base-menu-width);
        height: calc(100vh - variable.$base-tabbar-height);
        left: variable.$base-menu-width;
        top: variable.$base-tabbar-height;
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - variable.$base-menu-min-width );
            left: variable.$base-menu-min-width;
        }
    }
}
</style>
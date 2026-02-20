<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <Logo></Logo>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar">
        </div>
        <!-- 内容展示区域 -->
        <div class="layout_main">
            <p style="height: 100000px">我是一个段落</p>
        </div>
    </div>
</template>

<script setup lang="ts">
//引入左侧菜单logo子组件
import Logo from './logo/index.vue'
</script>

<style scoped lang="scss">
.layout_container {

    width: 100%;
    height: 100vh;
    //background: red;
    position: relative;

    .layout_slider {
        width: variable.$base-menu-width;
        height: 100vh;
        background: variable.$base-menu-background;
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - variable.$base-menu-width);
        height: variable.$base-tabbar-height;
        background: cyan;
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
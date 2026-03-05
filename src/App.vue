<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue'
import request from './utils/request';
import { reqLogin } from './api/user';
import { onMounted } from 'vue';
onMounted(() => {
  reqLogin({ username: 'admin', password: '111111' })
})
</script>

<style scoped lang="scss">
div {
  h1 {
    //color: variable.$color; //新改变 要加入variable.引入
  }
}
</style>
<!-- 新增的全局暗黑模式样式 -->
<style lang="scss">
/* 全局暗黑模式样式，作用于整个应用 */
html.dark {
  /* 最外层背景 */
  background-color: var(--el-bg-color) !important;

  body {
    background-color: var(--el-bg-color) !important;
    margin: 0;
  }

  #app {
    background-color: var(--el-bg-color) !important;
    min-height: 100vh;
  }

  /* 覆盖 Element Plus 布局组件的背景 */
  .el-main {
    background-color: var(--el-bg-color) !important;
  }
}
</style>

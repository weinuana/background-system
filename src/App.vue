<template>
  <!-- 在根组件提供中文配置，保留按需加载前的国际化行为 -->
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
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

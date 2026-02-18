<template>
  <div>
    <svg-icon name="phone" color="pink" width="20"></svg-icon>
    <h1>daiam</h1>
  </div>
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
    color: variable.$color; //新改变 要加入variable.引入
  }
}
</style>
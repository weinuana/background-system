<template>
  <div>
    <el-button type="primary" size="default" :icon="Plus">主要按钮</el-button>
    <h1>我是App</h1>
  </div>
  <!-- <template><el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]" :size="size" :disabled="disabled" :background="background"
      layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" /></template> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'



</script>

<style scoped></style>
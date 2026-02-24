<template>
    <div>
        <el-card class="box-card">
            <!-- 卡片顶部添加品牌按钮 -->
            <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
            <!-- 表格组件：用于展示已有得平台数据 -->
            <!-- table:---border:可以设置表格纵向是否有边框
                table-column:---label:某一个列表 ---width:设置这列宽度 ---align:设置这一列对齐方式    
            -->
            <el-table style="margin:10px 0px" :border="true">
                <el-table-column label="序号" width="80px" align:center type="index"></el-table-column>
                <el-table-column label="品牌名称" prop="tmName"></el-table-column>
                <el-table-column label="品牌LOGO"></el-table-column>
                <el-table-column label="品牌操作">
                </el-table-column>
            </el-table>
            <!-- 分页器组件
                pagination
                   v-model:current-page:设置分页器当前页码
                   v-model:page-size:设置每一个展示数据条数
                   page-sizes:用于设置下拉菜单数据
                   background:设置分页器按钮的背景颜色
                   layout:可以设置分页器六个子组件布局调整
            -->
            <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[100, 200, 300, 400]"
                size='large' :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="400" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
//引入组合式API函数ref
import { ref } from 'vue';
//当前页码
let pageNo = ref<number>(1);
//每一页展示多少条数据
let limit = ref<number>(3);
</script>

<style scoped></style>
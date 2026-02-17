<template>
    <div>
        <svg :style="{ width, height }">
            <use :xlink:href="prefix + name" :fill="color"></use>
        </svg>
    </div>
</template>

<script setup lang="ts">
//接收父组件传递过来的参数
defineProps({
    //xlink:href属性前缀
    prefix: {
        type: String,
        default: '#icon-'
    },
    //提供使用图标的前缀
    name: String,
    //接收父组件传递颜色
    color: {
        type: String,
        default: ''
    },
    //接收父组件传递宽度
    width: {
        type: String,
        default: '16px'
    },
    //接收父组件传递高度
    height: {
        type: String,
        default: '16px'
    }
})
</script>

<style scoped></style>
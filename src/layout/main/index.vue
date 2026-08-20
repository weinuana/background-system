<template>
    <!-- 路由组件出口的位置 -->
    <router-view v-slot="{ Component, route }">
        <!-- 列表页使用KeepAlive保留分页与查询结果，减少返回页面时的重复请求 -->
        <transition name="fade" mode="out-in">
            <keep-alive :max="8">
                <component :is="Component" v-if="route.meta.keepAlive" :key="getRouteKey(route)" />
            </keep-alive>
        </transition>
        <!-- 登录、异常页和数据大屏保持按需创建，避免长期占用内存 -->
        <transition name="fade" mode="out-in">
            <component :is="Component" v-if="!route.meta.keepAlive" :key="getRouteKey(route)" />
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import useLayOutSettingStore from '@/store/modules/setting'

const LayOutSettingStore = useLayOutSettingStore()
const currentRoute = useRoute()
const refreshVersions = reactive<Record<string, number>>({})

const getRouteKey = (route: RouteLocationNormalizedLoaded) => {
    const routeName = String(route.name)
    return `${routeName}-${refreshVersions[routeName] || 0}`
}

//监听仓库内部数据是否发生变化,如果发生变化说明用户点击过刷新按钮
watch(() => LayOutSettingStore.refsh, () => {
    //只更新当前路由的缓存键，刷新当前页时不影响其他已缓存页面。
    const routeName = String(currentRoute.name)
    refreshVersions[routeName] = (refreshVersions[routeName] || 0) + 1
})
</script>
<script lang="ts">
export default {
    name: "LayoutMain"
}
</script>

<style scoped>
.fade-enter-from {
    opacity: 0;
    transform: scale(0);
}

.fade-enter-active {
    transition: all .3s;
}

.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}
</style>

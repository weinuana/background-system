<template>
    <div>
        <!-- 三级分类 -->
        <Category :scene="scene"></Category>
        <el-card style="margin: 10px 0px;">
            <!-- v-if或v-show都可以实现显示与隐藏,但是v-if会跳转页面销毁组件
             ,降低性能 -->
            <div v-show="scene == 0">
                <el-button @click="addSpu" type="primary" size="default" icon="Plus" style="width: 100px;"
                    :disabled="categoryStore.c3Id ? false : true">添加SPU</el-button>
                <!-- 展示已有SPU数据 -->
                <el-table style="margin: 10px 0px;" :border="true" :data="records">
                    <el-table-column label="序号" type="index" align:center width="80px"></el-table-column>
                    <el-table-column label="SPU名称" prop="spuName"></el-table-column>
                    <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
                    <el-table-column label="SPU操作">
                        <!-- row:即为已有的SPU对象 -->
                        <template #="{ row, $index }">
                            <el-button type="primary" size="small" icon="Plus" title="添加SKU" style="width: 40px;"
                                @click="addSku(row)"></el-button>
                            <el-button type="primary" size="small" icon="Edit" title="修改SPU" style="width: 40px;"
                                @click="updateSpu(row)"></el-button>
                            <el-button type="primary" size="small" icon="View" title="查看SKU列表"
                                style="width: 40px;"></el-button>
                            <el-popconfirm :title="`你确定删除${row.spuName}?`" width="200px">
                                <template #reference>
                                    <el-button type="primary" size="small" icon="Delete" title="删除SPU"
                                        style="width: 40px;"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页器 -->
                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                    :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total"
                    @current-change="getHasSpu" @size-change="changeSize" />
            </div>
            <!-- 添加SPU|修改SPU子组件 -->
            <spuForm ref="spu" v-show="scene == 1" @changeScene="changeScene">
            </spuForm>
            <!-- 添加SKU子组件 -->
            <skuForm ref="sku" v-show="scene == 2" @changeScene="changeScene"></skuForm>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import type { HasSpuResponseData, Records, SpuData } from '@/api/product/spu/type';
import { reqHasSpu } from '@/api/product/spu';
//引入相应的子组件
import spuForm from './spuForm.vue';
import skuForm from './skuForm.vue';
//引入分类的仓库
import useCategoryStore from '@/store/modules/Category';
let categoryStore = useCategoryStore();
import { ref, watch } from 'vue';
//场景的数据
let scene = ref<number>(0); //0:显示已有SPU  1:添加或者修改已有SPU 2:添加SKU的结构
//分页器默认页码
let pageNo = ref<number>(1);
//每一页展示几条数据
let pageSize = ref<number>(3);
//存储已有的SPU的数据
let records = ref<Records>([]);
//存储已有SPU总个数
let total = ref<number>(0);
//获取子组件实例
let spu = ref<any>();
let sku = ref<any>();
//监听三级分类ID变化
watch(() => categoryStore.c3Id, () => {
    //当三级分类发生变化的时候清空对应的数据
    records.value = [];
    //务必保证有三级分类ID
    if (!categoryStore.c3Id) return;
    getHasSpu();
});

//此方法执行:可以获取某一个三级分类下全部的已有的SPU
const getHasSpu = async (pager = 1) => {
    //修改当前页码
    pageNo.value = pager;
    let result: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id);
    if (result.code == 200) {
        records.value = result.data.records;
        total.value = result.data.total;
    }
}
//分页器下拉菜单发生变化的时候触发
const changeSize = () => {
    getHasSpu();
}
//添加新的SPU按钮的回调
const addSpu = () => {
    //切换为场景1:添加与修改已有SPU结构->SpuForm
    scene.value = 1;
    //点击添加SPU按钮,调用子组件的方法初始化数据
    spu.value.initAddSpu(categoryStore.c3Id);
}
//修改已有的SPU的按钮的回调
const updateSpu = (row: SpuData) => {
    //切换为场景1:添加与修改已有SPU结构->SpuForm
    scene.value = 1;
    //调用子组件实例方法获取完整已有的SPU的数据
    spu.value.initHasSpuData(row);
}
//子组件SpuForm绑定自定义事件:目前是让子组件通知父组件切换场景为0
const changeScene = (obj: any) => {
    //子组件Spuform点击取消变为场景0:展示已有的SPU
    scene.value = obj.flag;
    if (obj.params == 'update') {
        //更新留在当前页
        getHasSpu(pageNo.value);
    } else {
        //添加留在第一页
        getHasSpu();
    }
}
//添加SKU按钮的回调
const addSku = (row: SpuData) => {
    //点击添加SKU按钮切换场景为2
    scene.value = 2;
    //调用子组件的方法初始化添加SKU的数据
    sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row);
}
</script>

<style scoped></style>
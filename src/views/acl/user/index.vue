<template>
    <el-card style="height: 80px; ">
        <el-form :inline="true" class="form">
            <el-form-item label="用户名:">
                <el-input placeholder="请你输入搜索用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" style="width: 60px;">搜索</el-button>
                <el-button type="primary" size="default" style="width: 60px;">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0px;">
        <el-button type="primary" size="default" style="width: 90px;">添加用户</el-button>
        <el-button type="primary" size="default" style="width: 90px;">批量删除</el-button>
        <!-- table展示用户信息 -->
        <el-table style="margin: 10px 0px;" :border="true" :data="userArr">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="#" align="center" type="index"></el-table-column>
            <el-table-column label="ID" align="center" prop="id"></el-table-column>
            <el-table-column label="用户名字" align="center" prop="username" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户名称" align="center" prop="name" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="300px" align="center">
                <template #="{ row, $index }">
                    <el-button type="primary" size="small" icon="User">分配角色</el-button>
                    <el-button type="primary" size="small" icon="Edit">编辑</el-button>
                    <el-popconfirm :title="`你确定要删除${row.username}?`" width="260px">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 7, 9, 11]"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total"
            @current-change="getHasUser" @size-change="handler" />
    </el-card>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import { ref, onMounted, reactive, nextTick } from 'vue';
import { reqSelectUser, reqRemoveUser, reqUserInfo, reqAddOrUpdateUser, reqAllRole, reqSetUserRole } from '@/api/acl/user'
import type { SetRoleData, UserResponseData, Records, User, AllRoleResponseData, AllRole } from '@/api/acl/user/type';
import { ElMessage } from 'element-plus';
//默认页码
let pageNo = ref<number>(1);
//一页展示几条数据
let pageSize = ref<number>(5);
//用户总个数
let total = ref<number>(0);
//存储全部用户的数组
let userArr = ref<Records>([]);
//定义响应式数据:收集用户输入进来的关键字
let keyword = ref<string>('');
//组件挂载完毕
onMounted(() => {
    getHasUser();
});
//获取全部已有的用户信息
const getHasUser = async (pager = 1) => {
    //收集当前页码
    pageNo.value = pager;
    let result: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value, keyword.value);
    if (result.code == 200) {
        total.value = result.data.total;
        userArr.value = result.data.records;
    }
}
//分页器下拉菜单的自定义事件的回调
const handler = () => {
    getHasUser();
}
</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
<template>
    <div>
        <el-aside :width="$store.state.isCollapse ? '64px' : '240px'">
            <el-menu class="el-menu-vertical-demo" :router="true" :default-active="route.fullPath"
                :collapse="$store.state.isCollapse" :collapse-transition="false">
                <el-menu-item index="/index">
                    <el-icon>
                        <HomeFilled />
                    </el-icon>
                    <span>首页</span>
                </el-menu-item>
                <el-menu-item index="/center">
                    <el-icon>
                        <Avatar />
                    </el-icon>
                    <span>个人中心</span>
                </el-menu-item>

                <el-sub-menu v-admin index="/user-manage">
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="/user-manage/userAdd">
                        <span>添加用户</span>
                    </el-menu-item>
                    <el-menu-item index="/user-manage/userList">
                        <span>用户列表</span>
                    </el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="/news-manage">
                    <template #title>
                        <el-icon>
                            <MessageBox />
                        </el-icon>
                        <span>新闻管理</span>
                    </template>
                    <el-menu-item index="/news-manage/newsAdd">
                        <span>创建新闻</span>
                    </el-menu-item>
                    <el-menu-item index="/news-manage/newsList">
                        <span>新闻列表</span>
                    </el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="/product-manage">
                    <template #title>
                        <el-icon>
                            <Reading />
                        </el-icon>
                        <span>产品管理</span>
                    </template>
                    <el-menu-item index="/product-manage/productAdd">
                        <span>新增产品</span>
                    </el-menu-item>
                    <el-menu-item index="/product-manage/productList">
                        <span>产品列表</span>
                    </el-menu-item>
                </el-sub-menu>

            </el-menu>

        </el-aside>
    </div>
</template>

<script setup>
import { HomeFilled, Avatar, UserFilled, MessageBox, Reading } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';

import { useStore } from 'vuex';
const store = useStore()

const route = useRoute()

// 通过指令控制 menu 是否显示
const vAdmin = {
    mounted(el) {
        if (store.state.userInfo.role !== 1) {
            el.parentNode.removeChild(el)
        }
    }
}


</script>
<style lang='scss' scoped>
.el-aside {
    height: 100vh;

    .el-menu {
        height: 100vh;
    }

}
</style>
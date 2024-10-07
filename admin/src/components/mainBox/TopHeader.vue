<template>
    <div>
        <el-header>
            <div class="left">
                <el-icon @click="handleCollapsed">
                    <Menu />
                </el-icon>
                <span style="margin-left: 10px;">企业门户网站管理系统</span>
            </div>
            <div class="right">
                欢迎 {{ store.state.userInfo.username }} 回来
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <el-icon :size="30" color="white">
                            <User />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
                            <el-dropdown-item @click="handleExit">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </el-header>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { Menu, User } from '@element-plus/icons-vue'
import router from '@/router';


const store = useStore();

const handleCollapsed = () => {
    store.commit('changeCollapsed');
}

const handleCenter = () => {
    router.push('/center');
}

const handleExit = () => {
    localStorage.removeItem('token');
    store.commit('clearUserInfo', {});

    router.push('/login');

}



</script>
<style lang='scss' scoped>
.el-header {
    background-color: #2d3a4b;
    color: white;
    width: 100%;
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.left,
.right {
    display: flex;
}

.left {
    i {
        margin: auto
    }
}

.right {
    .el-dropdown {
        margin: auto 16px;
    }

}
</style>
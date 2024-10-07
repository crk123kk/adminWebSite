<template>
    <el-container>
        <SideMenu></SideMenu>
        <el-container direction="vertical">
            <TopHeader></TopHeader>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import SideMenu from '@/components/mainBox/SideMenu.vue';
import TopHeader from '@/components/mainBox/TopHeader.vue';


</script>
<style lang="scss" scoped>
el-main {
    overflow: auto;
    height: calc(100vh - 60px);
}
</style>
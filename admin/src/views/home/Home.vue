<template>
    <div>
        <el-page-header content="首页" icon="" title="企业门户网站管理系统" />

        <el-card class="box-card">
            <el-row>
                <el-col :span="4">
                    <el-avatar :size="100" :src="circleUrl" />
                </el-col>
                <el-col :span="20">
                    <h3 style="line-height: 100px;">欢迎 {{ store.state.userInfo.username }} 回来, {{ welcomeText }}</h3>
                </el-col>
            </el-row>
        </el-card>

        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>公司产品</span>
                </div>
            </template>
            <el-carousel height="150px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3 class="small justify-center" text="2xl">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </el-card>
    </div>
</template>

<script setup>

import { useStore } from 'vuex';

import { computed } from 'vue'

const store = useStore()

// console.log('store.state :>> ', store.state);


const circleUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

const welcomeText = computed(() => new Date().getHours() < 12 ? '要开心每一天啊' : '喝杯咖啡提提神吧')



</script>
<style lang='scss' scoped>
.box-card {
    margin-top: 50px
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
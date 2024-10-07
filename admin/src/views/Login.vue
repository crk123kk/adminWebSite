<template>
    <div>
        <vue-particles id="tsparticles" :particlesInit="particlesInit" :options="options" />

        <div class="formContainer">
            <h3>企业门户网站管理系统</h3>
            <el-form ref="loginFormRef" style="max-width: 600px" :model="loginForm" status-icon :rules="loginRules"
                label-width="80px" class="loginForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username" type="username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" type="password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
// if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

import axios from "axios";
import { ElMessage } from "element-plus";
import { loadSlim } from "tsparticles-slim";
import { reactive, ref } from 'vue'

import { useRouter } from "vue-router";
const router = useRouter()

import { useStore } from 'vuex';
const store = useStore()



const options = {
    background: {
        color: {
            value: '#2d3a4b'
        }
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'repulse'
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#ffffff'
        },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        collisions: {
            enable: true
        },
        move: {
            direction: 'none',
            enable: true,
            outModes: {
                default: 'bounce'
            },
            random: false,
            speed: 6,
            straight: false
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            value: 80
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: 'circle'
        },
        size: {
            value: { min: 1, max: 5 },
        }
    },
    detectRetina: true
}

const particlesInit = async engine => {
    await loadSlim(engine);
};

const loginForm = reactive({
    username: '',
    password: '',
})

const loginFormRef = ref()

const loginRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
})


const submitForm = () => {
    loginFormRef.value.validate((valid) => {
        if (valid) {


            axios.post('/adminApi/user/login', loginForm).then(res => {
                // console.log(res.data);
                if (res.data.ActionType === 'OK') {
                    store.commit('changeUserInfo', res.data.data)
                    // 因为做了路由持久化的操作，每一次重新登录的时候，都需要重新加载路由，所以这边需要在登录的时候，先将状态置空，让网站去重新加载新的路由
                    store.commit('changeGetterRouter', false)
                    router.push('/index')
                } else {
                    ElMessage.error('用户名和密码不匹配')
                }
            })


        } else {
            console.log('error submit!!')
            return false
        }
    })
}


</script>

<style lang='scss' scoped>
.formContainer {
    width: 500px;
    height: 200PX;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba($color: #000, $alpha: 0.5);
    color: white;
    text-align: center;
    padding: 20px;
    border-radius: 10px;

    h3 {
        font-size: 30px;
    }

    .loginForm {
        margin-top: 20PX;
    }
}

::v-deep .el-form-item__label {
    color: white;
}
</style>
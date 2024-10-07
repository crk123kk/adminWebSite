<template>
    <div>
        <el-card>
            <el-page-header content="添加用户" icon="" title="用户管理" />
            <el-form ref="userFormRef" style="max-width: 800px" :model="userForm" :rules="userRules" label-width="80px"
                class="demo-ruleForm" status-icon>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userForm.password" type="password" />
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-select v-model="userForm.role" placeholder="请选择角色">
                        <el-option v-for="item in roleOptions" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="个人简介" prop="introduction">
                    <el-input v-model="userForm.introduction" type="textarea" />
                </el-form-item>
                <el-form-item label="头像" prop="avatar">
                    <Upload :avatar="userForm.avatar" @changeUpload="handleChangeUpload"></Upload>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" @click="submitForm">
                        添加用户
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import Upload from '@/components/upload/Upload.vue';
import upload from '@/utils/upload';
import { reactive, ref } from 'vue';

import { useRouter } from "vue-router";
const router = useRouter()


const userFormRef = ref()

const userForm = reactive({
    username: '',
    password: '',
    // 1 管理员 2 编辑
    role: 2,
    gender: 0,
    introduction: '',
    avatar: '',
    file: null,
})

const userRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    role: [
        { required: true, message: '请选择权限', trigger: 'blur' }
    ],
    introduction: [
        { required: true, message: '请输入个人介绍', trigger: 'blur' }
    ],
    avatar: [
        { required: true, message: '请上传头像', trigger: 'change' }
    ],
})

const roleOptions = [
    {
        label: '管理员',
        value: 1
    },
    {
        label: '编辑',
        value: 2
    },
]

const handleChangeUpload = (file) => {
    userForm.avatar = URL.createObjectURL(file)
    userForm.file = file
}

const submitForm = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            const res = await upload('/adminApi/user/add', userForm)
            if (res.ActionType === 'OK') {
                router.push('/user-manage/userList')
            }
        }
    })

}

</script>

<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 50px;
}
</style>
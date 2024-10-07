<template>
    <div>
        <el-card>
            <el-page-header content="用户列表" icon="" title="用户管理" />
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="username" label="用户名" width="180" />
                <el-table-column prop="avatar" label="头像" width="180">
                    <template #default="scope">
                        <el-avatar :src="getAvatarUrl(scope.row.avatar)" :size="50" />
                    </template>

                </el-table-column>
                <el-table-column prop="role" label="角色">
                    <template #default="scope">
                        <el-tag v-if="scope.row.role === 1" class="ml-2" type="danger">管理员</el-tag>
                        <el-tag v-else class="ml-2" type="success">编辑</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-popconfirm title="你确定删除吗" confirmButtonText="确定" cancelButtonText="取消"
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button size="small" type="danger">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-dialog v-model="dialogVisible" title="编辑" width="500">
            <el-form ref="userFormRef" style="max-width: 600px" :model="userForm" :rules="userRules" label-width="80px"
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
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleEditConfirm">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, reactive } from 'vue';

const dialogVisible = ref(false)



const userFormRef = ref()

const userForm = reactive({
    username: '',
    password: '',
    // 1 管理员 2 编辑
    role: 2,
    introduction: '',
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


const tableData = ref([])

onMounted(() => {
    getTableData()
})

const getTableData = async () => {
    const res = await axios.get('/adminApi/user/list')
    tableData.value = res.data.data
}

const getAvatarUrl = (avatar) => {
    return avatar ? 'http://localhost:3000' + avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
}

const handleEdit = async (data) => {
    const result = await axios.get(`/adminApi/user/list/${data._id}`)
    Object.assign(userForm, result.data.data[0])
    dialogVisible.value = true
}

const handleEditConfirm = () => {

    console.log('data :>> ', userForm);

    userFormRef.value.validate(async (valid) => {
        if (valid) {
            await axios.put(`/adminApi/user/list/${userForm._id}`, userForm)
            getTableData()
        }
    })

    dialogVisible.value = false
}

const handleDelete = async (data) => {
    await axios.delete(`/adminApi/user/list/${data._id}`)
    getTableData()
}


</script>
<style lang='scss' scoped>
.el-table {
    margin-top: 50px
}
</style>
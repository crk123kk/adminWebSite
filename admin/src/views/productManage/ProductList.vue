<template>
    <div>
        <el-card>
            <el-page-header title="产品管理" content="产品列表" icon="" />
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="productName" label="产品名称" width="180" />
                <el-table-column prop="simpleInfo" label="简要描述" width="180" />
                <el-table-column prop="editTime" label="更新时间">
                    <template #default="scope">
                        {{ timeFormat(scope.row.editTime) }}
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button circle :icon="Edit" @click="handleEdit(scope.row)"></el-button>
                        <el-popconfirm title="你确定删除吗" confirmButtonText="确定" cancelButtonText="取消"
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button circle :icon="Delete" type="danger"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup>
import formatTime from '@/utils/formatTime';
import axios from 'axios';
import { onMounted, ref } from 'vue';

import { Edit, Delete } from '@element-plus/icons-vue'

import { useRouter } from "vue-router";
const router = useRouter()



const tableData = ref([])

onMounted(() => {
    getTableData()
})

const getTableData = async () => {
    const res = await axios.get(`/adminApi/product/list`)
    tableData.value = res.data.data
}


const timeFormat = (editTime) => {
    return formatTime.getTime(editTime)
}


const handleDelete = async (row) => {
    const { _id } = row
    await axios.delete(`/adminApi/product/list/${_id}`)
    getTableData()
}

// 编辑处理：跳转到编辑页面
const handleEdit = (item) => {
    router.push(`/product-manage/productEdit/${item._id}`)
}



</script>
<style lang='scss' scoped>
.el-table {
    margin-top: 50px;
}

::v-deep .htmlContent {
    img {
        max-width: 100%;
    }
}
</style>
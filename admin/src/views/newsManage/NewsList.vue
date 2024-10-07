<template>
    <div>
        <el-card>
            <el-page-header content="新闻列表" icon="" title="新闻管理" />
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="标题" width="180" />
                <el-table-column prop="category" label="分类" width="180">
                    <template #default="scope">
                        {{ categoryFormat(scope.row.category) }}
                    </template>
                </el-table-column>
                <el-table-column prop="editTime" label="更新时间">
                    <template #default="scope">
                        {{ timeFormat(scope.row.editTime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="isPublish" label="是否发布">
                    <template #default="scope">
                        <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0"
                            @change="handlePublishChange(scope.row)" />
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button circle :icon="Star" type="success" @click="handlePreview(scope.row)"></el-button>
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
        <el-dialog v-model="dialogVisible" title="预览新闻" width="500">

            <div>
                <h2>{{ preViewData.title }}</h2>
                <div style="font-size: 12px;color: gray;">
                    {{ timeFormat(preViewData.editTime) }}
                </div>
                <el-divider>
                    <el-icon>
                        <StarFilled />
                    </el-icon>
                </el-divider>
                <div class="htmlContent" v-html="preViewData.content"></div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import formatTime from '@/utils/formatTime';
import axios from 'axios';
import { onMounted, ref } from 'vue';

import { Star, Edit, Delete, StarFilled } from '@element-plus/icons-vue'

import { useRouter } from "vue-router";
const router = useRouter()



const tableData = ref([])

onMounted(() => {
    getTableData()
})

const getTableData = async () => {
    const res = await axios.get(`/adminApi/news/list`)
    tableData.value = res.data.data
}

// 格式化分类信息
const categoryFormat = (category) => {
    return ['最新动态', '典型案例', '通知公告'][category - 1]
}

const timeFormat = (editTime) => {
    return formatTime.getTime(editTime)
}

const handlePublishChange = async (row) => {
    const { _id, isPublish } = row
    await axios.put(`/adminApi/news/publish`, {
        _id,
        isPublish,
    })
    getTableData()
}

const preViewData = ref({})
const dialogVisible = ref(false)


const handlePreview = (data) => {
    preViewData.value = data
    dialogVisible.value = true
}

const handleDelete = async (row) => {
    const { _id } = row
    await axios.delete(`/adminApi/news/list/${_id}`)
    getTableData()
}

// 编辑处理：跳转到编辑页面
const handleEdit = (item) => {
    console.log('item :>> ', item);
    router.push(`/news-manage/newsEdit/${item._id}`)
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
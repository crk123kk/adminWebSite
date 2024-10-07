<template>
    <div>
        <el-card>
            <el-page-header title="新闻管理" content="编辑新闻" @back="handleBack()" />
            <el-form ref="newsFormRef" style="max-width: 600px" :model="newsForm" :rules="newsRules" label-width="80px"
                class="demo-ruleForm" status-icon>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="newsForm.title" />
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <!-- 这里的v-if是为了避免最开始传的content是空的，后来虽然有值但是content已经创建了，没办法触发更新，所以通过这个方式来当newsForm.content有值的时候，才去创建，传值，触发更新 -->
                    <Editor v-if="newsForm.content" :content="newsForm.content" @onChange="handleChange"></Editor>
                </el-form-item>
                <el-form-item label="类别" prop="category">
                    <el-select v-model="newsForm.category" placeholder="请选择类别">
                        <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="封面" prop="cover">
                    <Upload :avatar="newsForm.cover" @changeUpload="handleChangeUpload"></Upload>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" @click="submitForm">
                        更新新闻
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import Editor from '@/components/editor/Editor.vue';
import Upload from '@/components/upload/Upload.vue';
import upload from '@/utils/upload';
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';

import { useRouter, useRoute } from "vue-router";
const router = useRouter()
const route = useRoute()


const newsFormRef = ref()

const newsForm = reactive({
    // 新闻标题
    title: '',
    // 内容
    content: '',
    // 新闻类别： 1 最新动态 2 典型案例 3 通知公告
    category: 1,
    // 封面
    cover: '',
    file: null,
    // 是否发布：0 未发布 1 已发布
    isPublish: 0
})

const newsRules = reactive({
    title: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    content: [
        { required: true, message: '请输入内容', trigger: 'blur' }
    ],
    category: [
        { required: true, message: '请选择分类', trigger: 'blur' }
    ],
    cover: [
        { required: true, message: '请上传图片', trigger: 'blur' }
    ],
})

const handleChange = (data) => {
    newsForm.content = data
}

const categoryOptions = [
    {
        label: '最新动态',
        value: 1
    },
    {
        label: '典型案例',
        value: 2
    },
    {
        label: '通知公告',
        value: 3
    },
]

const handleChangeUpload = (file) => {
    newsForm.cover = URL.createObjectURL(file)
    newsForm.file = file
}

const submitForm = () => {
    newsFormRef.value.validate(async (valid) => {
        if (valid) {
            await upload('/adminApi/news/list', newsForm)
            // router.push(`/news-manage/newsList`)
            router.back()
        }
    })
}

const handleBack = () => {
    router.back()
}

onMounted(async () => {
    const res = await axios.get(`/adminApi/news/list/${route.params.id}`)
    Object.assign(newsForm, res.data.data[0])
})



</script>
<style lang='scss' scoped>
.el-form {
    margin-top: 50px;
}
</style>
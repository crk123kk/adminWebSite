<template>
    <div>
        <el-card>
            <el-page-header title="产品管理" content="编辑产品" @back="handleBack()" />
            <el-form ref="productFormRef" style="max-width: 800px" :model="productForm" :rules="productRules"
                label-width="120px" class="demo-ruleForm" status-icon>
                <el-form-item label="产品名称" prop="productName">
                    <el-input v-model="productForm.productName" />
                </el-form-item>
                <el-form-item label="产品简要描述" prop="simpleInfo">
                    <el-input v-model="productForm.simpleInfo" type="textarea" />
                </el-form-item>
                <el-form-item label="产品详细描述" prop="detailInfo">
                    <el-input v-model="productForm.detailInfo" type="textarea" />
                </el-form-item>
                <el-form-item label="产品图片" prop="productImg">
                    <Upload :avatar="productForm.productImg" @changeUpload="handleChangeUpload"></Upload>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" @click="submitForm">
                        更新产品
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import Upload from '@/components/upload/Upload.vue';
import upload from '@/utils/upload';
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';

import { useRouter, useRoute } from "vue-router";
const router = useRouter()
const route = useRoute()


const productFormRef = ref()

const productForm = reactive({
    productName: '',
    simpleInfo: '',
    detailInfo: '',
    productImg: '',
    file: null,
})

const productRules = reactive({
    productName: [
        { required: true, message: '请输入产品名称', trigger: 'blur' }
    ],
    simpleInfo: [
        { required: true, message: '请输入简要描述', trigger: 'blur' }
    ],
    detailInfo: [
        { required: true, message: '请输入详细描述', trigger: 'blur' }
    ],
    productImg: [
        { required: true, message: '请上传产品图片', trigger: 'change' }
    ],
})


const handleChangeUpload = (file) => {
    productForm.productImg = URL.createObjectURL(file)
    productForm.file = file
}

const submitForm = () => {
    productFormRef.value.validate(async (valid) => {
        if (valid) {
            await upload('/adminApi/product/list', productForm)
            router.back()
        }
    })
}

const handleBack = () => {
    router.back()
}

onMounted(async () => {
    const res = await axios.get(`/adminApi/product/list/${route.params.id}`)
    Object.assign(productForm, res.data.data[0])
})

</script>

<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 50px;
}
</style>
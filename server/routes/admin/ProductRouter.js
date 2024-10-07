const express = require('express');
const ProductRouter = express.Router();


const multer = require('multer');
const upload = multer({ dest: 'public/productUploads/' })

const ProductController = require('../../controllers/admin/ProductController');

// 新增产品
ProductRouter.post(
    '/adminApi/product/add',
    upload.single('file'),
    ProductController.add
)

// 产品列表
ProductRouter.get(
    '/adminApi/product/list',
    ProductController.getList
)

ProductRouter.post(
    '/adminApi/product/list',
    ProductController.updateList
)

ProductRouter.get(
    '/adminApi/product/list/:id',
    ProductController.getList
)

ProductRouter.delete(
    '/adminApi/product/list/:id',
    ProductController.delList
)


module.exports = ProductRouter
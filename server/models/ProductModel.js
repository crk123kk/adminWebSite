

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductType = {
    // 产品名称
    productName: String,
    // 简要描述
    simpleInfo: String,
    // 详细描述
    detailInfo: String,
    // 产品图片
    productImg: String,
    // 编辑时间
    editTime: Date
}


// news 模型 =====> news 集合
const ProductModel = mongoose.model('product', new Schema(ProductType))

module.exports = ProductModel
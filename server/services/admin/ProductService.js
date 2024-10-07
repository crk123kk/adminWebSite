const ProductModel = require("../../models/ProductModel")

const ProductService = {

    add: async ({ productName, simpleInfo, detailInfo, productImg, editTime }) => {
        return ProductModel.create({
            productName, simpleInfo, detailInfo, productImg, editTime
        })
    },

    updateList: async ({ _id, productName, simpleInfo, detailInfo, productImg, editTime }) => {
        if (productImg) {
            return ProductModel.updateOne({ _id }, {
                productName, simpleInfo, detailInfo, productImg, editTime
            })
        } else {
            return ProductModel.updateOne({ _id }, {
                productName, simpleInfo, detailInfo, editTime
            })
        }

    },

    getList: async ({ _id }) => {
        return _id ? ProductModel.find({ _id }) : ProductModel.find({})
    },

    delList: async (_id) => {
        return ProductModel.deleteOne({ _id })
    },
}

module.exports = ProductService

const ProductService = require("../../services/admin/ProductService")

const ProductController = {

    add: async (req, res) => {

        const productImg = req.file ? `/productUploads/${req.file.filename}` : ''
        const { productName, simpleInfo, detailInfo } = req.body

        await ProductService.add({
            productName, simpleInfo, detailInfo, productImg,
            editTime: new Date()
        })
        res.send({
            ActionType: 'OK'
        })
    },

    updateList: async (req, res) => {
        const productImg = req.file ? `/productUploads/${req.file.filename}` : ''
        const { _id, productName, simpleInfo, detailInfo } = req.body

        await ProductService.updateList({
            _id,
            productName,
            simpleInfo,
            detailInfo,
            productImg,
            editTime: new Date()
        })
        res.send({
            ActionType: 'OK',
        })
    },

    getList: async (req, res) => {
        const result = await ProductService.getList({ _id: req.params.id })
        res.send({
            ActionType: 'OK',
            data: result
        })
    },

    delList: async (req, res) => {
        const { id } = req.params
        await ProductService.delList({ _id: id })
        res.send({
            ActionType: 'OK'
        })
    },


}

module.exports = ProductController
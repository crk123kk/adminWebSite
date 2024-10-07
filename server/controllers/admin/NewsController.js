const NewsService = require("../../services/admin/NewsService")

const NewsController = {

    add: async (req, res) => {

        const cover = req.file ? `/newsUploads/${req.file.filename}` : ''
        const { title, content, category, isPublish } = req.body

        await NewsService.add({
            title,
            content,
            category: Number(category),
            isPublish: Number(isPublish),
            cover,
            editTime: new Date()
        })
        res.send({
            ActionType: 'Ok'
        })
    },

    updateList: async (req, res) => {
        const cover = req.file ? `/newsUploads/${req.file.filename}` : ''
        const { _id, title, content, category, isPublish } = req.body

        const result = await NewsService.updateList({
            _id,
            title,
            content,
            category: Number(category),
            isPublish: Number(isPublish),
            cover,
            editTime: new Date()
        })
        res.send({
            ActionType: 'OK',
        })
    },

    getList: async (req, res) => {
        const result = await NewsService.getList({ _id: req.params.id })
        res.send({
            ActionType: 'OK',
            data: result
        })
    },



    publish: async (req, res) => {
        await NewsService.publish({
            ...req.body,
            editTime: new Date()
        })
        res.send({
            ActionType: 'OK'
        })
    },

    delList: async (req, res) => {
        const { id } = req.params
        await NewsService.delList({ _id: id })
        res.send({
            ActionType: 'OK'
        })
    },
}

module.exports = NewsController
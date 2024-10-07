const express = require('express');
const NewsController = require('../../controllers/admin/NewsController');
const NewsRouter = express.Router();


const multer = require('multer')
const upload = multer({ dest: 'public/newsUploads/' })


NewsRouter.post(
    '/adminApi/news/add',
    upload.single('file'),
    NewsController.add
)

NewsRouter.get(
    '/adminApi/news/list',
    NewsController.getList
)

NewsRouter.post(
    '/adminApi/news/list',
    upload.single('file'),
    NewsController.updateList
)

NewsRouter.get(
    '/adminApi/news/list/:id',
    NewsController.getList
)

NewsRouter.put(
    '/adminApi/news/publish',
    NewsController.publish
)

NewsRouter.delete(
    '/adminApi/news/list/:id',
    NewsController.delList
)




module.exports = NewsRouter
const express = require('express');
const UserRouter = express.Router();

const UserController = require('../../controllers/admin/UserController');

// 用于处理表单上传的文件数据
const multer = require('multer')
// 创建一个 multer 实例，并且创建一个 public/avatarUploads 文件夹用于存放上传的文件
// 为了方便获取当做静态资源放置
const upload = multer({ dest: 'public/avatarUploads/' })




UserRouter.post(
    '/adminApi/user/login',
    UserController.login
)
UserRouter.post(
    '/adminApi/user/upload',
    // 'file' 是前端上传文件的字段名,是二进制流存放的位置，而不是boldUrl，boldUrl是文件的地址，是前端显示用到的
    upload.single('file'),
    UserController.upload
)
UserRouter.post(
    '/adminApi/user/add',
    upload.single('file'),
    UserController.add
)

// 用户列表的增删改查
UserRouter.get(
    '/adminApi/user/list',
    UserController.getList
)
UserRouter.get(
    '/adminApi/user/list/:id',
    UserController.getList
)
UserRouter.delete(
    '/adminApi/user/list/:id',
    UserController.delList
)
UserRouter.put(
    '/adminApi/user/list/:id',
    UserController.putList
)



module.exports = UserRouter;

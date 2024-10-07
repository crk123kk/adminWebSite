// 连接数据库的配置信息

const mongoose = require('mongoose')

// 连接数据库, 并且指定数据库名称（如果没有数据库，则会创建数据库，这里的数据库名称为company-system）

mongoose.connect('mongodb://localhost:27017/company-system')
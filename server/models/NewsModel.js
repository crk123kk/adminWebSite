

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewsType = {
    // 新闻标题
    title: String,
    // 内容
    content: String,
    // 新闻类别： 1 最新动态 2 典型案例 3 通知公告
    category: Number,
    // 封面
    cover: String,
    // 是否发布：0 未发布 1 已发布
    isPublish: Number,
    // 编辑时间
    editTime: Date
}


// news 模型 =====> news 集合
const NewsModel = mongoose.model('news', new Schema(NewsType))

module.exports = NewsModel
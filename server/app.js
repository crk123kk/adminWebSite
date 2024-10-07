var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require('./routes/admin/UserRouter');
const JWT = require('./utils/JWT');
const NewsRouter = require('./routes/admin/NewsRouter');
const ProductRouter = require('./routes/admin/ProductRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// 中间件
app.use((req, res, next) => {
  // 登录页面除外
  if (req.url === '/adminApi/user/login') {
    next()
    return
  }
  // 如果 token 有效，next()
  // 截取 `Bearer ${token}` 后的 token
  const token = req.headers['authorization'].split(' ')[1]
  if (token) {
    const payload = JWT.verify(token)
    // console.log('payload :>> ', payload);
    if (payload) {
      // 刷新 token
      const { _id, username } = payload
      const newToken = JWT.generate({
        _id, username
      }, '1d')
      // 需要注意设置和获取响应头是不一样的，一个是 Authorization, 一个是authorization 并且会带 Bearer
      res.header('Authorization', newToken)
      // 放行
      next()
    } else {
      // 如果 token 过期，返回错误信息 401
      res.status(401).send({
        errCode: '-1',
        errorInfo: 'token 过期'
      })
    }


  }
})

// adminApi -- 后台系统用
app.use(UserRouter)
app.use(NewsRouter)
app.use(ProductRouter)

// webApi -- 企业官网用

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

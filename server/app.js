const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const accountRouter = require(path.join(__dirname, './router/accountRouter.js'))
const resourcesRouter = require(path.join(__dirname, './router/resourcesRouter.js'))
const pictureRouter = require(path.join(__dirname, './router/pictureRouter.js'))
const setingRouter = require(path.join(__dirname, './router/setingRouter.js'))
const eagoRouter = require(path.join(__dirname, './router/eagoRouter.js'))
// const db = require(path.join(__dirname, './mongo/db.js'))

const app = express()
mongoose.connect('mongodb://127.0.0.1:27017/eago')
const db = mongoose.connection

// 连接成功
db.on('open', function () {
  console.log('MongoDB Connection Successed')
})
// 连接失败
db.on('error', function () {
  console.log('MongoDB Connection Error')
})

app.use(bodyParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
// 测试环境静态目录
// app.use(express.static('../dist'))
// 部署服务器静态目录
app.use(express.static('/home/sex.eago.world'))

app.use(function (req, res, next) {
  let end = req.originalUrl.indexOf('?')
  let url = req.originalUrl.slice(0, end)
  if (end === -1) {
    url = req.originalUrl
  }
  if (url !== '/account/login' && url !== '/account/register' && !req.cookies._id) {
    let result = {}
    result.status = 1
    result.message = '用户没有登录，所有操作将不被保存，请登录后再进行操作'
    return res.json(result)
  }
  if (req.cookies._name === 'admin') {
    if (url === '/picture/del' || url === '/picture/update' || url === '/picture/upload' || url === '/resources/save' || url === '/resources/slogansave') {
      let result = {}
      result.status = 1
      result.message = '管理员账号只用来管理后台账号使用，无法进行素材库的操作'
      return res.json(result)
    }
  }
  next()
})

// app.use('/', (req, res) => {
//   console.log(req.cookies)
// })
app.use('/account', accountRouter)
app.use('/resources', resourcesRouter)
app.use('/picture', pictureRouter)
app.use('/seting', setingRouter)
app.use('/count', eagoRouter)
app.listen(3000, function () {
  console.log('3000')
})

const express = require('express')
const path = require('path')
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()
const accountRouter = express.Router()
const accountControllers = require(path.join(__dirname, '../controllers/accountControllers.js'))

accountRouter.post('/login', multipartMiddleware, accountControllers.login)
accountRouter.get('/logout', multipartMiddleware, accountControllers.logout)
accountRouter.post('/register', multipartMiddleware, accountControllers.register)
accountRouter.get('/user', multipartMiddleware, accountControllers.user)
accountRouter.get('/getaccount', multipartMiddleware, accountControllers.getaccount)
accountRouter.post('/updateAccount', multipartMiddleware, accountControllers.updateAccount)
accountRouter.post('/delAccount', multipartMiddleware, accountControllers.delAccount)
// accountRouter.get('/login',multipartMiddleware,(req,res)=>{
//   console.log(req.query);
//   res.json({status:0, message:'请求成功'})
// })

module.exports = accountRouter

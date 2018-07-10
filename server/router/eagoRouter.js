const express = require('express')
const path = require('path')
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()

const eagoRouter = express.Router()
const eagoControllers = require(path.join(__dirname, '../controllers/eagoControllers.js'))

eagoRouter.post('/monthcount', multipartMiddleware, eagoControllers.monthcount)
eagoRouter.get('/terraceCount', multipartMiddleware, eagoControllers.terraceCount)
eagoRouter.get('/usersCount', multipartMiddleware, eagoControllers.usersCount)
eagoRouter.get('/sourceCount', multipartMiddleware, eagoControllers.sourceCount)
eagoRouter.get('/sloganCount', multipartMiddleware, eagoControllers.sloganCount)

module.exports = eagoRouter

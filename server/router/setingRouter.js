const express = require('express')
const path = require('path')
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()

const setingRouter = express.Router()
const setingControllers = require(path.join(__dirname, '../controllers/setingControllers.js'))

setingRouter.get('/getconfig', multipartMiddleware, setingControllers.getconfig)
setingRouter.post('/saveconfig', multipartMiddleware, setingControllers.saveconfig)
setingRouter.get('/defaults', multipartMiddleware, setingControllers.defaults)

module.exports = setingRouter

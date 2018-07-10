const express = require('express')
const path = require('path')
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()

const resourcesRouter = express.Router()
const resourcesControllers = require(path.join(__dirname, '../controllers/resourcesControllers.js'))

resourcesRouter.get('/slogan_all', multipartMiddleware, resourcesControllers.slogan_all)
resourcesRouter.get('/all', multipartMiddleware, resourcesControllers.all)
resourcesRouter.post('/save', multipartMiddleware, resourcesControllers.save)
resourcesRouter.post('/slogansave', multipartMiddleware, resourcesControllers.slogansave)
resourcesRouter.get('/find', multipartMiddleware, resourcesControllers.find)
resourcesRouter.get('/sloganfind', multipartMiddleware, resourcesControllers.sloganfind)
resourcesRouter.get('/personal', multipartMiddleware, resourcesControllers.personal)
resourcesRouter.get('/slogan_personal', multipartMiddleware, resourcesControllers.slogan_personal)

module.exports = resourcesRouter

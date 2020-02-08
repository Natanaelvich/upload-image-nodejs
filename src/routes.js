const express = require('express')
const multer = require('multer')

const multerConfig = require('./config/multer')

const PostController = require('./controllers/PostController')

const routes = express.Router()

routes.get('/posts', PostController.index)
routes.post('/posts', multer(multerConfig).single('file'), PostController.store)
routes.delete('/posts/:id', PostController.destroy)

module.exports = routes

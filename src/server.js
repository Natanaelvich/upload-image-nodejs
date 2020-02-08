const express = require('express')
const morgan = require('morgan')
const path = require('path')
require('dotenv/config')
require('./service/mongoose')

const routes = require('./routes')

const server = express()
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(morgan('dev'))
server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))
server.use(routes)

server.listen(3333, () => {
  console.log('port 3333')
})

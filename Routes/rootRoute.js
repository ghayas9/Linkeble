const express = require('express')
const multer = require('multer')


const route = express.Router()

// app.use(multer().any())

route.use(require('./Talent'))
route.use(multer().any(),require('./LogIn'))
route.use(require('./Admin'))
route.use(require('./Guest'))


module.exports= route


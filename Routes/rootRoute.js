const express = require('express')
const route = express.Router()

route.use(require('./Talent'))
route.use(require('./LogIn'))

module.exports= route
const express = require('express')



const route = express.Router()

route.use(require('./Talent'))
route.use(require('./LogIn'))
route.use(require('./Admin'))
route.use(require('./Geust'))


module.exports= route


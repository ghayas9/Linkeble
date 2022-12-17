const express = require('express')
const auth = require('../Middleware/auth')

const route = express.Router()

route.use(auth,require('./Talent'))
route.use(require('./LogIn'))
route.use(require('./Admin'))


module.exports= route
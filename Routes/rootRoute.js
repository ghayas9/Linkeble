const express = require('express')
const auth = require('../Middleware/auth')
const {getAllCategory} = require('../Controllers/Guest/GuestPages')

const route = express.Router()

route.use(auth,require('./Talent'))
route.use(require('./LogIn'))
route.use(require('./Admin'))



route.get('/cat',getAllCategory)


module.exports= route
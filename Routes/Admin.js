const express = require('express')
const { addCat } = require('../Controllers/Admin')
const route = express.Router()

route.post('/cat/add',addCat)
route.post('/cat/sub/add')
module.exports= route
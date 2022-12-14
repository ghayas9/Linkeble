const express = require('express')
const route = express.Router()

route.post('/cat/add',addCat)
module.exports= route
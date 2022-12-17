const express = require('express')
const { addCat ,addSubCat, getAllCat} = require('../Controllers/Admin')
const route = express.Router()

// route.get('/cat',getAllCat)
route.post('/cat/add',addCat)
route.post('/cat/sub/add',addSubCat)
module.exports= route
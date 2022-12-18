const express = require('express')

const route = express.Router()

const {getAllCategory, getAllServices} = require('../Controllers/Guest/GuestPages')

route.get('/cat',getAllCategory)
route.get('/guest/services',getAllServices)

module.exports= route
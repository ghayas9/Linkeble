const express = require('express')

const route = express.Router()

const {getAllCategory, getAllServices} = require('../Controllers/Guest/GuestPages')

route.get('/cat',getAllCategory)
route.get('/geust/services',getAllServices)

module.exports= route
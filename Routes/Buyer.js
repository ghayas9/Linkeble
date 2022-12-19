const express = require('express')
const { payments } = require('../Controllers/Orders/Payments')
const { placeOrderStepOne, PlaceOrderStepThree } = require('../Controllers/Orders/PlaceOrder')
const route = express.Router()


const {auth }= require('../Middleware/auth')

route.post('/place/order/step/one',auth,placeOrderStepOne)
route.post('/place/order/step/two',auth,payments)
route.post('/place/order/step/three/:id',auth,PlaceOrderStepThree)

module.exports= route
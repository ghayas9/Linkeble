const express = require('express')
const { Payments } = require('../Controllers/Orders/Payments')
const { placeOrderStepOne, PlaceOrderStepThree } = require('../Controllers/Orders/PlaceOrder')
const route = express.Router()


const {auth }= require('../Middleware/auth')

route.post('/place/order/step/one',auth,placeOrderStepOne)
route.post('/place/order/step/two',auth,Payments)
route.post('/place/order/step/three/:id',auth,PlaceOrderStepThree)

module.exports= route
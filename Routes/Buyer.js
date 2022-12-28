const express = require('express')
const { getAllServices ,getOneService } = require('../Controllers/buyer')
const { getOneOrder ,getAllOrders, deleteOneOrder } = require('../Controllers/Buyer/Order')
const { payments } = require('../Controllers/Orders/Payments')
const { placeOrderStepOne, PlaceOrderStepThree } = require('../Controllers/Orders/PlaceOrder')
const route = express.Router()


const {auth }= require('../Middleware/auth')

route.post('/place/order/step/one',auth,placeOrderStepOne)
route.post('/place/order/step/two',auth,payments)
route.post('/place/order/step/three/:id',auth,PlaceOrderStepThree)

///get order///
route.get('/buyer/order/:id',auth,getOneOrder)
route.get('/buyer/order',auth,getAllOrders)
///get order///

///delete order///
route.delete('/buyer/order/:id',auth,deleteOneOrder)
///delete order///



/////////buyer Home pages/////////
route.get('/buyer/service',auth,getAllServices)
route.get('/buyer/service/:id',auth,getOneService)
/////////buyer Home pages/////////

module.exports = route
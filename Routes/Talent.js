const express = require('express')
const { createServicesStepOne, 
  createServicesStepTwo, 
  createServicesStepThree, 
  createServicesStepFour, 
  middelware,
  getAllServices,
  getOneService,
  deleteOneService,
  UpdateServicesStepOne,
  AccountSitting,
  NotificationSitting
} = require('../Controllers/Talent')

const {BillingAddress} = require('../Controllers/Billingaddress')

const route = express.Router()
const upload = require('../Controllers/upload')
const {auth }= require('../Middleware/auth')



/////Create services/////
route.post('/service/step/one',createServicesStepOne)
route.post('/service/step/two/:id',middelware,createServicesStepTwo)
route.post('/service/step/three/:id',middelware,createServicesStepThree)
route.post('/service/step/four/:id',middelware,
upload.fields([{
    name: 'imgs', maxCount: 3
  }, {
    name: 'docs', maxCount: 3
  }])
,createServicesStepFour)
/////Create services/////

/////Update////
route.post('/service/step/one/:id',auth,middelware,UpdateServicesStepOne)
/////Update////

route.get('/service',auth,getAllServices)
route.get('/service/:id',auth,getOneService)
route.delete('/service/:id',auth,deleteOneService)

////// acount sitting ////////

route.post('/address/add',auth,BillingAddress)
route.post('/account/sitting/add',auth,AccountSitting)
route.post('/notification/sitting/add',auth,NotificationSitting)
// route.post('/review/:id',auth,Review)



module.exports= route
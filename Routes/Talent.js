const express = require('express')
const { createServicesStepOne, createServicesStepTwo, createServicesStepThree, createServicesStepFour, middelware} = require('../Controllers/Talent')
const route = express.Router()
const upload = require('../Controllers/upload')
const {auth }= require('../Middleware/auth')
route.post('/service/step/one',auth,createServicesStepOne)
route.post('/service/step/two/:id',auth,middelware,createServicesStepTwo)
route.post('/service/step/three/:id',auth,middelware,createServicesStepThree)
route.post('/service/step/four/:id',auth,middelware,
upload.fields([{
    name: 'imgs', maxCount: 3
  }, {
    name: 'docs', maxCount: 3
  }])
,createServicesStepFour)



module.exports= route
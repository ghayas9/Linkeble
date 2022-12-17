const express = require('express')
const { createServicesStepOne, createServicesStepTwo, createServicesStepThree, createServicesStepFour, middelware} = require('../Controllers/Talent')
const route = express.Router()
const upload = require('../Controllers/upload')

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



module.exports= route
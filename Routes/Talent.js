const express = require('express')
const { createServicesStepOne, createServicesStepTwo, createServicesStepThree} = require('../Controllers/Talent')
const route = express.Router()


route.post('/service/step/one',createServicesStepOne)
route.post('/service/step/two/:id',createServicesStepTwo)
route.post('/service/step/three/:id',createServicesStepThree)



module.exports= route
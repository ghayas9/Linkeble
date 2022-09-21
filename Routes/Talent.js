const express = require('express')
const { createServicesStepOne, createServicesStepTwo } = require('../Controllers/Talent')
const route = express.Router()


route.post('/serviceStepOne',createServicesStepOne)
route.post('/serviceStepTwo',createServicesStepTwo)


module.exports= route
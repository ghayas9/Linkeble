const express = require('express')
const { createServicesStepOne, createServicesStepTwo } = require('../Controllers/Talent')
const route = express.Router()


route.post('/service/step/one',createServicesStepOne)
route.post('/service/step/two',createServicesStepTwo)


module.exports= route
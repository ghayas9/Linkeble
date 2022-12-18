const express = require('express')
const { createServicesStepOne, 
  createServicesStepTwo, 
  createServicesStepThree, 
  createServicesStepFour, 
  middelware,
  getAllServices,
  getOneService,
  deleteOneService,
  UpdateServicesStepOne
} = require('../Controllers/Talent')
const route = express.Router()
<<<<<<< HEAD
const upload = require('../Controllers/upload')
const {auth }= require('../Middleware/auth')
route.post('/service/step/one',auth,createServicesStepOne)
route.post('/service/step/two/:id',auth,middelware,createServicesStepTwo)
route.post('/service/step/three/:id',auth,middelware,createServicesStepThree)
route.post('/service/step/four/:id',auth,middelware,
=======
// const upload = require('../Controllers/upload')


/////Create services/////
route.post('/service/step/one',createServicesStepOne)
route.post('/service/step/two/:id',middelware,createServicesStepTwo)
route.post('/service/step/three/:id',middelware,createServicesStepThree)
route.post('/service/step/four/:id',middelware,
>>>>>>> 1a665f499612fc77fcd3b16a15e910b0cb7a7037
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



module.exports= route
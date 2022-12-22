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

const {auth }= require('../Middleware/auth')
const { upload } = require('../Controllers/upload')



/////Create services/////
route.post('/service/step/one',auth,createServicesStepOne)
route.post('/service/step/two/:id',auth,middelware,createServicesStepTwo)
route.post('/service/step/three/:id',auth,middelware,createServicesStepThree)
route.post('/service/step/four/:id',auth,middelware,upload.fields([{
  name: 'imgs', maxCount: 3
}, {
  name: 'docs', maxCount: 3
}]) ,createServicesStepFour)



// fields([{
//   name: 'imgs', maxCount: 3
// }, {
//   name: 'docs', maxCount: 3
// }])
// ,
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



//////////////////////
route.post('/up',(req,res)=>{
  console.log(req.file)
  console.log(req.files)
  res.json({
    file:req.file,
    files:req.files
  })
})
//////////////////////


module.exports= route
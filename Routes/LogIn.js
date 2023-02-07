const express = require('express')
const { SignIn, SignUp, forgotPasswordStepOne, 
    forgotPasswordStepTwo,
    forgotPasswordFinalStep} = require('../Controllers/LogIn')
const route = express.Router()

route.post('/signin',SignIn)
route.post('/signup',SignUp)
route.post('/forget/password/email',forgotPasswordStepOne)
route.post('/forget/password/verify/token',forgotPasswordStepTwo)
route.post('/forget/password/change/password/:token',forgotPasswordFinalStep)
module.exports= route
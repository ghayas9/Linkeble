const express = require('express')
const { SignIn, SignUp, forgotPasswordbyemail, forgotPasswordverifyOtp, forgotPasswordconfirmpassword } = require('../Controllers/LogIn')
const route = express.Router()

route.post('/signin',SignIn)
route.post('/signup',SignUp)
route.post('/forget/password/email',forgotPasswordbyemail)
route.post('/forget/password/verify/otp',forgotPasswordverifyOtp)
route.post('/forget/password/change/password',forgotPasswordconfirmpassword)
module.exports= route
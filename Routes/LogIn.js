const express = require('express')
const { SignIn, SignUp, forgotPasswordbyemail, forgotPasswordverifyOtp, forgotPasswordconfirmpassword } = require('../Controllers/LogIn')
const route = express.Router()

route.post('/signin',SignIn)
route.post('/signup',SignUp)
route.post('/forgetpasswordbyemail',forgotPasswordbyemail)
route.post('/forgetpsswordbyotp',forgotPasswordverifyOtp)
route.post('/forgetpasswordbyconfirmpassword',forgotPasswordconfirmpassword)
module.exports= route
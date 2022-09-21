const express = require('express')
const { SignIn, SignUp } = require('../Controllers/LogIn')
const route = express.Router()

route.post('/signin',SignIn)
route.post('/signup',SignUp)
module.exports= route
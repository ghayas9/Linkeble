const express = require('express')
const { getchatlist, getChatOfUser, createChat } = require('../Controllers/Chat/chat')
const route = express.Router()

const {auth }= require('../Middleware/auth')

route.get('/chat/list',auth,getchatlist)
route.get('/chat/:id',auth,getChatOfUser)
route.post('/chat/:id',auth,createChat)
module.exports = route
const express = require('express')
const app = express()
const PORT = process.env.PORT || 9000
require('dotenv').config()

app.listen(PORT,()=>{
    console.log('http://localhost:'+PORT)
})


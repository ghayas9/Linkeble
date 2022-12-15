const express = require('express')
const app = express()
const PORT = process.env.PORT || 9000
require('dotenv').config()
const dbCOnnection = require('./Config/db')
const bodyParser = require('body-parser')
const multer = require('multer')

dbCOnnection()

app.use(bodyParser.json())
app.use(multer().any())
app.get('/',(req,res)=>{
    return res.json({
        success:true
    })
})

app.use(require('./Routes/rootRoute'))

app.listen(PORT,()=>{
    console.log('http://localhost:'+PORT)
})


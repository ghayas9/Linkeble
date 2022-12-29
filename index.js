const express = require('express')
const app = express()
const PORT = process.env.PORT || 9000
require('dotenv').config()
const dbCOnnection = require('./Config/db')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors =require('cors');
const fileUpload = require('express-fileupload')
const path = require('path')

dbCOnnection()
app.use(cors({
    origin:'*'
})
);
app.use(bodyParser.json())
// app.use(multer().any())
app.get('/',(req,res)=>{
    return res.json({
        success:true
    })
})
// enable files upload
// app.use(fileUpload({
//     createParentPath: true
// }));
app.use('/up', express.static(path.join(__dirname,'./Public')))
app.use('/profile', express.static(path.join(__dirname,'./Public/Profile')))
app.use(require('./Routes/rootRoute'))

app.listen(PORT,()=>{
    console.log('http://localhost:'+PORT)
})


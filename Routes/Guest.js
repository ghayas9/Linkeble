const express = require('express')
const path = require('path');

const route = express.Router()

const {getAllCategory, getAllServices, getUser} = require('../Controllers/Guest/GuestPages')

route.get('/cat',getAllCategory)
route.get('/guest/services',getAllServices)
route.get('/user/:id',getUser)


route.get("/download/:name",(req,res)=>{
    const docPath = path.join(__dirname,"../Public/Source/", req.params.name);

   try{
    res.download(docPath, req.params.name, function(err){
      if (err) {
        // if the file download fails, we throw an error
        throw err;
      }
      console.log('Someone just downloaded our file!');
    });
   }catch(err){
        res.status(500).json({
          success:false
        })
   }
  
})

module.exports= route
const mongoose =require('mongoose')
const Message = require('../Models/Message')

module.exports ={
    sendMessage:async(req,res)=>{
        const value = Joi.object({
            message: Joi.string().required(),
            creactedfor:Joi.string().required(),
            file: Joi.string(),
        }).validate(req.body)
        if(value.error){
            return res.status(400).json({
                 success: false, 
                 message:value.error.message
            })
        }
        try{
            const NewMessage = new Message()
            NewMessage._id=mongoose.Types.ObjectId()
            NewMessage.message=req.body.message
            NewMessage.createdby=req.payload._id
            NewMessage.createdfor=req.body.createdfor

            if(req.body.file){
                NewMessage.file=req.body.file
            }

            const CreatedMessage = await NewMessage.save() 
            return res.json({
                success:true,
                message:CreatedMessage
            })
        }catch(err){
            console.log(err);
            return res.status(500).json({
                success:false,
                message:'server issue try again later'
            })
        }
        
    },
    getAllMessages:async(req,res)=>{
        try{
            const messages = awaitMessage.find({$or:[{createdby:req.payload},{createdfor:req.payload._id}]})
            return res.json({
                success:true,
                messages
            })
        }catch(err){
            console.log(object);
            return res.status(500).json({
                success:false,
                message:'server issue try again later'
            })
        }
    }
}
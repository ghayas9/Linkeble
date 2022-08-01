const Joi = require('joi')

const Service = require('../Models/createServices')
const Message = require('../Models/Message')
const mongoose = require('mongoose')

module.exports = {
    createServicesStepOne:async(req,res)=>{
        const value = Joi.object({
            title: Joi.string().mix(90).required(),
            description: Joi.string().required(),
            catagory:Joi.string().required(),
            subcatagory:Joi.string().required(),
            tags:Joi.array().required()
        }).validate(req.body)
        if(value.error){
            return res.status(400).json({
                 success: false, 
                 message:value.error.message
            })
        }
        const newService = new Service(req.body)
        newService._id = mongoose.Types.ObjectId()

        try{
            const createService = await newService.save()
            return res.json({
                success:true,
                message:'created successfullly',
                service:createService
            })
        }catch(err){
            return res.status(500).json({
                success:false,
                message:'server issue please try again later',
                err
            })
        }
    },
    createServicesStepTwo:async(req,res)=>{
        const InnerValues = Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            deliver:Joi.number().required(),
            numberofscreen:Joi.string(),
            revisions:Joi.number().required(),
            price:Joi.number.required()
        })
        const value = Joi.object({
            basic:InnerValues,
            standard:InnerValues,
            premium:InnerValues,
        }).validate(req.body)
        if(value.error){
            return res.status(400).json({
                    success: false, 
                    message:value.error.message
            })
        }

        try{
            const updateService = await Service.updateOne({_id:req.body.id},{
                $set:req.body
            })
            return res.json({
                success:true,
                message:'saved successfully',
                service:updateService
            })
        }catch(err){
            console.log(err);
            return res.status(500).json({
                success:false,
                message:'server issue please try again later',
                err
            })
        }
    },
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
        }
        
    }
}
const Joi = require('joi')

const Service = require('../Models/createServices')
const Message = require('../Models/Message')
const mongoose = require('mongoose')

module.exports = {
    createServicesStepOne:async(req,res)=>{
        const value = Joi.object({
            title: Joi.string().max(90).required(),
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
        const newService = new Service()
        newService.uid=mongoose.Types.ObjectId(req.payload._id)
        newService._id = mongoose.Types.ObjectId()
        newService.title = req.body.title
        newService.description = req.body.description
        newService.catagory =mongoose.Types.ObjectId(req.body.catagory)
        newService.subcatagory = mongoose.Types.ObjectId(req.body.subcatagory)
        newService.tags = req.body.tags

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
            numberofscreen:Joi.string().required(),
            revisions:Joi.number().required(),
            price:Joi.number().required()
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
            const updateService = await Service.updateOne({_id:req.params.id},{
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
    createServicesStepThree:async(req,res)=>{
        const value = Joi.object({
            questions: Joi.array(),
            faq:Joi.string()
        }).validate(req.body)
        if(value.error){
            return res.status(400).json({
                 success: false, 
                 message:value.error.message
            })
        }

        try{
            const updateService = await Service.updateOne({_id:req.params.id},{
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
    createServicesStepFour:async(req,res)=>{
        try{

        var arrayOfImgs = []
        var arrayOfDocs = []

        const imgs = req.files.imgs
        const docs = req.files.docs

        if(imgs){
            arrayOfImgs = imgs.map((e)=>{
                return hostUrl+'/up/'+ e.originalname
            })
        }
        if(docs){
            arrayOfDocs = docs.map((e)=>{
                return hostUrl+'/up/'+ e.originalname
            })
        }

        const update_ser = await Service.updateOne({_id: req.params.id},
             {
                $set: {
                    imgs:arrayOfImgs ,
                    docs:arrayOfDocs
                    }
            });

            return res.json({
                success:true,
                message:'imgs and docs updated',
                data:{
                    db:update_ser,
                    imgs:arrayOfImgs,
                    docs:arrayOfDocs
                }
            })

        }catch(err){
            return res.status(500).json({
                success:false,
                message:'try again later'
            })
        }

    },

    middelware:async(req,res,next)=>{
        try{
            const ser = await Service.findOne({
                _id:req.params.id,
                uid:req.payload._id
            })

            if(ser){
                next()
            }else{
                return res.status(401).json({
                    success:false,
                    message:'service not found'
                })
            }
        }catch(err){
            return res.status(401).json({
                success:false,
                message:'try again later'
            })
        }
    }
    
}
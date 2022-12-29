const Joi = require('joi')

const Service = require('../Models/createServices')
const Message = require('../Models/Message')
const mongoose = require('mongoose')
const  {hostUrl} = require('../Config/config')
const AccountSitting = require('../Models/accountSetting')
const NotificationSitting = require('../Models/NotificationSetting')
const Review = require('../Models/Review')

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
    UpdateServicesStepOne:async(req,res)=>{
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
                $set:{
                    pakages:req.body
                }
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
            console.log( hostUrl)
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
                    docs:arrayOfDocs,
                    status:"active"
                    }
            });

            return res.json({
                success:true,
                message:'imgs and docs updated',
                data:{
                    db:update_ser,
                    imgs:arrayOfImgs,
                    docs:arrayOfDocs,
                   
                }
            })

        }catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:'try again later',
                err
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
    },
    getAllServices:async(req,res)=>{
        try{
            const services = await Service.find({uid:req.payload._id})
            return res.json({
                success:true,
                data:services
            })
        }catch(err){
            console.log(err)
            return res.json({
                success:true,
                message:"try again later",
                err
            })
        }
    },
    getOneService:async(req,res)=>{
        try{
            const services = await Service.findOne({uid:req.payload._id,_id:req.params.id})
            return res.json({
                success:true,
                data:services
            })
        }catch(err){
            console.log(err)
            return res.json({
                success:true,
                message:"try again later",
                err
            })
        }
    },
    deleteOneService:async(req,res)=>{
        try{
            const services = await Service.deleteOne({uid:req.payload._id,_id:req.params.id})
            return res.json({
                success:true,
                message:"service has been deleted"
            })
        }catch(err){
            console.log(err)
            return res.json({
                success:true,
                message:"try again later",
                err
            })
        }
    },
    AccountSitting:async(req,res)=>{

        const value = Joi.object({
            fullname:Joi.string().required(),
            email:Joi.string().required(),
            onlinestatus:Joi.string().required()

        }).validate(req.body)
        if(value.error){
            return res.status(400).json({
                 success: false, 
                 message:value.error.message
            })
        }

        try{
            const newaccountsitting = await AccountSitting.updateOne({_id:req.payload._id},
                {
                    $set:req.body
                })

                return res.json({
                    success:true,
                    message:'account sitting updated successfully',
                    data:newaccountsitting
                })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:'try again later',
                err
            })
        }
    },
    NotificationSitting:async(req,res)=>{
        const value = Joi.object({
            orderupdate:Joi.boolean().required(),
            messages:Joi.boolean().required(),
            buyerrequest:Joi.boolean().required(),
            accountandother:Joi.boolean().required(),
            recieveviaemail:Joi.boolean().required()

        }).validate(req.body)
        if(value.error){
            return res.status(400).json({
                 success: false, 
                 message:value.error.message
            })
        }

        try{
            const newnotificationsitting = await NotificationSitting.updateOne({_id:req.payload._id},
                {
                    $set:req.body
                })

                return res.json({
                    success:true,
                    message:'notification sitting updated successfully',
                    data:newnotificationsitting
                })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:'try again later',
                err
            })
        }
    },
    
}
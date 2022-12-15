const mongoose = require('mongoose')
const Joi = require('joi')

const Language = require('../Models/Languages')
const Catagory = require('../Models/Catagory')

module.exports ={
    addLanguage:async(req,res)=>{
        const value = Joi.object({
            name:Joi.string()
        }).validate(req.body)

        if(value.error){
            return res.status(400).json({
                success:false,
                message:value.error.message
            })
        }
        try{
            const newLan = new Language()
            newLan._id = mongoose.Types.ObjectId()
            newLan.name=req.body.name

            const createLan = await newLan.save()
            return res.json({
                success:true,
                message:'added  successfully',
                data:createLan
            })
        }catch(err){
            return res.status(500).json({
                success:false,
                message:'server issue try again later'
            })
        }
    },
    addCat:async(req,res)=>{
        const value = Joi.object({
            name:Joi.string()
        }).validate(req.body)

        if(value.error){
            return res.status(400).json({
                success:false,
                message:value.error.message
            })
        }
        try{
            const newcat = new Catagory()
            newcat._id = mongoose.Types.ObjectId()
            newcat.name=req.body.name

            const createCat = await newcat.save()
            return res.json({
                success:true,
                message:'added  successfully',
                data:createCat
            })

        }catch(err){
            return res.status(500).json({
                success:false,
                message:'server issue try again later',
                err
            })
        }
    },
    addSubCat : async(req,res)=>{
        const value = Joi.object({
            catId:Joi.string().required(),
            name:Joi.string().required(),
            
        }).validate(req.body)
        if(value.error){
            return res.status(400).json({
                success:false,
                message:value.error.message
            })
        }

        try{
            const check_cat = await Catagory.findOne({_id:req.body.catId})
            if(check_cat){
                const addSub = await Catagory.updateOne({ _id:req.body.catId} , {
                    $push: 
                    {
                        sub: {
                        _id: mongoose.Types.ObjectId(), 
                        name: req.body.name
                    }
                    }
                })
            }else{
                return res.status(400).json({
                    success:false,
                    message:'Cat not found please enter correct catId',
                }) 
            }

        }catch(err){
            return res.status(500).json({
                success:false,
                message:'try again later',
                err
            }) 
        }

        
    }
}
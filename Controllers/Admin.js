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
    }
}
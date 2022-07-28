const Joi = require('joi')

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
                 success: false, message:value.error.message
            })
        }
        //DATABASE
        //DATABASE

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
                    success: false, message:value.error.message
            })
        }

        //DATABASE
        //DATABASE
    }
}
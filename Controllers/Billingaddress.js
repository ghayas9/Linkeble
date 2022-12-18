const joi = require('joi')

const Billingaddress = require('../Models/BillingAddress')
const mongoose = require('mongoose')


module.exports = {
    BillingAddress : async(req,res)=>{
        const value = joi.object({
            firstname:joi.string().required(),
            surname:joi.string().required(),
            company:joi.string().required(),
            country:joi.string().required(),
            address:joi.string().required(),
            postcode:joi.string().required(),
            city:joi.string().required(),
            phone:joi.string().required(),
            email:joi.string().required(),
            otherinfo:joi.string().required()
        }).validate(req.body)
        if(value.error){
            return res.status(400).json({
                 success: false, 
                 message:value.error.message
            })
        }

            try{
            const crBillingaddress = await Billingaddress.updateOne({_id:req.payload._id},{
                $set:req.body
            })

            return res.json({
                success:true,
                message:'Billing Address updated successfully',
                data:crBillingaddress
            })

        }catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:'try again later',
                err
            })
        }
    }
}

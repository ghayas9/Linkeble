const order = require('../../Models/order')
const service = require('../../Models/createServices')
const payment = require('../../Models/payment')
const mongoose = require('mongoose')
const Joi = require('joi')


module.exports = {
    payments:async(req,res)=>{
        const value = Joi.object({
            card:Joi.string().required(),
            name:Joi.string().required(),
            exp_date:Joi.string().required(),
            cvv:Joi.string().required(),
            order_id:Joi.string().required()
        }).validate(req.body)

        if(value.error){
            return res.status(400).json({
                success:false,
                message:value.error.message
            })
        }

        try{
            const find_ord = await order.findOne({_id:req.body.order_id})
            if(find_ord){
                //real//
                    //payments// true
                //real//
                if(true){
                    const pmts = new payment()
                    pmts._id = mongoose.Types.ObjectId()
                    pmts.u_id = mongoose.Types.ObjectId(req.payload._id)
                    pmts.name= req.body.name
                    pmts.cardNumber= req.body.card
                    pmts.Method= 'using card'
                    pmts.amount= find_ord.buget

                    const crpmt = await pmts.save()

                    //////////////////////////
                    const update_order = await order.updateOne(
                        {_id:req.body.order_id},
                        {
                            $set:{
                                payment_id:mongoose.Types.ObjectId(crpmt._id.toHexString()),
                                status:'payments'
                            }
                        })
                    //////////////////////////

                    return res.json({
                        success:true,
                        message:'payment successfull',

                    })
                }else{
                    return res.status(400).json({
                        success:false,
                        message:'please provide correct information'
                    })
                }
            }else{
                return res.status(404).json({
                    succes:false,
                    message:"order not found"
                })
            }
        }catch(err){
            console.log(err)
            return res.status(500).json({
                succes:false,
                message:"try again later",
                err
            })
        }
    }
}
const order = require('../../Models/order')
const service = require('../../Models/createServices')
const mongoose = require('mongoose')
const Joi = require('joi')

module.exports = {
    placeOrderStepOne:async(req,res)=>{
        const value = Joi.object({
            package_name:Joi.string().required(),
            service_id:Joi.string().required()
        }).validate(req.body)

        if(value.error){
            return res.status(400).json({
                success:false,
                message:value.error.message
            })
        }

        try{

            const get_service = await service.findOne({_id:req.body.service_id})

            if(get_service){
                const newOrder = new order()
                newOrder._id = mongoose.Types.ObjectId()
                newOrder.service_id= mongoose.Types.ObjectId(req.body.service_id)
                newOrder.talent_id = mongoose.Types.ObjectId(get_service.uid.toHexString())
                newOrder.buyer_id = mongoose.Types.ObjectId(req.payload._id)
                newOrder.deliverydate  = new Date(Date.now() + get_service.pakages[`${req.body.package_name}`]['deliver']*24*60*60*1000)
                newOrder.status = 'incomplete'
                newOrder.buget = get_service.pakages[`${req.body.package_name}`]['price']
                newOrder.pkg = req.body.package_name

                const crOrder = await newOrder.save()
                return res.json({
                    success:true,
                    message:'order saved',
                    data:crOrder
                })

            }else{
                return res.status(404).json({
                    success:false,
                    message:'services not found'
                })
            }
           
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:'try again later',
                err
            })
        }
    },
    PlaceOrderStepThree:async(req,res)=>{
        const value = Joi.object({
            title:Joi.string().required(),
            detail:Joi.string().required()
        }).validate(req.body)

        if(value.error){
            return res.status(400).json({
                success:false,
                message:value.error.message
            })
        }

        try{
            const getOrd = await order.findOne({_id:req.params.id})
            if(getOrd){
                const update_order = await order.updateOne({
                    _id:req.params.id
                },{
                    $set:{
                        title:req.body.title,
                        detail:req.body.detail
                    }
                })

                return res.json({
                    success:true,
                    message:'order done',
                    data:update_order
                })
            }else{
                return res.status(404).json({
                    success:false,
                    message:'order not found',
                })
            }
           
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
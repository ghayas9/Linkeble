const review = require('../../Models/Review')
const order = require('../../Models/order')
const service = require('../../Models/createServices')
const user = require('../../Models/User')
const Notification = require('../../Models/NotificationSetting')
const Earn = require('../../Models/Earning')
const joi = require('joi')



module.exports = {
    AboutTalent:async(req,res)=>{
        try{
            const User = await user.findOne({_id:req.payload._id})
            const Review = await review.find({for:req.payload._id}).populate('createdby')
            const completedOrders = await order.find({talent_id:req.payload._id,status:"completed"})
            const earn = await Earn.findOne({_id:req.payload._id})


            // const level = {
            //     current:1,
            //     day: 40 - (new Date(((new Date()) - (new Date(User.createdAt))))).getDay(),
            //     order: 40 - completedOrders.length,
            //     earn: 400 - earn.total,
            //     warning: 4
            // }

            
        
            return res.json({
                success:true,
                data:{
                    user:User,
                    responseTime:"30 mints",
                    review:Review,
                    earn,
                    completedOrders : completedOrders,
                    level:{
                        current:1,
                        day: 40 - (new Date(((new Date()) - (new Date(User.createdAt))))).getDay(),
                        order: 40 - completedOrders.length,
                        earn: 400 - earn.total,
                        warning: 4
                    }
                }
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:"try again later"
            })
        }
    },
    UpdateNameAndProfile:async(req,res)=>{
        const value = joi.object({
            name: joi.string().required(),
            status: joi.string().required(),
            loc: joi.string().required()
        }).validate(req.body)
        if (value.error) {
            return res.status(400).json({
                success: false,
                message: value.error.message
            })
        }
        try{
            const UserUpdate = await user.updateOne({
                _id:req.payload._id
            },{
                $set:req.body
            })

            return res.json({
                success:true,
                message:"profile updated Successfully"
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:"try again later",
                err
            })
        }
    },

    updateNotification : async(req,res)=>{
        const value = joi.object({
            orderupdate: joi.boolean().required(),
            messsages: joi.boolean().required(),
            buyerrequest: joi.boolean().required(),
            accountandothers: joi.boolean().required(),
            receiveiaemail:joi.boolean().required()
        }).validate(req.body)
        if (value.error) {
            return res.status(400).json({
                success: false,
                message: value.error.message
            })
        }
        try{
            const notificationUpdate = await Notification.updateOne({
                _id:req.payload._id
            },{
                $set:req.body
            })

            return res.json({
                success:true,
                message:"Notification updated Successfully"
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:"try again later",
                err
            })
        }

    }
}
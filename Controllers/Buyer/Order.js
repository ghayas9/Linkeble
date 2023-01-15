const order = require('../../Models/order')
const earn = require("../../Models/Earning")
const { default: mongoose } = require('mongoose')

module.exports = {
    getOneOrder:async(req,res)=>{
        try{
            const find_order = await order.findOne({
                _id:req.params.id,
                buyer_id:req.payload._id
            }).populate("buyer_id").populate("service_id").populate("talent_id")

            return res.json({
                success:true,
                data:find_order
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:'try again later'
            })
        }
    },
    getAllOrders:async(req,res)=>{
        try{
            const find_orders = await order.find({
                buyer_id:req.payload._id
            }).populate("buyer_id").populate("service_id").populate("talent_id")

            return res.json({
                success:true,
                data:find_orders
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:'try again later'
            })
        }
    },
    deleteOneOrder:async(req,res)=>{
        try{
            const delete_order = await order.deleteOne({
                _id:req.params.id,
                buyer_id:req.payload._id
            })
            return res.json({
                success:true,
                message:'order deleted successfully',
                data:delete_order
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:'try again later'
            })
        }
    },
    AcceptOrder:async(req,res)=>{
        try{
            const find_order = await order.findOne({
                _id:req.params.id,
                buyer_id:req.payload._id
            })


            const find_update = await order.updateOne({
                _id:req.params.id,
                buyer_id:req.payload._id
            },{
                $set:{
                    status:"completed",
                    isAccepted:true
                }
            })


            const getEarn = await earn.findOne({_id:req.payload._id})

            const updateEarn = await earn.updateOne({
                _id:req.payload._id
            },{
                $set:{
                    total:getEarn.total + find_order.buget,
                    current:getEarn.current + find_order.buget
                },
                $push:{
                    detail:{
                        _id:mongoose.Types.ObjectId(),
                        amount:find_order.buget,
                        constaint:"add"
                    }
                }
            })

            return res.json({
                success:true,
                message:"order Accepted please leave your review"
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:'try again later'
            })
        }
    }
}
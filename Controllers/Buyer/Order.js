const order = require('../../Models/order')

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
    }
}
const review = require('../../Models/Review')
const order = require('../../Models/order')
const service = require('../../Models/createServices')
const user = require('../../Models/User')



module.exports = {
    AboutTalent:async(req,res)=>{
        try{
            const User = await user.findOne({_id:req.payload._id})
            const Review = await review.find({for:req.payload._id})
            const completedOrders = await order.find({talent_id:req.paylaod._id,status:"completed"})
            return res.json({
                success:true,
                data:{
                    user:User,
                    responseTime:"30 mints",
                    review:Review,
                    completedOrders : completedOrders
                }
            })
        }catch(err){
            return res.status(500).json({
                success:false,
                message:"try again later"
            })
        }
    }
}
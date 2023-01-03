const service = require('../../Models/createServices')
const Review = require('../../Models/Review')
const order = require('../../Models/order')
const mongoose = require('mongoose')
const Joi = require('joi')

module.exports = {
    Review : async(req,res)=>{
        const value = Joi.object({
            review : Joi.string().required(),
            rating : Joi.number().required()

        }).validate(req.body)
        if(value.error){
            return res.status(400).json({
                 success: false, 
                 message:value.error.message
            })
        }
        try{
            const fnorder = await order.findOne({_id:req.params.id})
            const  fnrev= await Review.findOne({_id:req.params.id})
            if(fnorder){

                if(fnrev){
                    const updateReview = await Review.updateOne({_id:req.params.id},{
                        $set:req.body
                    })
                    return res.json({
                        success:true,
                        message:'review updated',
                        data:updateReview
                    })
                }else{
                const newreview = new Review()
                newreview._id = fnorder._id
                newreview.service_id = fnorder.service_id
                newreview.createdby = mongoose.Types.ObjectId(req.payload._id)
                newreview.createdfor = fnorder.talent_id
                newreview.review = req.body.review
                newreview.rating = req.body.rating
                console.log(newreview)
                const crreview = await newreview.save()
                const service_rev = await service.updateOne({_id:req.params.id},{
                    $push:{
                        review:crreview._id
                    }
                })
                return res.json({
                    success:true,
                    message:'review saved',
                    data:crreview
                })
                }
            }else{
                return res.json({
                    success:false,
                    message:'Can not find the order'
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

    getAllReview : async(req,res)=>{
        try{
            const allreview = await Review.find({createdby:req.payload._id})

            return res.json({
                success:true,
                message:'Find All Reviews successfully',
                data:allreview
            })
        }catch(err){
            console.log(err)
            return res.status(400).json({
                success:false,
                message:'try again later',
                err
            })
        }
    },

    getOneReview : async(req,res)=>{
        try{
            const onereview = await Review.findOne({_id:req.params.id})

            return res.json({
                success:true,
                message:'Find the review successfully',
                data:onereview
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:'try again later',
                err
            })
        }
    },

    deleteReview : async(req,res)=>{
        try{
            const deletereview = await Review.deleteOne({createdby:req.payload._id,_id:req.params.id})

            return res.json({
                success:true,
                message:'Review deleted successfully',
                data:deletereview
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:'try again later',
                err
            })
        }
    },

    updateReview : async(req,res)=>{
        try{
            const updatereview = await Review.updateOne({createdby:req.payload._id,_id:req.params.id},
            {
                $set:{
                review : req.body.review,
                rating : req.body.rating
            }
        })
        return res.json({
            success:true,
            message:'review updated successfully',
            data:{
                review : req.body.review,
                rating : req.body.rating
            }
        })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:'try again later',
                err
            })
        }
    },

    ReviewMiddleware : async(req,res,next)=>{
        try{
            const review = await Review.findOne({createdby:req.payload._id,_id:req.params.id})

            if(review){
                next()
            }else{
                return res.status(404).json({
                    success:false,
                    message:'review not found'
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

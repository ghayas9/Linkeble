const service = require('../../Models/createServices')
const Review = require('../../Models/Review')
const mongoose = require('mongoose')
const Joi = require('joi')

module.exports = {
    getAllReview:async(req,res)=>{
        try{
            const review = await Review.find({createdfor:req.payload._id}).populate("createdby")
            var rating = 0
            var total = 0
            var per = 0
            if(review.length>0){
                total = review.length
                review.map((e)=>{
                    rating = rating + e.rating
                })
                
                rating= rating /total 
                per = rating * 100 /5
            }
            
            return res.json({
                success:true,
                data:{review,rating,total ,per}
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:"try again later"
            })
        }
    },
    getAllServiceReview:async(req,res)=>{
        try{
            const review = await Review.find({service_id:req.params.id}).populate("createdby").populate("createdfor")
            return res.json({
                success:true,
                data:review
            })
        }catch(err){
            return res.status(500).json({
                success:false,
                message:"try again later"
            })
        }
    }
}
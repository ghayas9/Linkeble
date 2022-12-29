// const service = require('../../Models/createServices')
// const Review = require('../../Models/Review')
// const Joi = require('joi')

// module.exports = {
//     Review : async(req,res)=>{
//         const value = Joi.object({
//             review : Joi.string().required(),
//             rating : Joi.number().required()

//         }).validate(req.body)
//         if(value.error){
//             return res.status(400).json({
//                  success: false, 
//                  message:value.error.message
//             })
//         }
//         try{
//             const nservice = await Service.findOne({_id:req.params.id})

//             if(nservice){
//                 const newreview = new Review()
//                 newreview._id = mongoose.Types.ObjectId()
//                 newreview.service_id = mongoose.Types.ObjectId(req.params.id)
//                 newreview.by = mongoose.Types.ObjectId(req.payload._id)
//                 newreview.for = mongoose.Types.ObjectId(nservice.uid.toHexString()) 
//                 newreview.review = req.body.review
//                 newreview.rating = req.body.rating

//                 const crreview = await newreview.save()

//             return res.json({
//                 success:true,
//                 message:'review saved',
//                 data:crreview
//             })
//             }else{
//                 return res.json({
//                     success:false,
//                     message:'Can not find the service'
//                 })
//             }
            
//         }catch(err){
//             console.log(err)
//             return res.status(500).json({
//                 success:false,
//                 message:'try again later',
//                 err
//             })
//         }
//     },

//     getAllReview : async(req,res)=>{
//         try{
//             const allreview = await Review.find()

//             return res.json({
//                 success:true,
//                 message:'Find All Reviews successfully',
//                 data:allreview
//             })
//         }catch(err){
//             console.log(err)
//             return res.status(400).json({
//                 success:false,
//                 message:'try again later',
//                 err
//             })
//         }
//     },

//     getOneReview : async(req,res)=>{
//         try{
//             const onereview = await Review.findOne({_id:req.params.id})

//             return res.json({
//                 success:true,
//                 message:'Find the review successfully',
//                 data:onereview
//             })
//         }catch(err){
//             console.log(err)
//             return res.status(500).json({
//                 success:false,
//                 message:'try again later',
//                 err
//             })
//         }
//     },

//     deleteReview : async(req,res)=>{
//         try{
//             const deletereview = await Review.deleteOne({_id:req.params.id})

//             return res.json({
//                 success:ture,
//                 message:'Review deleted successfully',
//                 data:deletereview
//             })
//         }catch(err){
//             console.log(err)
//             return res.status(500).json({
//                 success:false,
//                 message:'try again later',
//                 err
//             })
//         }
//     }
// }
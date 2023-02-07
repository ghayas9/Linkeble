const { default: mongoose } = require("mongoose")
const pre = require("../../Models/preference")


module.exports = {
    add_preference:async(req,res)=>{
        try{
            const newpre = new pre()
            newpre._id = mongoose.Types.ObjectId()
            newpre.user = mongoose.Types.ObjectId(req.payload._id)
            newpre.service = mongoose.Types.ObjectId(req.params.id)

            const cr = await newpre.save()

            return res.json({
                success:true,
                message:"added successfully",
                data:cr
            })

        }catch(err){
            return res.status(500).json({
                success:false,
                message:"added faild",
                err
            })
        }
    },
    remove_preference:async(req,res)=>{
        try{
            await pre.deleteOne({
                _id:req.params.id
            })
            return res.json({
                success:true,
                message:"removed successfully",
            })

        }catch(err){
            return res.status(500).json({
                success:false,
                message:"remove faild",
                err
            })
        }
    },
    get_preference:async(req,res)=>{
        try{

            const pr = await pre.find({user:req.payload._id}).populate('service')
            return res.json({
                success:true,
                data:pr
            })

        }catch(err){
            return res.status(500).json({
                success:false,
                message:"try again later",
                err
            })
        }
    }
}
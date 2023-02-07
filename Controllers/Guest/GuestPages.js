const category = require('../../Models/Catagory')
const subCategory = require('../../Models/SubCatagory')
const service = require('../../Models/createServices')
const User = require("../../Models/User")

module.exports = {
    getAllCategory:async(req,res)=>{
        try{
            const cat = await category.find()
            const sub = await subCategory.find()

            var Allcat = cat.map((e)=>{
                    return { _id:e._id,name:e.name,sub:sub.filter((x)=>{
                        if(e._id.toHexString() ==x.cat.toHexString()){
                            return x
                        }
                    })}
            })
            
            return res.json({
                success:true,
                data:Allcat
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:'some thing went wrong',
                err
            })
        }
    },
    getAllServices:async(req,res)=>{
        try{
            const Services = await service.find().populate('review')
            return res.json({
                success:true,
                data:Services
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
    getUser:async(req,res)=>{
        try{
            const user = await User.findOne({_id:req.params.id})
            return res.json({
                success:true,
                data:user
            })
        }catch(err){
            return res.status(500).json({
                success:false,
                message:'try again later',
                err
            })
        }
    }
}
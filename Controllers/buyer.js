const service = require('../Models/createServices')


module.exports = {
    getAllServices : async(req,res)=>{
        try{
            const services = await service.find()
            return res.json({
                success:true,
                data:services
            })
        }catch(err){
            console.log(err)
            return res.json({
                success:false,
                message:'try again',
                err
            })
        }
    },
    getOneService:async(req,res)=>{
        try{
            const services = await service.findOne({_id:req.params.id})
            return res.json({
                success:true,
                data:services
            })
        }catch(err){
            console.log(err)
            return res.json({
                success:false,
                message:'try again',
                err
            })
        }
    }
}
const Earn = require('../../Models/Earning')


module.exports ={
    getEarning : async(req,res)=>{
        try{
            const earn = await Earn.findOne({_id:req.payload._id})
            res.json({
                success:true,
                data:earn
            })
        }catch(err){
            console.log(err)
            res.status(500).json({
                success:false,
                message:"try again later",
                err
            })
        }
    }
}
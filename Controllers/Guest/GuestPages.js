const category = require('../../Models/Catagory')
const subCategory = require('../../Models/SubCatagory')

module.exports = {
    getAllCategory:async(req,res)=>{
        try{
            const cat = await category.find()
            const sub = await subCategory.find()

            cat.cat.map((e)=>{
                let cat = {}
                e
            })
            return res.json({
                success:true,
                cat,sub
            })
        }catch(err){
            return res.status(500).json({
                success:false,
                message:'some thing went wrong',
                err
            })
        }
    }
}
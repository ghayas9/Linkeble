const jwt = require('jsonwebtoken')
const jwtKey = process.env.jwtKey || 'LogIn'
module.exports = {
    auth:async(req,res,next)=>{
        if(req.headers['authorization']){
            try{
                const token =req.headers['authorization'].split(' ')[1]
                if(token){
                    jwt.verify(token,jwtKey,(err,data)=>{
                        if(!err){
                            req.payload = data
                            req.token = token
                            next()
                        }else{
                            return res.status(401).json({success:false,message:'please login',err})
                        }
                    })
                }else{
                   return res.status(401).json({success:false,message:'please login',err:"please provide token"})
                }
            }catch(err){
                return res.status(401).json({success:false,message:'please login',err:"please provide token"})
            }
        }
    }
}

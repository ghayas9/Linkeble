const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const jwtKey = process.env.jwtKey || 'LogIn'
const bcrypt = require("bcryptjs")
const salt = bcrypt.genSaltSync(10);

const random = (min,max)=>{
    return (Math.floor(Math.random() * (max - min + 1)) + min)
}
module.exports = {
    SignUp:async(req,res)=>{
        const value = Joi.object({
            email: Joi.string().email().required(),
            username: Joi.string(),
            password: Joi.string().required()
        }).validate(req.body)
        if(value.error){
            return res.status(400).json({
                 success: false, message:value.error.message
            })
        }
        const hash = bcrypt.hashSync(req.body.password, salt)
        try{
             //DATABASE CONNECTION
            //DATABASE CONNECTION
           return res.json({success:true,message:'created successfully'})
        }catch(err){
            return res.status(500).json({success:false,message:'some thing went wrong',err})
        }
       
    },
    SignIn:async(req,res)=>{
        const value = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }).validate(req.body)
        if(value.error){
            return res.status(400).json({
                 success: false, message:value.error.message
            })
        }

        //DATABASE
        //DATABASE
        const isPsswordcorrect = bcrypt.compareSync(req.body.password, data.password)
        if(isPsswordcorrect){
            const token = jwt.sign(data.toObject(),jwtKey)
            return res.json({success:true,message:'Successfully LogIn',token})
        }else{
            return res.status(400).json({success:false,message:'wrong password'})
        }
    },
    LogInWithGoogle:async(req,res)=>{
        try{
            const { token }  = req.body
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID
            });
            const { name, email, picture } = ticket.getPayload();
            // DATABASE CONNECTION
            // DATABASE CONNECTION
            const genToken = jwt.sign(ticket,jwtKey)
            return res.json({success:true,message:'Login successfully',token:genToken})
        }catch(err){
            console.log(err);
            return res.status(401).json({success:false,message:'some thing went wrong',err})
        } 
    }
    ,//forgot password 
    forgotPasswordStepOne:async(req,res)=>{
        const value = Joi.object({
            email: Joi.string().email().required(),
        }).validate(req.body)
        if(value.error){
            return res.status(400).json({
                 success: false, message:value.error.message
            })
        }
        //DATABASE
            const otp = random(1000,9999)
        //DATABASE

        //SEND EMAIL
    },
    forgotPasswordStepTwo:async(req,res)=>{
        const value = Joi.object({
            id:Joi.string(),
            otp: Joi.number().max(4).min(4).required(),
        }).validate(req.body)
        if(value.error){
            return res.status(400).json({
                 success: false, message:value.error.message
            })
        }

        //DATABASE
        //DATABASE


    },
    forgotPasswordFinalStep:async(req,res)=>{
        const value = Joi.object({
            passwod:Joi.string().required(),
            conformpassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } }),
        }).validate(req.body)
        if(value.error){
            return res.status(400).json({
                 success: false, message:value.error.message
            })
        }

        //DATABASE
        //DATABASE
    }
}
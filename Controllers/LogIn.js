const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const jwtKey = process.env.jwtKey || 'LogIn'
const forgetKey = process.env.jwtKey || 'forgetKey'
const bcrypt = require("bcryptjs")
const salt = bcrypt.genSaltSync(10);
const mongoose = require('mongoose')
/////////////MODELS/////////////
const User = require('../Models/User')
const accountSetting = require('../Models/accountSetting')
const NotificationSetting = require('../Models/NotificationSetting')
const sendOTPbyEmail = require('./Email/sendOTPbyEmail')
/////////////MODELS/////////////

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
                 success: false, 
                 message:value.error.message
            })
        }
            try{
                const fnd = await User.findOne({email:req.body.email})
                if(fnd){
                    //already exist
                    return res.status(400).json({
                        success:false,
                        message:'email already exist'
                    })
                }else{
                    //created successfully
                    req.body.password = bcrypt.hashSync(req.body.password, salt)
                    const newuser = new User(req.body)
                    newuser._id = mongoose.Types.ObjectId()
                    const creatuser = await newuser.save()
                    //account setting config..
                    const createAccountSetting = new accountSetting()
                    const creactNotificationSetting = new NotificationSetting()
                    //******************************//
                    createAccountSetting._id=mongoose.Types.ObjectId(creatuser._id)
                    creactNotificationSetting._id=mongoose.Types.ObjectId(creatuser._id)
                    await createAccountSetting.save
                    await NotificationSetting.save
                    //account setting config..
                    return res.json({
                        success:true,
                        message:'created successfully',
                        user:creatuser
                    })
                }
            }catch(err){
                //error message
                console.log(err);
                return res.status(500).json({
                    success:false,
                    message:'server issue try again later',
                    err
                })
            }
    },
    SignIn:async(req,res)=>{
        const value = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }).validate(req.body)
        if(value.error){
            return res.status(400).json({
                 success: false, 
                 message:value.error.message
            })
        }
        try{
            const user = await User.findOne({email:req.body.email})
            if(user){
                const isPsswordcorrect = bcrypt.compareSync(req.body.password, user.password)
                if(isPsswordcorrect){
                    const UserData = user.toObject()
                    delete UserData.password
                    const token = jwt.sign(UserData,jwtKey)
                    return res.json({
                        success:true,
                        message:'Successfully LogIn',
                        token
                    })
                }else{
                    return res.status(400).json({
                        success:false,
                        message:'wrong password'
                    })
                }
            }else{
                //user not found
                return res.status(404).json({
                    success:false,
                    message:'user not found'
                })
            }
        }catch(err){
            //error message
            console.log(err);
            return res.status(500).json({
                success:false,
                message:'server issue try again later'
            })
        }
    },
    LogInWithGoogle:async(req,res)=>{
        
        const value = Joi.object({
            token: Joi.string().required()
        }).validate(req.body)
        if(value.error){
            return res.status(400).json({
                 success: false, 
                 message:value.error.message
            })
        }

        try{
            const { token }  = req.body
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID
            });
            const { name, email, picture } = ticket.getPayload();
            // DATABASE 
            // code
            // DATABASE 
            const genToken = jwt.sign(ticket,jwtKey)
            return res.json({
                success:true,
                message:'Login successfully',
                token:genToken
            })
        }catch(err){
            console.log(err);
            return res.status(401).json({
                success:false,
                message:'some thing went wrong',
                err
            })
        } 
    }
    ,//forgot password 
    forgotPasswordStepOne:async(req,res)=>{
        const value = Joi.object({
            email: Joi.string().email().required(),
        }).validate(req.body)
        if(value.error){
            return res.status(400).json({
                 success: false, 
                 message:value.error.message
            })
        }
        //DATABASE
            try{
                const user = await User.findOne({email:req.body.email})
                if(user){
                    const otp = random(1000,9999)
                    const token = jwt.sign({
                        id:user._id,
                        email:user.email,
                        otp
                    },forgetKey)
                    await sendOTPbyEmail(otp,req.body.email)
                    return res.json({
                        success:true,
                        token
                    })
                }else{
                    return res.status(400).json({
                        success:false,
                        message:'User Not found'
                    })
                }
                

            }catch(err){
                console.log(err)
                return res.status(500).json({
                    success:false,
                    message:'please try later',
                    err
                })
            }
            
        //DATABASE

        //SEND EMAIL
    },
    forgotPasswordStepTwo:async(req,res)=>{
        const value = Joi.object({
            token:Joi.string(),
            otp: Joi.number().max(4).min(4).required(),
        }).validate(req.body)
        if(value.error){
            return res.status(400).json({
                 success: false, 
                 message:value.error.message
            })
        }

        try{

        }catch(err){
            return res.status(400).json({
                success:false,
                message:'some thing went wrong'
            })
        }   
            //  token 
            //  otp 
        //DATABASE
        // code
        //DATABASE
    },
    forgotPasswordFinalStep:async(req,res)=>{
        const value = Joi.object({
            passwod:Joi.string().required(),
            conformpassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } }),
        }).validate(req.body)
        if(value.error){
            return res.status(400).json({
                 success: false, 
                 message:value.error.message
            })
        }

        //DATABASE
        // code
        //DATABASE
    }
}
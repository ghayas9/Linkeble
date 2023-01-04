const user = require('../../Models/User')
const chat = require('../../Models/Chat')
const chatlist = require('../../Models/ChatList')
const mongoose = require('mongoose')

const Joi = require('joi')

module.exports = {
    getchatlist :async(req,res)=>{
        try{
            const ChatList = await chatlist.find({
                $or:[
                    {createdby:req.payload._id},
                    {createdfor:req.payload._id},
                ]
            }).populate([
            {
                path:"createdby",
                model:"user"
            },
            {
                path:"createdfor",
                model:"user"
            }
            ])
            return res.json({
                success:true,
                data:ChatList
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:"try again later",
                err
            })
        }
    },
    getChatOfUser:async(req,res)=>{
        try{
            const ChatList = await chatlist.findOne({
                $or:[
                    { $and: [{createdby:req.params.id}, {createdfor:req.payload._id}] },
                    { $and: [{createdfor:req.params.id}, {createdby:req.payload._id}] }
                ]
            })

            if(ChatList){
                const getchatlist = await chatlist.find({
                    $or:[
                        {createdby:req.params.id},
                        {createdfor:req.params.id},
                    ]
                }).populate([
                    {
                        path:"createdby",
                        model:"user"
                    },
                    {
                        path:"createdfor",
                        model:"user"
                    }
                    ])
                const allChat = await chat.find({
                    $or:[
                        {createdby:req.params.id,createdfor:req.payload._id},
                        {createdfor:req.params.id,createdby:req.payload._id},
                    ]
                }).populate([
                    {
                        path:"createdby",
                        model:"user"
                    },
                    {
                        path:"createdfor",
                        model:"user"
                    }
                    ])
                return res.json({
                    success:true,
                    data:{
                        chat:allChat,
                        chatlist:getchatlist
                    }
                })
            }else{

                const newchat = new chatlist()
                newchat._id = mongoose.Types.ObjectId()
                newchat.createdby = mongoose.Types.ObjectId(req.payload._id)
                newchat.createdfor = mongoose.Types.ObjectId(req.params.id)

                const crchatlist = await newchat.save()

                const getchatlist = await chatlist.find({
                    $or:[
                        {createdby:req.params.id},
                        {createdfor:req.params.id},
                    ]
                }).populate([
                    {
                        path:"createdby",
                        model:"user"
                    },
                    {
                        path:"createdfor",
                        model:"user"
                    }
                    ])
                const allChat = await chat.find({
                    $or:[
                        {createdby:req.params.id,createdfor:req.payload._id},
                        {createdfor:req.params.id,createdby:req.payload._id},
                    ]
                }).populate([
                    {
                        path:"createdby",
                        model:"user"
                    },
                    {
                        path:"createdfor",
                        model:"user"
                    }
                    ])

                return res.json({
                    success:true,
                    data:{
                        chat:allChat,
                        chatlist:getchatlist
                    }
                })
            }
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:"try again later",
                err
            })
        }
    },
    createChat:async(req,res)=>{
        const value = Joi.object({
            message : Joi.string().required()
        }).validate(req.body)
        if(value.error){
            return res.status(400).json({
                 success: false, 
                 message:value.error.message
            })
        }
        try{
            const crnewchat = new chat()
            crnewchat._id = mongoose.Types.ObjectId()
            crnewchat.createdby = mongoose.Types.ObjectId(req.payload._id)
            crnewchat.createdfor = mongoose.Types.ObjectId(req.params.id)
            crnewchat.message = req.body.message

            const crms = await crnewchat.save()

            const newCht  = await chat.findOne({_id:crms._id.toHexString()}).populate([
                {
                    path:"createdby",
                    model:"user"
                },
                {
                    path:"createdfor",
                    model:"user"
                }
                ])

            return res.json({
                success:true,
                data:newCht
            })

        }catch(err){
            return res.status(500).json({
                success:false,
                message:"try again later"
            })
        }
    }
}
const mongoose = require('mongoose')

const Service = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    title:String,
    description:String,
    catagory:{
        type:mongoose.Types.ObjectId,
        ref:'catagory'
    },
    subcatagory:{
        type:mongoose.Types.ObjectId,
        ref:'subcatagory'
    },
    tags:{
        type:[{type:String}]
    },
    pricing:{
        type:{
            basic:{
                title:String,
                description:String,
                deliver:Number,
                numberofscreen:Number,
                prototype:Boolean,
                revisions:Number,
                price:Number
            },
            standard:{
                title:String,
                description:String,
                deliver:Number,
                numberofscreen:Number,
                prototype:Boolean,
                revisions:Number,
                price:Number
            },
            premium:{
                title:String,
                description:String,
                deliver:Number,
                numberofscreen:Number,
                prototype:Boolean,
                revisions:Number,
                price:Number
            }
        }
    },yourquestion:{
        type:[{type:String}]
    },software:{
        type:String
    },images:{
        type:[{
            type:String
        }]
    },
    documents:{
        type:[{
            type:String
        }]
    }

},{
    timestamps:true
})

module.exports = mongoose.model('services',Service)
const mongoose = require('mongoose')

const accountSetting = new mongoose.Schema({
    _id:{
        type:mongoose.Types.ObjectId,
    },
    fullName:{
        type:String
    },
    about:{
        type:String
    },
    languages:{
        type:[{
            type:mongoose.Types.ObjectId
        }]
    },
    location:{
        type:String
    },
    responsetime:{
        type:Number,
        default:100
    },
    recentDelivery:{
        type:Date
    },
    education:{
        type:[{
            type:String
        }]
    },
    certificates:{
        type:[{
            type:String
        }]
    }

},{
  timestamps:true  
})
module.exports = mongoose.model('accountSetting',accountSetting)
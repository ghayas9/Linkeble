const mongoose = require('mongoose')
const OPTS = new mongoose.Schema({
    _id:{
        type:mongoose.Types.ObjectId,
    },
    uid:{
        type:mongoose.Types.ObjectId,
    },
    for:{
        type:String
    },
    OPT:{
        type:Number
    },
    verify:{
        type:Boolean,
        default:false
    }
   
},{
    timestamps:true
})

module.exports = mongoose.model('user',User)
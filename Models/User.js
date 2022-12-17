const mongoose = require('mongoose')
const User = new mongoose.Schema({
    _id:{
        type:mongoose.Types.ObjectId,
    },
    profile:{
        type:String
    },
    userName:{
        type:String
    },
    email:{
        type:String,
        uniqe:true,
        required:[true,'email is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    }
},{
    timestamps:true
})

module.exports = mongoose.model('user',User)
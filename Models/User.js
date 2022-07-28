const mongoose = require('mongoose')

const User = new mongoose.Schema({
    _id:{
        type:mongoose.Types.ObjectId
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    }
})

module.exports = mongoose.model('user',User)
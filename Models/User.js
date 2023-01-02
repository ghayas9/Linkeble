const mongoose = require('mongoose')
const User = new mongoose.Schema({
    name:{
        type:String,
        default:'GHAYAS'
    },
    loc:{
        type:String,
        default:'KPK Peshawar'
    },
    status:{
        type:String,
        default:'client satisfiction is my main moto'
    },
    _id:{
        type:mongoose.Types.ObjectId,
    },
    profile:{
        type:String,
        default:'http://localhost:9000/profile/user.png'
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
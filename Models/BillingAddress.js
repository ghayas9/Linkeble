const mongoose = require('mongoose')

const BillingAddress = new mongoose.Schema({
    _id:{
        type:mongoose.Types.ObjectId,
    },
    firstname:{
        type:String,
        defualt:""
    },
    surname:{
        type:String,
        defualt:""
    },
    company:{
        type:String,
        defualt:""
    },
    country:{
        type:String,
        defualt:""
    },
    address:{
        type:String,
        defualt:""
    },
    postcode:{
        type:String,
        defualt:""
    },
    city:{
        type:String,
        defualt:""
    },
    phone:{
        type:String,
        defualt:""
    },
    email:{
        type:String,
        defualt:""
    },
    otherinfo:{
        type:String,
        defualt:""
    }
},{
    timestamps:true
})

module.exports = mongoose.model('billingAddress',BillingAddress)
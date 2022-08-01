const mongoose = require('mongoose')

const BillingAddress = new mongoose.Schema({
    _id:{
        type:mongoose.Types.ObjectId,
    },
    firstName:{
        type:String
    },
    surname:{
        type:String
    },
    company:{
        type:String
    },
    country:{
        type:String
    },
    address:{
        type:String
    },
    postCode:{
        type:String
    },
    city:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    otherInfo:{
        type:String
    }
},{
    timestamps:true
})

module.exports = mongoose.model('billingAddress',BillingAddress)
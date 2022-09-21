const mongoose = require('mongoose')
const Notification = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    orderUpdate:{
        type:Boolean,
        default:true
    },
    messages:{
        type:Boolean,
        default:true
    },
    buyerRequest:{
        type:Boolean,
        default:true
    },
    accountAndOther:{
        type:Boolean,
        default:true
    },
    receiveViaEmail:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('notification',Notification)
const mongoose = require('mongoose')
const Notification = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    orderupdate:{
        type:Boolean,
        default:true
    },
    messages:{
        type:Boolean,
        default:true
    },
    buyerrequest:{
        type:Boolean,
        default:true
    },
    accountandother:{
        type:Boolean,
        default:true
    },
    receiveiaemail:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('notification',Notification)
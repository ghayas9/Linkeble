const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    service_id:mongoose.Types.ObjectId,
    talent_id:mongoose.Types.ObjectId,
    buyer_id:mongoose.Types.ObjectId,
    buget:{type:Number},
    deliverydate:{type:Date},

    /////new 1/////
    payment_id:mongoose.Types.ObjectId,
    status:{type:String},
    ////new 1///

    ///new 2///
    file_link:{type:String},
    title:{type:String},
    detail:{type:String},
    ///new 2//

    isAccepted:{type:Boolean,default:true}
},{timestamp:true})

module.exports = mongoose.model('order',orderSchema)
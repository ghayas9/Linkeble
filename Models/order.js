const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    service_id:mongoose.Types.ObjectId,
    seller_id:mongoose.Types.ObjectId,
    buyer_id:mongoose.Types.ObjectId,
    project_id:mongoose.Types.ObjectId,
    file_id:mongoose.Types.ObjectId,

    title:{type:String},
    detail:{type:String},
    status:{type:String},
    deliverydate:{type:Date},
    buget:{type:Number},
    isAccepted:{type:Boolean}


},{timestamp:true})

module.exports = mongoose.model('order',orderSchema)
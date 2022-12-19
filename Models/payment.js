const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    u_id:mongoose.Types.ObjectId,
    name:String,
    cardNumber:String,
    Method:String,
    amount:Number

},{timestamps:true})

module.exports = mongoose.model('payment',paymentSchema)
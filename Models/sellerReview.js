const mongoose = require('mongoose')
const sellerreview = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    seller:{
        type:mongoose.Types.ObjectId
    },
    buyer:{
        type:mongoose.Types.ObjectId
    },
    service:{
        type:mongoose.Types.ObjectId
    },
    review:{
        type:String
    },
    rating:{
        type:Number
    }

},{
    timestamps:true
})


module.exports = mongoose.model('sellerreview',sellerreview)
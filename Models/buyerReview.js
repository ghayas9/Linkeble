const mongoose = require('mongoose')

const buyerreview = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    buyer:{
        type:mongoose.Types.ObjectId
    },
    seller:{
        type:mongoose.Types.ObjectId
    },
    review:String,
    rating:Number,
},{
    timestamps:true
})
module.exports = mongoose.model('buyerreview',buyerreview)

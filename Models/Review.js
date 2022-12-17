const mongoose = require('mongoose')
const review = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    by:{
        type:mongoose.Types.ObjectId
    },
    for:{
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


module.exports = mongoose.model('review',review)
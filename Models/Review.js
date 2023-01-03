const mongoose = require('mongoose')
const review = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    service_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'services' },
    createdby:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    createdfor:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
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
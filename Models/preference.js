const mongoose = require('mongoose')
const preference = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    service:{ type: mongoose.Schema.Types.ObjectId, ref: 'services' },
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
},{
    timestamps:true
})


module.exports = mongoose.model('preference',preference)
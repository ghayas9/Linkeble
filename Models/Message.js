const mongoose = require('mongoose')
const Message = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    message:String,
    createdby:mongoose.Types.ObjectId,
    createdfor:mongoose.Types.ObjectId,
    file:mongoose.Types.ObjectId,
},{
    timestamps:true
})

module.exports = mongoose.model('messages',Message)
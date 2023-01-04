const mongoose = require('mongoose')
const ChatList = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    createdby:mongoose.Types.ObjectId,
    createdfor:mongoose.Types.ObjectId,
    message:String
},{
    timestamps:true
})

module.exports = mongoose.model('chat',ChatList)
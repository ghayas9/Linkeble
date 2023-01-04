const mongoose = require('mongoose')
const ChatList = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    createdby:mongoose.Types.ObjectId,
    createdfor:mongoose.Types.ObjectId,
},{
    timestamps:true
})

module.exports = mongoose.model('ChatList',ChatList)
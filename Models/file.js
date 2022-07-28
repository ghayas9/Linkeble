const mongoose = require('mongoose')

const file = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    uid:mongoose.Types.ObjectId,
    filetype:String,
    name:String,
    link:String
},{
    timestamps:true
})

module.exports = mongoose.model('file',file)
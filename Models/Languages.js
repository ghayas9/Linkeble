const mongoose = require('mongoose')

const language = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name:String
},{
    timestamps:true
})

module.exports = mongoose.model('languages',language)
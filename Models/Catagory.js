const mongoose = require('mongoose')
module.exports = mongoose.model('cat',new mongoose.Schema({
        _id:mongoose.Types.ObjectId,
        name:String,
    }))
const mongoose = require('mongoose')
module.exports = mongoose.model('subcat',new mongoose.Schema({
        _id:mongoose.Types.ObjectId,
        cat:mongoose.Types.ObjectId,
        name:String,
    }))
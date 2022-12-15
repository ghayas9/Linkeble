const mongoose = require('mongoose')
module.exports = mongoose.model('catagories',new mongoose.Schema({
        _id:mongoose.Types.ObjectId,
        name:String,
        img:String,
        sub:[{
            _id:mongoose.Types.ObjectId,
        name:String}
        ]
    }))
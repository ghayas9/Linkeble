const mongoose = require('mongoose')
module.exports = mongoose.model('catagories',new mongoose.Schema({
        _id:mongoose.Types.ObjectId,
        name:String,
        sub:[{
            _id:mongoose.Types.ObjectId,
        name:String}
        ]
    }))
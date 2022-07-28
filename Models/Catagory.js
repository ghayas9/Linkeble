const mongoose = require('mongoose')

module.exports = mongoose.model('catagories',new mongoose.Schema({
        _id:mongoose.Types.ObjectId,
        name:String,
        subcat:{
            type:[{
                _id:mongoose.Types.ObjectId,
                name:String
            }]
        }
    }))
const mongoose = require('mongoose')
const Earning = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    total:{
        type:Number,
        default:0
    },
    pendding:{
        type:Number,
        default:0
    },
    current:{
        type:Number,
        default:0
    },
    withdraw:{
        type:Number,
        default:0
    },
    detail:{
        type:[
            new mongoose.Schema({
                _id:mongoose.Types.ObjectId,
                amount:Number,
                constaint:String
            },{
                timestamps:true
            })
        ],
        default:[]
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Earning',Earning)
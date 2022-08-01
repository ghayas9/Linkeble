const mongoose= require('mongoose')
const post = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    uid:mongoose.Types.ObjectId,
    title:String,
    description:String,
    file:{
        type:[{
            type:mongoose.Types.ObjectId,
            ref:'file'
        }]
    },
    catagory:mongoose.Types.ObjectId,
    subcatagory:mongoose.Types.ObjectId,
    delivertime:Number,
    budget:Number
},{
    timestamps:true
})

module.exports = mongoose.model('post',post)
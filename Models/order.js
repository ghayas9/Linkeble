const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'services' },
    talent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    buget: { type: Number },
    deliverydate: { type: Date },
    pkg: { type: String },

    /////new 1/////
    payment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'payment' },
    status: { type: String },
    ////new 1///

    ///new 2///
    file_link: { type: String },
    title: { type: String },
    detail: { type: String },
    ///new 2//

    isAccepted: { type: Boolean, default: true }
}, { timestamps:true })

module.exports = mongoose.model('order', orderSchema)
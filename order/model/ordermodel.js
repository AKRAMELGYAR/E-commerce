const mongoose = require('mongoose')

const Order = new mongoose.Schema({
    userId : {
        type : mongoose.SchemaTypes.ObjectId,
        required : true,
        ref : "user"
    },

    items : [
        {
        productId : {type : mongoose.Schema.ObjectId , ref : "Product"},
        quantity : {type : Number , default : 1},
        price : {type : Number}
    }
],

    totalPrice : {type : Number},

    shippingAddress : {
        street : String,
        city : String,
        phone : Number
    },

    orderDate: { type : Date , default : Date.now },

    paymentMethod : {
        type : String,
        enum : ['card','cash'],
        default : 'cash'
    },

    paymentStatus : { type : String, default : 'Pending' },

    deliveredAt : {type : Date}
})

module.exports = mongoose.model('order' , Order)
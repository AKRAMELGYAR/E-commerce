const mongoose = require('mongoose')
const CartSchema = new mongoose.Schema({
    userId : {
        type : mongoose.SchemaTypes.ObjectId,
        required : true,
        ref : 'user'

    },

    cartItem :[
        {
            productId : {type : mongoose.Schema.ObjectId , ref : "Product"},
            quantity : {type : Number , default : 1},
        } 
    ]
    ,
    totalPrice : {
        type : Number
    }
})

module.exports = mongoose.model('Cart' , CartSchema)
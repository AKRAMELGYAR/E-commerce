const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({

    name :{
        type : String,
        required : true,
    },

    price :{
        type : Number,
        required : true,
        min : 0
    },

    description : {
        type : String,
        required : true,
    },

    stock_quantity : {
        type : Number,
        required : true
    },

    img :{
        type : String,
    }
})

module.exports = mongoose.model("Product" , ProductSchema);
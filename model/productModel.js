const mongoose = require('mongoose');
const slugify  = require('slugify');
const ProductSchema = new mongoose.Schema({

    name :{
        type : String,
        required : true,
        trim : true,
        maxlength : [40,"maximum length of product name is 40"],
        minlength : [5,"minimum length of product name is 5"]
    },
    slug : {type : String},

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

ProductSchema.pre('save',function(next){
    this.slug = slugify(this.name , {lower : true})
    console.log(this)
    next();
})

module.exports = mongoose.model("Product" , ProductSchema);
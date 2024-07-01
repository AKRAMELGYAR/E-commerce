const mongoose = require('mongoose')

UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },

    lastName : {
        type : String,
        required : true
    },

    email : {
        type : String,
        unique : true,
        required : true
    },

    password : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model('user' , UserSchema)
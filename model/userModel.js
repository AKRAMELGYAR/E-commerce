const mongoose = require('mongoose')
const crypto = require('crypto')
const { type } = require('os')

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
        required : true,
    },

    role :{
        type : String,
        enum : ["admin","user","seller"],
        default : "user"
    },

    password : {
        type : String,
        required : true
    },
    token : {
        type : String
    },
    resetpasswordat : {
        type : Date
    },

    resetpasswordtoken : String,
    resetTokenExpire : Date,

    active : {
        type : Boolean,
        default : true,
        select : false
    }
})

UserSchema.pre(/^find/ , function (next){
    this.find({active : true})
    next()
})

UserSchema.methods.resetaftertocken = function (JWTTimestamp){
    if(this.resetpasswordat){
        const resetpassstamp = parseInt(
            this.resetpasswordat.getTime() / 1000,10)
        return resetpassstamp > JWTTimestamp
    }
    else{
        return false
    }
}

UserSchema.methods.generateResetPassToken = function(){
    const token = crypto.randomBytes(32).toString('hex')
    this.resetpasswordtoken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex')

    this.resetTokenExpire = Date.now * 60 * 1000
    console.log({token} , this.resetpasswordtoken)
    return token
}

module.exports = mongoose.model('user' , UserSchema)
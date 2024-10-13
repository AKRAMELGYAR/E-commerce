const joi = require('joi')

const userSchema = joi.object({
    firstName : joi.string().required(),
    lastName : joi.string().required(),
    email : joi.string().email().required(),
    password : joi.string().alphanum().min(3).max(30).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})

const productSchema = joi.object({
    name : joi.string().min(5).required(),
    price : joi.number().greater(0).required(),
    description : joi.string().min(10).required(),
    stock_quantity : joi.number().greater(0).required()
})

module.exports = {
    userSchema,
    productSchema
}
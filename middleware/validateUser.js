const joi = require('joi')
const AppError = require('../utils/AppError')

const userSchema = joi.object({
    firstName : joi.string().required(),
    lastName : joi.string().required(),
    email : joi.string().email().required(),
    password : joi.string().alphanum().min(3).max(30).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})

const validateUser = ( req , res, next)=>{
    const {error , value} = userSchema.validate(req.body)
    if(error)
        {
            return next(new AppError(`${error.details[0].message}` , 400))
        }
    return next()
}

module.exports = validateUser
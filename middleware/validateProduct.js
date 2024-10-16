const joi = require('joi')
const AppError = require('../utils/AppError')

const productSchema = joi.object({
    name : joi.string().min(5).required(),
    price : joi.number().greater(0).required(),
    description : joi.string().min(10).required(),
    stock_quantity : joi.number().greater(0).required()
})

const validateProduct = ( req , res, next)=>{
    const {error , value} = productSchema.validate(req.body)
    if(error)
        {
            return next(new AppError(`${error.details[0].message}` , 400))
        }
    return next()
}

module.exports = validateProduct
const AppError = require('../utils/AppError')
const {productSchema} = require('../utils/joi')

const validateProduct = ( req , res, next)=>{
    const {error , value} = productSchema.validate(req.body)
    if(error)
        {
            return next(new AppError(`${error.details[0].message}` , 400))
        }
    return next()
}

module.exports = validateProduct
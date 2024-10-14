const AppError = require('../utils/AppError')
const {userSchema} = require('../utils/joi')

const validateUser = ( req , res, next)=>{
    const {error , value} = userSchema.validate(req.body)
    if(error)
        {
            return next(new AppError(`${error.details[0].message}` , 400))
        }
    return next()
}

module.exports = validateUser
const AppError = require('../utils/AppError')

const verifyRole = function(...roles)
{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role))
        {
            return next(new AppError("u do not have permition to perform this action!",403))
        }
        next();
        }
}

module.exports = verifyRole
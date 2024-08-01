const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')

const verifyToken = (req,res,next)=>{
    const Auth = req.headers['Authorization'] || req.headers['authorization']

    if (!Auth)
    {
        next(new AppError("token is required!" , 401))
    }
    const token = Auth.split(' ')[1]

    try{
        const user = jwt.verify(token , process.env.JWTSECRETKEY)
        req.user = user
        next()
    }
    catch{
        next(new AppError("invalid token" , 401))
    }

}

module.exports = verifyToken
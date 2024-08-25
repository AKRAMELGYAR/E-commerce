const jwt = require('jsonwebtoken')

const generateToken =(Payload , res)=>{
    const token = jwt.sign(Payload , process.env.JWTSECRETKEY,{expiresIn : "1d"})
    return token
}





module.exports = generateToken
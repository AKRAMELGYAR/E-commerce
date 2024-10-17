const authServices = require('../service/authService')
const catchAsync = require('../../utils/catchAsync')


const Register = catchAsync(async(req , res , next)=>{
    const token = await authServices.Register(req.file , req.body)
    return res.status(201).json({
        msg : "done",
        token
    })
})

const login = catchAsync(async( req, res,next)=>{
    const token = await authServices.login(req.body.email , req.body.password , res)
    return res.status(200).json({success : true , msg : "login succssefully",token})
})


const forgetpassword = catchAsync(async(req,res,next)=>{
    const resettoken = await authServices.forgetpassword(req.body.email)
})


module.exports = {
    login,
    Register,
    forgetpassword,
}
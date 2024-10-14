const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')
const generateToken = require('../utils/GenerateToken')
const sendMail = require('../utils/mailer')
const {userSchema} = require('../utils/joi')

const Register = catchAsync(async(req , res , next)=>{
    // const {error , value} = userSchema.validate(req.body)
    // if(error)
    // {
    //     return next(new AppError(`${error.details[0].message}` , 400))
    // }
    const {firstName , email ,lastName , password} = req.body
    const olduser = await User.findOne({email})
    if(olduser)
        {
            return next(new AppError('account is already exists!' , 400))
        }

    const hash_pass = await bcrypt.hash(toString(password) , 12)
    const newuser = new User({
        firstName,
        lastName,
        email,
        password : hash_pass,
        avatar : req.file.filename
    })

    const token = generateToken({email : newuser.email , id : newuser._id})
    newuser.token = token
    await newuser.save();

    await sendMail({
        mail : newuser.email,
        subject : 'Welcome',
        message : 'welcome from our website!'
    })
    return res.status(201).json({
        msg : "done",
        token : newuser.token
    })
})

const login = catchAsync(async( req, res,next)=>{
    const {email , password} = req.body
    const user = await User.findOne({email})
    if(!user)
        {
            return next(new AppError("user not found!" , 404))
        }
    const pass = bcrypt.compare(toString(password) , user.password)
    if(pass)
        {
            const token = generateToken({email : user.email , id : user._id},res)

            res.cookie('JWT',token,
                {
                    maxAge : 86400,
                    // secure : ture /// production only
                    httpOnly : true
                })

            user.token = token
            await user.save();
            return res.status(200).json({success : true , msg : "login succssefully",token : user.token})
        }
    return next(new AppError("password or Email are incorrect!" , 500))
})


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

const forgetpassword = catchAsync(async(req,res,next)=>{
    const user = await User.findOne({email : req.body.email})
    if(!user){
        return next(new AppError("user are not exist!" , 404))
    }

    user.generateResetPassToken()
})


module.exports = {
    login,
    Register,
    verifyRole,
    forgetpassword,
}
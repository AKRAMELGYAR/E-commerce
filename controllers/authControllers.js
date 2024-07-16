const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')

const Register = async(req , res , next)=>{
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
        password : hash_pass
    })

    const token = jwt.sign({email : newuser.email , id : newuser._id } , process.env.JWTSECRETKEY)
    newuser.token = token

    await newuser.save();
    return res.status(201).json({
        msg : "done",
        token : newuser.token
    })
}

const login = async( req, res,next)=>{
    const {email , password} = req.body
    const user = await User.findOne({email})
    if(!user)
        {
            return next(new AppError("user not found!" , 404))
        }
    const pass = bcrypt.compare(toString(password) , user.password)
    if(pass)
        {
            const token = jwt.sign({email : user.email , id : user._id } , process.env.JWTSECRETKEY)
            user.token = token

            await user.save();
            return res.status(200).json({success : true , msg : "login succssefully",token : user.token})
        }
    return next(new AppError("password or Email are incorrect!" , 500))
}

const getUsers = catchAsync(async (req,res,next)=>{

    const users = await User.find()
    return res.status(200).json({success : true , data : users})   
})


module.exports = {
    login,
    Register,
    getUsers
}
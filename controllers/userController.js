const User = require('../model/userModel')
const catchAsync = require('../utils/catchAsync')

const filterbody = (obj , ...allowedFields)=>{
    const newobj = {}
    Object.keys(obj).forEach(key=>{
        if(allowedFields.includes(key))
        {
            newobj[key] = obj[key]
        }
    })
    return newobj
}

const getUsers = catchAsync(async (req,res,next)=>{

    const users = await User.find()
    return res.status(200).json({success : true , data : users})      
})


const updateUser = catchAsync(async(req,res,next)=>{
    const fields = filterbody(req.body , 'firstName' , 'lastName', 'email')
    const updatedUser = await User.findByIdAndUpdate(req.user.id ,fields , 
        {
            new : true,
            runValidators : true
        })
    return res.json({
        success : true,
        data : updatedUser
    })
})

const deleteUser = catchAsync(async(req,res,next)=>{
    await User.findByIdAndUpdate(req.user.id , {active : false})
    return res.json({
        success : true,
        data : null
    })
})
module.exports = {
    getUsers,
    updateUser,
    deleteUser
}
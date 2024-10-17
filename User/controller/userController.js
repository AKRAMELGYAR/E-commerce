const catchAsync = require('../../utils/catchAsync')
const userService = require('../service/userService')


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

    const users = await userService.getUsers()
    return res.status(200).json({success : true , data : users})      
})


const updateUser = catchAsync(async(req,res,next)=>{
    const updatedUser = await userService.updateUser(req.body,req.user._id)
    return res.json({
        success : true,
        data : updatedUser
    })
})

const deleteUser = catchAsync(async(req,res,next)=>{
    await userService.deleteUser(req.user.id)
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
const userRepo = require('../repository/userRepo')


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

const getUsers = async ()=>{
    return await userRepo.Findusers()      
}


const updateUser = async(Data,userId)=>{
    const fields = filterbody(Data , 'firstName' , 'lastName', 'email')
    return await userRepo.findUserByIdAndUpdate(userId ,fields)
}

const deleteUser = async(userId)=>{
    return await userRepo.deleteuser(userId)
}
module.exports = {
    getUsers,
    updateUser,
    deleteUser
}
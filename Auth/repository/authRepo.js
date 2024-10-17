const User = require('../../User/model/userModel')


const FindByEmail = async(email)=>{
    return await User.findOne({email}) 
}

const saveuser = async(userData)=>{
    const user = new User(userData)
    return await user.save()
}

module.exports = {
    FindByEmail,
    saveuser
}
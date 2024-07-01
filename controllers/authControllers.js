const User = require('../model/userModel')

const Register = async(req , res)=>{
    const f_name = req.body.f_name
    const l_name = req.body.l_name
    const email = req.body.email
    const password = req.body.password

    const isExist = await User.findOne({email : email})
    if(isExist)
        {
            return res.status(500).json({msg : "account is already exist"})
        }
    const newuser = new User({...req.body})

    await newuser.save();
    return res.status(201).json({msg : "done"})

}

const login = async( req, res)=>{
    const {email , password} = req.body
    const user = await User.findOne({email : email})
    if(!user)
        {
            return res.status(500).json({msg : "user not exist"})
        }
    const pass = await User.findOne({password : password})
    if(pass)
        {
            return res.status(200).json({success : true , msg : "login succssefully"})
        }
    return res.status(500).json({success : false , msg : "pass or email in incorrect"})
}


module.exports = {
    login,
    Register
}
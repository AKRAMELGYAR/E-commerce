const multer = require('multer')
const AppError = require('../utils/AppError')

const diskStorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'uploads')
    },
    filename : (req,file,cb)=>{
        const ext = file.mimetype.split('/')[1]
        const name = `user-${Date.now()}.${ext}`
        cb(null , name)
    }
})

const fileFilter = (req,file,cb)=>{
    const type = file.mimetype.split('/')[0]
    if(type === 'image')
    {
        return cb(null , true)
    }
    else{
        return cb(new AppError('file must be an image' , 401) , false)
    }
}

const uploads = multer({
    storage : diskStorage ,
    fileFilter 
})

module.exports = uploads
const Product = require('../model/productModel')
const ApiFeatures = require('../utils/ApiFeatures')
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')


const getAllProducts = catchAsync(async(req,res,next) => {
        const Features = new ApiFeatures(Product.find() , req.query)
        .Filter()
        .sort()
        .limit()
        .pagination()
        const products = await Features.query
        console.log('without cache')
        res.json({
            status : "success",
            result : products.length,
            data : products
        });
        
})

 const getSingleProduct = catchAsync(async (req,res,next) => {
        const product = await Product.findById(req.params.id)
        if(!product)
            {
                return next(new AppError('there is no product found with this ID' , 404))
            }
        res.json({
            status : "success",
            data : product
        })
 })

 const addProduct = catchAsync(async (req,res,next) =>{
        const {name ,price , description , stock_quantity } = req.body
        const filenames =[]
        req.files.forEach(el => {
            filenames.push(el.filename
            )
        });
        const newproduct = new Product({
            name,
            price,
            description,
            stock_quantity,
            img : filenames
        });        
        await newproduct.save({runValidators : true});
        res.status(201).json({
            status : "success",
            data : newproduct})
 })

 const updateProduct = catchAsync(async (req,res,next) =>{
        const product = await Product.updateOne({ _id : req.params.id} , {$set : {...req.body}} ,{
            new : true,
            runValidators : true
        });
        return res.status(200).json({
            status : "success",
            data : product})
 })

 const DeleteProduct = catchAsync(async(req,res,next) =>{
    const data = await Product.deleteOne({_id : req.params.id})
    res.json({success : true , msg : data})
 })

 const statistics = catchAsync(async(req,res,next)=>{
    const statistics = await Product.aggregate([
        {
            $match : {price : {$lte : 40000}}
        },
        {
            $group : {
                _id : null,
                num : {$sum : 1},
                minprice : {$min : '$price'},
                maxprice : {$max : '$price'}
            }
        }
    ])

    return res.json({
        status : 'success',
        data : statistics
    })
 })
 module.exports = {
    getAllProducts,
    getSingleProduct,
    addProduct,
    updateProduct,
    DeleteProduct,
    statistics
 }
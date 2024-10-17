const catchAsync = require('../../utils/catchAsync')
const productService = require('../service/productService')

const getAllProducts = catchAsync(async(req,res,next) => {
    const products = await productService.getAllProducts(req.query)
    console.log('without cache')
    res.json({
    status : "success",
    result : products.length,
    data : products
    });       
})

const getSingleProduct = catchAsync(async (req,res,next) => {
    const product = await productService.getSingleProduct(req.params.id)
    res.json({
        status : "success",
        data : product
    })
 })

const addProduct = catchAsync(async (req,res,next) =>{
    const newproduct = await productService.addProduct(req.body,req.files)
    res.status(201).json({
        status : "success",
        data : newproduct
    })
})

const updateProduct = catchAsync(async (req,res,next) =>{
    const product = await productService.updateProduct(req.params.id,req.body)
    return res.status(200).json({
        status : "success",
        data : product
    })
})

const DeleteProduct = catchAsync(async(req,res,next) =>{
    const data = await productService.DeleteProduct(req.params.id)
    res.json({success : true , msg : data})
})

const statistics = catchAsync(async(req,res,next)=>{
    const statistics = await productService.statistics()
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
const Product = require('../model/productModel')
const ApiFeatures = require('../utils/ApiFeatures')


const getAllProducts = async(req,res) => {
    try{
        const Features = new ApiFeatures(Product.find() , req.query)
        .Filter()
        .sort()
        .limit()
        .pagination()
        const products = await Features.query 
        res.json({
            status : "success",
            result : products.length,
            data : products
        });
        }
    catch(err)
    {
        return res.status(404).json({
            status : "faild",
            msg:err
        })
    }
}

 const getSingleProduct = async (req,res) => {
    try{
        const product = await Product.findById(req.params.id)
        if(!product)
            {
                return res.status(404).json({
                    status : "faild",
                    msg : "product not found"})
            }
        res.json({
            status : "success",
            data : product
        })
    }
    catch(err){
        return res.status(404).json({
            status : "faild",
            msg:err
        })
    }
 }

 const addProduct = async (req,res) =>{
    try{
        const newproduct = new Product({...req.body});
        await newproduct.save();
        res.status(201).json({
            status : "success",
            data : newproduct})
    }
    catch(err){
        return res.status(404).json({
            status : "faild",
            msg:err
        })
    }

 }

 const updateProduct = async (req,res) =>{
    try{
        const product = await Product.updateOne({ _id : req.params.id} , {$set : {...req.body}});
        return res.status(200).json({
            status : "success",
            data : product})
    }
    catch(err)
    {
        return res.status(404).json({
            status : "faild",
            msg:err
        })
    }
 }

 const DeleteProduct = async(req,res) =>{
    try{
    const data = await Product.deleteOne({_id : req.params.id})
    res.json({success : true , msg : data})
    }
    catch(err)
    {
        return res.status(404).json({
            status : "faild",
            msg:err
        })
    }
 }
 module.exports = {
    getAllProducts,
    getSingleProduct,
    addProduct,
    updateProduct,
    DeleteProduct
 }
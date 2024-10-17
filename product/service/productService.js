const ApiFeatures = require('../../utils/ApiFeatures')
const AppError = require('../../utils/AppError')
const productRepo = require('../repository/productRepo')

const getAllProducts = async(query) => {
    const Features = new ApiFeatures(productRepo.findAllProducts(), query)
    .Filter()
    .sort()
    .limit()
    .pagination()
    return await Features.query
}

const getSingleProduct = async (id) => {
    const product = await productRepo.findProductById(id)
    if(!product)
        {
            throw new AppError('there is no product found with this ID' , 404)
        }
    return product
}

const addProduct = async (productData , files) =>{
    const filenames =[]
    files.forEach(el => {
        filenames.push(el.filename)
    });
    const newproduct = {...productData,img : filenames}        
    await productRepo.saveProduct(newproduct)
    return newproduct
}

const updateProduct = async (id , updateData) =>{
    return await productRepo.updateProductById(id , updateData)
}

const DeleteProduct = async(id) =>{
    return await productRepo.deleteProductById(id)
}

const statistics = async()=>{
    return await productRepo.getProductStatistics()
}

 module.exports = {
    getAllProducts,
    getSingleProduct,
    addProduct,
    updateProduct,
    DeleteProduct,
    statistics
 }
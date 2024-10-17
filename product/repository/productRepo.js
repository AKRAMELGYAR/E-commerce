const Product = require('../model/productModel');

const findAllProducts = () => {
    return Product.find()
}

const findProductById = async (id) => {
    return await Product.findById(id);
}

const saveProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save({ runValidators: true });
}

const updateProductById = async (id, updateData) => {
    return await Product.updateOne({ _id: id }, { $set: { ...updateData } }, {
        new: true,
        runValidators: true,
    })
}

const deleteProductById = async (id) => {
    return await Product.deleteOne({ _id: id });
}

const getProductStatistics = async () => {
    return await Product.aggregate([
        {
            $match: { price: { $lte: 40000 } },
        },
        {
            $group: {
                _id: null,
                num: { $sum: 1 },
                minprice: { $min: '$price' },
                maxprice: { $max: '$price' },
            },
        },
    ])
}

module.exports = {
    findAllProducts,
    findProductById,
    saveProduct,
    updateProductById,
    deleteProductById,
    getProductStatistics,
};

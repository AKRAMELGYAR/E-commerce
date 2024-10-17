const Cart = require('../../Cart/model/cartModel')
const Order = require('../model/ordermodel')
const Product = require('../../product/model/productModel')

const FindCart = async(userId)=>{
    return await Cart.findOne({userId}).populate('cartItem.productId')
}

const createoreder = async(orderData)=>{
    const order = new Order({...orderData})
    return await order.save()
}

const FindProductById = async(id)=>{
    return await Product.findById(id)
}

const saveProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save({ runValidators: true });
}

const findCartAndUpdate = async(userId)=>{
    return await Cart.findOneAndUpdate({ userId }, { cartItem: [], totalPrice: 0 });
}

module.exports = {
    FindCart,
    createoreder,
    FindProductById,
    saveProduct,
    findCartAndUpdate
}
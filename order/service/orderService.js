const Cart = require('../../Cart/model/cartModel')
const AppError = require('../../utils/AppError')
const Order = require('../model/ordermodel')
const Product = require('../../product/model/productModel')
const orderRepo = require('../repository/orderRepo')

const creatOrder = async(shippingAddress,paymentMethod,userId)=>{
    
    const cart = await orderRepo.FindCart(userId)
    if(!cart) throw new AppError('your cart is empty!' , 404)
    const totalPrice = cart.totalPrice
    const order = {
        userId,
        items : cart.cartItem,
        totalPrice,
        shippingAddress,
        paymentMethod
    }
    await orderRepo.createoreder(order)
    
    for(const el of cart.cartItem){
        const product = await orderRepo.FindProductById(el.productId)
        if(product){
            product.stock_quantity -= el.quantity
        }
        await orderRepo.saveProduct(product)
    }
    await orderRepo.findCartAndUpdate(userId)

    return order
}

module.exports = {
    creatOrder
}
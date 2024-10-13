const Cart = require('../model/cartModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const Order = require('../model/ordermodel')
const Product = require('../model/productModel')


const creatOrder = catchAsync(async(req,res,next)=>{
    const {shippingAddress , paymentMethod} = req.body
    const userId = req.user._id
    const cart = await Cart.findOne({userId}).populate("cartItem.productId")
    if(!cart)
    {
        return next(new AppError('your cart is empty!' , 404))
    }
    const totalPrice = cart.totalPrice
    const order = new Order({
        userId,
        items : cart.cartItem,
        totalPrice,
        shippingAddress,
        paymentMethod
    })
    await order.save()
    
    for(const el of cart.cartItem){
        const product = await Product.findById(el.productId)
        if(product){
            product.stock_quantity -= el.quantity
        }
        await product.save()
    }
    await Cart.findOneAndUpdate({ userId }, { cartItem: [], totalPrice: 0 });

    return res.json({
        success : true,
        data : order
    })
})

module.exports = {
    creatOrder
}
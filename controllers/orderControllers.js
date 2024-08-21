const Cart = require('../model/cartModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const Order = require('../model/ordermodel')


const creatOrder = catchAsync(async(req,res,next)=>{
    const {shippingAddress , paymentMethod} = req.body
    const userId = req.user.id
    const cart = await Cart.findOne({userId}).populate("cartItem.productId")
    console.log(cart)
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
    return res.json({
        success : true,
        data : order
    })
})

module.exports = {
    creatOrder
}
const catchAsync = require('../../utils/catchAsync');
const CartService = require('../service/cartService')


const getcart = catchAsync(async(req , res,next) =>{
    const cart = await CartService.getcart(req.user._id)
    return res.status(200).json({status : "success" , data : cart})     
})

const addToCart = catchAsync(async(req , res,next) => {
    const cart = await CartService.addToCart(req.body.productId , req.body.quantity , req.user._id)
    res.status(200).json(cart)
})

const removeitem = catchAsync(async (req , res,next)=>{
    const cart = CartService.removeitem(req.user._id, req.params.productId)
    return res.status(200).json({
        status : "success",
        msg : "done",
        cart
    })
})

const updeteQuantity = catchAsync(async (req,res,next) =>{
    const cart = await CartService.updeteQuantity(req.user._id, req.params.productId, req.body.quantity)
    return res.status(200).json({
        status: "success",
        msg: "Quantity updated successfully",
        cart
    })
})

module.exports = {
    getcart,
    addToCart,
    removeitem,
    updeteQuantity
}
const Cart = require('../../Cart/model/cartModel')
const catchAsync = require('../../utils/catchAsync')
const AppError = require('../../utils/AppError')
const Order = require('../model/ordermodel')
const Product = require('../../product/model/productModel')
const orederService = require('../service/orderService')

const creatOrder = catchAsync(async(req,res,next)=>{
    const order = await orederService.creatOrder(req.body.shippingAddress,req.body.paymentMethod,req.user._id)
    return res.json({
        success : true,
        data : order
    })
})

module.exports = {
    creatOrder
}
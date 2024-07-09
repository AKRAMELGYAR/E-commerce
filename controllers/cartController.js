const Product = require('../model/productModel')
const Cart = require('../model/cartModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const totalprice = (cart) => {
    let totalprice = 0;
    cart.cartItem.forEach(item => {
        totalprice += item.quantity * item.price
    });
    return cart.totalprice = totalprice

}


const getcart = catchAsync(async(req , res,next) =>{
    const userId = req.params.userId
    const cart = await Cart.findOne({userId}).populate('cartItem.productId')
    if(cart)
        {
            return res.status(200).json({status : "success" , data : cart})
        }
    return next(new AppError ('no cart found for this user!' , 404)) 
})

const addToCart = catchAsync(async(req , res,next) => {

    const {productId , quantity} = req.body
    const userId = req.params.userId

    let cart = await Cart.findOne({userId})
    if(!cart)
        {
            cart = Cart.create({
                userId,
                cartItem :[]
            })
        }
    const product = await Product.findById(productId).select('price')
    req.body.price = product.price
    if(!product)
        {
            return next(new AppError('product not found',404))
        }
    const itemexist =  cart.cartItem.find((item) =>{
        return item.productId == productId;
    })
    if(itemexist)
        {
            itemexist.quantity +=quantity
            itemexist.price = req.body.price
            cart.totalPrice = totalprice(cart)
        }
    else{
    cart.cartItem.push({...req.body})
    }
    cart.totalPrice = totalprice(cart)
    await cart.save();
    res.status(200).json(cart)
})

const removeitem = catchAsync(async (req , res,next)=>{
        const userId = req.params.userId
        const productId = req.params.productId
        const cart = await Cart.findOne({userId})
        if(!cart)
            {
                return next(new AppError ('no cart found for this user!' , 404))
            }
        else{
            cart.cartItem = cart.cartItem.filter(item =>{
               return !item.productId.equals(productId)
            })
            cart.totalPrice = totalprice(cart)
            await cart.save()
            return res.status(200).json({
                status : "success",
                msg : "done"
            })
        }
})

const updeteQuantity = catchAsync(async (req,res,next) =>{
        const userId = req.params.userId
        const productId = req.params.productId
        const {quantity} = req.body

        const cart = await Cart.findOne({userId})
        if(!cart)
            {
                return next(new AppError ('no cart found for this user!' , 404))
            }
        
        const item = cart.cartItem.find((item) =>{
            return item.productId == productId
        })
        if(item)
            {
                item.quantity = quantity
                cart.totalPrice = totalprice(cart)
                await cart.save()
                return res.status(200).json({
                    status: "success",
                    msg: "Quantity updated successfully",
                    cart
                })
            }
})

module.exports = {
    getcart,
    addToCart,
    removeitem,
    updeteQuantity
}
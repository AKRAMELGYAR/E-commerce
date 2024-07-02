const Product = require('../model/productModel')
const Cart = require('../model/cartModel')

const totalprice = (cart) => {
    let totalprice = 0;
    cart.cartItem.forEach(item => {
        totalprice += item.quantity * item.price
    });
    return cart.totalprice = totalprice

}


const getcart = async(req , res) =>{
    try{
    const userId = req.params.userId
    const cart = await Cart.findOne({userId}).populate('cartItem.productId')
    if(cart)
        {
            return res.status(200).json({status : "success" , data : cart})
        }
    return res.status(404).json({status : "faild" , msg : "cart not found"})
    }
    catch(err)
    {
        return res.status(404).json({
            status : "faild",
            msg : err
        })
    }
}

const addToCart = async(req , res) => {
    try{
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
            return res.status(404).json({status : "faild" , msg : "product not found"})
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
    }
    catch(err)
    {
        return res.status(404).json({
            status : "faild",
            msg:err
        })
    }
}

const removeitem = async (req , res)=>{
    try{
        const userId = req.params.userId
        const productId = req.params.productId
        const cart = await Cart.findOne({userId})
        if(!cart)
            {
                return res.status(404).json({
                    status : "faild",
                    msg : "there is no cart exist for this user"
                })
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
    }
    catch(err)
    {
        res.status(404).json({
            status : "faild",
            msg : err
        })
    }

}

const updeteQuantity = async (req,res) =>{
    try{
        const userId = req.params.userId
        const productId = req.params.productId
        const {quantity} = req.body

        const cart = await Cart.findOne({userId})
        if(!cart)
            {
                return res.status(404).json({
                    status : "faild",
                    msg : "there is no cart exist for this user"
                })
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
        }
        catch(err)
        {
            console.log(err)
            res.status(404).json({
                status : "faild00",
                msg : err
            })
        }

}

module.exports = {
    getcart,
    addToCart,
    removeitem,
    updeteQuantity
}
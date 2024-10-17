const AppError = require('../../utils/AppError');
const CartRepo = require('../repository/cartRepo')

const totalprice = (cart) => {
    let totalprice = 0;
    cart.cartItem.forEach(item => {
        totalprice += item.quantity * item.price
    });
    return cart.totalprice = totalprice
}


const getcart = async(id) =>{
    const cart = await CartRepo.FindCart(id)
    if(cart)
        {
            return cart
        }
    throw new AppError ('no cart found for this user!' , 404)
}

const addToCart = async(productId , quantity,id) => {

    let cart = await CartRepo.FindCart(id)
    if(!cart)cart = await CartRepo.createCart(id)

    const product = await CartRepo.FindProductById(productId)
    if(!product)throw new AppError('product not found',404)
        
    const itemexist =  cart.cartItem.find((item) =>{
        return item.productId == productId;
    })

    if(itemexist)
        {
            itemexist.quantity +=quantity
            itemexist.price = product.price
            cart.totalPrice = totalprice(cart)
        }

    else{
        cart.cartItem.push({productId , quantity,price : product.price})
    }
    cart.totalPrice = totalprice(cart)
    await CartRepo.saveCart(cart);
    return cart
}

const removeitem = async (userId , productId)=>{
        const cart = await CartRepo.FindCart(userId)
        if(!cart)
            {
                throw new AppError ('no cart found for this user!' , 404)
            }
        else{
            cart.cartItem = cart.cartItem.filter(item =>{
               return !item.productId.equals(productId)
            })
            cart.totalPrice = totalprice(cart)
            await CartRepo.saveCart(cart)
            return cart
        }
}

const updeteQuantity = async (userId , productId , quantity) =>{

    const cart = await CartRepo.FindCart(userId)
    if(!cart)throw new AppError ('no cart found for this user!' , 404)

    const item = cart.cartItem.find(item =>item.productId._id.toString() === productId)
    if (!item) throw new AppError('Item not found in cart!', 404)

    item.quantity = quantity
    cart.totalPrice = totalprice(cart)
    await CartRepo.saveCart(cart)
    return cart
}

module.exports = {
    getcart,
    addToCart,
    removeitem,
    updeteQuantity
}
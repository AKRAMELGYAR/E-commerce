const express = require('express');

const AppError = require('./utils/AppError')
const GlobalError = require('./controllers/errorController')


const dotenv = require('dotenv')
dotenv.config({path : './config.env'})

const morgan = require('morgan')

const { initializeRedisClient } = require("./middleware/redis");
const mongoose = require('mongoose');

async function startserver (){

const app = express();
app.use(express.json());
app.use(GlobalError)
app.use(morgan('dev'))

await initializeRedisClient()

/////PRODUCT
const productRoutes = require('./routes/productRoutes')
app.use('/api/products' , productRoutes )

//////USERS
const userRoutes = require('./routes/userRouter')
app.use('/api/users' , userRoutes)

//////CART
const cartRoutes = require('./routes/CartRouter')
app.use('/api/cart' , cartRoutes )

//////ORDER
const orderRoutes = require('./routes/orderRouter')
app.use('/api/order' , orderRoutes)

app.all('*' , (req,res,next)=>{
    next(new AppError(`can not find ${req.originalUrl} on this server!` ,404))
})

mongoose.connect(process.env.URI)
.then(
    app.listen(process.env.PORT, ()=>{
        console.log(`started on port ${process.env.PORT}`)
    })
)
.catch(err=>{console.log(err)})
}

startserver().then('done all').catch(err=>console.log(err))
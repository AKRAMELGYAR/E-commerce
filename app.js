const express = require('express');
const helmet = require('helmet')
const dotenv = require('dotenv')
const AppError = require('./utils/AppError')
const GlobalError = require('./controllers/errorController')
const ratelimit = require('express-rate-limit')
const dataSanitizer = require('express-mongo-sanitize')
const xss = require('xss-clean')
const morgan = require('morgan')
const { initializeRedisClient } = require("./middleware/redis");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


dotenv.config({path : './config.env'})


const rate = ratelimit({
    max : 100,
    windowMs : 60 * 60 * 1000,
    message : 'There is too many requestes from this IP, Plz Try After one Hour'
})


async function startserver (){

const app = express();
/////security
app.use(helmet())
app.use(express.json({limit : '10kb'}));
app.use(dataSanitizer()) //// sanitize data against Nosql injection
app.use(xss()) //// sanitize data against XSS
app.use('/api' , rate) ////limiting requests form same IP
////////
app.use(cookieParser())
app.use(GlobalError)
app.use(morgan('dev'))


await initializeRedisClient()

/////PRODUCT ROUTER
const productRoutes = require('./routes/productRoutes')
app.use('/api/products' , productRoutes )

//////AUTH ROUTER
const authRoutes = require('./routes/authRouter')
app.use('/api/auth' , authRoutes)

//////USERS ROUTER
const userRoutes = require('./routes/userRouter')
app.use('/api/users' , userRoutes)

//////CART ROUTER
const cartRoutes = require('./routes/CartRouter')
app.use('/api/cart' , cartRoutes )

//////ORDER ROUTER
const orderRoutes = require('./routes/orderRouter')
app.use('/api/order' , orderRoutes)

////// GLOBAL ERROR HENDLER
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
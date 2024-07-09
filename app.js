const express = require('express');
const app = express();

const AppError = require('./utils/AppError')
const GlobalError = require('./controllers/errorController')

app.use(express.json());

const dotenv = require('dotenv')
dotenv.config({path : './config.env'})

const morgan = require('morgan')
app.use(morgan('dev'))

/////PRODUCT
const productRoutes = require('./routes/productRoutes')
app.use('/api/products' , productRoutes )

//////USERS
const userRoutes = require('./routes/userRouter')
app.use('/api/users' , userRoutes)

//////CART
const cartRoutes = require('./routes/CartRouter')
app.use('/api/cart' , cartRoutes )

app.all('*' , (req,res,next)=>{
    next(new AppError(`can not find ${req.originalUrl} on this server!` ,404))
})
app.use(GlobalError)

const mongoose = require('mongoose');
mongoose.connect(process.env.URI)
.then(
    app.listen(process.env.PORT, ()=>{
        console.log(`started on port ${process.env.PORT}`)
    })
)
.catch(err=>{console.log(err)})
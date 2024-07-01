const express = require('express');
const app = express();

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

const mongoose = require('mongoose');
mongoose.connect(process.env.URI)
.then(
    app.listen(process.env.PORT, ()=>{
        console.log(`started on port ${process.env.PORT}`)
    })
)
.catch(err=>{console.log(err)})
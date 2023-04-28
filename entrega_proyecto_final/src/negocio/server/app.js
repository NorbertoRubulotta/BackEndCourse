import express from 'express'

import http from 'http';
import cookieParser from 'cookie-parser'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { SALT } from '../../config/config.js';
import { routerProducts } from '../../routers/productsRouter.js';
import { routerSession } from '../../routers/sessionRouter.js';
import { routerUsers } from '../../routers/userRouter.js';
import { routerShoppingCart } from '../../routers/cartRouter.js';
import { routerImages } from '../../routers/imageRouter.js';
import { routerOrders } from '../../routers/orderRouter.js';


export const app = express()
export const httpServer = http.createServer(app);


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser('secret'))
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://coderhouse:coderhouse@cluster0.z9shnaw.mongodb.net/ecommerce',

    }),
    secret: SALT,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}))

app.use('/api/products', routerProducts)
app.use('/api/shoppingcartproducts', routerShoppingCart)
app.use('/api/users', routerUsers)
app.use('/api/orders', routerOrders)
app.use('/api/sessions', routerSession)
app.use('/api/images', routerImages)


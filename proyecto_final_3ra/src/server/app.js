import express from 'express'
import { routerProducts, routerShoppingCart, routerLogout, routerUsers } from '../routers/routes_controllers.js';
import http from 'http';
import isAuthenticated from 'passport-local'
import cookieParser from 'cookie-parser'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { passportMiddleware, passportSessionHandler } from '../middlewares/passport.js';
import { SALT } from '../config/config.js';


// Server
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
app.use(passportMiddleware);
app.use(passportSessionHandler);

app.use('/api/products', routerProducts)
app.use('/api/shoppingcartproducts', routerShoppingCart)
app.use('/', routerUsers)
app.use('/logout', routerLogout)


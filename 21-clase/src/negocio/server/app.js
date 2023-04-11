import express from 'express'
import http from 'http';
import routerApiProducts from '../../router/routerApiProducts.js'
import routerApiMessages from '../../router/routerApiMessages.js'
import isAuthenticated from 'passport-local'
import cookieParser from 'cookie-parser'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { routerLogin, routerLogout, routerRegister } from '../../router/routerAuthentication.js';
import { passportMiddleware, passportSessionHandler } from '../../middlewares/passport.js';
import { logger, loggerFileWarn } from '../../persistence/loggers/logger.js';

export const app = express();
export const httpServer = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', routerApiProducts);
app.use('/api/messages', routerApiMessages);
app.use(cookieParser('secret'))
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://coderhouse:coderhouse@cluster0.z9shnaw.mongodb.net/ecommerce',

    }),
    secret: 'desafio12',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}))

export function isAuth(req, res, next) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    if (req.isAuthenticated()) {
        res.cookie('username', req.user.username);
        next()
    } else {
        res.redirect('/login');
    }
}

app.use(passportMiddleware);
app.use(passportSessionHandler);
app.use('/login', routerLogin);
app.use('/logout', routerLogout);
app.use('/register', routerRegister);
/* app.use('/home', isAuth, home); */

app.all('*', (req, res) => {
    loggerFileWarn.warn({ Route: req.originalUrl, Method: req.method, Error: 'Route not found' })
    logger.warn({ Route: req.originalUrl, Method: req.method, Error: 'Route not found' })
    res.status(404).json({ Error: "Route not found" })
})   

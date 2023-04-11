import express from 'express'
import { Server } from "socket.io";
import http from 'http';
import routerApiProducts from '../router/routerApiProducts.js'
import routerApiMessages from '../router/routerApiMessages.js'
import routerApiProductsTest from '../router/routerApiProductsTest.js'
import isAuthenticated from 'passport-local'
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { routerLogForm, routerLogin, routerLogout, routerRegister } from '../router/routerAuthentication.js';
import { engine } from 'express-handlebars'
import { passportMiddleware, passportSessionHandler } from '../middlewares/passport.js';
import { routerInfo } from '../router/routerInfo.js';
import { routerRandoms } from '../router/routerRandoms.js';

import { logger, loggerFileWarn } from '../loggers/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
export const httpServer = http.createServer(app);

app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
app.set('views', 'views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', routerApiProducts);
app.use('/api/messages', routerApiMessages);
app.use('/api/products-test', routerApiProductsTest);
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



/* app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/public' })
}) */


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
app.use('/', routerLogForm);
app.use('/register', routerRegister);
app.use('/info', routerInfo);
app.use('/compression', routerInfo);
app.use('/api/randoms', routerRandoms);


app.use('/home', isAuth, home);
function home(req, res) {

    app.use(express.static('public'));
    res.sendFile(path.join(__dirname, '../../public', 'index.html'), { username: req.user.username })

}
// cuando agrego esto e intento loguearme me tira este Warn {"level":40,"time":1677090072117,"pid":23800,"hostname":"LAPTOP-I4ELM5HJ","Route":"/js/index.js","Method":"GET","Error":"Route not found"}
app.all('*', (req, res) => {
    loggerFileWarn.warn({ Route: req.originalUrl, Method: req.method, Error: 'Route not found' })
    logger.warn({ Route: req.originalUrl, Method: req.method, Error: 'Route not found' })
    res.send({ Error: "Route not found" })
})   

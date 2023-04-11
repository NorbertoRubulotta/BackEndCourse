import express from 'express'
import { Server } from "socket.io";
import http from 'http';
import routerApiProducts from './router/routerApiProducts.js'
import routerApiMessages from './router/routerApiMessages.js'
import routerApiProductsTest from './router/routerApiProductsTest.js'
import path from 'path';
import { fileURLToPath } from 'url';
import { normalizeMessages } from './utils/normalize.js'
import ContainerMongoDB from './containers/messagesContainerMongo.js';
import cookieParser from 'cookie-parser'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { routerLogForm, routerLogin, routerLogout } from './router/routerAuthentication.js';
import { engine } from 'express-handlebars'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
export const httpServer = http.createServer(app);
const io = new Server(httpServer);

const messagesDB = new ContainerMongoDB('messages');

app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
app.set('views', 'src/views');
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

function home(req, res) {
    app.use(express.static('src/public'));
    res.sendFile('index.html', { root: __dirname + '/public' })
}

// RUTAS PARA EL LOGIN
app.use('/login', routerLogin);
app.use('/logout', routerLogout);
app.use('/', routerLogForm);

app.use('/home', auth, home);


// MIDELWERE DE AUTENTICACION
function auth(req, res, next) {

    const username = req.session.username
    if (!req.session.username) {
        res.redirect('/login')
    } else {

        req.session.regenerate(function () {
            req.session.username = username
            next()
        });
    }
}


io.on('connection', async (client) => {
    console.log("Usuario conectado:", client.id);

    const msg = await messagesDB.getAll();
    const normalizedMessages = normalizeMessages(msg);
    io.sockets.emit("loadMessages", normalizedMessages)


    client.on("newMessage", async (data) => {
        await messagesDB.save(data);
        const msg = await messagesDB.getAll()
        const normalizedMessages = normalizeMessages(msg);
        io.sockets.emit("loadMessages", normalizedMessages)
    })

});

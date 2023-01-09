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

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const app = express();
export const httpServer = http.createServer(app);
const io = new Server(httpServer);

const messagesDB = new ContainerMongoDB('messages');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/products', routerApiProducts);
app.use('/api/messages', routerApiMessages);
app.use('/api/products-test', routerApiProductsTest);



app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/public' })
})

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
;
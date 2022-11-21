/* ===================== PRODUCTOS PARA CARGAR =========================================

{"title": "Escuadra", "price": "123.45", "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"}
{"title": "Calculadora", "price": "234.56", "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"}
{"title": "Globo Terráqueo", "price": "345.67", "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"}
*/

const express = require('express');
const { Server: HttpServer } = require('http');
const { mainModule } = require('process');
const { Server: IOServer } = require('socket.io')
const fs = require('fs');
const { randomUUID } = require('crypto');
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/public' })
})

httpServer.listen(8080, function () {
    console.log('Servidor corriendo en http://localhost:8080');
})

class ContainerFile {
    #products
    #route

    constructor(route) {
        this.#products = [],
            this.#route = route;
    }

    async save(product) {
        this.#products.push(product)
        await fs.promises.writeFile(this.#route, JSON.stringify(this.#products))
    }

    async getAll() {
        this.#products = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'))
        return this.#products
    }

    async getById(id) {
        this.#products = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'))
        const result = this.#products.find(products => products.id === id);
        if (result) {
            return result
        }
        return null
    }

    async deleteById(id) {
        this.#products = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'));
        const index = this.#products.indexOf(this.#products.find(products => products.id === id));
        if (index === -1) {
            return index
        } else {
            const deleted = this.#products[index]
            this.#products.splice(index, 1);
            await fs.promises.writeFile(this.#route, JSON.stringify(this.#products))
            return deleted
        }
    }

    async deleteAll() {
        this.#products = [];
        await fs.promises.writeFile(this.#route, JSON.stringify(this.#products))
    }
    async getIndexById(id, body) {
        this.#products = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'));
        const index = this.#products.indexOf(this.#products.find(products => products.id === id));
        if (index === -1) {
            return index
        } else {
            this.#products[index] = body;
            await fs.promises.writeFile(this.#route, JSON.stringify(this.#products))
        }
    }
}

const routeFile = './products.txt';
const routeFileChat = './chat.txt';
const allProducts = new ContainerFile(routeFile);
const chat = new ContainerFile(routeFileChat);


async function main() {

    await fs.promises.writeFile(routeFile, '[]');
    await fs.promises.writeFile(routeFileChat, '[]');

    io.on('connection', async function (socket) {

        console.log('Un cliente se ha conectado');
        const products = await allProducts.getAll();
        const msgs = await chat.getAll();
        socket.emit('messages', msgs);
        socket.emit('products', products);

        socket.on('new-message', async data => {
            await chat.save(data);
            const messages = await chat.getAll();
            io.sockets.emit('messages', messages);
        });

        socket.on('new-product', async data => {
            const newProduct = data;
            newProduct.id = randomUUID();
            await allProducts.save(newProduct);
            const products = await allProducts.getAll();
            io.sockets.emit('products', products);
        });
    });



}
app.use(express.static('public'));

main()
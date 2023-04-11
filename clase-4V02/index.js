
const fs = require('fs');
const express = require('express');
const { routerWeb } = require("./routers/routerWeb.js");
const { randomUUID } = require('crypto');
const { app } = require("./server.js");

app.use('/static', express.static('public'))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




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
            this.#products[index] = { ...body, id };
            await fs.promises.writeFile(this.#route, JSON.stringify(this.#products))
        }
    }
}

/* ===================== PRODUCTOS PARA CARGAR =========================================

{"title": "Escuadra", "price": "123.45", "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"}
{"title": "Calculadora", "price": "234.56", "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"}
{"title": "Globo Terráqueo", "price": "345.67", "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"}
*/



async function main() {

    const routeFile = './products.txt';
    const allProducts = new ContainerFile(routeFile);
    const products = await allProducts.getAll();


    //-------------------CONTROLADORES--------------//

    async function controllerGetProducts(req, res) {
        const products = await allProducts.getAll();
        res.json(products);
    } //funciona//


    async function controllerPostProducts({ body }, res) {
        const newProduct = body;
        newProduct.id = randomUUID();
        await allProducts.save(newProduct);
        res.status(201);
        res.json(newProduct);
    } //funciona//


    async function controllerGetProductsById({ params: { id } }, res) {
        const buscado = await allProducts.getById(id);
        if (buscado === null) {
            res.status(404);
            res.json({ mensaje: `Product with ID:(${id}) not found` });
        } else {
            res.json(buscado);
        }

    } //funciona//


    async function controllerPutProductbyId({ body, params: { id } }, res) {
        const searchedIndex = await allProducts.getIndexById(id, body);

        if (searchedIndex === -1) {
            res.status(404);
            res.json({ mensaje: `Product with ID:(${id}) not found` });
        } else {
            const newElement = { ...body, id }
            res.json(newElement);
        }
    } //funciona//


    async function controllerDeleteProductByID({ params: { id } }, res) {
        const deleted = await allProducts.deleteById(id);
        if (deleted === -1) {
            res.status(404);
            res.json({ message: `Product with ID:(${id}) not found` });
        } else {
            res.json(deleted);
        }
    } //funciona//





    const routerApi = express.Router();
    // api rest
    routerApi.get('/', controllerGetProducts);
    routerApi.post('/', controllerPostProducts);
    routerApi.get('/:id', controllerGetProductsById);
    routerApi.put('/:id', controllerPutProductbyId);
    routerApi.delete('/:id', controllerDeleteProductByID);

    app.use('/', routerWeb)
    app.use('/api/products', routerApi)

    return products
}

main()




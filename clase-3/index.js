
const fs = require('fs');
const express = require('express');


const app = express();

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
    this.#products.splice(index, 1);
    await fs.promises.writeFile(this.#route, JSON.stringify(this.#products))
  }

  async deleteAll() {
    this.#products = [];
    await fs.promises.writeFile(this.#route, JSON.stringify(this.#products))
  }
}



async function main() {

  const routeFile = './products.txt';
  const allProducts = new ContainerFile(routeFile);
  await fs.promises.writeFile(routeFile, '[]');

  await allProducts.save({ id: 1, title: "Escuadra", price: 123.45, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png" });
  await allProducts.save({ id: 2, title: "Calculadora", price: 234.56, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png" });
  await allProducts.save({ id: 3, title: "Globo Terráqueo", price: 345.67, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png" });

  const products = await allProducts.getAll();
  const randomProduct = Math.floor(Math.random() * products.length);


  app.get('/', (req, res) => {
    res.send('<h1>Servidor desafío 3<h1/>')
  })

  app.get('/products', (req, res) => {
    res.send(`${JSON.stringify(products)}`)
  })

  app.get('/randomProduct', (req, res) => {
    res.send(`${JSON.stringify(products[randomProduct])}`)
  })

  function runServer() {

    const server = app.listen(8080, () => {
      console.log(`Server running on PORT ${server.address().port}`)
    })
    server.on("error", error => console.log(`Error en servidor ${error}`))
  }

  runServer();

  return products
}

main()


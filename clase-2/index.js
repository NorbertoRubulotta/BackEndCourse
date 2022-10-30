
const fs = require('fs');

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

async function updateProducts() {

  const routeFile = './products.txt';

  await fs.promises.writeFile(routeFile, '[]');

  const allProducts = new ContainerFile(routeFile);


  await allProducts.save({ id: 1, title: "Ron", price: 18, thumbnail: "www.ron.com" });
  await allProducts.save({ id: 2, title: "Vodka", price: 15, thumbnail: "www.vodka.com" });
  await allProducts.save({ id: 3, title: "Gin", price: 13, thumbnail: "www.gin.com" });
  await allProducts.save({ id: 4, title: "Fernet", price: 21, thumbnail: "www.Fernet.com" });


}

updateProducts();


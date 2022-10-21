
class Container {
  #products
  constructor() {
    this.#products = []
  }

  save(product) {
    this.#products.push(product)
  }

  getById(id) {
    const result = this.#products.find(products => products.id === id);
    if (result) {
      return result
    }
    return null
  }

  getAll() {
    return this.#products
  }

  deleteById(id) {
    const index = this.#products.indexOf(this.#products.find(products => products.id === id));
    this.#products.splice(index, 1);
  }

  deleteAll() {
    this.#products = []
  }
}

function updateProducts() {
  
  const allProducts = new Container;

  allProducts.save({ id: 1, title: "Ron", price: 18, thumbnail: "www.ron.com" });
  allProducts.save({ id: 2, title: "Vodka", price: 15, thumbnail: "www.vodka.com" });
  allProducts.save({ id: 3, title: "Gin", price: 13, thumbnail: "www.gin.com" });
  allProducts.save({ id: 4, title: "Fernet", price: 21, thumbnail: "www.Fernet.com" });

  let showAll = allProducts.getAll();
  console.log(showAll);

  const getProduct = allProducts.getById(4);
  console.log(getProduct);

  allProducts.deleteById(4);
  showAll = allProducts.getAll();
  console.log(showAll);

  allProducts.deleteAll();
  showAll = allProducts.getAll();
  console.log(showAll);

}

updateProducts();
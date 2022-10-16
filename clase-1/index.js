
const container = [];

class Contenedor {

  constructor(id, title, price, thumbnail) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
  };

  save(product) {
    return container.push(product);
  }

  getById(id) {
    const result = container.find(container => container.id == id);
    if (result) {
      return result
    }
    return null
  }


  deleteById(id) {
  /*   const index = container.indexOf(id);

    console.log(index); */

    container.splice(id-1, 1);
  }

  getAll() {
    return container;
  }


  deleteAll() {
    container.splice(0, container.length);
  }

}


let product1 = new Contenedor(1, 'Ron Bacardi', 18, 'IMGron');
product1.save(product1);

product1 = new Contenedor(2, 'Campari', 22, 'IMGcampari');
product1.save(product1);

product1 = new Contenedor(3, 'Fernet Branca', 24, 'IMGfernet');
product1.save(product1);

product1 = new Contenedor(4, 'Aperol', 20, 'IMGaperol');
product1.save(product1);

product1 = new Contenedor(5, 'Gin', 22, 'IMGgin');
product1.save(product1);

console.log("Se muestran todos los productos guardados");
console.log(container);


let findProduct = product1.getById(4);
console.log("Se muestra el producto con el ID seleccionado");
console.log(findProduct);


const allItems = product1.getAll();
console.log("Se traen todos los productos guardados");
console.log(allItems);


product1.deleteById(1);
console.log("Se borra el elemento con el ID elegido");
console.log(container);

product1.deleteAll();
console.log("Se borran todos los elementos");
console.log(container);


/* 
const numeros = {};

function getAleatorio() {
    return parseInt(Math.random() * 20) + 1
}

for (let i = 0; i < 10000; i++) {
    const numero = getAleatorio();
    if (!numeros[numero]) {
        numeros[numero] = 0
    }
    numeros[numero]++

}
console.log(numeros) */


const products = [
    { id: 1, name: 'Escuadra', price: 323.45 },
    { id: 2, name: 'Calculadora', price: 234.56 },
    { id: 3, name: 'Globo Terráqueo', price: 45.67 },
    { id: 4, name: 'Paleta Pintura', price: 456.78 },
    { id: 5, name: 'Reloj', price: 67.89 },
    { id: 6, name: 'Agenda', price: 78.90 },
]


function getNombres(products) {
    const nombres = []
    for (const producto of products) {
        nombres.push(producto.name)
    }
    // nombres = productos.map(producto => producto.nombre)
    return nombres.join(', ')
}

/* console.log(getNombres(products)); */


function getPrecioTotal(productos) {
    let total = 0
    for (const producto of productos) {
        total += producto.price
    }
    // const total = productos.reduce((acum, prod) => prod.precio + acum, 0)
    return total
}
/* console.log(getPrecioTotal(products)); */

function getPromedio(products) {
    /*     let contador = 0;
        let total = 0;
        for (const product of products) {
            total += product.price;
            contador++;
        }
        return (total / contador) */
    return getPrecioTotal(products) / products.length
}

/* console.log(getPromedio(products)); */

function getProdPrecioMaximo(products) {
    if (products.length === 0) {
        throw new Error('no se puede calcular el máximo de un array vacío')
    }

    /*   let max = productos[0].precio
      let prod = productos[0]
      for (const producto of productos) {
          if (producto.precio > max) {
              max = producto.precio
              prod = producto
          }
          return prod
      } */

    return products.reduce((max, curr) => (curr.price > max.price ? curr : max), products[0])
}

console.log(getProdPrecioMaximo(products));
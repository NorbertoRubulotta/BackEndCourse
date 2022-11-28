import { randomUUID } from 'crypto'
import ContainerFile from './container.js'
import * as fs from 'fs';



const routeProducts = './products.txt';
const routeShoppingCart = './shoppingCart.txt';

const allProducts = new ContainerFile(routeProducts);
const allShoppingCarts = new ContainerFile(routeShoppingCart);

async function writeFiles() {
    await fs.promises.writeFile(routeProducts, '[]');
    await fs.promises.writeFile(routeShoppingCart, '[]');
}
writeFiles()
/* const products = await allProducts.getAll(); */


//-------------------CONTROLADORES--------------//

export async function controllerGetProducts(req, res) {
    const products = await allProducts.getAll();
    res.json(products);
}
export async function controllerGetProductsById({ params: { id } }, res) {
    const buscado = await allProducts.getById(id);
    if (buscado === null) {
        res.status(404);
        res.json({ mensaje: `Product with ID:(${id}) not found` });
    } else {
        res.json(buscado);
    }
}

export async function controllerPostProducts(req, res) {
    const newProduct = req.body;
    newProduct.id = randomUUID();
    await allProducts.save(newProduct);
    res.status(201);
    res.json(newProduct);
}

export async function controllerPutProductbyId({ body, params: { id } }, res) {
    const searchedIndex = await allProducts.updateById(id, body);

    if (searchedIndex === -1) {
        res.status(404);
        res.json({ mensaje: `Product with ID:(${id}) not found` });
    } else {
        res.json(body);
    }
}

export async function controllerDeleteProductByID({ params: { id } }, res) {
    const deleted = await allProducts.deleteById(id);
    if (deleted === -1) {
        res.status(404);
        res.json({ message: `Product with ID:(${id}) not found` });
    } else {
        res.json(deleted);
    }

}

export async function controllerPostCart(req, res) {
    const cart = {};
    cart.products = [];
    cart.id = randomUUID();
    await allShoppingCarts.save(cart);
    res.status(201);
    res.json(cart.id);
}


export async function controllerPostProductInCart({ body, params: { id_cart } }, res) {
    const productToCart = await allProducts.getById(body.id);
    await allShoppingCarts.addToCart(id_cart, productToCart)
    res.status(201);
    res.json(productToCart.id);
}
export async function controllerEmptyCart({ params: { id } }, res) {
    await allShoppingCarts.emptCartById(id)
    res.status(201);
    res.json("Carrito Vacío");
}

export async function controllerGetCartProductsById({ params: { id } }, res) {
    const buscado = await allShoppingCarts.getById(id);
    if (buscado === null) {
        res.status(404);
        res.json({ mensaje: `Shopping Cart with ID:(${id}) not found` });
    } else {
        res.json(buscado.products);
    }
}
export async function controllerDeleteCartProductById({ params: { id_cart, id_prod } }, res) {
    const productDeleted = await allShoppingCarts.deleteProductFromCartById(id_cart, id_prod);
    if (productDeleted === -1) {
        res.status(404);
        res.json({ mensaje: `Something went wrong` });
    } else {
        res.json(productDeleted);
    }
}



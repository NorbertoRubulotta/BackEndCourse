import { randomUUID } from 'crypto'
import ContainerFile from './container.js'


const routeProducts = './products.txt';
const routeShoppingCart = './shoppingCart.txt';

const allProducts = new ContainerFile(routeProducts);
const allShoppingCarts = new ContainerFile(routeShoppingCart);



//-------------------CONTROLADORES--------------//

export async function controllerGetProducts(req, res) {
    const products = await allProducts.getAll();
    res.json(products);
}
export async function controllerGetProductsById({ params: { id } }, res) {
    const buscado = await allProducts.getById(id);
    if (buscado === null) {
        res.status(404);
        res.json({ error: -1, description: `Product with ID:(${id}) not found` });
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
        res.json({ error: -1, description: `Product with ID:(${id}) not found` });
    } else {
        res.json(body);
    }
}

export async function controllerDeleteProductByID({ params: { id } }, res) {
    const deleted = await allProducts.deleteById(id);
    if (deleted === -1) {
        res.status(404);
        res.json({ error: -1, description: `Product with ID:(${id}) not found` });
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
    res.json({ Message: `New shopping cart created, ID:${cart.id}` });
}


export async function controllerPostProductInCart({ body, params: { id_cart } }, res) {
    const productToCart = await allProducts.getById(body.id);
    if (productToCart === null) {
        res.status(404);
        res.json({ error: -1, description: `Product with ID:${body.id} not found` });
    } else {
        const cartExist = await allShoppingCarts.getById(id_cart);
        if (cartExist === null) {
            res.status(404);
            res.json({ error: -1, description: `Cart with ID:${id_cart} not found` });
        } else {
            await allShoppingCarts.addToCart(id_cart, productToCart)
            res.status(201);
            res.json(productToCart);
        }
    }
}

export async function controllerEmptyCart({ params: { id_cart } }, res) {
    const emptyCart = await allShoppingCarts.emptCartById(id_cart);
    if (emptyCart === -1) {
        res.status(404).json({ error: -1, description: `Cart with ID:(${id_cart}) not found` });
    } else {
        res.status(201).json({ message: `Cart with ID: ${id_cart} is empty` });
    }
}

export async function controllerGetCartProductsById({ params: { id } }, res) {
    const buscado = await allShoppingCarts.getById(id);
    if (buscado === null) {
        res.status(404);
        res.json({ error: -1, description: `Cart with ID:(${id}) not found` });
    } else {
        res.status(201).json(buscado.products);
    }
}
export async function controllerDeleteCartProductById({ params: { id_cart, id_prod } }, res) {
    const productDeleted = await allShoppingCarts.deleteProductFromCartById(id_cart, id_prod);
    if (productDeleted === -1) {
        res.status(404);
        res.json({ error: -1, description: `Cart with ID:(${id_cart}) not found` });
    } else if (productDeleted === -2) {
        res.status(404);
        res.json({ error: -2, description: `Product with ID:(${id_prod}) not found` });
    } else {
        res.status(201).json(productDeleted);
    }

}



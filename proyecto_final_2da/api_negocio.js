
import { chosenProdsContainer } from "./containers/DataContainer.js";
import { createCart, deleteProdsInCart, deleteProductInCart, getAllProducts, saveProdsInCart } from './models/cartModel.js';
import { saveProds } from './models/productsModel.js';



//-------------------CONTROLADORES--------------//

export async function controllerGetProducts(req, res) {
    const products = await chosenProdsContainer.getAll();
    res.json(products);
}
export async function controllerGetProductsById({ params: { id } }, res) {
    const buscado = await chosenProdsContainer.getById(id);
    if (buscado === null) {
        res.status(404);
        res.json({ error: -1, description: `Product with ID:(${id}) not found` });
    } else {
        res.json(buscado);
    }
}

export async function controllerPostProducts(req, res) {
    const newProduct = req.body;
    const newProductSaved = await saveProds(newProduct);
    res.status(201);
    res.json(newProductSaved);
}

export async function controllerPutProductbyId({ body, params: { id } }, res) {
    const searchedIndex = await chosenProdsContainer.updateById(id, body);
    if (searchedIndex === -1) {
        res.status(404);
        res.json({ error: -1, description: `Product with ID:(${id}) not found` });
    } else {
        res.json(body);
    }
}

export async function controllerDeleteProductByID({ params: { id } }, res) {
    const deleted = await chosenProdsContainer.deleteById(id);
    if (deleted === -1) {
        res.status(404);
        res.json({ error: -1, description: `Product with ID:(${id}) not found` });
    } else {
        res.json(deleted);
    }
}

//----------------CONTROLADORES CART----------------//


export async function controllerPostCart(req, res) {
    const newCart = await createCart();
    res.status(201);
    res.json({ Message: `New shopping cart created, ID:${newCart.id}` });
}


export async function controllerPostProductInCart({ body, params: { id_cart } }, res) {
    const productToSave = await saveProdsInCart(body.id, id_cart)

    if (productToSave === -1) {
        res.status(404);
        res.json({ error: -1, description: `Product with ID:${body.id} not found` });
    } else if (productToSave === -2) {
        res.status(404);
        res.json({ error: -2, description: `Cart with ID:${id_cart} not found` });
    } else {
        res.status(201);
        res.json(productToSave);
    }
}
export async function controllerGetCartProductsById({ params: { id } }, res) {
    const productsList = await getAllProducts(id);
    if (productsList === null) {
        res.status(404);
        res.json({ error: -1, description: `Cart with ID:(${id}) not found` });
    } else {
        res.status(201).json(productsList.products);
    }
}

export async function controllerEmptyCart({ params: { id_cart } }, res) {
    const emptyCart = await deleteProdsInCart(id_cart);
    if (emptyCart === -1) {
        res.status(404).json({ error: -1, description: `Cart with ID:(${id_cart}) not found` });
    } else {
        res.status(201).json({ message: `Cart with ID: ${id_cart} is empty` });
    }
}


export async function controllerDeleteCartProductById({ params: { id_cart, id_prod } }, res) {
    const newCart = await deleteProductInCart(id_cart, id_prod);
    if (newCart === -1) {
        res.status(404);
        res.json({ error: -1, description: `Cart with ID:(${id_cart}) not found` });
    } else if (newCart === -2) {
        res.status(404);
        res.json({ error: -2, description: `Product with ID:(${id_prod}) not found` });
    } else {
        res.status(201).json(newCart);
    }

}


import { chosenCartContainer, chosenProdsContainer } from '../containers/DataContainer.js';
import { randomUUID } from 'crypto';


export async function createCart() {
    try {
        const cart = {};
        cart.products = [];
        cart.id = randomUUID();
        const saveCart = await chosenCartContainer.save(cart);
        return saveCart;
    } catch (err) {
        throw new Error({ "ErrorMsg": 'Error creating new cart' });
    }
}


export async function saveProdsInCart(idProd, idCart) {

    try {
        const productToCart = await chosenProdsContainer.getById(idProd);

        if (productToCart === null) {
            return -1
        } else {
            const cartExist = await chosenCartContainer.getById(idCart);
            if (cartExist === null) {
                return -2
            } else {
                cartExist.products.push(productToCart)
                await chosenCartContainer.updateById(idCart, cartExist);
                return productToCart
            }
        }
    } catch (err) {
        throw new Error({ "ErrorMsg": 'Error saving product' });
    }
}


export async function getAllProducts(idCart) {
    try {
        const cart = await chosenCartContainer.getById(idCart);
        return cart;
    } catch (err) {
        throw new Error({ "ErrorMsg": 'Error showing products' });
    }
}

export async function deleteProdsInCart(idCart) {
    try {
        const cart = await chosenCartContainer.getById(idCart);
        if (cart === null) {
            return -1
        }
        else {
            const updateCart = {
                products: []
            };
            await chosenCartContainer.updateById(cart.id, updateCart);
        }
    } catch (err) {
        throw new Error({ "ErrorMsg": 'Error deleting products' });
    }
}



export async function deleteProductInCart(idCart, idProd) {
    try {
        const cart = await chosenCartContainer.getById(idCart);
        if (cart === null) {
            return -1
        }
        else {
            const indexOfproduct = cart.products.indexOf(cart.products.find(e => e.id.toString() == idProd))
            if (indexOfproduct === -1) {
                return -2
            } else {

                const newCartProducts = cart.products.splice(indexOfproduct, 1);
                const newCart = {
                    products: newCartProducts
                }
                await chosenCartContainer.updateById(cart.id, newCart);
                return newCart
            }
        }
    }
    catch (err) {
        throw new Error({ "ErrorMsg": 'Error deleting products' });
    }
}
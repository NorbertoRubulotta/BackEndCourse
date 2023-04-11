
import { chosenCartContainer } from '../containers/DataContainer.js';
import { mailSender } from '../email/email.js';
import { logger } from '../loggers/logger.js';
import { createCart, deleteProdsInCart, deleteProductInCart, getAllProducts, saveProdsInCart } from '../models/cartModel.js';


export async function controllerPostCart(req, res) {
    try {
        const newCart = await createCart();
        res.status(200);
        res.json({ Message: `New shopping cart created, ID:${newCart.id}` });
    } catch (error) {
        logger.error(error.message)
        res.json({ error: -1, description: `Error creating shopping cart` });
    }

}

export async function controllerPostProductInCart({ body, params: { id_cart } }, res) {
    try {
        const productToSave = await saveProdsInCart(body.id, id_cart)

        if (productToSave === -1) {
            res.status(404);
            res.json({ error: -1, description: `Product with ID:${body.id} not found` });
        } else if (productToSave === -2) {
            res.status(404);
            res.json({ error: -2, description: `Cart with ID:${id_cart} not found` });
        } else {
            res.status(200);
            res.json(productToSave);
        }
    } catch (error) {
        logger.error(error.message)
        res.json({ error: -1, description: `Error saving product in shopping cart` });
    }
}
export async function controllerGetCartProductsById({ params: { id } }, res) {
    try {

        const productsList = await getAllProducts(id);
        if (productsList === null) {
            res.status(404);
            res.json({ error: -1, description: `Cart with ID:(${id}) not found` });
        } else {
            res.status(200).json(productsList.products);
        }
    } catch (error) {
        logger.error(error.message)
        res.json({ error: -1, description: `Error finding product in shopping cart` });
    }
}

export async function controllerEmptyCart({ params: { id_cart } }, res) {
    try {
        const emptyCart = await deleteProdsInCart(id_cart);
        if (emptyCart === -1) {
            res.status(404).json({ error: -1, description: `Cart with ID:(${id_cart}) not found` });
        } else {
            res.status(200).json({ message: `Cart with ID: ${id_cart} is empty` });
        }
    } catch (error) {
        logger.error(error.message)
        res.json({ error: -1, description: `Error trying to empty shopping cart` });
    }
}

export async function controllerDeleteCartProductById({ params: { id_cart, id_prod } }, res) {
    try {
        const newCart = await deleteProductInCart(id_cart, id_prod);
        if (newCart === -1) {
            res.status(404);
            res.json({ error: -1, description: `Cart with ID:(${id_cart}) not found` });
        } else if (newCart === -2) {
            res.status(404);
            res.json({ error: -2, description: `Product with ID:(${id_prod}) not found` });
        } else {
            res.status(200).json(newCart);
        }
    } catch (error) {
        logger.error(error.message)
        res.json({ error: -1, description: `Error trying to delete product by ID in shopping cart` });
    }

}

export async function buyProducts(req, res) {
    const { user } = req;

    try {

        const prods = await getAllProducts(user.idCart);
        if (prods.products.length === 0) return res.json({ message: 'Your cart is empty' });

        await deleteProdsInCart(user.idCart);
        const messageToAdmin = await mailSender.createMessageToAdminNewPurchase(user, prods)
        const messageToBuyer = await mailSender.createMessageToUserNewPurchase(user, prods)

        mailSender.sendMessage(messageToAdmin);
        mailSender.sendMessage(messageToBuyer);

        res.status(200).json({ success: true, message: 'purchase completed' });
    } catch (err) {
        logger.error(err.message);
        res.json({ error: -1, description: `Error trying to complete purchase` });
    }
}
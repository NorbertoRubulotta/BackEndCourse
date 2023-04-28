
import { cartService } from "../negocio/services/cart.service/index.js";

export async function controllerPostProductInCart(req, res, next) {
    try {
        const idCart = req.user.idCart;
        const product = await cartService.save(req.body.id, idCart);
        if (product === null) res.status(404).json({ error: -1, description: `Product with ID:${req.body.id} not found` });
        res.status(200).json(product);
    } catch (error) {
        next(error)
    }
}
export async function controllerGetCartProducts(req, res, next) {
    try {
        const allProducts = await cartService.getById(req.user.idCart);
        res.status(200).json(allProducts.products);
    } catch (error) {
        logger.error(error.message)
        res.json({ error: -1, description: `Error finding product in shopping cart` });
    }
}

export async function controllerDeleteCartProductById(req, res, next) {
    try {
        const id_cart = req.user.idCart
        const id_prod = req.params.id
        const newCart = await cartService.deleteById(id_cart, id_prod);
        res.status(200).json(newCart);

    } catch (error) {
        logger.error(error.message)
        res.json({ error: -1, description: `Error trying to delete product by ID in shopping cart` });
    }

}
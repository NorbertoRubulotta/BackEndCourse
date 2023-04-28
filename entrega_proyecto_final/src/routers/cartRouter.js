import { Router } from 'express';
import { controllerDeleteCartProductById, controllerGetCartProducts, controllerPostProductInCart } from '../controllers/cartController.js';
import valAuthenticate from '../middlewares/authLogin.js';

export const routerShoppingCart = Router();

routerShoppingCart.post('/', valAuthenticate, controllerPostProductInCart);
routerShoppingCart.get('/', valAuthenticate, controllerGetCartProducts);
routerShoppingCart.delete('/:id', valAuthenticate, controllerDeleteCartProductById);
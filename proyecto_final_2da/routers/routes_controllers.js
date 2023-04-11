import { Router } from 'express'
import * as controllerApi from '../api_negocio.js'
import { onlyForAdmins } from '../server.js';

export const routerProducts = Router();
export const routerShoppingCart = Router();

// api rest
routerProducts.get('/', controllerApi.controllerGetProducts);
routerProducts.get('/:id', controllerApi.controllerGetProductsById);

routerProducts.post('/', onlyForAdmins, controllerApi.controllerPostProducts);
routerProducts.put('/:id', onlyForAdmins, controllerApi.controllerPutProductbyId);
routerProducts.delete('/:id', onlyForAdmins, controllerApi.controllerDeleteProductByID);


routerShoppingCart.post('/', controllerApi.controllerPostCart);
routerShoppingCart.post('/:id_cart/products', controllerApi.controllerPostProductInCart);
routerShoppingCart.delete('/:id_cart', controllerApi.controllerEmptyCart);
routerShoppingCart.get('/:id/products', controllerApi.controllerGetCartProductsById);
routerShoppingCart.delete('/:id_cart/products/:id_prod', controllerApi.controllerDeleteCartProductById);


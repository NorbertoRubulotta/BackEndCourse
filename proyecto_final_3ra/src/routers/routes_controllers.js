import { Router } from 'express'
import { onlyForAdmins } from '../middlewares/onlyAdmin.js';
import { controllerDeleteProductByID, controllerGetProducts, controllerGetProductsById, controllerPostProducts, controllerPutProductbyId } from '../controllers/productsController.js';
import { buyProducts, controllerDeleteCartProductById, controllerEmptyCart, controllerGetCartProductsById, controllerPostCart, controllerPostProductInCart } from '../controllers/cartController.js';
import { controllerGetCreateUser, controllerGetUser, controllerGetUserInfo, controllerLogout, controllerPostAdminUser } from '../controllers/userController.js';
import { controllerRouteNotFound } from '../controllers/routeNotFoundController.js';
import valAuthenticate from '../middlewares/authLogin.js';

export const routerProducts = Router();
export const routerShoppingCart = Router();
export const routerUsers = Router();
export const routerLogout = Router();

export const routerNotFound = Router();

// api rest
routerProducts.get('/', controllerGetProducts);
routerProducts.get('/:id', controllerGetProductsById);
routerProducts.post('/', onlyForAdmins, controllerPostProducts);
routerProducts.put('/:id', onlyForAdmins, controllerPutProductbyId);
routerProducts.delete('/:id', onlyForAdmins, controllerDeleteProductByID);


routerShoppingCart.post('/', controllerPostCart);
routerShoppingCart.post('/buy', valAuthenticate, buyProducts);
routerShoppingCart.post('/:id_cart/products', controllerPostProductInCart);
routerShoppingCart.delete('/:id_cart', controllerEmptyCart);
routerShoppingCart.get('/:id/products', controllerGetCartProductsById);
routerShoppingCart.delete('/:id_cart/products/:id_prod', controllerDeleteCartProductById);

routerUsers.post('/api/users', controllerPostAdminUser);
routerUsers.get('/api/users', controllerGetCreateUser);
routerUsers.post('/login', controllerGetUser);
routerUsers.get('/api/userinfo', controllerGetUserInfo);

routerLogout.post('/', valAuthenticate, controllerLogout);


routerNotFound.all('*', controllerRouteNotFound);


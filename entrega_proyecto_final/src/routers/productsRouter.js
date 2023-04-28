
import { controllerDeleteProductByID, controllerGetProducts, controllerGetProductsById, controllerPostProducts, controllerPutProductbyId } from '../controllers/productsController.js';
import { Router } from 'express';
import { onlyForAdmins } from '../middlewares/onlyAdmin.js';
import valAuthenticate from '../middlewares/authLogin.js';

export const routerProducts = Router();

routerProducts.get('/', controllerGetProducts);
routerProducts.get('/:id', controllerGetProductsById);
routerProducts.post('/', valAuthenticate, onlyForAdmins, controllerPostProducts);
routerProducts.put('/:id', valAuthenticate, onlyForAdmins, controllerPutProductbyId);
routerProducts.delete('/:id', valAuthenticate, onlyForAdmins, controllerDeleteProductByID);

import { deleteAll, createProductsTable, controllerPostProducts, controllerGetProducts, controllerGetProductsById, controllerPutProductbyId, controllerDeleteProductByID } from '../controllers/productController.js';
import { Router } from 'express';
const routerApiProducts = Router();

routerApiProducts.get('/', createProductsTable, controllerGetProducts);
routerApiProducts.post('/', createProductsTable, controllerPostProducts);
routerApiProducts.get('/:id_prod', createProductsTable, controllerGetProductsById);
routerApiProducts.put('/:id_prod', createProductsTable, controllerPutProductbyId);
routerApiProducts.delete('/', createProductsTable, deleteAll);
routerApiProducts.delete('/:id_prod', createProductsTable, controllerDeleteProductByID);

export default routerApiProducts;
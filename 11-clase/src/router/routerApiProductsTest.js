import { Router } from 'express';
const routerApiProductsTest = Router();
import { getFakerProducts } from '../controllers/fakerController.js'

routerApiProductsTest.get('/', getFakerProducts);



export default routerApiProductsTest;
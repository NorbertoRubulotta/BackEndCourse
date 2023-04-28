import { ProductService } from './product.service.js';
import productList from '../../../repositories/productsList/index.js';


export const productService = new ProductService(productList);

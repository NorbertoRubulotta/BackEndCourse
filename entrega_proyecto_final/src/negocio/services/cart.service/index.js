import cartList from '../../../repositories/cartList/index.js';
import productList from '../../../repositories/productsList/index.js';
import { CartService } from './cart.service.js';

export const cartService = new CartService(cartList, productList);

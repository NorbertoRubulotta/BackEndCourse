import { OrderService } from './order.service.js';
import cartList from '../../../repositories/cartList/index.js';
import orderList from '../../../repositories/orderList/index.js';

const orderService = new OrderService(orderList, cartList);

export default orderService


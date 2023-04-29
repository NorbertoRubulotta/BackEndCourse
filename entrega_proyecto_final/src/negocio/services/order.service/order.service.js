import { mailSender } from "../../../email/email.js";
import { Order } from "../../../models/orderModel.js";
import { logger } from "../../../persistence/loggers/logger.js";

export class OrderService {
    #orderRepository;
    #cartRepository;
    constructor(orderList, cartList) {
        this.#orderRepository = orderList;
        this.#cartRepository = cartList;
    }

    async createOrder(user) {
        try {
            const cart = await this.#cartRepository.getById(user.idCart);
            if (cart.products.length === 0) return null;

            const products = cart.products;
            const order = new Order(user.id, products);

            await this.#orderRepository.save(order);

            const messageToAdmin = await mailSender.createMessageToAdminNewPurchase(
                user,
                products
            );
            const messageToBuyer = await mailSender.createMessageToUserNewPurchase(
                user,
                products
            );

            await mailSender.sendMessage(messageToAdmin);
            await mailSender.sendMessage(messageToBuyer);

            cart.products = [];
            await this.#cartRepository.updateById(user.idCart, cart);

            return order.data();
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async getAll(id) {
        try {
            const orders = await this.#orderRepository.getAll(id);
            const userOrders = orders.filter(order => order.idClient === id);
            return userOrders;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}

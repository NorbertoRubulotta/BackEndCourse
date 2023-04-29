import orderService from '../negocio/services/order.service/index.js';
import { logger } from '../persistence/loggers/logger.js';

export async function controllerPostOrder(req, res, next) {
    try {
        const order = await orderService.createOrder(req.user);
        if (!order) {
            res.json({ message: "The cart is empty" });
        } else {
            res.status(201).json(order);
        }
    } catch (error) {
        logger.error(error.message)
        res.json({ error: `Error creating order`, description: error.message });
    }
}

export async function controllerGetAllOrders(req, res, next) {
    try {
        const orders = await orderService.getAll(req.user.id);
        if (!orders) {
            res.json({ message: "The cart is empty" });
        } else {
            res.status(200).json(orders);
        }
    } catch (error) {
        logger.error(error.message)
        res.json({ error: `Error finding orders`, description: error.message });
    }
}

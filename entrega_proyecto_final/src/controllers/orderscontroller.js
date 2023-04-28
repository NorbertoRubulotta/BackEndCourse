import orderService from '../negocio/services/order.service/index.js';

export async function controllerPostOrder(req, res, next) {
    try {
        const order = await orderService.createOrder(req.user);
        if (!order) {
            res.json({ message: "The cart is empty" });
        } else {
            res.status(201).json(order);
        }
    } catch (e) {
        logger.error(e);
        next(e);
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
    } catch (e) {
        logger.error(e);
        next(e);
    }
}

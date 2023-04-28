import { Router } from "express";
import { controllerGetAllOrders, controllerPostOrder } from "../controllers/orderscontroller.js";
import valAuthenticate from "../middlewares/authLogin.js";

export const routerOrders = Router();

routerOrders.get('/', valAuthenticate, controllerGetAllOrders)
routerOrders.post('/', valAuthenticate, controllerPostOrder)
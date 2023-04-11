
import { fakerProducts } from "../persistence/containers/containerFaker.js";
import { logger } from "../persistence/loggers/logger.js";


export async function getFakerProducts(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    const array = await fakerProducts.getAll();
    res.status(200);
    res.json(array);


}


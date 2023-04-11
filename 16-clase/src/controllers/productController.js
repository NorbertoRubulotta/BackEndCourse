import { ProductsContainer } from "../containers/productsContainer.js";
import { logger } from "../loggers/logger.js";
import { createTable } from '../tables/productsTable.js';
import { randomUUID } from 'crypto';
const tableName = 'products';


export async function createProductsTable(req, res, next) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        await createTable(tableName);
        next();
    } catch (error) {
        throw loggerFileError.error({ Error: 'Error creating table' });
    }
}

export async function get(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        res.json(await ProductsContainer.getAll());
    } catch (error) {
        throw new loggerFileError.error({ Error: 'Error getting products' });
    }
}

export async function post({ body }, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        const object = body;
        object.id = randomUUID();
        await ProductsContainer.save(object);
        res.status(201);
        res.json(object);
    } catch (error) {

        throw loggerFileError.error({ Error: 'Error saving products' });
    }
}

export async function getById({ params }, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        const searched = await ProductsContainer.getById(params.id_prod);
        if (!searched) {
            res.status(404);
            res.json({ message: 'Product not found' });
        } else {
            res.status(201);
            res.json(searched);
        }
    } catch (error) {
        throw loggerFileError.error({ Error: 'Error finding products' });
    }
}

export async function updateById({ body, params }, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        await ProductsContainer.updateById(params.id_prod, body);
        res.status(201);
        res.json(body);
    } catch (error) {
        throw loggerFileError.error({ Error: 'Error updating products' });
    }
}

export async function deleteAll(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        await ProductsContainer.deleteAll();
        res.status(201);
        res.json(await ProductsContainer.getAll());
    } catch (error) {
        throw loggerFileError.error({ Error: 'Error deleting products' });
    }
}

export async function deleteById({ params }, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        await ProductsContainer.deleteById(params.id_prod);
        res.status(201);
        res.json(await ProductsContainer.getAll());
    } catch (error) {
        throw loggerFileError.error({ Error: 'Error deleting product' });
    }
}
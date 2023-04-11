
import { ProductsContainer } from "../persistence/daos/factory.js";
import { logger, loggerFileError } from "../persistence/loggers/logger.js";
import { createTable } from '../persistence/tables/productsTable.js';
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

export async function controllerGetProducts(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        res.json(await ProductsContainer.getAll());
    } catch (error) {
        loggerFileError.error({ Error: 'Error getting products', message: error.message });
        res.json({ error: -1, description: 'Error getting products' });
    }
}

export async function controllerPostProducts(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        const object = req.body;
        object.id = randomUUID();
        await ProductsContainer.save(object);
        res.status(201).res.json(object);
    } catch (error) {
        loggerFileError.error({ Error: 'Error saving products', message: error.message });
        res.json({ error: -1, description: 'Error saving products' });

    }
}

export async function controllerGetProductsById(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        const searched = await ProductsContainer.getById(req.params.id_prod);
        if (!searched) {
            res.status(404);
            res.json({ message: 'Product not found' });
        } else {
            res.status(200);
            res.json(searched);
        }
    } catch (error) {
        loggerFileError.error({ Error: 'Error finding products', message: error.message });
        res.json({ error: -1, description: 'Error finding products' });
    }
}

export async function controllerPutProductbyId(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        await ProductsContainer.updateById(req.params.id_prod, req.body);
        res.status(201);
        res.json(req.body);
    } catch (error) {
        loggerFileError.error({ Error: 'Error updating product', message: error.message });
        res.json({ error: -1, description: `Error updating product` });
    }
}

export async function deleteAll(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        await ProductsContainer.deleteAll();
        res.status(200);
        res.json(await ProductsContainer.getAll());
    } catch (error) {
        loggerFileError.error({ Error: 'Error deleting product', message: error.message });
        res.json({ error: -1, description: `Error deleting product` });
    }
}

export async function controllerDeleteProductByID(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        const deleted = await ProductsContainer.deleteById(req.params.id_prod);
        if (deleted === -1) {
            res.status(404).json({ error: -1, description: `Product with ID:(${id}) not found` });
        } else {
            res.status(200).json(deleted);
        }
    } catch (error) {
        loggerFileError.error({ Error: 'Error deleting product', message: error.message });
        res.json({ error: -1, description: `Error deleting products` });
    }
}
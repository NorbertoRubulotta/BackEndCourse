

import { productService } from "../negocio/services/index.js";
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

export async function get(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        res.json(await productService.getAll());
    } catch (error) {
        throw new loggerFileError.error({ Error: 'Error getting products' });
    }
}

export async function post(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    const object = req.body;

    try {
        const newProduct = await productService.save(object);
        res.status(201);
        res.json(newProduct);
    } catch (error) {
        throw loggerFileError.error({ Error: 'Error saving products' });
    }
}

export async function getById(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        const searched = await productService.getById(req.params.id_prod);
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

export async function updateById(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        const updatedProd = await productService.updateById(req.params.id_prod, req.body);
        if (updatedProd) res.status(201).json(req.body);
        else res.json({ message: "Product not found" })

    } catch (error) {
        throw loggerFileError.error({ Error: 'Error updating products' });
    }
}

export async function deleteAll(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        await productsService.deleteAll();
        res.status(201);
        res.json({ Message: "All products deleted successfully" });
    } catch (error) {
        throw loggerFileError.error({ Error: 'Error deleting products' });
    }
}

export async function deleteById(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        const deleted = await productService.deleteById(req.params.id_prod);
        res.status(201);
        res.json(deleted);
    } catch (error) {
        throw loggerFileError.error({ Error: 'Error deleting product' });
    }
}
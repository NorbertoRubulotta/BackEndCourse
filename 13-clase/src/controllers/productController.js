import { ProductsContainer } from "../containers/productsContainer.js";
import { createTable } from '../tables/productsTable.js';
import { randomUUID } from 'crypto';
const tableName = 'products';


export async function createProductsTable(req, res, next) {
    try {
        await createTable(tableName);
        next();
    } catch (error) {
        throw error;
    }
}

export async function get(req, res) {
    try {
        res.json(await ProductsContainer.getAll());
    } catch (error) {
        throw new Error(error);
    }
}

export async function post({ body }, res) {
    try {
        const object = body;
        object.id = randomUUID();
        await ProductsContainer.save(object);
        res.status(201);
        res.json(object);
    } catch (error) {

        throw new Error(error);
    }
}

export async function getById({ params }, res) {
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
        throw new Error(error);
    }
}

export async function updateById({ body, params }, res) {
    try {
        await ProductsContainer.updateById(params.id_prod, body);
        res.status(201);
        res.json(body);
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteAll(req, res) {
    try {
        await ProductsContainer.deleteAll();
        res.status(201);
        res.json(await ProductsContainer.getAll());
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteById({ params }, res) {
    try {
        await ProductsContainer.deleteById(params.id_prod);
        res.status(201);
        res.json(await ProductsContainer.getAll());
    } catch (error) {
        throw new Error(error);
    }
}
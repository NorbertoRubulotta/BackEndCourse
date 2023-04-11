
import { chosenProdsContainer } from '../containers/DataContainer.js';
import { saveProds } from '../models/productsModel.js';

export async function controllerGetProducts(req, res) {
    try {
        const products = await chosenProdsContainer.getAll();
        res.status(200).json(products);
    } catch (error) {
        logger.error(error.message)
        res.json({ error: -1, description: `Error finding products` });
    }
}
export async function controllerGetProductsById({ params: { id } }, res) {
    try {
        const buscado = await chosenProdsContainer.getById(id);

        if (buscado === null) {
            res.status(404);
            res.json({ error: -1, description: `Product with ID:(${id}) not found` });
        } else {
            res.status(200).json(buscado);
        }
    } catch (error) {
        logger.error(error.message)
        res.json({ error: -1, description: `Error finding products` });
    }
}

export async function controllerPostProducts(req, res) {
    try {
        const newProduct = req.body;
        const newProductSaved = await saveProds(newProduct);
        res.status(200);
        res.json(newProductSaved);
    } catch {
        logger.error(error.message);
        res.json({ error: -1, description: `Error saving products` });
    }
}

export async function controllerPutProductbyId({ body, params: { id } }, res) {
    try {
        const searchedIndex = await chosenProdsContainer.updateById(id, body);
        if (searchedIndex === -1) {
            res.status(404);
            res.json({ error: -1, description: `Product with ID:(${id}) not found` });
        } else {
            res.json(body);
        }
    } catch {
        logger.error(error.message);
        res.json({ error: -1, description: `Error saving products` });
    }
}

export async function controllerDeleteProductByID({ params: { id } }, res) {
    try {
        const deleted = await chosenProdsContainer.deleteById(id);
        if (deleted === -1) {
            res.status(404);
            res.json({ error: -1, description: `Product with ID:(${id}) not found` });
        } else {
            res.status(200).json(deleted);
        }
    }
    catch {
        logger.error(error.message);
        res.json({ error: -1, description: `Error deleting products` });
    }
}
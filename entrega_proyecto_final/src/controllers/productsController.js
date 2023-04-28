import { productService } from '../negocio/services/product.service/index.js';

export async function controllerGetProducts(req, res) {
    try {
        const products = await productService.getAll();
        res.status(200).json(products);
    } catch (error) {
        logger.error(error.message)
        res.json({ error: -1, description: `Error finding products` });
    }
}

export async function controllerGetProductsById({ params: { id } }, res) {
    try {
        const buscado = await productService.getById(id);
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
        const newProductSaved = await productService.save(newProduct);
        res.status(200);
        res.json(newProductSaved);
    } catch {
        logger.error(error.message);
        res.json({ error: -1, description: `Error saving products` });
    }
}

export async function controllerPutProductbyId({ body, params: { id } }, res) {
    try {
        const searched = await productService.updateById(id, body);
        if (searched === -1) {
            res.status(404);
            res.json({ error: -1, description: `Product with ID:(${id}) not found` });
        } else {
            res.json(searched);
        }
    } catch {
        logger.error(error.message);
        res.json({ error: -1, description: `Error saving products` });
    }
}

export async function controllerDeleteProductByID({ params: { id } }, res) {
    try {
        const deleted = await productService.deleteById(id);
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
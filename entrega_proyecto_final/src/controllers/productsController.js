import { productService } from '../negocio/services/product.service/index.js';
import { logger } from '../persistence/loggers/logger.js';
import { validateProduct } from '../validators/product.validator.js';

export async function controllerGetProducts(req, res) {
    try {
        const products = await productService.getAll();
        res.status(200).json(products);
    } catch (error) {
        logger.error(error)
        res.json({ error: `Error finding products`, description: error });
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
        logger.error(error)
        res.json({ error: `Error finding product`, description: error });
    }
}

export async function controllerPostProducts(req, res) {
    try {
        await validateProduct(req.body)
        const newProduct = req.body;
        const newProductSaved = await productService.save(newProduct);
        res.status(200);
        res.json(newProductSaved);
    } catch (error) {
        logger.error(error)
        res.json({ error: `Error saving products`, description: error });
    }
}

export async function controllerPutProductbyId({ body, params: { id } }, res) {
    try {
        const searched = await productService.updateById(id, body);
        if (searched === -1) {
            res.status(404);
            res.json({ description: `Product with ID:(${id}) not found` });
        } else {
            res.json(searched);
        }
    } catch (error) {
        logger.error(error)
        res.json({ error: `Error editing product`, description: error });
    }
}

export async function controllerDeleteProductByID({ params: { id } }, res) {
    try {
        const deleted = await productService.deleteById(id);
        if (deleted === -1) {
            res.status(404);
            res.json({ description: `Product with ID:(${id}) not found` });
        } else {
            res.status(200).json(deleted);
        }
    }
    catch (error) {
        logger.error(error)
        res.json({ error: `Error deleting product`, description: error });
    }
}
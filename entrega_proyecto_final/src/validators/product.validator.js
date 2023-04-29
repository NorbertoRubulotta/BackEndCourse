import { logger } from "../persistence/loggers/logger.js"

export async function validateProduct(product) {
    try {

        if (!product.name) throw new Error('name format not valid');
        if (typeof product.name !== 'string') throw new Error('name format not valid');

        if (!product.description) throw new Error('description format not valid');
        if (typeof product.description !== 'string') throw new Error('description format not valid');

        if (typeof product.price !== 'number') throw new Error('price format not valid');
        if (product.price < 0) throw new Error('price format not valid');

        if (typeof product.image !== 'string') throw new Error('image format not valid');

    } catch (error) {
        logger.error(error.message)
        throw error.message
    }
}
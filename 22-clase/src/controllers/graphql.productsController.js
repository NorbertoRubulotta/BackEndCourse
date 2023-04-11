
import { ProductsContainer } from "../persistence/daos/factory.js";
import { randomUUID } from 'crypto';


export async function controllerGraphqlGetProducts() {
    try {
        return await ProductsContainer.getAll()
    } catch (error) {
        return { error: -1, description: 'Error getting products' }
    }
}

export async function controllerGraphqlPostProducts(input) {
    try {
        const object = {}
        object.name = input.datos.name
        object.description = input.datos.description
        object.price = input.datos.price
        object.image = input.datos.image
        object.id = randomUUID();
        await ProductsContainer.save(object);
        return object;
    } catch (error) {
        return { error: -1, description: 'Error saving products' }

    }
}

export async function controllerGraphqlGetProductsById({ id }) {
    try {
        const searched = await ProductsContainer.getById(id);
        if (!searched) {
            return { message: 'Product not found' }
        } else {
            return searched
        }
    } catch (error) {
        return { error: -1, description: 'Error finding products' }
    }
}

export async function controllerGraphqlPutProductbyId({ id, datos }) {
    try {
        await ProductsContainer.updateById(id, datos);
        return datos;
    } catch (error) {
        return { error: -1, description: `Error updating product` }
    }
}


export async function controllerGraphqlDeleteProductByID({ id }) {
    try {
        const deleted = await ProductsContainer.deleteById(id);
        if (deleted === -1) {
            return { error: -1, description: `Product with ID:(${id}) not found` }
        } else {
            return deleted
        }
    } catch (error) {
        return { error: -1, description: `Error deleting products` }
    }
}
import { Product } from '../../models/product.model.js'
import { productList } from '../../repositories/productsList/index.js';


export default class ProductService {

    async save(object) {
        object.id = randomUUID();
        const product = new Product(object)
        try {
            await productList.save(product)
            return product;
        } catch (err) {
            throw loggerFileError.error({ Error: 'Error saving products' });
        }
    }

    async getAll() {
        try {
            return await productList.getAll();
        } catch (err) {
            throw loggerFileError.error({ Error: 'Error getting products' });
        }
    }

    async getById(id) {
        try {
            return await productList.getById(id);
        } catch (err) {
            throw loggerFileError.error({ Error: 'Error finding products' });
        }
    }

    async updateById(id, data) {
        try {
            const updatedProd = await productList.updateById(id, data);
            if (updatedProd === -1) { return false }
            return true
        } catch (err) {
            throw loggerFileError.error({ Error: 'Error updating products' });
        }
    }



    async deleteById(id) {
        try {
            return await productList.deleteById(id);
        } catch (err) {
            throw loggerFileError.error({ Error: 'Error deleting product' });
        }
    }

    async deleteAll() {
        try {
            await productList.deleteAll();
        } catch (err) {
            throw loggerFileError.error({ Error: 'Error deleting products' });
        }
    }
}

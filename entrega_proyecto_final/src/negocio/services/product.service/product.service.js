import { Product } from "../../../models/productsModel.js";
import { logger } from "../../../persistence/loggers/logger.js";


export class ProductService {
    #productRepository;
    constructor(productList) {
        this.#productRepository = productList;
    }

    async save({ name, description, price, image }) {
        const object = {
            name,
            description,
            price,
            image
        };
        try {
            const product = new Product(object);
            await this.#productRepository.save(product);
            return product.data();
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const product = await this.#productRepository.getById(id);
            return product.data();
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async getAll() {
        try {
            return await this.#productRepository.getAll();
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }


    async updateById(id, data) {
        try {
            const product = await this.#productRepository.updateById(id, data);
            return product.data();
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async deleteById(id) {
        try {
            return await this.#productRepository.deleteById(id);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}
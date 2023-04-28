import { Product } from "../../../models/productsModel.js";


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
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }

    async getById(id) {
        try {
            const product = await this.#productRepository.getById(id);
            return product.data();
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }

    async getAll() {
        try {
            return await this.#productRepository.getAll();
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }


    async updateById(id, data) {
        try {
            const product = await this.#productRepository.updateById(id, data);
            return product.data();
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }

    async deleteById(id) {
        try {
            return await this.#productRepository.deleteById(id);
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }
}
import { Product } from "../../models/productsModel.js";
import { ProductDto } from "../../persistence/dto/productDto.js";
import { logger } from "../../persistence/loggers/logger.js";

export default class ProductList {
    #dao
    constructor(dao) {
        this.#dao = dao
    }

    async save(prod) {
        try {
            const dto = new ProductDto(prod.data())
            const dtoGuardado = await this.#dao.save(dto);
            return new Product(dtoGuardado)
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async getAll() {
        try {
            const dtos = await this.#dao.getAll()
            return dtos
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }


    async getById(idProd) {
        try {
            const dto = await this.#dao.getById(idProd)
            return new Product(dto)
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async updateById(idProd, dataProd) {
        try {
            const updated = await this.#dao.updateById(idProd, dataProd);
            return new Product(updated)
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async deleteById(idProd) {
        try {
            const deleted = await this.#dao.deleteById(idProd)
            return deleted
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }

}
import { logger } from "../../persistence/loggers/logger.js";

export default class CartList {
    #dao
    constructor(dao) {
        this.#dao = dao
    }

    async save(cart) {
        try {
            await this.#dao.save(cart);
        } catch (error) {
            logger.error(error);
            throw error;
        }

    }

    async getById(idProd) {
        try {
            const dto = await this.#dao.getById(idProd)
            return dto
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async updateById(idProd, dataProd) {
        try {
            const updated = await this.#dao.updateById(idProd, dataProd);
            return updated
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
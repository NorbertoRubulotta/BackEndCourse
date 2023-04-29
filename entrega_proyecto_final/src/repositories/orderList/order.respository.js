import { logger } from "../../persistence/loggers/logger.js";
export class OrderList {
    #dao;
    constructor(dao) {
        this.#dao = dao;
    }

    async save(order) {
        try {
            await this.#dao.save(order.data());
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async getAll() {
        try {
            return await this.#dao.getAll();
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}
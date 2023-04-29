import { User } from "../../models/userModel.js";
import { logger } from "../../persistence/loggers/logger.js";
export default class UserList {
    #dao
    constructor(dao) {
        this.#dao = dao
    }

    async save(user) {
        try {
            await this.#dao.save(user);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const dto = await this.#dao.getById(id)
            return new User(dto)
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async getByEmail(email) {
        try {

            const findUser = await this.#dao.getByEmail(email)
            return findUser;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

}
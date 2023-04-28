import { User } from "../../models/userModel.js";

export default class UserList {
    #dao
    constructor(dao) {
        this.#dao = dao
    }

    async save(user) {
        try {
            await this.#dao.save(user);
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }

    async getById(id) {
        try {
            const dto = await this.#dao.getById(id)
            return new User(dto)
        } catch (err) {
            throw logger.error({ Error: 'Error finding user' });
        }
    }

    async getByEmail(email) {
        try {

            const findUser = await this.#dao.getByEmail(email)
            return findUser;
        } catch (error) {
            throw new Error("User not found. Error: " + error);
        }
    }

}
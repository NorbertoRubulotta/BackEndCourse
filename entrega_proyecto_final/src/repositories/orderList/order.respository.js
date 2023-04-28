
export class OrderList {
    #dao;
    constructor(dao) {
        this.#dao = dao;
    }

    async save(order) {
        try {
            await this.#dao.save(order.data());
        } catch (e) {
            throw logger.error({ Error: 'Error finding products' });
        }
    }

    async getAll() {
        try {
            return await this.#dao.getAll();
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }
}
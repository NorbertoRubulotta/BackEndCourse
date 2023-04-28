
export default class CartList {
    #dao
    constructor(dao) {
        this.#dao = dao
    }

    async save(cart) {
        try {
            await this.#dao.save(cart);
        } catch (e) {
            logger.error(e);
            throw e;
        }

    }

    async getById(idProd) {
        try {
            const dto = await this.#dao.getById(idProd)
            return dto
        } catch (err) {
            throw loggerFileError.error({ Error: 'Error finding product' });
        }
    }

    async updateById(idProd, dataProd) {
        try {
            const updated = await this.#dao.updateById(idProd, dataProd);
            return updated
        } catch (err) {
            logger.error(err);
            throw err;
        }
    }
    async deleteById(idProd) {
        try {
            const deleted = await this.#dao.deleteById(idProd)
            return deleted
        }
        catch (err) {
            throw loggerFileError.error({ Error: 'Error deleting products' });
        }
    }


}
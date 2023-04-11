
export default class DaoMysql {
    #client;
    #table;
    constructor(clientMysql, table) {
        this.#client = clientMysql;
        this.#table = table;
    }

    async save(object) {
        try {
            await this.#client(this.#table).insert(object);
        } catch (error) {
            throw new Error(error)
        }
    }

    async getAll() {
        try {
            return this.#client(this.#table).select();
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id) {
        try {
            const allElements = await this.getAll();
            return allElements.find(e => e.id === id);
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateById(id, object) {
        try {
            await this.#client(this.#table).update(object).where('id', id);
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteAll() {
        try {
            await this.#client(this.#table).delete();
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteById(id) {
        try {
            await this.#client(this.#table).delete().where('id', id);
        } catch (error) {
            throw new Error(error);
        }
    }
}
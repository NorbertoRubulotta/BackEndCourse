import { ObjectId } from 'mongodb';
import { mongoDatabase } from '../containers/mongoClient.js';



export default class DaoMongoDB {
    #collection;
    constructor(collectionName) {
        this.#collection = mongoDatabase.collection(collectionName);
    }


    async save(dto) {
        try {
            await this.#collection.insertOne(dto)
            return dto
        } catch (error) {
            throw new Error("ErrorMessage: 'Error trying to find elements");
        }
    }

    async getAll() {
        try {
            return await this.#collection.find({}).toArray()
        } catch (error) {
            throw new Error("ErrorMessage: 'Error trying to find elements");
        }
    }

    async getById(id) {
        try {
            const dto = await this.#collection.findOne({ id: id })
            if (dto) {
                return dto
            }
            return null
        } catch (error) {
            throw new Error("ErrorMessage: 'Error trying to find elements");
        }
    }

    async deleteById(id) {
        try {
            const deleted = await this.#collection.deleteOne({ id: id })
            if (deleted.deletedCount === 0) {
                return -1
            } else {
                return deleted
            }
        } catch (error) {
            throw new Error("ErrorMessage: Error trying to remove element");
        }
    }

    async deleteAll() {
        try {
            await this.#collection.deleteMany({});
        } catch (error) {
            throw new Error("ErrorMessage: Error trying to remove elements");
        }

    }

    async updateById(id, obj) {
        try {
            const updated = await this.#collection.updateOne({ id }, { $set: obj });
            if (updated.modifiedCount === 0) {
                return -1
            } else {
                return true
            }
        } catch (error) {
            throw new Error({ "ErrorMessage": 'Error trying to update elements' });
        }
    }

    async getByEmail(email) {
        try {
            const obj = { email: email };
            const findUser = await this.#collection.findOne(obj)
            return findUser;
        } catch (error) {
            throw new Error("User not found. Error: " + error);
        }
    }
}
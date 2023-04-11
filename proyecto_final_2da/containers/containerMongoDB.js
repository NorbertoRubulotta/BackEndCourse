import { ObjectId } from 'mongodb';
import { mongoDatabase } from './mongoClient.js';



export default class ContainerMongoDB {
    #collection;
    constructor(collectionName) {
        this.#collection = mongoDatabase.collection(collectionName);
    }


    async save(element) {
        try {
            await this.#collection.insertOne(element)
            return element
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
            const result = await this.#collection.findOne({ id: id })
            if (result) {
                return result
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

    async updateById(oldObject, obj) {
        try {
            const updated = await this.#collection.updateOne({ id: oldObject }, { $set: obj });
            if (updated.modifiedCount === 0) {
                return -1
            } else {
                return true
            }
        } catch (error) {
            throw new Error({ "ErrorMessage": 'Error trying to update elements' });
        }
    }

}
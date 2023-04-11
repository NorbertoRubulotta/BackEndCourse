

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
            throw new Error("ErrorMessage: 'Error trying to save elements");
        }
    }

    async getAll() {
        try {
            return await this.#collection.find({}).toArray()
        } catch (error) {
            throw new Error("ErrorMessage: 'Error trying to find elements");
        }
    }
}
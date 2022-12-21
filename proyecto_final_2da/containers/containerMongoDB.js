import { mongoDatabase } from './mongoClient.js';


export default class ContainerMongoDB {
    #collection;
    constructor(collectionName) {
        this.#collection = mongoDatabase.collection(collectionName);
    }


    async save(element) {
        try {
            await this.#collection.insertOne(element)
        } catch (error) {
            throw new Error({ "ErrorMessage": 'Error trying to remove elements' });
        }
    }

    async getAll() {
        try {
            return await this.#collection.find({}).toArray()
        } catch (error) {
            throw new Error({ "ErrorMessage": 'Error trying to remove elements' });
        }
    }

    async getById(id) {
        try {
            const result = await this.#collection.find({ id: id }).toArray()
            if (result) {
                return result
            }
            return null

        } catch (error) {
            throw new Error({ "ErrorMessage": 'Error trying to remove elements' });
        }
    }

    async deleteById(id = {}) {
        try {
            const deleted = await this.#collection.deleteOne(id)
            if (!deleted) {
                return -1
            } else {
                return deleted
            }
        } catch (error) {
            throw new Error({ "ErrorMessage": 'Error trying to remove element' });
        }
    }

    async deleteAll() {
        try {
            await this.#collection.deleteMany({});
        } catch (error) {
            throw new Error({ "ErrorMessage": 'Error trying to remove elements' });
        }

    }

    async updateById(oldObject, obj) {
        try {
            await this.#collection.updateOne(oldObject, { $set: obj });
        } catch (error) {
            throw new Error({ "ErrorMessage": 'Error trying to update elements' });
        }
    }


/*
    async addToCart(id, product) {
        this.#elements = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'));
        const index = this.#elements.indexOf(this.#elements.find(e => e.id === id));
        if (index === -1) {
            return index
        } else {
            this.#elements[index].products.push(product);
            await fs.promises.writeFile(this.#route, JSON.stringify(this.#elements, null, 2))
        }
    }
 
    async emptCartById(id) {
        this.#elements = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'));
        const index = this.#elements.indexOf(this.#elements.find(e => e.id === id));
        if (index === -1) {
            return index
        } else {
            this.#elements[index].products = [];
            await fs.promises.writeFile(this.#route, JSON.stringify(this.#elements, null, 2))
        }
    }
    async deleteProductFromCartById(id_cart, id_prod) {
        this.#elements = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'));
        const index = this.#elements.indexOf(this.#elements.find(e => e.id === id_cart));
        if (index === -1) {
            return index
        } else {
            /* this.#elements[index].products = this.#elements[index].products.filter(products => products.id != id_prod); */
/*     const index_product = this.#elements[index].products.indexOf(this.#elements[index].products.find(e => e.id === id_prod));
    if(index_product === -1) {
    return -2
} else {
    const productDeleted = this.#elements[index].products.splice(index_product, 1);
    await fs.promises.writeFile(this.#route, JSON.stringify(this.#elements, null, 2))
    return productDeleted
}

        }

    } * /
} */
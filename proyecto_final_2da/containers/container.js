import * as fs from 'fs';

export default class ContainerFile {
    #elements
    #route

    constructor(route) {
        this.#elements = [],
            this.#route = route;
    }


    async getAll() {
        this.#elements = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'))
        return this.#elements
    }

    async save(element) {
        const allElements = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'))
        allElements.push(element)
        await fs.promises.writeFile(this.#route, JSON.stringify(allElements, null, 2))
    }

    async getById(id) {
        this.#elements = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'))
        const result = this.#elements.find(e => e.id === id);
        if (result) {
            return result
        }
        return null
    }
    async deleteById(id) {
        this.#elements = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'));
        const index = this.#elements.indexOf(this.#elements.find(e => e.id === id));
        if (index === -1) {
            return index
        } else {
            const deleted = this.#elements[index]
            this.#elements.splice(index, 1);
            await fs.promises.writeFile(this.#route, JSON.stringify(this.#elements, null, 2))
            return deleted
        }
    }
    async deleteAll() {
        this.#elements = [];
        await fs.promises.writeFile(this.#route, JSON.stringify(this.#elements, null, 2))
    }

    async updateById(id, body) {
        this.#elements = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'));
        const index = this.#elements.indexOf(this.#elements.find(e => e.id === id));
        if (index === -1) {
            return index
        } else {
            body.id = id;
            this.#elements[index] = body;
            await fs.promises.writeFile(this.#route, JSON.stringify(this.#elements, null, 2))
        }
    }
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

            const index_product = this.#elements[index].products.indexOf(this.#elements[index].products.find(e => e.id === id_prod));
            if (index_product === -1) {
                return -2
            } else {
                const productDeleted = this.#elements[index].products.splice(index_product, 1);
                await fs.promises.writeFile(this.#route, JSON.stringify(this.#elements, null, 2))
                return productDeleted
            }

        }

    }
}
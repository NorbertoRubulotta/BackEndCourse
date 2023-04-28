import { CartDto } from '../persistence/dto/cartDTO.js';
import { createID } from '../utils/idCreator.js';

export class Cart {
    #id;
    #products;
    constructor({ id = createID(), products = [] } = {}) {
        this.#id = id;
        this.#products = products;
    }

    get id() {
        return this.#id;
    }
    get products() {
        return this.#products;
    }

    data() {
        return new CartDto({
            id: this.#id,
            products: this.#products
        });
    };

}
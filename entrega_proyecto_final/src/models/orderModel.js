
import { OrderDto } from '../persistence/dto/orderDTO.js';
import { createID } from '../utils/idCreator.js';
export class Order {
    #id;
    #date;
    #idClient;
    #products;
    constructor(idClient, products) {
        this.#id = createID();
        this.#date = (new Date(Date.now())).toLocaleString();
        this.#idClient = idClient;
        this.#products = products;
    }

    get id() {
        return this.#id;
    }

    get date() {
        return this.#date;
    }

    data() {
        return new OrderDto({
            id: this.#id,
            date: this.#date,
            idClient: this.#idClient,
            products: this.#products
        });
    }
}
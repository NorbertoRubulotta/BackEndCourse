import { ProductDto } from "../persistence/dto/productDto.js";

export class Product {
    #id;
    #name;
    #price;
    #description;
    #image;
    constructor({ id, name, price, description, image }) {
        this.#id = id;
        this.#name = name;
        this.#price = price;
        this.#description = description;
        this.#image = image;
    }

    get id() {
        return this.#id;
    }
    get name() {
        return this.#name;
    }
    get price() {
        return this.#price;
    }
    get description() {
        return this.#description;
    }
    get image() {
        return this.#image;
    }

    set name(name) {
        this.#name = name;
    }
    set price(price) {
        this.#price = price;
    }
    set description(description) {
        this.#description = description;
    }
    set image(image) {
        this.#image = image;
    }

    datos() {
        return new ProductDto({
            id: this.#id,
            name: this.#name,
            price: this.#price,
            description: this.#description,
            image: this.#image
        });
    }


}
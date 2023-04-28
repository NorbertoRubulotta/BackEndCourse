import { ProductDto } from "../persistence/dto/productDto.js";
import { createID } from "../utils/idCreator.js";

export class Product {
  #id
  #name
  #description
  #price
  #image
  constructor({ id = createID(), name, description, price, image }) {
    this.#id = id;
    this.#name = name;
    this.#description = description;
    this.#price = price;
    this.#image = image;
  }

  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get description() {
    return this.#description;
  }
  get price() {
    return this.#price;
  }
  get image() {
    return this.#image;
  }

  data() {
    return new ProductDto({
      id: this.#id,
      name: this.#name,
      price: this.#price,
      description: this.#description,
      image: this.#image
    });
  }

} 

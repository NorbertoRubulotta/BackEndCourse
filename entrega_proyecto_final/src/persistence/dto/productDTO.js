export class ProductDto {
    constructor({ id, name, price, description, image }) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
    }
}
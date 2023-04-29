import { Cart } from "../../../models/cartModel.js";
import { logger } from "../../../persistence/loggers/logger.js";

export class CartService {
    #productsRepository;
    #cartRepository;
    constructor(cartList, productList) {
        this.#cartRepository = cartList;
        this.#productsRepository = productList;
    }

    async createCart() {
        try {
            const cart = new Cart();
            await this.#cartRepository.save(cart.data());
            return cart.id;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async save(id_prod, idCart) {
        try {
            const product = await this.#productsRepository.getById(id_prod);
            if (!product) return null;
            const cart = await this.#cartRepository.getById(idCart);
            const prodInCart = cart.products.find(prod => {
                if (prod.idProd === product.id) {
                    prod.cant++
                    return true
                }
            });
            if (prodInCart) {
                await this.#cartRepository.updateById(idCart, cart);
            }
            else {
                cart.products.push({ idProd: product.id, cant: 1 })
                await this.#cartRepository.updateById(idCart, cart)
            }
            return product.data();
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async getById(idCart) {
        try {
            const cart = await this.#cartRepository.getById(idCart);

            return cart
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async deleteById(idCart, id) {
        try {
            const cart = await this.#cartRepository.getById(idCart);
            const productIndex = cart.products.findIndex(prod => prod.idProd == id);

            if (productIndex !== -1) {
                if (cart.products[productIndex].cant === 1) {
                    cart.products.splice(productIndex, 1);
                    await this.#cartRepository.updateById(idCart, cart)

                } else {
                    cart.products[productIndex].cant--;
                    await this.#cartRepository.updateById(idCart, cart)
                }
            } else return false;
            return cart;

        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}
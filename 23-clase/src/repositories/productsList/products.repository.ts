import { Product } from "../../models/product.model.js";
import { ProductDto } from "../../persistence/dto/productDto.js";
import { Injectable } from '@nestjs/common';
@Injectable()
export default class ProductList {
    #dao
    constructor(dao) {
        this.#dao = dao
    }

    async save(prod) {
        const dto = new ProductDto(prod.datos())
        const dtoGuardado = await this.#dao.save(dto);
        return new Product(dtoGuardado)
    }

    async getAll() {
        try {
            const dtos = await this.#dao.getAll()
            return dtos.map(dto => new Product(dto))
        } catch (err) {
            return { Error: 'Error finding products' }
        }
    }

    async getById(idProd) {
        try {
            const dto = await this.#dao.getById(idProd)
            return new Product(dto)
        } catch (err) {
            return { Error: 'Error finding product' }
        }
    }

    async updateById(idProd, dataProd) {
        try {
            const updated = await this.#dao.updateById(idProd, dataProd);
            return updated
        } catch (err) {
            return { Error: 'Error updating products' };
        }
    }

    async deleteById(idProd) {
        try {
            const deleted = await this.#dao.deleteById(idProd)
            return deleted
        }
        catch (err) {
            return { Error: 'Error deleting products' };
        }
    }

    async deleteAll() {
        try {
            await this.#dao.deleteAll();
        } catch (err) {
            return { Error: 'Error deleting products' };
        }
    }
}
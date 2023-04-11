import { Injectable } from '@nestjs/common';

import { Product } from '../models/product.model.js';
import { UpdateProductDto } from 'src/persistence/dto/update-product.dto.js';
import ProductList from 'src/repositories/productsList/products.repository.js';

@Injectable()
export class ProductsService {
  constructor(private readonly ProductList: ProductList) {}

  async findAll() {
    try {
      const data = await this.ProductList.find({});
      return { message: 'Products found', data };
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.ProductList.findById(id);
      return {
        message: data === null ? 'Product not found' : 'Product found',
        data,
      };
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }
  }

  async save(object: Product) {
    try {
      const product = new Product(object);
      const data = await this.ProductList.save(product);
      return { message: 'Product created successfully', data };
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const data = await this.ProductList.findOneAndUpdate(
        { _id: id },
        updateProductDto,
        { new: true },
      );
      return { message: 'Product modified successfully', data };
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }
  }

  async remove(id: string) {
    try {
      const data = await this.ProductList.deleteOne({ _id: id });
      return {
        message:
          data.deletedCount === 0
            ? 'Product not found'
            : 'Product deleted successfully',
        data,
      };
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }
  }
  /* async save(object) {
        object.id = randomUUID();
        const product = new Product(object)
        try {
            await productList.save(product)
            return product;
        } catch (err) {
            throw loggerFileError.error({ Error: 'Error saving products' });
        }
    }

    async getAll() {
        try {
            return await productList.getAll();
        } catch (err) {
            throw loggerFileError.error({ Error: 'Error getting products' });
        }
    }

    async getById(id) {
        try {
            return await productList.getById(id);
        } catch (err) {
            throw loggerFileError.error({ Error: 'Error finding products' });
        }
    }

    async updateById(id, data) {
        try {
            const updatedProd = await productList.updateById(id, data);
            if (updatedProd === -1) { return false }
            return true
        } catch (err) {
            throw loggerFileError.error({ Error: 'Error updating products' });
        }
    }



    async deleteById(id) {
        try {
            return await productList.deleteById(id);
        } catch (err) {
            throw loggerFileError.error({ Error: 'Error deleting product' });
        }
    }

    async deleteAll() {
        try {
            await productList.deleteAll();
        } catch (err) {
            throw loggerFileError.error({ Error: 'Error deleting products' });
        }
    } */
}

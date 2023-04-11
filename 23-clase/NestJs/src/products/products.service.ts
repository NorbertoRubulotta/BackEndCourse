import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products, ProductsDocument } from './schema/products.schema';

@Injectable()
export class ProductsService {
  model: any;

  constructor(
    @InjectModel(Products.name) productsModel: Model<ProductsDocument>,
  ) {
    this.model = productsModel;
  }

  async findAll() {
    try {
      const data = await this.model.find({});
      return data;
    } catch (error) {
      return { Error: 'Error getting products', error };
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.model.findById(id);
      return {
        message: data === null ? 'Product not found' : 'Product found',
        data,
      };
    } catch (error) {
      return { Error: 'Error getting product', error };
    }
  }

  async create(createProductDto: CreateProductDto) {
    try {
      const productSchema = new this.model(createProductDto);
      const data = await productSchema.save();
      return { message: 'Product created successfully', data };
    } catch (error) {
      return { Error: 'Error creating products', error };
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const data = await this.model.findOneAndUpdate(
        { _id: id },
        updateProductDto,
        { new: true },
      );
      return { message: 'Product modified successfully', data };
    } catch (error) {
      return { Error: 'Error updating products', error };
    }
  }

  async remove(id: string) {
    try {
      const data = await this.model.deleteOne({ _id: id });
      return {
        message:
          data.deletedCount === 0
            ? 'Product not found'
            : 'Product deleted successfully',
        data,
      };
    } catch (error) {
      return { Error: 'Error deleting products', error };
    }
  }
}

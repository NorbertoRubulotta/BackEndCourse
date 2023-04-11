import { Product } from '../models/product.model.js';
import { UpdateProductDto } from 'src/persistence/dto/update-product.dto.js';
import ProductList from 'src/repositories/productsList/products.repository.js';
export declare class ProductsService {
    private readonly ProductList;
    constructor(ProductList: ProductList);
    findAll(): Promise<{
        message: string;
        data: any;
        error?: undefined;
    } | {
        message: string;
        error: any;
        data?: undefined;
    }>;
    findOne(id: string): Promise<{
        message: string;
        data: any;
        error?: undefined;
    } | {
        message: string;
        error: any;
        data?: undefined;
    }>;
    save(object: Product): Promise<{
        message: string;
        data: any;
        error?: undefined;
    } | {
        message: string;
        error: any;
        data?: undefined;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        message: string;
        data: any;
        error?: undefined;
    } | {
        message: string;
        error: any;
        data?: undefined;
    }>;
    remove(id: string): Promise<{
        message: string;
        data: any;
        error?: undefined;
    } | {
        message: string;
        error: any;
        data?: undefined;
    }>;
}

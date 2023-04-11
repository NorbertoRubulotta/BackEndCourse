import { ProductsService } from './products.service';
import { ProductDto } from "../persistence/dto/productDto.js";
import { UpdateProductDto } from 'src/persistence/dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
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
    create(createProductDto: ProductDto): Promise<{
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

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<{
        message: string;
        data: any;
        error?: undefined;
    } | {
        message: string;
        error: any;
        data?: undefined;
    }>;
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

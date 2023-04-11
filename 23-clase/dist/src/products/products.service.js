"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const product_model_js_1 = require("../models/product.model.js");
const products_repository_js_1 = require("src/repositories/productsList/products.repository.js");
let ProductsService = class ProductsService {
    constructor(ProductList) {
        this.ProductList = ProductList;
    }
    async findAll() {
        try {
            const data = await this.ProductList.find({});
            return { message: 'Products found', data };
        }
        catch (error) {
            return { message: 'Something went wrong =/', error };
        }
    }
    async findOne(id) {
        try {
            const data = await this.ProductList.findById(id);
            return {
                message: data === null ? 'Product not found' : 'Product found',
                data,
            };
        }
        catch (error) {
            return { message: 'Something went wrong =/', error };
        }
    }
    async save(object) {
        try {
            const product = new product_model_js_1.Product(object);
            const data = await this.ProductList.save(product);
            return { message: 'Product created successfully', data };
        }
        catch (error) {
            return { message: 'Something went wrong =/', error };
        }
    }
    async update(id, updateProductDto) {
        try {
            const data = await this.ProductList.findOneAndUpdate({ _id: id }, updateProductDto, { new: true });
            return { message: 'Product modified successfully', data };
        }
        catch (error) {
            return { message: 'Something went wrong =/', error };
        }
    }
    async remove(id) {
        try {
            const data = await this.ProductList.deleteOne({ _id: id });
            return {
                message: data.deletedCount === 0
                    ? 'Product not found'
                    : 'Product deleted successfully',
                data,
            };
        }
        catch (error) {
            return { message: 'Something went wrong =/', error };
        }
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_repository_js_1.default])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map
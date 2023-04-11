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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ProductList_dao;
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_js_1 = require("../../models/product.model.js");
const productDto_js_1 = require("../../persistence/dto/productDto.js");
const common_1 = require("@nestjs/common");
let ProductList = class ProductList {
    constructor(dao) {
        _ProductList_dao.set(this, void 0);
        __classPrivateFieldSet(this, _ProductList_dao, dao, "f");
    }
    async save(prod) {
        const dto = new productDto_js_1.ProductDto(prod.datos());
        const dtoGuardado = await __classPrivateFieldGet(this, _ProductList_dao, "f").save(dto);
        return new product_model_js_1.Product(dtoGuardado);
    }
    async getAll() {
        try {
            const dtos = await __classPrivateFieldGet(this, _ProductList_dao, "f").getAll();
            return dtos.map(dto => new product_model_js_1.Product(dto));
        }
        catch (err) {
            return { Error: 'Error finding products' };
        }
    }
    async getById(idProd) {
        try {
            const dto = await __classPrivateFieldGet(this, _ProductList_dao, "f").getById(idProd);
            return new product_model_js_1.Product(dto);
        }
        catch (err) {
            return { Error: 'Error finding product' };
        }
    }
    async updateById(idProd, dataProd) {
        try {
            const updated = await __classPrivateFieldGet(this, _ProductList_dao, "f").updateById(idProd, dataProd);
            return updated;
        }
        catch (err) {
            return { Error: 'Error updating products' };
        }
    }
    async deleteById(idProd) {
        try {
            const deleted = await __classPrivateFieldGet(this, _ProductList_dao, "f").deleteById(idProd);
            return deleted;
        }
        catch (err) {
            return { Error: 'Error deleting products' };
        }
    }
    async deleteAll() {
        try {
            await __classPrivateFieldGet(this, _ProductList_dao, "f").deleteAll();
        }
        catch (err) {
            return { Error: 'Error deleting products' };
        }
    }
};
_ProductList_dao = new WeakMap();
ProductList = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], ProductList);
exports.default = ProductList;
//# sourceMappingURL=products.repository.js.map
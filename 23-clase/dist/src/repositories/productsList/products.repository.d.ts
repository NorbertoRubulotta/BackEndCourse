export default class ProductList {
    #private;
    constructor(dao: any);
    save(prod: any): Promise<any>;
    getAll(): Promise<any>;
    getById(idProd: any): Promise<any>;
    updateById(idProd: any, dataProd: any): Promise<any>;
    deleteById(idProd: any): Promise<any>;
    deleteAll(): Promise<{
        Error: string;
    }>;
}

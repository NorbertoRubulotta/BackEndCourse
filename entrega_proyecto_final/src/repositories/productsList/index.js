import { PERSISTENCIA } from '../../config/config.js'
import DaoMongoDB from '../../persistence/daos/daoMongoDB.js'
import ProductList from './products.repository.js'

let productList

switch (PERSISTENCIA) {
    default:
        const daoMongoDb = new DaoMongoDB('products')
        productList = new ProductList(daoMongoDb)
}


export default productList
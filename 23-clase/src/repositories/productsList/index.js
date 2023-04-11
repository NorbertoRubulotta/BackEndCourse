import { PERSISTENCIA, RUTA } from '../../config/config.js'
import DaoFile from '../../persistence/daos/DaoFile.js'
import DaoMongoDB from '../../persistence/daos/DaoMongoDB.js'
import ProductList from './products.repository.js'

let productList

switch (PERSISTENCIA) {
    case 'file':
        const dao = new DaoFile(RUTA)
        productList = new ProductList(dao)
        break
    default:
        const daoMongoDb = new DaoMongoDB('products')
        productList = new ProductList(daoMongoDb)
}


export { productList }
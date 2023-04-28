import { PERSISTENCIA, RUTA } from '../../config/config.js'
import DaoFile from '../../persistence/daos/DaoFile.js'
import DaoMongoDB from '../../persistence/daos/daoMongoDB.js'
import CartList from './carts.repository.js'

let cartList

switch (PERSISTENCIA) {
    case 'file':
        const dao = new DaoFile(RUTA)
        cartList = new CartList(dao)
        break
    default:
        const daoMongoDb = new DaoMongoDB('cart')
        cartList = new CartList(daoMongoDb)
}

export default cartList 
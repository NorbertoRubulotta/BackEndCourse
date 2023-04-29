import { PERSISTENCIA } from '../../config/config.js'
import DaoMongoDB from '../../persistence/daos/daoMongoDB.js'
import CartList from './carts.repository.js'

let cartList

switch (PERSISTENCIA) {
    default:
        const daoMongoDb = new DaoMongoDB('cart')
        cartList = new CartList(daoMongoDb)
}

export default cartList 
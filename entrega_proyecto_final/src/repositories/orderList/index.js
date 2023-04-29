import { PERSISTENCIA } from '../../config/config.js'
import DaoMongoDB from '../../persistence/daos/daoMongoDB.js'
import { OrderList } from './order.respository.js'


let orderList

switch (PERSISTENCIA) {
    default:
        const daoMongoDb = new DaoMongoDB('orders')
        orderList = new OrderList(daoMongoDb)
}


export default orderList
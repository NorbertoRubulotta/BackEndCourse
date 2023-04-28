import { PERSISTENCIA, RUTA } from '../../config/config.js'
import DaoFile from '../../persistence/daos/DaoFile.js'
import DaoMongoDB from '../../persistence/daos/daoMongoDB.js'

import { OrderList } from './order.respository.js'


let orderList

switch (PERSISTENCIA) {
    case 'file':
        const dao = new DaoFile(RUTA)
        orderList = new OrderList(dao)
        break
    default:
        const daoMongoDb = new DaoMongoDB('orders')
        orderList = new OrderList(daoMongoDb)
}


export default orderList
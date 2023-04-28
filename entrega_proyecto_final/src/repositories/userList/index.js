import { PERSISTENCIA, RUTA } from '../../config/config.js'
import DaoFile from '../../persistence/daos/DaoFile.js'
import DaoMongoDB from '../../persistence/daos/daoMongoDB.js'
import UserList from './users.repository.js'

let userList

switch (PERSISTENCIA) {
    case 'file':
        const dao = new DaoFile(RUTA)
        userList = new UserList(dao)
        break
    default:
        const daoMongoDb = new DaoMongoDB('users')
        userList = new UserList(daoMongoDb)
}


export default userList 
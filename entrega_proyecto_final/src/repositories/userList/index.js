import { PERSISTENCIA } from '../../config/config.js'
import DaoMongoDB from '../../persistence/daos/daoMongoDB.js'
import UserList from './users.repository.js'

let userList

switch (PERSISTENCIA) {
    default:
        const daoMongoDb = new DaoMongoDB('users')
        userList = new UserList(daoMongoDb)
}

export default userList 
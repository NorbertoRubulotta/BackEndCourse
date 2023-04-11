
import DaoMongoDB from './DaoMongoDB.js';
import DaoFile from './DaoFile.js';
import { CART_ROUT, PERSISTENCIA, RUTA } from '../../config/config.js';

/* export let ProductsContainer; */
export let containerUsers;
export let MessagesContainer;

switch (PERSISTENCIA) {
    case 'file':
        chosenProdsContainer = new DaoFile(RUTA);
        chosenCartContainer = new DaoFile(CART_ROUT);
        break;

    default:
        /* ProductsContainer = new DaoMongoDB('products'); */
        containerUsers = new DaoMongoDB('user');
        MessagesContainer = new DaoMongoDB('messages');
        break;
}
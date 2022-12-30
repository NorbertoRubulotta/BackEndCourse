import { CART_ROUT, PERSISTENCIA, RUTA } from '../config/config.js';
import MongoDBContainer from './containerMongoDB.js';
import { FirestoreContainer } from './containerFireBase.js';
import ContainerFile from './Container.js';


export let chosenProdsContainer;
export let chosenCartContainer;

switch (PERSISTENCIA) {
    case 'mongodb':
        chosenProdsContainer = new MongoDBContainer('products');
        chosenCartContainer = new MongoDBContainer('cart');
        break;
    case 'firestore':
        chosenProdsContainer = new FirestoreContainer('products');
        chosenCartContainer = new FirestoreContainer('cart');
        break;
    default:
        chosenProdsContainer = new ContainerFile(RUTA);
        chosenCartContainer = new ContainerFile(CART_ROUT);
        break;
}
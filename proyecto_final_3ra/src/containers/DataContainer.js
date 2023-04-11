
import MongoDBContainer from './containerMongoDB.js';
import { FirestoreContainer } from './containerFireBase.js';
import ContainerFile from './Container.js';
import { CART_ROUT, PERSISTENCIA, RUTA } from '../config/config.js';


export let chosenProdsContainer;
export let chosenCartContainer;
export let chosenUserContainer;

switch (PERSISTENCIA) {
    case 'mongodb':
        chosenProdsContainer = new MongoDBContainer('products');
        chosenCartContainer = new MongoDBContainer('cart');
        chosenUserContainer = new MongoDBContainer('user');
        break;
    case 'firestore':
        chosenProdsContainer = new FirestoreContainer('products');
        chosenCartContainer = new FirestoreContainer('cart');
        chosenUserContainer = new FirestoreContainer('user');
        break;
    default:
        chosenProdsContainer = new ContainerFile(RUTA);
        chosenCartContainer = new ContainerFile(CART_ROUT);
        break;
}
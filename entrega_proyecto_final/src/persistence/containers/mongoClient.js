import { MongoClient } from 'mongodb';
import { CNX_STR, DB_NAME } from '../../config/config.js';


//agregar connexion local
const mongoClient = new MongoClient(CNX_STR);
await mongoClient.connect();

export const mongoDatabase = mongoClient.db(DB_NAME)

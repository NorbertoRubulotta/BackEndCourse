import { MongoClient } from 'mongodb';
import { CNX_STR, DB_NAME } from '../../config/config.js';



const mongoClient = new MongoClient(CNX_STR);
await mongoClient.connect();
console.log("Conectado a la base");

/*
const test = await mongoClient.db("ecommerce").collection("products").find({ "_id": ObjectId("638e0241043dca097e2ab8f7") }).toArray()
console.log(test); */

export const mongoDatabase = mongoClient.db(DB_NAME)

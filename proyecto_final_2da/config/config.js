
//MongoDB
/
/* export const CNX_STR = 'mongodb+srv://coderhouse:coderhouse@cluster0.z9shnaw.mongodb.net/ecommerce'; */ // Remota
export const CNX_STR = 'mongodb://localhost:27017/?readPreference=primary&ssl=false&directConnection=true' // local ????????
export const DB_NAME = 'ecommerce';

// FireStore
/* export const FIREBASE_CREDENTIALS = {
  
}; */

// Files
export const RUTA = '../products.txt';
export const CART_ROUT = '../cart.txt';

// PERSISTENCIA
export const PERSISTENCIA = 'mongodb';
// export const PERSISTENCIA = 'firestore';
// export const PERSISTENCIA = 'fs';
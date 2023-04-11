import { randomUUID } from 'crypto';
import { encryptPassword } from "../utils/passEncrypter.js";
import { createCart } from './cartModel.js';
import { logger } from "../loggers/logger.js";


export async function createUser(userInfo, admin = false) {
    try {
        const idCart = await createCart();
        const id = randomUUID();
        userInfo.password = encryptPassword(userInfo.password);
        admin ? userInfo.admin = true : userInfo.admin = false;
        const user = { id, ...userInfo, idCart };
        return user;
    } catch (err) {
        logger.error(err);
        throw new Error({ Error: 'Error creating new user' });
    }
}






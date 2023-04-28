import bcrypt from 'bcrypt';
import { logger } from '../persistence/loggers/logger.js';

import userList from '../repositories/userList/index.js';


export function encryptPassword(password) {
    return bcrypt.hashSync(password, 10);
}

export async function validatePassword(body) {
    try {
        const user = await userList.getByEmail(body.email);
        const answer = await bcrypt.compareSync(body.password, user.password);
        if (!answer) throw new Error('Invalid password');

        return user;
    } catch (err) {
        logger.error(err);
        throw new Error("error al validar");
    }
}
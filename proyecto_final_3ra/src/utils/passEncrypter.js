import bcrypt from 'bcrypt';
import { SECRET_WORD } from '../config/config.js';
import { logger } from '../loggers/logger.js';
import { chosenUserContainer } from '../containers/DataContainer.js';


export function encryptPassword(password) {
    return bcrypt.hashSync(password, 10);
}

export async function validatePassword(body) {
    try {
        const user = await chosenUserContainer.getByEmail(body.email);
        const answer = await bcrypt.compareSync(body.password, user.password);
        if (!answer) throw new Error('Invalid password');

        return true;
    } catch (err) {
        logger.error(err);
        throw new Error("error al validar");
    }
}
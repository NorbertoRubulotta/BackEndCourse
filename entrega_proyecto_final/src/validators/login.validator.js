import { logger } from "../persistence/loggers/logger.js"



export async function validateLogin(user) {
    try {

        if (!user.email) throw new Error('email format not valid');
        if (typeof user.email !== 'string') throw new Error('email format not valid');
        if (user.email.includes(' ')) throw new Error('email format not valid');
        if (!user.password) throw new Error('password format not valid');
        if (typeof user.password !== 'string') throw new Error('password format not valid');
        if (user.password.includes(' ')) throw new Error('password format not valid');


    } catch (error) {
        logger.error(error.message)
        throw error.message
    }
}
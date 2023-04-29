import { logger } from "../persistence/loggers/logger.js"

export async function validateUser(user) {
    try {

        if (!user.email) throw new Error('email format not valid');
        if (typeof user.email !== 'string') throw new Error('email format not valid');
        if (user.email.includes(' ')) throw new Error('email format not valid');

        if (!user.password) throw new Error('password format not valid');
        if (typeof user.password !== 'string') throw new Error('password format not valid');
        if (user.password.includes(' ')) throw new Error('password format not valid');


        if (!user.name) throw new Error('name format not valid');
        if (typeof user.name !== 'string') throw new Error('name format not valid');

        if (!user.lastname) throw new Error('lastname format not valid');
        if (typeof user.lastname !== 'string') throw new Error('lastname format not valid');

        if (typeof user.image !== 'string') throw new Error('image format not valid');
        if (!user.image) throw new Error('image format not valid');

    } catch (error) {
        logger.error(error.message)
        throw error.message
    }
}
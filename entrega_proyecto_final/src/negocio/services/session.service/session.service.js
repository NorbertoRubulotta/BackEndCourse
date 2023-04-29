import { logger } from '../../../persistence/loggers/logger.js';
import { validatePassword } from '../../../utils/passEncrypter.js';
import { generateToken } from '../../../utils/tokenManagger.js';

export class SessionService {


    async authenticateUser(body) {
        try {
            const user = await validatePassword(body);
            if (!user) {
                throw new Error('Message: User or password is incorrect');
            }
            return generateToken(user);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}
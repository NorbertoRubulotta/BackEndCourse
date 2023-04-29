import { ADMIN_EMAIL } from "../config/config.js";
import { logger } from "../persistence/loggers/logger.js";

export async function onlyForAdmins(req, res, next) {
    try {
        if (req.user.email === ADMIN_EMAIL) {
            next();
        } else {
            res.status(403).json({ Error: 'Access forbidden, User does not have permission to access this content. Please, change User or contact Administrator' });
        }
    } catch (error) {
        logger.error(error);
        throw new Error({ Error: 'Error checking admin permissions', Message: error.message });
    }
}
import { logger } from "../loggers/logger.js";
import { chosenUserContainer } from "../containers/DataContainer.js";

export async function onlyForAdmins(req, res, next) {
    const user = await chosenUserContainer.getByEmail(req.user.email);
    try {
        if (user?.admin) {
            next();
        } else {
            res.status(403).json({ Error: 'Access forbidden, User does not have permission to access this content. Please, change User or contact Administrator' });
        }
    } catch (err) {
        logger.error(err);
        throw new Error({ Error: 'Error checking admin permissions', Message: err.message });
    }
}
import { sessionService } from "../negocio/services/session.service/index.js";
import { logger } from "../persistence/loggers/logger.js";

export async function controllerPostSession(req, res, next) {
    try {
        const token = await sessionService.authenticateUser(req.body);
        res.status(200).header('Authorization', token).json({ token: token });
    } catch (e) {
        logger.error(e);
        next(e);
    }
}


import { logger } from '../persistence/loggers/logger.js'

export function controllerRouteNotFound(req, res) {
    logger.info('Wrong route: ', req.path, 'Method: ', req.method);
    res.status(404).json({ Error: -2, Description: `ROUTE '${req.originalUrl}', METHOD '${req.method}' NOT FOUND ` })
}
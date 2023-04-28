import { logger } from "../loggers/logger.js";

export default function notFound(req, res) {
    logger.info('Wrong route: ', req.path, 'Method: ', req.method);
    res.status(404).json({ Message: 'Page not found', WrongRoute: req.path, Method: req.method });
}
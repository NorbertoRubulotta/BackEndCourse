import { Router } from 'express';
import { controllerGetInfo } from '../controllers/infoController.js';
import compression from 'compression'
import { processData } from '../controllers/infoController.js'
import { logger } from '../loggers/logger.js';


export const routerInfo = Router();
export const routerInfoCompression = Router();

routerInfo.get('/', controllerGetInfo);
routerInfo.get('/compression', compression(), (req, res) => {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    res.render('info', { processData })
})

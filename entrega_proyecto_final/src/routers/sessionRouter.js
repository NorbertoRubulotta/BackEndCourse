import { Router } from 'express';
import { controllerPostSession } from '../controllers/sessionController.js';

export const routerSession = Router();
routerSession.post('/', controllerPostSession);

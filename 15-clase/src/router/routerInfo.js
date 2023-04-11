import { Router } from 'express';
import { controllerGetInfo } from '../controllers/infoController.js';



export const routerInfo = Router();

routerInfo.get('/', controllerGetInfo);
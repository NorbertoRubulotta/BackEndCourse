import { Router } from 'express';
import { controllerGetLogForm } from '../controllers/authController.js';
import { /* controllerGetLogout */ controllerPostLogout } from '../controllers/authController.js';
import { controllerGetLogin, controllerPostLogin } from '../controllers/authController.js';

export const routerLogin = Router();
export const routerLogForm = Router();
export const routerLogout = Router();

routerLogForm.get('/', controllerGetLogForm);
routerLogin.get('/', controllerGetLogin);
routerLogin.post('/', controllerPostLogin);
/* routerLogout.get('/', controllerGetLogout) */
routerLogout.post('/', controllerPostLogout);


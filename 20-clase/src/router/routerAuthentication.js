import { Router } from 'express';
import passport from 'passport';

import { controllerGetErrorLogin, controllerGetLogForm } from '../controllers/authController.js';
import { controllerPostLogout } from '../controllers/authController.js';
import { controllerGetLogin } from '../controllers/authController.js';
import { controllerGetErrorRegister, controllerGetRegister, controllerPostRegister } from '../controllers/registerController.js';

export const routerLogin = Router();
export const routerLogForm = Router();
export const routerLogout = Router();
export const routerRegister = Router();

routerLogForm.get('/', controllerGetLogForm);

routerLogin.get('/', controllerGetLogin);

routerLogin.post('/', passport.authenticate('login', {
    failureRedirect: '/login/errorlogin',
    successRedirect: '/home'
}));
routerLogin.get('/errorLogin', controllerGetErrorLogin);

routerLogout.post('/', controllerPostLogout);

routerRegister.get('/', controllerGetRegister)
routerRegister.post('/', controllerPostRegister)
routerRegister.get('/errorRegister', controllerGetErrorRegister)


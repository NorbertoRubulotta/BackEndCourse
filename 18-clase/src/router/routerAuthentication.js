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

routerLogin.get('/', controllerGetLogin); //muestra pagina

routerLogin.post('/', passport.authenticate('login', {
    failureRedirect: '/login/errorlogin',
    successRedirect: '/home'
}));//loguea 
routerLogin.get('/errorLogin', controllerGetErrorLogin); // error credenciales

routerLogout.post('/', controllerPostLogout);

routerRegister.get('/', controllerGetRegister) //muestra pag
routerRegister.post('/', controllerPostRegister) // crea user
routerRegister.get('/errorRegister', controllerGetErrorRegister) // usuario existente


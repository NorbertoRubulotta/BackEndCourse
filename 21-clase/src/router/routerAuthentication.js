import { Router } from 'express';
import passport from 'passport';


import { controllerPostLogout } from '../controllers/authController.js';
import { controllerGetLogin } from '../controllers/authController.js';
import { controllerPostRegister } from '../controllers/registerController.js';

export const routerLogin = Router();
export const routerLogout = Router();
export const routerRegister = Router();

routerLogin.get('/', controllerGetLogin);

routerLogin.post('/', passport.authenticate('login', {
    failureRedirect: '/login/errorlogin',
    successRedirect: '/home'
}));
/* 
routerLogin.get('/errorLogin', controllerGetErrorLogin); */
routerLogout.post('/', controllerPostLogout);

routerRegister.post('/', controllerPostRegister)



import { Router } from 'express';
import { controllerGetUserInfo, controllerPostCreateUser } from '../controllers/userController.js';
import valAuthenticate from '../middlewares/authLogin.js';

export const routerUsers = Router();
routerUsers.post('/', controllerPostCreateUser);
routerUsers.get('/', valAuthenticate, controllerGetUserInfo);



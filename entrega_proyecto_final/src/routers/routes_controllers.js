import { Router } from 'express'

import { controllerRouteNotFound } from '../controllers/routeNotFoundController.js';

export const routerNotFound = Router();

routerNotFound.all('*', controllerRouteNotFound);


import { Router } from "express";
import { controllerGetRandoms } from "../controllers/randomsController.js";

export const routerRandoms = Router();
routerRandoms.get('/', controllerGetRandoms);
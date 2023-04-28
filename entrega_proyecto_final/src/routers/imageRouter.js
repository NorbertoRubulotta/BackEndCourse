import { Router } from "express";
import { controllerPostImage } from "../controllers/imagesController.js";
import imgUploader from "../middlewares/imageLoader.js";
export const routerImages = Router();
routerImages.post('/', imgUploader, controllerPostImage)
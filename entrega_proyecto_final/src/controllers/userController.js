import { generateToken } from "../utils/tokenManagger.js";
import { usersService } from "../negocio/services/user.service/index.js";
import { logger } from "../persistence/loggers/logger.js";


export async function controllerPostCreateUser(req, res, next) {
    try {
        const user = await usersService.createUser(req.body);
        const token = generateToken(user);
        res.status(201).set('Authorization', token).json({ token: token });
    } catch (e) {
        logger.error(error.message)
        res.json({ error: `Error creating user`, description: error.message });
    }
};

export async function controllerGetUserInfo(req, res) {
    try {
        let user = await usersService.getById(req.user.id);
        return res.status(200).json(user);
    } catch (e) {
        logger.error(error.message)
        res.json({ error: `Error getting user info`, description: error.message });
    }
}
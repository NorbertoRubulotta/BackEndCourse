import { generateToken } from "../utils/tokenManagger.js";
import { usersService } from "../negocio/services/user.service/index.js";


export async function controllerPostCreateUser(req, res, next) {
    try {
        const user = await usersService.createUser(req.body);
        const token = generateToken(user);
        res.status(201).set('Authorization', token).json({ token: token });
    } catch (e) {
        logger.error(e);
        next(e);
    }
};

export async function controllerGetUserInfo(req, res) {
    try {
        let user = await usersService.getById(req.user.id);
        return res.status(200).json(user);
    } catch (e) {
        logger.error(err);
        return res.json({ error: err.message })
    }
}
import { randomUUID } from 'crypto';


import jwt from 'jsonwebtoken'
import { SALT } from '../config/config.js';
import { logger } from '../persistence/loggers/logger.js';
import { containerUsers } from '../persistence/daos/factory.js';


export async function controllerGetRegister(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    await res.render('register')
}

export async function controllerPostRegister(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    const user = req.body;
    if (!user.username | !user.email | !user.password) {
        res.render('errorRegister', { Error: "All the fields are required" })
    } else {
        const isNewUser = await containerUsers.getByEmail(user.email);
        if (isNewUser) {
            res.render("errorRegister", { Error: "User already exist" })
        } else {
            user.id = randomUUID();
            user.password = jwt.sign(user.password, SALT);
            await containerUsers.save(user);
            res.redirect('../login');
        }
    }
}

export async function controllerGetErrorRegister(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    res.render('errorRegister')
}
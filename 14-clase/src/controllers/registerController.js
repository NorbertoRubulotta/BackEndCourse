import { randomUUID } from 'crypto';

import { containerUsers } from "../containers/userContainer.js";
import jwt from 'jsonwebtoken'
import { SALT } from '../config/config.js';


export async function controllerGetRegister(req, res) {
    await res.render('register')
}

export async function controllerPostRegister(req, res) {
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
    res.render('errorRegister')
}
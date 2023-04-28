import jwt from 'jsonwebtoken';
import { SALT } from '../config/config.js';

export function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            idCart: user.idCart
        },
        SALT,
        { expiresIn: "1d" }
    );
}

export function verifyToken(token) {
    return jwt.verify(token, SALT);
}
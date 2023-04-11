import { Strategy } from 'passport-local';

import { randomUUID } from 'crypto';
import jwt from 'jsonwebtoken';
import { SALT } from '../config/config.js';
import { containerUsers } from '../persistence/daos/factory.js';

export const registerLocal = new Strategy({
    passReqToCallback: true
},
    async (req, username, password, done) => {
        try {
            const user = req.body;
            user.id = randomUUID();
            await containerUsers.save(user);
            done(null, user)
        } catch (error) {
            done(null, false, error);
        }
    })

export const loginLocal = new Strategy(
    {
        usernameField: 'email'
    },
    async (email, password, done) => {
        const user = await containerUsers.getByEmail(email);
        if (user) {
            user.password = jwt.verify(user.password, SALT);
            if (user.password === password) {
                return done(null, user)
            }
        }
        return done(null, false)
    }
)
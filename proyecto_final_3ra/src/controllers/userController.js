import passport from "passport";
import { logger } from "../loggers/logger.js";
import { chosenUserContainer } from '../containers/DataContainer.js';
export async function controllerGetUser(req, res) {
    passport.authenticate('login', (err, user, info) => {

        if (err) {
            logger.error(err.message);
            return res.status(400).json({ message: err.message });
        }
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        req.logIn(user, (err) => {
            if (err) {
                logger.error(err.message);;
                return res.status(400).json({ message: 'Internal server error' });
            }

            return res.json(user);
        });
    })(req, res);
}


export async function controllerPostAdminUser(req, res, next) {
    passport.authenticate('register-admin', (err, user, info) => {
        if (err) {
            logger.error(err.message)
            return res.status(400).json({ message: err.message });
        }

        req.logIn(user, (err) => {
            if (err) {
                logger.error(err.message)
                return res.status(400).json({ message: 'Internal server error' });
            }
            return res.json(user);
        });
    })(req, res, next);
};
export async function controllerGetCreateUser(req, res, next) {
    passport.authenticate('register', (err, user, info) => {
        if (err) {
            logger.error(err.message)
            return res.status(400).json({ message: err.message });
        }

        req.logIn(user, (err) => {
            if (err) {
                logger.error(err.message)
                return res.status(400).json({ message: 'Internal server error' });
            }
            return res.json(user);
        });
    })(req, res, next);
};


export async function controllerLogout(req, res) {
    const { name } = req.user;
    req.logout(function (err) {
        if (err) { return next(err); }
        return res.json({ message: `See you soon, ${name}!!` });
    });
}
export async function controllerGetUserInfo(req, res) {
    const { email } = req.user;
    try {
        let user = await chosenUserContainer.getByEmail(email);
        return res.json(user);
    } catch (e) {
        logger.error(err);
        return res.json({ error: err.message })
    }
}
import { Strategy } from "passport-local";
import { chosenCartContainer, chosenUserContainer } from "../containers/DataContainer.js";
import { mailSender } from "../email/email.js";
import { createUser } from "../models/userModel.js"
import { logger } from "../loggers/logger.js";
import { validatePassword } from "../utils/passEncrypter.js";
export const registerLocalAdmin = new Strategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        try {
            const userExist = await chosenUserContainer.getByEmail(req.body.email);
            if (userExist) {
                done({ Message: "User already exists, please login or try another email address" }, false);
            } else {
                const userInfo = {
                    email: req.body.email,
                    password: req.body.password,
                    name: req.body.name,
                    lastName: req.body.lastName,
                    imgUrl: req.body.imgUrl,
                };
                const newUser = await createUser(userInfo, true);
                await chosenUserContainer.save(newUser);

                const newMessage = await mailSender.createMessage(newUser);

                await mailSender.sendMessage(newMessage);

                done(null, newUser);

            }
        } catch (error) {
            done(null, false, error);
        }
    }
);
export const registerLocal = new Strategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        try {
            const userExist = await chosenUserContainer.getByEmail(req.body.email);
            if (userExist) {
                done({ Message: "User already exists, please login or try another email address" }, false);
            } else {
                const userInfo = {
                    email: req.body.email,
                    password: req.body.password,
                    name: req.body.name,
                    lastName: req.body.lastName,
                    imgUrl: req.body.imgUrl,
                };
                const newUser = await createUser(userInfo);
                await chosenUserContainer.save(newUser);

                const newMessage = await mailSender.createMessage(newUser);

                await mailSender.sendMessage(newMessage);

                done(null, newUser);

            }
        } catch (error) {
            done(null, false, error);
        }
    }
);

export const loginLocal = new Strategy(
    {
        usernameField: "email",
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        try {
            const user = await chosenUserContainer.getByEmail(req.body.email);
            const validatePass = await validatePassword(req.body);

            if (!validatePass) {
                return done(null, false);
            }
            const cart = await chosenCartContainer.getById(user.idCart);
            user.cart = cart
            return done(null, user);

        }
        catch (err) {
            logger.error(err.message)
            return done(null, false);
        }
    })


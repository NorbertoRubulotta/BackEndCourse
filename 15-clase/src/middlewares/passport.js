import passport from 'passport';
import { containerUsers } from '../containers/userContainer.js';
import * as strategies from './passportStrategies.js';

passport.use('register', strategies.registerLocal);
passport.use('login', strategies.loginLocal);

export const passportMiddleware = passport.initialize();

passport.serializeUser((user, done) => {
    done(null, user.email)
})

passport.deserializeUser(async (email, done) => {
    try {
        const user = await containerUsers.getByEmail(email);
        done(null, user)
    } catch (error) {
        done(error)
    }
})

export const passportSessionHandler = passport.session()








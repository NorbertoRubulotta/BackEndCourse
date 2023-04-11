import passport from "passport"
import { logger } from "../persistence/loggers/logger.js"

export async function controllerGetLogForm(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    if (!req.session.username) {
        res.redirect('/login')
    } else {
        res.redirect('/home')
    }
}

export async function controllerGetLogin(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    res.json(req.user)
}
export async function controllerGetErrorLogin(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    await res.render('errorLogin')
}

/* export async function controllerPostLogin(req, res) {
    const username = req.body.username;
    req.session.username = username;
    res.cookie('username', username);
    res.redirect('/')
} */



export async function controllerPostLogout(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    const userName = req.cookies.username
    let data = {}
    data.username = userName
    req.session.destroy((err) => {
        res.render('logout', { data })
    })
}


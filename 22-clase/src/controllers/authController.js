import passport from "passport"
import { logger } from "../persistence/loggers/logger.js"



export async function controllerGetLogin(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    res.json(req.user)
}
/* export async function controllerGetErrorLogin(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    res.status(400).json({})
} */


export async function controllerPostLogout(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    const userName = req.cookies.username
    let data = {}
    data.username = userName
    req.session.destroy((err) => {
        res.json(data)
    })
}


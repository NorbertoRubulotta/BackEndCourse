import os from 'os'
import { logger } from '../loggers/logger.js'

export const processData = {
    args: process.argv.slice(2),
    os: process.platform,
    nodeVersion: process.versions.node,
    rss: process.memoryUsage.rss(),
    execPath: process.execPath,
    pid: process.pid,
    path: process.cwd(),
    cpus: os.cpus().length
}


export async function controllerGetInfo(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    /* console.log({ processData }); */
    await res.render('info', { processData })
}

import http from 'http'
import { app } from './app.js'
import { logger } from '../../persistence/loggers/logger.js';

export function createServer(PORT) {
    return new Promise((resolve, reject) => {
        const server = http.createServer(app).listen(PORT, () => {
            console.log('Server listening on port ' + PORT);
            resolve(server)
        }).on('error', error => {
            logger.error(error)
            reject(error)
        })

    })
}
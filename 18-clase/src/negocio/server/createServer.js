import http from 'http'
import { app } from './app.js'
import { configureSocket } from '../../socket/socketConfig.js';
import { info } from '../../config/config.js'

export function createServer(PORT) {
    return new Promise((resolve, reject) => {
        const server = http.createServer(app).listen(PORT, () => {
            configureSocket(server)
            console.log('Server listening on port' + PORT);
            resolve(server)
        }).on('error', error => {
            console.log(`Server error: ${error}`);
            reject(error)
        })

    })
}
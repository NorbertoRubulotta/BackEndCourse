import http from 'http'
import { app } from './app.js'

export function createServer(PORT) {
    return new Promise((resolve, reject) => {
        const server = http.createServer(app).listen(PORT, () => {
            console.log('Server listening on port ' + PORT);
            resolve(server)
        }).on('error', error => {
            console.log(`Server error: ${error}`);
            reject(error)
        })

    })
}
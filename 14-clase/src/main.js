import { app, httpServer } from './server.js'
import { info } from './config/config.js'



/* httpServer.listen(PORT, () => {
    console.log('Server running on port 8080');
}) */
const server = httpServer.listen(info.p, (req, res) => console.log(info.p == 8080 ? `Escuchando el puerto por defecto: ${info.p}` : `Escuchando el puerto por parametro: ${info.p}`))
server.on('error', error => console.log(`Error: ${error}`));

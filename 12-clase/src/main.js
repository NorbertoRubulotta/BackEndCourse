import { app, httpServer } from './server.js'
import { port } from './config/config.js'
httpServer.listen(port, () => {
    console.log('Server running on port 8080');
})


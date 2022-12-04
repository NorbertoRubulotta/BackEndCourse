import { app } from './server.js'
import { port } from './config.js'
app.listen(port, () => {
    console.log('Server running on port 8080');
})


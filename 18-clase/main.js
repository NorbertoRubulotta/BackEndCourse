import { info } from './src/config/config.js'
import cluster from 'cluster'
import os from 'os'
import { createServer } from './src/server/createServer.js'

const CPU__LENGTH = os.cpus().length
console.log(CPU__LENGTH)
if (info.MODE === 'CLUSTER' && cluster.isPrimary) {

    console.log(`Primary PID ${process.pid}`);
    cluster.schedulingPolicy = cluster.SCHED_RR

    for (let i = 0; i < CPU__LENGTH; i++) {
        cluster.fork()
    }

    cluster.on('exit', (Worker, Code, signal) => {

        console.log(`Worker ${Worker.process.pid} died`);
        cluster.fork()
    }

    )
} else {
    await createServer(info.p)
    console.log(`Worker ${process.pid} created`);
}

/*


/* httpServer.listen(PORT, () => {
    console.log('Server running on port 8080');
}) */
/* const server = httpServer.listen(info.p, (req, res) => console.log(info.p == 8080 ? `Escuchando el puerto por defecto: ${info.p}` : `Escuchando el puerto por parametro: ${info.p}`))
server.on('error', error => console.log(`Error: ${error}`)); */

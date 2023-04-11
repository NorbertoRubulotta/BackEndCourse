import { info } from './src/config/config.js'
import cluster from 'cluster'
import os from 'os'
import { createServer } from './src/server/createServer.js'

const CPU__LENGTH = os.cpus().length

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

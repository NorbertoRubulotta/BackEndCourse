import os from 'os'

const processData = {
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
    await res.render('info', { processData })
}
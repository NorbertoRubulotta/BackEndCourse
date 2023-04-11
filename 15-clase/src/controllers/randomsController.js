import { fork } from 'child_process';

export async function controllerGetRandoms(req, res) {
    let { cant } = req.query
    const childProcess = fork('./src/utils/randomNumbers.js')

    cant ? childProcess.send({ order: 'random', cant }) : childProcess.send({ order: 'random', cant: 100000000 });
    childProcess.on('message', message => res.json({ message }))

}



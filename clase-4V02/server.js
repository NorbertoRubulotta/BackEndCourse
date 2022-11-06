const express = require('express');

function controllerGetRoot(req, res) {
    res.send('todo bien')

}
const app = express();

app.get('/', controllerGetRoot)

const server = app.listen(8080)
const express = require('express');

const routerWeb = express.Router();

// end points //
routerWeb.get('/', (req, res) => {
    res.send('<h1>Servidor desafío 4<h1/>');
});

exports.routerWeb = routerWeb;
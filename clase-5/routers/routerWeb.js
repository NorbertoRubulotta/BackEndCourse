const express = require('express');

const routerWeb = express.Router();

// end points //
routerWeb.get('/', (req, res) => {
    res.render('datos');
});

exports.routerWeb = routerWeb;
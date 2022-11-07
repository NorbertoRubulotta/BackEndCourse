const express = require('express');

// Server
const app = express();

const server = app.listen(8080, () => {
    console.log(`Server running on PORT ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));

exports.app = app;
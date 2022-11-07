const express = require('express');
const { engine } = require('express-handlebars')

// Server
const app = express();
app.use(express.static('public'))
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

const server = app.listen(8080, () => {
    console.log(`Server running on PORT ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));

exports.app = app;
/* const http = require('http');
const server = http.createServer();

server.on('request', procesa);
server.listen(3000);
console.log('Server runing');

function procesa(request, response) {
    let url = request.url;
    console.log(`URL required: ${url}`);
    response.end('Hello there!!☺')
} */

/* const http = require('http');

const server = http.createServer((peticion, respuesta) => {
    respuesta.end('Hello World!!')
})

const connectedServer = server.listen(8080, () => {
    console.log(`Server HTTP listening port number ${connectedServer.address().port} `);
}) */

const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send('<h1>Servidor desafío 3<h1/>')
})

app.get('/products', (req, res) => {
    res.send(`${JSON.stringify(products)}`)
})

app.get('/randomProduct', (req, res) => {
    res.send(`${JSON.stringify(products[randomProduct])}`)
})

function runServer() {

    const server = app.listen(8080, () => {
        console.log(`Server running on PORT ${server.address().port}`)
    })
    server.on("error", error => console.log(`Error en servidor ${error}`))
}

runServer();


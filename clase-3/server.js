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

const http = require('http');

const server = http.createServer((peticion, respuesta) => {
    respuesta.end('Hello World!!')
})

const connectedServer = server.listen(8080, () => {
    console.log(`Server HTTP listening port number ${connectedServer.address().port} `);
})


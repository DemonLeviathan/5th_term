const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');

const httpServer = http.createServer((request, response) => {
    if (request.method === 'GET' && request.url === "/start") {
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.end(fs.readFileSync('./index.html', 'utf8'));
    } else {
        response.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'});
        response.end('<h1> Error 400 </h1>');
    }
});
httpServer.listen(3000, () => console.log('Server is running at http://localhost:3000/start'));


const wsserver = new WebSocket.Server({port: 4000, host: 'localhost', path: '/wsserver'});
wsserver.on('connection', ws => {
    let k = 0;
    let n = 0;
    ws.on('message', message => {
        console.log(`Received message: ${message}`);
        n = +message.toString().slice(-1);
    });

    setInterval(() => ws.send(`08-01-server: ${n}->${++k}`), 5000);
});

wsserver.on('error', error => console.error('ws server error', error));
console.log(`ws server: host: ${wsserver.options.host}, port: ${wsserver.options.port}, path: ${wsserver.options.path}`);
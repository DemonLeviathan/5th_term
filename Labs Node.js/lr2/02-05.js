const http = require('http');
const fs = require('fs');
const port = 5000;

const server = http.createServer((request, response) => {
    if (request.method === 'GET') {
        if (request.url === '/fetch') {
            fs.readFile('fetch.html', 'utf8', (error, data) => {
                if (error) {
                    console.error('Error reading fetch.html: ', error);
                    response.writeHead(500, { 'Content-Type': 'text/plain' });
                    response.end('Server error');
                } else {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(data);
                }
            });
        } else if (request.url === '/api/name') {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ surname: 'Viktarovich', name: 'Iryna', patronimic: 'Sergeevna' }));
        } else {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('Not Found');
        }
    } else {
        response.writeHead(405, { 'Content-Type': 'text/plain' });
        response.end('Method Not Allowed');
    }
});

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

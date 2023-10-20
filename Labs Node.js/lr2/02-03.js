const http = require('http');

const port = 5000;

const fullName = 'Viktarovich Iryna Sergeevna';

const server = http.createServer((request, response) => {
    if (request.method === 'GET' && request.url === '/api/name') {
        response.setHeader('Content-Type', 'text/plain');
        response.end(fullName);
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

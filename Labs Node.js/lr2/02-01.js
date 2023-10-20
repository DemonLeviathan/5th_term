const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 5000;

const server = http.createServer((request, response) => {
    const staticPath = path.join(__dirname, 'public');
    const indexPath = path.join(staticPath, 'index.html');

    if (request.method === 'GET') {
        if (request.url === '/html') {
            fs.readFile(indexPath, 'utf8', (error, data) => {
                if (error) {
                    console.error('Error of reading index.html file: ', error);
                    response.writeHead(500, { 'Content-Type': 'text/plain' });
                    response.end('Server error');
                } else {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(data);
                }
            });
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

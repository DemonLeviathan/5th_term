const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    if (request.method === 'GET' && request.url === '/file') {
        const fileStream = fs.createReadStream('MyFile.png');

        fileStream.on('open', () => {
            response.writeHead(200, { 'Content-Type': 'image/png' });
            fileStream.pipe(response);
        });

        fileStream.on('error', (err) => {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('File Not Found');
        });
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
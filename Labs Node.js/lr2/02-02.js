const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 5000;

const server = http.createServer((request, response) => {
    if (request.method === 'GET' && request.url === '/png') {
        const imagePath = path.join(__dirname, 'img1.png');

        fs.readFile(imagePath, (error, data) => {
            if (error) {
                console.error('Error of reading img1.png file: ', error);
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Server error');
            } else {
                response.writeHead(200, { 'Content-Type': 'image/png' });
                response.end(data);
            }
        });
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

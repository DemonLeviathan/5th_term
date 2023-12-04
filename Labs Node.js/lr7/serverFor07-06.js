const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    if (request.method === 'POST' && request.url === '/upload') {
        const writeStream = fs.createWriteStream('./uploaded_files/tanci-s-bubnami.jpg');

        request.on('data', (chunk) => {
            writeStream.write(chunk);
        });

        request.on('end', () => {
            writeStream.end();
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end('File uploaded successfully');
        });
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});

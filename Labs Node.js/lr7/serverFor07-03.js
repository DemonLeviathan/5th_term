const http = require('http');
const { parse } = require('querystring');

const server = http.createServer((request, response) => {
    if (request.method === 'POST' && request.url === '/formparameter') {
        let body = '';

        request.on('data', (chunk) => {
            body += chunk.toString();
        });

        request.on('end', () => {
            const data = JSON.parse(body);

            const { x, y, s } = data;

            console.log(`Received data: x=${x}, y=${y}, s=${s}`);

            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end(`Received x=${x}, y=${y}, s=${s}`);
        });
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});

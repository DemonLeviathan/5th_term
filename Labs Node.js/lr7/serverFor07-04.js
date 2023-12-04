const http = require('http');

const server = http.createServer((request, response) => {
    if (request.method === 'POST' && request.url === '/json') {
        let body = '';

        request.on('data', (chunk) => {
            body += chunk.toString();
        });

        request.on('end', () => {
            try {
                const data = JSON.parse(body);

                console.log('Received data:', data);

                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ message: 'Data received successfully' }));
            } catch (error) {
                console.error('Error parsing JSON:', error);
                response.writeHead(400, { 'Content-Type': 'text/plain' });
                response.end('Error parsing JSON');
            }
        });
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});

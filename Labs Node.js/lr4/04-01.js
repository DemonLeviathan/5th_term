const http = require('http');
const port = 5000;

const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');
    if (request.url === '/api/db') {
        if (request.method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({ message: 'GET request is completed' }));
        } else if (request.method === 'POST' || request.method === 'PUT') {
            let data = '';
            request.on('data', (chunk) => {
                data += chunk;
            });

            request.on('end', () => {
                response.statusCode = 200;
                response.end(JSON.stringify({ message: `${request.method} request is completed`, data: JSON.parse(data) }));
            });
        } else if (request.method === 'DELETE') {
            response.statusCode = 200;
            response.end(JSON.stringify({ message: 'DELETE request is completed.' }));
        } else {
            response.statusCode = 405; // Метод не поддерживается
            response.end(JSON.stringify({ error: 'Method is not supported' }));
        }
    } else {
        response.statusCode = 404; // URL не найден
        response.end(JSON.stringify({ error: 'URL not found' }));
    }
});

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

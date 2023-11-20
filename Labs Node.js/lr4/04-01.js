const http = require('http');
const url = require('url');

const db = [
    { id: 1, name: 'John', bday: '1990-01-15' },
    { id: 2, name: 'Alice', bday: '1985-07-20' },
];

const server = http.createServer((request, response) => {
    const { method, url: reqUrl } = request;
    const parsedUrl = url.parse(reqUrl, true);

    if (method === 'GET' && parsedUrl.pathname === '/api/db') {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(db));
    } else if (method === 'POST' && parsedUrl.pathname === '/api/db') {
        let data = '';

        request.on('data', (chunk) => {
            data += chunk;
        });

        request.on('end', () => {
            const newRow = JSON.parse(data);
            db.push(newRow);
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(newRow));
        });
    } else if (method === 'PUT' && parsedUrl.pathname === '/api/db') {
        // Обработка PUT-запроса асинхронным способом
        let data = '';

        request.on('data', (chunk) => {
            data += chunk;
        });

        request.on('end', () => {
            const updatedRow = JSON.parse(data);
            const id = parseInt(parsedUrl.query.id);

            if (!isNaN(id)) {
                const existingRow = db.find((row) => row.id === id);

                if (existingRow) {
                    Object.assign(existingRow, updatedRow);
                    response.setHeader('Content-Type', 'application/json');
                    response.end(JSON.stringify(existingRow));
                } else {
                    response.statusCode = 404;
                    response.end(JSON.stringify({ error: 'Row not found' }));
                }
            } else {
                response.statusCode = 400;
                response.end(JSON.stringify({ error: 'Invalid ID' }));
            }
        });
    } else if (method === 'DELETE' && parsedUrl.pathname === '/api/db') {
        // Обработка DELETE-запроса асинхронным способом
        const id = parseInt(parsedUrl.query.id);

        if (!isNaN(id)) {
            const index = db.findIndex((row) => row.id === id);

            if (index !== -1) {
                const deletedRow = db.splice(index, 1)[0];
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(deletedRow));
            } else {
                response.statusCode = 404;
                response.end(JSON.stringify({ error: 'Row not found' }));
            }
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({ error: 'Invalid ID' }));
        }
    } else {
        response.statusCode = 404;
        response.end(JSON.stringify({ error: 'Not Found' }));
    }
});

const port = 5000;

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

const http = require('http');
const url = require('url');
const fs = require('fs');

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
            try {
                const newRow = JSON.parse(data);

                // Проверка формата даты (YYYY-MM-DD)
                if (!isValidDate(newRow.bday)) {
                    response.statusCode = 400;
                    response.end(JSON.stringify({ error: 'Invalid date format. Use YYYY-MM-DD.' }));
                    return;
                }

                newRow.id = getNextId();
                db.push(newRow);
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(newRow));
            } catch (error) {
                response.statusCode = 400;
                response.end(JSON.stringify({ error: 'Invalid JSON format' }));
            }
        });
    } else if (method === 'PUT' && parsedUrl.pathname === '/api/db') {
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
    } else if (method === 'GET' && parsedUrl.pathname === '/') {
        fs.readFile('index.html', 'utf8', (err, data) => {
            if (err) {
                response.statusCode = 500;
                response.end('Error loading index.html');
            } else {
                response.setHeader('Content-Type', 'text/html');
                response.end(data);
            }
        });
    } else {
        response.statusCode = 404;
        response.end(JSON.stringify({ error: 'Not Found' }));
    }
});

function getNextId() {
    const maxId = db.reduce((max, row) => (row.id > max ? row.id : max), 0);
    return maxId + 1;
}

function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
}

const port = 5000;

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

const http = require('http');
const url = require('url');

function factorial(k) {
    if (k === 0) {
        return 1;
    }
    return k * factorial(k - 1);
}

const server = http.createServer((request, response) => {
    const query = url.parse(request.url, true).query;
    const k = parseInt(query.k);

    if (!isNaN(k)) {
        const fact = factorial(k);
        const jsonResponse = JSON.stringify({ k, fact });

        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 200;
        response.end(jsonResponse);
    } else {
        response.statusCode = 400;
        response.setHeader('Content-Type', 'text/plain');
        response.end('Invalid input: k parameter must be an integer');
    }
});

const port = 5000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

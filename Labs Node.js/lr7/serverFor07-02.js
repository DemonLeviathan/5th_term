const http = require('http');
const url = require('url');

const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/parameter') {
        const { x, y } = query;
        const numericX = parseInt(x);
        const numericY = parseInt(y);

        if (!isNaN(numericX) && !isNaN(numericY)) {
            const sum = numericX + numericY;
            const difference = numericX - numericY;
            const product = numericX * numericY;
            const quotient = numericX / numericY;

            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end(
                `Sum: ${sum}, Difference: ${difference}, Product: ${product}, Quotient: ${quotient}`
            );
        } else {
            response.writeHead(400, { 'Content-Type': 'text/plain' });
            response.end('Error: Parameters should be numeric');
        }
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});

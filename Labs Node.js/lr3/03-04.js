const http = require('http');
const url = require('url');

function factorial(k, callback) {
    if (k === 0) {
        process.nextTick(() => callback(null, 1));
    } else {
        process.nextTick(() => {
            factorial(k - 1, (err, result) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, k * result);
                }
            });
        });
    }
}

const server = http.createServer((request, response) => {
    if (request.url === '/') {
        const results = [];

        function calculateFactorial(x) {
            const startTime = new Date();
            factorial(x, (err, fact) => {
                if (err) {
                    response.statusCode = 500;
                    response.setHeader('Content-Type', 'text/plain');
                    response.end('Internal Server Error');
                } else {
                    const endTime = new Date();
                    results.push(`${(endTime - startTime)}-${x}/${fact}`);

                    if (x < 20) {
                        calculateFactorial(x + 1);
                    } else {
                        const htmlResponse = `
                        <html lang="">
                        <head>
                            <title>Factorial Calculator</title>
                        </head>
                        <body>
                            <h2>Factorial Calculator process.nextTick</h2>
                            <ol>
                                ${results.map(result => `<li> Result: ${result} </li>`).join('')}
                            </ol>
                        </body>
                        </html>
                        `;
                        response.setHeader('Content-Type', 'text/html');
                        response.statusCode = 200;
                        response.end(htmlResponse);
                    }
                }
            });
        }

        calculateFactorial(0);
    } else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/plain');
        response.end('Not Found');
    }
});

const port = 5000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

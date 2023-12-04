const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET',
};

const request = http.request(options, (response) => {
    console.log(`Status code: ${response.statusCode}`);
    console.log(`Status message: ${response.statusMessage}`);
    console.log(`Remote IP: ${response.socket.remoteAddress}`);
    console.log(`Remote port: ${response.socket.remotePort}`);
});

request.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

request.end();

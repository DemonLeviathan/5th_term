const http = require('http');

const x = 5;
const y = 10;

const options = {
    hostname: 'localhost',
    port: 3000,
    path: `/parameter?x=${x}&y=${y}`,
    method: 'GET',
};

const request = http.request(options, (response) => {
    console.log(`Status code: ${response.statusCode}`);

    let responseData = '';

    response.on('data', (chunk) => {
        responseData += chunk;
    });

    response.on('end', () => {
        console.log('Response body:', responseData);
    });
});

request.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

request.end();

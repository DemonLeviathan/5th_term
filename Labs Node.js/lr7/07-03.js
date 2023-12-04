const http = require('http');

const postData = JSON.stringify({ x: 5, y: 10, s: 'sampleString' });

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/formparameter',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length,
    },
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

request.write(postData);
request.end();

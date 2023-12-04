const http = require('http');

const postData = JSON.stringify({
    data: {
        x: 5,
        y: 10,
        s: 'sampleString',
    },
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/json',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length,
    },
};

const request = http.request(options, (response) => {
    console.log(`Status code: ${response.statusCode}`);
    console.log('Response Headers:', response.headers);

    let responseData = '';

    response.on('data', (chunk) => {
        responseData += chunk;
    });

    response.on('end', () => {
        try {
            const jsonResponse = JSON.parse(responseData);
            console.log('Response body:', jsonResponse);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
});

request.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

request.write(postData);
request.end();

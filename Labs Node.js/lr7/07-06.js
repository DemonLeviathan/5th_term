const http = require('http');
const fs = require('fs');

const filePath = './tanci-s-bubnami.jpg';

const formData = {
    file: fs.createReadStream(filePath),
};

const boundaryKey = Math.random().toString(16);

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/upload',
    method: 'POST',
    headers: {
        'Content-Type': `multipart/form-data; boundary=${boundaryKey}`,
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
        console.log('Response body:', responseData);
    });
});

request.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

for (const key in formData) {
    request.write(`--${boundaryKey}\r\n`);
    request.write(`Content-Disposition: form-data; name="${key}"; filename="${filePath}"\r\n`);
    request.write('Content-Type: image/png\r\n\r\n');
    formData[key].pipe(request, { end: false });
    request.write('\r\n');
}

request.write(`--${boundaryKey}--\r\n`);
request.end();

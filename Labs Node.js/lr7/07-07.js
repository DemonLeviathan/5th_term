const http = require('http');
const fs = require('fs');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/file',
    method: 'GET',
};

const request = http.request(options, (response) => {
    const fileStream = fs.createWriteStream('received_file.png');
    response.pipe(fileStream);

    response.on('end', () => {
        console.log('File received successfully!');
    });
});

request.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

request.end();

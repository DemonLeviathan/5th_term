const http = require('http');
const fs = require('fs');

const filePath = './received_file.jpg';

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/file',
    method: 'GET',
};

const request = http.request(options, (response) => {
    const writeStream = fs.createWriteStream(filePath);
    response.pipe(writeStream);

    response.on('end', () => {
        console.log('File downloaded successfully');
    });
});

request.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

request.end();

const http = require('http');

const xmlData = `
  <request id = "28">
    <x value = "1"/>
    <x value = "2"/>
    <m value = "a"/>
    <m value = "b"/>
    <m value = "c"/>
  </request>
`;

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/xml',
    method: 'POST',
    headers: {
        'Content-Type': 'application/xml',
        'Content-Length': Buffer.byteLength(xmlData),
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

request.on('data', (chunk) => {
    console.log(`Received chunk of data: ${chunk}`);
});

request.write(xmlData);
request.end();

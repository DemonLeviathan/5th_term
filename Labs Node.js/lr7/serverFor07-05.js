const http = require('http');

const server = http.createServer((request, response) => {
    if (request.method === 'POST' && request.url === '/xml') {
        let body = '';

        request.on('data', (chunk) => {
            body += chunk;
        });

        request.on('end', () => {
            const responseXML = `
        <response id>
          <status>Success</status>
          <message>Data received</message>
          <receivedData>${body}</receivedData>
        </response>
      `;

            response.writeHead(200, { 'Content-Type': 'application/xml' });
            response.end(responseXML);
        });
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});

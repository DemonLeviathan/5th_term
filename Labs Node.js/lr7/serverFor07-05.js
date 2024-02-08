const http = require('http');
const xml2js = require('xml2js');

const server = http.createServer((request, response) => {
    if (request.method === 'POST' && request.url === '/xml') {
        let data = '';

        request.on('data', (chunk) => {
            data += chunk;
        });

        request.on('end', () => {
            xml2js.parseString(data, (error, result) => {
                if (error) {
                    response.writeHead(400, { 'Content-Type': 'text/plain' });
                    response.end('Request is not correct.');
                    return;
                }

                const request = result.request;
                const id = request.$.id;
                const xs = request.x.map(x => +x.$.value || 0);
                const ms = request.m.map(m => m.$.value);

                const sumX = xs.reduce((acc, curr) => acc + curr, 0);
                const concatM = ms.join('');

                const responseBody = {
                    response: {
                        $: { id: Number(id)+Number(5), request: id },
                        sum: { $: { element: 'x', result: sumX.toString() } },
                        concat: { $: { element: 'm', result: concatM } }
                    }
                };

                const builder = new xml2js.Builder();
                const xml = builder.buildObject(responseBody);

                response.writeHead(200, { 'Content-Type': 'application/xml' });
                response.end(xml);
            });
        });
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});

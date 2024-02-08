const http = require('http');

const server = http.createServer((request, response) => {
    if (request.method === 'POST' && request.url === '/json') {
        let body = '';

        request.on('data', (chunk) => {
            body += chunk;
        });

        request.on('end', () => {
            try {
                //console.log(body)
                const data = JSON.parse(body);
                const comment = data._comment;
                const x = data.x;
                const y = data.y;
                const s = data.s;
                const o = data.o;
                const m = data.m;

                const responseBody = {
                    "_comment": "Answer: " + comment,
                    "x_plus_y": x + y,
                    "Concatination_s_o": s +": "+ (o ? o.name : 'N/A'),
                    "Length_m": m.length
                }

                console.log('Received data:', responseBody);

                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(responseBody, null, 4));
            } catch (error) {
                console.error('Error parsing JSON:', error);
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end('Error parsing JSON');
            }
        });
    } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});

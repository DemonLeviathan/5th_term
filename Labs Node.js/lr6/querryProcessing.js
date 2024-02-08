const url = require("url");
const fs = require("fs");
const xml2js = require('xml2js');
const path = require('path');

let KeepAliveTimeout = 60;

const getRequest = (request, response) =>
{
    const {pathname, query} = url.parse(request.url, true);

    if (pathname.startsWith('/files')) {
        const [, , file] = pathname.split('/');

        if (file !== undefined) {
            const filePath = path.join(__dirname, 'static', file);

            try {
                const fileContent = fs.readFileSync(filePath);
                response.writeHead(200, { 'Content-Type': 'text/plain' });
                response.end(fileContent);
            } catch (err) {
                response.writeHead(404, { 'Content-Type': 'text/plain' });
                response.end('Error 404: File Not Found');
            }
        }
    }
    let parsedUrl = url.parse(request.url, true).pathname.split('/');


    console.log(`${pathname}`);
    switch ("/" + parsedUrl[1])
    {
        case '/connection': {
            const parsedUrl = url.parse(request.url, true);

            if (parsedUrl.query.set) {
                const newKeepAliveTimeout = parseInt(parsedUrl.query.set);
                if (!isNaN(newKeepAliveTimeout)) {
                    KeepAliveTimeout = newKeepAliveTimeout;
                    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                    response.end(`New value of parameter KeepAliveTimeout=${newKeepAliveTimeout}`);
                } else {
                    response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
                    response.end('ERROR: Put correct value of parameter set');
                }
            } else {
                response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                response.end(`Current value of parameter KeepAliveTimeout: ${KeepAliveTimeout}`);
            }

            break;
        }
        case '/headers': {
            const generateHeadersHTML = (headers) => {
                let headersHTML = '';
                for (const key in headers) {
                    headersHTML += `<h3>${key}: ${headers[key]}</h3>`;
                }
                return headersHTML;
            };

            response.setHeader('Connection', 'keep-alive');
            response.setHeader('Content-Type', 'text/html; charset=utf-8')
            const requestHeadersHTML = generateHeadersHTML(request.headers);
            const responseHeadersHTML = generateHeadersHTML(response.getHeaders());

            response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            response.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Request and Response Headers</title>
        </head>
        <body>
            <h1>Request Headers:</h1>
            ${requestHeadersHTML}
            <h1>Response Headers:</h1>
            ${responseHeadersHTML}
        </body>
        </html>
    `);
            break;
        }


        case '/parameter': {
            //http://localhost:5000/parameter/6/2
            //http://localhost:5000/parameter?x=6&y=2
            response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});

            let paramX = parseInt(url.parse(request.url, true).query.x);
            let paramY = parseInt(url.parse(request.url, true).query.y);

            let splitedUrl = url.parse(request.url, true).pathname.split('/');

            if(splitedUrl.length >= 4){
                paramX = parseInt(splitedUrl[2]);
                paramY = parseInt(splitedUrl[3]);

                if(!isNaN(paramX) && !isNaN(paramY)){
                    response.end(`sum: ${paramX + paramY}\ndiff: ${paramX - paramY}\nprod: ${paramX * paramY}\nquot: ${paramX / paramY}`);
                }
                else{
                    response.end(`uri: ${request.url}`);
                }
            }
            else{
                if(!isNaN(paramX) && !isNaN(paramY)){
                    response.end(`sum: ${paramX + paramY}\ndiff: ${paramX - paramY}\nprod: ${paramX * paramY}\nquot: ${paramX / paramY}`);
                }
                else{
                    response.end(`Error: Incorrect x or y`);

                }
            }

            break;
        }
        case '/socket':{
            const {headers} = request;
            const ip = request.connection.remoteAddress;
            const port = request.connection.remotePort;

            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end(`
                Client IP: ${ip}, 
                Client Port: ${port},
                Server IP: ${headers.host.split(':')[0]},
                Server Port: ${headers.host.split(':')[1]}`);
            break;
        }
        case '/resp-status': {
            const {code, mess} = query;
            if(!code || !mess || !Number.parseInt(code))
            {
                response.writeHead(500, { "Content-Type": "text/plain" });
                response.end('Error: one of parameters is undefined');
            }
            response.writeHead(Number.parseInt(code), mess, { "Content-Type": "text/plain" });
            response.end('Status: ' + code + ' Comments: ' + mess);
            break;
        }
        case '/formparameter': {
            fs.readFile('index.html', (err, data) => {
                if (err) {
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.end('Internal Server Error');
                    return;
                }

                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data);
            });
            break;
        }
        case '/files': {
            fs.readdir('./static', (error, files) => {
                if (error) {
                    response.writeHead(500, { 'Content-Type': 'text/plain' });
                    response.end('Internal Server Error');
                    return;
                }

                const fileCount = files.length;
                response.writeHead(200, { 'Content-Type': 'text/plain', 'X-static-files-count': fileCount.toString() });
                response.end(`Number of files in static directory: ${fileCount}`);
            });
            break;
        }
        case '/upload': {
            fs.readFile('indexFile.html', (err, data) => {
                if (err) {
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.end('Internal Server Error');
                    return;
                }

                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data);
            });
            break;
        }
        default: {
            if (pathname.startsWith('/parameter')) {
                response.end(request.url);
            } else {
                response.end();
            }
        }
    }
}

const postRequest = (request, response) =>
{
    const {pathname, query} = url.parse(request.url, true);

    switch (pathname)
    {
        case '/formparameter': {
            let body = '';
            request.on('data', chunk => {
                body += chunk.toString();
            });

            request.on('end', () => {
                const formData = new URLSearchParams(body);
                const values = {};
                formData.forEach((value, key) => {
                    values[key] = value;
                });

                response.writeHead(200, { 'Content-Type': 'text/plain' });
                response.end(JSON.stringify(values));
            });
            break;
        }
        case '/json': {
            let data = '';

            request.on('data', chunk => {
                data += chunk;
            });

            request.on('end', () => {
                try {
                    const requestData = JSON.parse(data);
                    const comment = requestData._comment;
                    const x = requestData.x;
                    const y = requestData.y;
                    const s = requestData.s;
                    const o = requestData.o;
                    const m = requestData.m;

                    /*{
                        "_comment": "josvklrk",
                        "x": 1,
                        "y": 2,
                        "s": "Hello",
                        "m": ["a", "b", "c", "d"],
                        "o": {"surname": "Ivanov", "name": "Ivan"}
                    }*/

                    const responseBody = {
                        "_comment": "Answer: " + comment,
                        "x: ": x,
                        "y:": y,
                        "x_plus_y": x + y,
                        "Concatination_s_o": s +": "+ o.name,
                        "Length_m": m.length
                    };

                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify(responseBody));
                } catch (error) {
                    response.writeHead(400, { 'Content-Type': 'text/plain' });
                    response.end('Request is not correct.');
                }
            });
            break;
        }
        case '/xml': {
            let data = '';

            request.on('data', chunk => {
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
                            $: { id: id, request: id },
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

            /*
            * POSTMAN:
            *  <request id="28">
                 <x value = "1"/>
                 <x value = "2"/>
                 <m value = "na"/>
                 <m value = "me"/>
               </request>
            * */
            break;
        }
        case '/upload': {
            let data = [];
            request.on('data', chunk => {
                data.push(chunk);
            });

            request.on('end', () => {
                const boundary = request.headers['content-type'].split('=')[1];
                const fileData = Buffer.concat(data).toString();
                const fileStart = fileData.indexOf('filename="') + 10;
                const fileEnd = fileData.indexOf('"', fileStart);
                const fileName = fileData.slice(fileStart, fileEnd);

                const filePath = path.join(__dirname, 'static', fileName);

                const fileContentStart = fileData.indexOf('\r\n\r\n') + 4;

                fs.writeFile(filePath, fileData.slice(fileContentStart), (error) => {
                    if (error) {
                        response.writeHead(500, {'Content-Type': 'text/plain'});
                        response.end('Internal Server Error');
                    } else {
                        response.writeHead(200, {'Content-Type': 'text/plain'});
                        response.end('File uploaded successfully!');
                    }
                });
            });
            break;
        }
        default: {
            response.end();
        }
    }
}


module.exports = {getRequest, postRequest}
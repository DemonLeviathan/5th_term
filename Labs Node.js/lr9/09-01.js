const WebSocket = require('ws');
const fs = require('fs');

const wss = new WebSocket.Server({ port: 4000 });

wss.on('connection', function connection(ws) {
    console.log('Server: Client connected');

    ws.on('message', function incoming(data) {
        if (data instanceof Buffer) {
            const fileName = `./upload/file.txt`;
            fs.writeFile(fileName, data, (error) => {
                if (error) throw error;
                console.log(`Server: File saved as ${fileName}`);
            });
        }
    });
});

setInterval(() => {}, 1000);

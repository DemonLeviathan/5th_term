const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const wss = new WebSocket.Server({ port: 4000 });

wss.on('connection', function connection(ws) {
    console.log('Server: Client connected');

    const filesDir = path.join(__dirname, 'download');

    fs.readdir(filesDir, (err, files) => {
        if (err) {
            console.error('Server: Error reading directory', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(filesDir, file);

            fs.readFile(filePath, (error, data) => {
                if (error) {
                    console.error('Server: Error reading file', error);
                    return;
                }

                ws.send(data, { binary: true }, (error) => {
                    if (error) {
                        console.error('Server: Error sending file', error);
                    } else {
                        console.log(`Server: Sent ${file}`);
                    }
                });
            });
        });
    });
});

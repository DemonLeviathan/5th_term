const WebSocket = require('ws');
const fs = require('fs');

const ws = new WebSocket('ws://localhost:4000');

ws.on('open', function open() {
    console.log('Client: Connected to server');

    const fileStream = fs.createReadStream('D:/Univer/5-th term/Labs Node.js/lr9/file.txt');
    fileStream.on('data', (chunk) => {
        ws.send(chunk);
    });

    fileStream.on('end', () => {
        console.log('Client: File sent');
        ws.close();
    });
});
//setInterval(() => {}, 1000);

ws.on('close', function close() {
    console.log('Client: Disconnected from server');
});

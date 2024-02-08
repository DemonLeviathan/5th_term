const WebSocket = require('ws');
const fs = require('fs');

const ws = new WebSocket('ws://localhost:4000');

ws.on('open', function open() {
    console.log('Client: Connected to server');
});

let fileCounter = 1;

ws.on('message', function incoming(data) {
    console.log('Client: Received file');

    const fileName = `received_file_${fileCounter}.txt`;

    fs.writeFile(fileName, data, (error) => {
        if (error) {
            console.error('Client: Error saving file', error);
            return;
        }
        console.log(`Client: File saved as ${fileName}`);
    });

    fileCounter++;
});

ws.on('close', function close() {
    console.log('Client: Disconnected from server');
});

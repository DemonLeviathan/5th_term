const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:4000');

ws.on('open', function open() {
    console.log('Client: Connected to server');
});

ws.on('message', function incoming(message) {
    if (message instanceof Buffer) {
        console.log('Client: Received message:', message.toString());
    } else {
        console.log('Client: Received message:', message);
    }
});

ws.on('close', function close() {
    console.log('Client: Disconnected from server');
});

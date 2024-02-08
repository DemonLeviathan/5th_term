const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4000 });

let messageCounter = 0;
let connections = [];

function sendMessages() {
    messageCounter++;

    const message = `09-03-server: ${messageCounter}`;

    connections.forEach((ws) => {
        if (ws.isAlive === false) {
            return ws.terminate();
        }

        ws.send(message);
    });
}

wss.on('connection', function connection(ws) {
    connections.push(ws);

    ws.isAlive = true;

    ws.on('pong', () => {
        ws.isAlive = true;
    });

    ws.on('message', function incoming(message) {
        console.log('Received: %s', message);

        sendMessages();
    });

    sendMessages();
});

setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.isAlive === false) {
            return ws.terminate();
        }

        ws.isAlive = false;
        ws.ping();
    });

}, 15000);

setInterval(() => {
    console.log('Number of active connections:', wss.clients.size);
}, 5000);

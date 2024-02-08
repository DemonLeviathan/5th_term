const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4000 });

wss.on('connection', function connection(ws) {
    console.log('Server: Client connected');

    ws.on('message', function incoming(message) {
        switch (message.toString()) {
            case 'A':
                console.log('Server received notification: A');
                break;
            case 'B':
                console.log('Server received notification: B');
                break;
            case 'C':
                console.log('Server received notification: C');
                break;
            default:
                console.log('Server received unknown notification');
                break;
        }
    });
});

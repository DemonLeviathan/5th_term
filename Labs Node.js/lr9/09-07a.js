const WebSocket = require('ws');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ws = new WebSocket('ws://localhost:4000');

ws.on('open', function open() {
    console.log('Client connected');
    sendMessage();
});

function sendMessage() {
    rl.question('Enter notification (A, B, or C) or "exit" to quit: ', (answer) => {
        if (answer.toLowerCase() === 'exit') {
            ws.close();
            rl.close();
            return;
        }
        ws.send(answer);
        sendMessage();
    });
}

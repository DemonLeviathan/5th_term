const http = require('http');
const readline = require('readline');

let current_state = 'norm';

const server = http.createServer((request, response) => {
    if (request.url === '/' && request.method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(`Current state: ${current_state}`);
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not Found');
    }
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function changeState(newState) {
    if (['norm', 'stop', 'test', 'idle', 'exit'].includes(newState)) {
        current_state = newState;
        console.log(`Current state: ${current_state}`);
        if (newState === 'exit') {
            console.log('Application is ended.');
            process.exit(0);
        }
    } else {
        console.log('Error: Incorrect state input');
    }
}

const port = 5000;
server.listen(port, () => {
    console.log(`\nServer is running on http://localhost:${port}`);
});

rl.setPrompt('Enter new state (norm, stop, test, idle, exit): ');
rl.prompt();

rl.on('line', (input) => {
    changeState(input.trim());
    rl.prompt();
});

rl.on('close', () => {
    console.log('Interface is finished.');
    process.exit(0);
});

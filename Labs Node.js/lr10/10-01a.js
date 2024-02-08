const net = require('net');

const client = new net.Socket();

const PORT = 3000;
const HOST = '127.0.0.1';

client.connect(PORT, HOST, () => {
    console.log('Connected to server.');

    const message = 'Hi, server!';
    client.write(message);
});

client.on('data', data => {
    console.log('Received response from server:', data.toString());
    client.destroy();
});

client.on('close', () => {
    console.log('Connection is closed.');
});

client.on('error', err => {
    console.error('Connection error:', err.message);
});

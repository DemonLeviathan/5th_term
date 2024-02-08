const net = require('net');

const server = net.createServer(socket => {
    console.log('Client is connected.');

    socket.on('data', data => {
        const message = data.toString().trim();
        console.log(`Received message from client: ${message}`);

        const response = `ECHO: ${message}`;
        socket.write(response);
    });

    socket.on('end', () => {
        console.log('Client is disconnected.');
    });

    socket.on('error', err => {
        console.error('Connection error:', err.message);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

const WebSocket = require('ws');

let parm = process.argv[2];
let clientName = typeof parm == 'undefined' ? 'defaultName' : parm;

const ws = new WebSocket('ws://localhost:4000');

ws.on('open',()=>{
    ws.on('message', data=>{
        console.log('on message: ', JSON.parse(data));
    });

    let k=0;
    setInterval(() => {
        ws.send(JSON.stringify({client: clientName,
            timestamp: new Date().toString()}, null, 2));
    }, 3000);
});
ws.on('error', error => {
    console.log('Error WebSocket: ', error.message);
});
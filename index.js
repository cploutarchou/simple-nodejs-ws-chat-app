const express = require('express');
const app = express();
const socket = require('socket.io');

//Open Connection
const server = app.listen(8585, () =>
    console.log('App listening on port 8585'));
//HTML Files
app.use(express.static('html'));
//Setup Socket
let io = socket(server);
io.on('connection', (e) => {
    console.log(`Socket Connection Established. Connection id is -> ${e.id}`);

    e.on('chatMsg', (data) => io.sockets.emit('chatMsg', data));

    e.on('typing', (data) => e.broadcast.emit('typing', data));
});

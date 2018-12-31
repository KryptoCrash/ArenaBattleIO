var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
import Player from './models/player/player';
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connect', (socket) => {
    Player.onConnect(io, socket);
    socket.on('disconnect', () => {
        Player.onDisconnect(io, socket);
    })
})
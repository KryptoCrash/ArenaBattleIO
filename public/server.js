var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var Player = require('./js/server/models/player/player')
app.use(express.static(__dirname + './public/js/client'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/js/index.html');
});

io.on('connect', (socket) => {
    socket.on('connect', (data) => {
        new Player(players.length + 1, Math.random(0, 5000), Math.random(0, 5000), data.hero, 0);
        Player.onConnect(io, socket);
    })
    socket.on('move', (data) => {
        Player.onMove(data.targX, data.targY);
    })
    socket.on('disconnect', () => {
        Player.onDisconnect(io, socket);
    })
})

app.listen(8080, () => {
    console.log('starting...')
})
//Hello
//If I join in my PC I will also be able to talk, rn on my Laptop
//not exactly sure what im doing here, but im trying to set up the player. 
//k
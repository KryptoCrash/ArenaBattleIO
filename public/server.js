var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var Player = require('./js/server/models/player/player')
var Bundler = require('parcel-bundler');
var path = require('path');
const bundler = new Bundler(path.resolve(__dirname, './js/client/index.html'));

app.use(bundler.middleware());

server.listen(8000, () => {
    console.log(`App now listening on port 8000`);
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


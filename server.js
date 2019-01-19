var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var Player = require('./server/models/player/player')
var Bundler = require('parcel-bundler');
var path = require('path');

app.get('/', (req,res) => {
    res.sendFile(__dirname+'/client/index.html')
})
app.use('/client',express.static(__dirname+'/client'));

server.listen(8000, () => {
    console.log(`App now listening on port 8000`);
});

io.on('connect', (socket) => {

    Player.onConnect(io, socket);

    socket.on('disconnect', () => {
    
    })
})


var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var Server = require('./server/models/server/server');
var Bundler = require('parcel-bundler');
var path = require('path');
var port = 8000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html')
})
app.use('/client', express.static(__dirname+'/client'));

server.listen(port, () => {
    console.log(`App now listening on port ${port}`);
    
});
var socketserver = new Server(io);
socketserver.init();
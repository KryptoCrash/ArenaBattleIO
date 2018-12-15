var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

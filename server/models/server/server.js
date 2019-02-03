var Player = require("../player/player");
module.exports = class Server {
    constructor(io) {
        this.io = io;
        this.players = {};
    }
    init() {
        this.io.on("connect", socket => {
            this.addPlayer(socket.id);
            this.io.emit('newPlayer', {
                id: socket.id,
                x: this.players[socket.id].x,
                y: this.players[socket.id].y,
            });
            this.runSocket(socket);
        });
    }
    runSocket(socket) {
        socket.emit('allPlayers', this.players)
        socket.on('movePlayer', (x,y) => {
            this.players[socket.id].x = x;
            this.players[socket.id].y = y;
            // console.log(this.players)
            this.io.emit('playerMoved', {
                id: socket.id,
                x: this.players[socket.id].x,
                y: this.players[socket.id].y,
            })
        })
        socket.on("disconnect", () => {
            delete this.players[socket.id];
        });
    }
    addPlayer(id) {
        var player = new Player(id, Math.random() * 500, Math.random() * 500);
        this.players[id] = player;
        // console.log(this.players);
    }
};

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
                vx: 0,
                vy: 0
            });
            this.runSocket(socket);
        });
        let last_time = (new Date).getTime();
        setInterval(() => {
            let current_time = (new Date).getTime(); 
            let dt = current_time - last_time;
            this.update(dt);
            last_time = (new Date).getTime();
        }, 1000/60)
    }
    runSocket(socket) {
        socket.emit('allPlayers', this.players)
        socket.on('movePlayer', (x,y) => {
            let angle = Math.atan2(y - this.players[socket.id].y, x - this.players[socket.id].x)
            let velocity = 100;
            this.players[socket.id].vx = velocity * Math.cos(angle);
            this.players[socket.id].vy = velocity * Math.sin(angle);
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
    update(dt) {
        let dt_sec = dt / 1000;
        Object.keys(this.players).forEach((id) => {
            this.players[id].x += this.players[id].vx * dt_sec;
            this.players[id].y += this.players[id].vy * dt_sec;
        });
        this.io.emit("update", this.players);
    }
};

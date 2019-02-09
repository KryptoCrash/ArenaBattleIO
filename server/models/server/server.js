var heroHandler = require("../../events/heroHandler");
var Player = require("../player/player");
var calcMove = require("../../events/calcMove");
var Bullet = require("../weapons/bullet");
module.exports = class Server {
    constructor(io) {
        this.io = io;
        this.players = {};
        this.weapons = {};
    }
    init() {
        this.io.on("connect", socket => {
            this.addPlayer(socket.id);
            this.io.emit("newPlayer", {
                id: socket.id,
                x: this.players[socket.id].x,
                y: this.players[socket.id].y,
                vx: 0,
                vy: 0
            });
            this.runSocket(socket);
        });
        this.setGameTime();
    }
    setGameTime() {
        let last_time = new Date().getTime();
        setInterval(() => {
            let current_time = new Date().getTime();
            let dt = current_time - last_time;
            this.update(dt, this.players, "update");
            this.update(dt, this.weapons, "updateWeapons");
            last_time = new Date().getTime();
        }, 1000 / 60);
    }
    runSocket(socket) {
        socket.emit("allPlayers", this.players);
        socket.emit("allWeapons", this.weapons);
        socket.on("movePlayer", async (x, y) => {
            this.players[socket.id].angle = await calcMove(
                x,
                y,
                this.players[socket.id],
                this.players[socket.id].hero.speed
            );
        });
        socket.on("heroChange", heroC => {
            let hero = new heroHandler(heroC);
            this.players[socket.id].hero = hero;
        });
        socket.on("disconnect", () => {
            socket.emit("disconnect1", socket.id);
            delete this.players[socket.id];
        });
        socket.on("shoot", async (x, y) => {
            let bullet = await new Bullet(this.players[socket.id]);
            this.weapons[socket.id] = bullet;
            this.io.emit("newWeapon", {
                id: socket.id,
                x: bullet.x,
                y: bullet.y
            });
            bullet.shoot();
        });
    }
    addPlayer(id, hero) {
        var player = new Player(
            id,
            Math.random() * 500,
            Math.random() * 500,
            hero
        );
        this.players[id] = player;
    }
    update(dt, gameObj, type) {
        let dt_sec = dt / 1000;
        Object.keys(gameObj).forEach(id => {
            gameObj[id].x += gameObj[id].vx * dt_sec;
            gameObj[id].y += gameObj[id].vy * dt_sec;
        });
        this.io.emit(type, gameObj);
    }
};

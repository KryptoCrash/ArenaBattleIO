var heroHandler = require("../../events/heroHandler");
var Player = require("../player/player");
var calcMove = require("../../events/calcMove");
var Bullet = require("../weapons/bullet");
const uuidv4 = require('uuid/v4');
module.exports = class Server {
    constructor(io) {
        this.io = io;
        this.players = {};
        this.weapons = {};
    }
    init() {
        this.io.on("connect", socket => {
            this.addPlayer(socket.id, heroHandler(socket.handshake.query.hero));
            this.io.emit("newPlayer", this.players[socket.id]);
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
        socket.on("heroChange", async (heroC) => {
            let hero = heroHandler(heroC);
            this.players[socket.id].hero = await hero;
        });
        socket.on("disconnect", () => {
            this.io.emit("disconnect1", socket.id);
            delete this.players[socket.id];
        });
        socket.on("shoot", async (x, y) => {
            let bullet = await new Bullet(this.players[socket.id], uuidv4());
            this.weapons[bullet.id] = bullet;
            this.io.emit("newWeapon", bullet);
            bullet.shoot();
            let _this = await this;
            setTimeout(async () => { 
                await _this.io.emit("removeWeapon", bullet.id);
                delete this.weapons[bullet.id];
            }, bullet.lifetime);
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

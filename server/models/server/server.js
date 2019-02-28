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
            this.addPlayer(socket.id, heroHandler("scout"));
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

/*
Our server starts up, and does "setGameTime" to update the players. This is our "tick" function.
Everybody should have "around" the same FPS. That means if someone is having a slow fps, it's either the client's internet,
or everybody's having a bad day.

Once a player connects, we update EVERYBODY (this should include them as well) of the list of new players.
We'll also update them if somebody leaves, dies, or respawns.
In this update, each client should recieve information about that character's class, and other things that are required.
(Honestly, )
*/
export default class Player {
    constructor(scene, camera) {
        this.x = 500;
        this.y = 500;
        this.socket = io.connect("http://localhost:8000");
        this.scene = scene;
        this.players = {};
        this.weapons = {};
        this.cammy = camera;
    }
    update() {
        this.socket.emit("heroChange", "scout");
        this.socket.on("allPlayers", data => {
            Object.keys(data).forEach(key => {
                var val = data[key];
                this.add(key, val.x, val.y, this.players);
            });
            this.cammy.startFollow(this.players[this.socket.id]);
        });
        this.socket.on("newPlayer", data => {
            this.add(data.id, data.x, data.y, this.players);
        });
        this.socket.on("newWeapon", data => {
            this.add(data.id, data.x, data.y, this.weapons);
        });
        this.socket.on("allWeapons", data => {
            Object.keys(data).forEach(key => {
                var val = data[key];
                this.add(key, val.x, val.y, this.weapons);
            });
        });
        this.socket.on("update", data => {
            Object.keys(data).forEach(id => {
                this.players[id].x = data[id].x;
                this.players[id].y = data[id].y;
            });
        });
        this.socket.on("updateWeapons", data => {
            Object.keys(data).forEach(id => {
                this.weapons[id].x = data[id].x;
                this.weapons[id].y = data[id].y;
            });
        });
        this.socket.on("disconnect1", (id) => {
            this.players[id].destroy();
            delete this.players[id];
        });
    }
    add(id, x, y, gameObj) {
        if (!gameObj[id]) {
            gameObj[id] = this.scene.physics.add.sprite(x, y, "player");
        }
    }
    movePlayer(pointer) {
        this.socket.emit("movePlayer", pointer.worldX, pointer.worldY);
    }
    shoot(pointer) {
        this.socket.emit("shoot", pointer.worldX, pointer.worldY);
    }
}
